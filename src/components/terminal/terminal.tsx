"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { parseCommand } from "@/lib/commands";
import { WelcomeBox } from "./welcome-box";
import { Markdown } from "./markdown";
import { motion } from "framer-motion";

const COMMANDS = [
  { cmd: "help",           hint: "List all available commands" },
  { cmd: "about",          hint: "Who Anas is and what drives him" },
  { cmd: "experience",     hint: "Full work history — Deriv, Dalil AI, Emirates..." },
  { cmd: "projects",       hint: "All projects and what they solved" },
  { cmd: "skills",         hint: "Tech stack and capabilities" },
  { cmd: "achievements",   hint: "Awards, hackathons, recognitions" },
  { cmd: "education",      hint: "BITS Pilani Dubai — 9.7 CGPA" },
  { cmd: "certifications", hint: "AWS, DeepLearning.AI, Cisco..." },
  { cmd: "patent",         hint: "Published patent on AI + Agriculture" },
  { cmd: "contact",        hint: "Get in touch with Anas" },
  { cmd: "clear",          hint: "Clear the terminal" },
  { cmd: "/non-tech",      hint: "Switch to standard portfolio view" },
  { cmd: "easter",         hint: "Hidden commands and easter eggs" },
  { cmd: "whoami",         hint: "Who's asking?" },
  { cmd: "ls",             hint: "List directory contents" },
  { cmd: "pwd",            hint: "Print working directory" },
  { cmd: "sudo hire me",   hint: "Make an offer" },
  { cmd: "git log --oneline", hint: "View commit history" },
  { cmd: "ping anas.dev",  hint: "Check if Anas is online" },
  { cmd: "chitti",         hint: "Talk to Chitti directly" },
];

export type HistoryItem = {
  id: string;
  command: string;
  output: React.ReactNode;
  isAI?: boolean;
};

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem("portfolio_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("portfolio_session_id", id);
  }
  return id;
}

function isNaturalLanguage(input: string): boolean {
  const lower = input.toLowerCase().trim();
  const knownCommands = [
    "help", "about", "skills", "projects", "experience", "contact", "clear", "welcome",
    "achievements", "education", "patent", "certifications", "ls", "ls -la", "pwd", "whoami",
    "vim", "vi", "sudo", "cat secret_keys.pem", "cat ./secret_keys.pem",
    "git log --oneline", "ping anas.dev", "/non-tech", "/tech", "chitti", "easter",
    "sudo hire me", "sudo hire-me",
  ];
  if (knownCommands.includes(lower)) return false;
  if (lower.startsWith("sudo ")) return false;
  if (lower.startsWith("cat ")) return false;
  if (lower.startsWith("git ")) return false;
  if (lower.startsWith("/")) return false;
  const words = lower.split(/\s+/);
  if (words.length >= 3) return true;
  if (lower.includes("?")) return true;
  if (/^(tell|what|how|where|who|why|show|describe|is|can|does|did|has|have|was|were|are)/.test(lower)) return true;
  return false;
}

export function Terminal() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputVal, setInputVal] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [isAIThinking, setIsAIThinking] = useState(false);
  // Streaming state — text accumulates here during stream
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const [streamingCmd, setStreamingCmd] = useState<string>("");
  const [aiHistory, setAiHistory] = useState<{ role: string; content: string }[]>([]);
  const [remainingAI, setRemainingAI] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<typeof COMMANDS>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, streamingText, isAIThinking]);

  useEffect(() => {
    const t = setTimeout(() => setIsBooting(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const addToHistory = useCallback((cmd: string, output: React.ReactNode, isAI = false) => {
    setHistory(prev => [...prev, { id: Math.random().toString(36).slice(2), command: cmd, output, isAI }]);
  }, []);

  const callChitti = useCallback(async (message: string) => {
    const sessionId = getSessionId();
    setIsAIThinking(true);
    setStreamingText("");
    setStreamingCmd(message);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId, history: aiHistory }),
      });

      if (res.status === 429 || res.status === 400 || res.status === 500) {
        const data = await res.json();
        setStreamingText(null);
        setStreamingCmd("");
        addToHistory(message, <p className="text-yellow-400 text-xs">{data.error}</p>, true);
        return;
      }

      // Read SSE stream
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let remaining = 0;

      if (!reader) throw new Error("No reader");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") break;

          try {
            const parsed = JSON.parse(payload);
            if (parsed.meta) {
              remaining = parsed.remaining ?? 0;
              setRemainingAI(remaining);
            } else if (parsed.text) {
              fullText += parsed.text;
              setStreamingText(fullText);
            }
          } catch {
            // ignore parse errors
          }
        }
      }

      // Stream done — commit to history
      setStreamingText(null);
      setStreamingCmd("");

      setAiHistory(prev => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: fullText },
      ]);

      addToHistory(
        message,
        <ChittiResponse text={fullText} remaining={remaining} />,
        true
      );
    } catch {
      setStreamingText(null);
      setStreamingCmd("");
      addToHistory(message, <p className="text-red-400 text-xs">Connection error. Try a command like &apos;help&apos; instead.</p>, true);
    } finally {
      setIsAIThinking(false);
    }
  }, [aiHistory, addToHistory]);

  const executeCommand = useCallback(async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { id: Math.random().toString(36).slice(2), command: "", output: null }]);
      return;
    }
    if (trimmed.toLowerCase() === "clear") { setHistory([]); return; }
    if (trimmed.toLowerCase() === "/non-tech") { router.push("/non-tech"); return; }

    if (isNaturalLanguage(trimmed)) {
      await callChitti(trimmed);
      setCommandHistory(prev => [...prev, trimmed]);
      setHistoryIndex(-1);
      return;
    }

    const output = await parseCommand(trimmed);
    addToHistory(trimmed, output);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
  }, [router, callChitti, addToHistory]);

  const handleInputChange = (val: string) => {
    setInputVal(val);
    if (val.trim().length === 0) {
      setSuggestions([]);
      setSuggestionIndex(-1);
      return;
    }
    const lower = val.toLowerCase();
    const matches = COMMANDS.filter(c => c.cmd.startsWith(lower) && c.cmd !== lower);
    setSuggestions(matches);
    setSuggestionIndex(-1);
  };

  const acceptSuggestion = (cmd: string) => {
    setInputVal(cmd);
    setSuggestions([]);
    setSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab — accept top suggestion
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        const idx = suggestionIndex >= 0 ? suggestionIndex : 0;
        acceptSuggestion(suggestions[idx].cmd);
      }
      return;
    }

    // Arrow keys navigate suggestions when open, else command history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSuggestionIndex(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
      } else if (commandHistory.length > 0) {
        const next = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(next);
        setInputVal(commandHistory[commandHistory.length - 1 - next]);
        setSuggestions([]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSuggestionIndex(prev => (prev >= suggestions.length - 1 ? 0 : prev + 1));
      } else {
        if (historyIndex > 0) {
          const next = historyIndex - 1;
          setHistoryIndex(next);
          setInputVal(commandHistory[commandHistory.length - 1 - next]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
      return;
    }

    // Escape — dismiss suggestions
    if (e.key === "Escape") {
      setSuggestions([]);
      setSuggestionIndex(-1);
      return;
    }

    if (e.key === "Enter") {
      if (suggestions.length > 0 && suggestionIndex >= 0) {
        acceptSuggestion(suggestions[suggestionIndex].cmd);
        return;
      }
      setSuggestions([]);
      setSuggestionIndex(-1);
      executeCommand(inputVal);
      setInputVal("");
    }
  };

  if (isBooting) {
    return (
      <div className="text-[var(--claude-orange)] font-mono flex flex-col gap-2 text-sm">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          Initializing portfolio...
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Loading Chitti AI... <span className="text-foreground">████████████</span> 100%
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          Connecting to knowledge base... ✓
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <span className="text-foreground">Ready.</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 font-mono text-sm pb-32" onClick={() => inputRef.current?.focus()}>
      <WelcomeBox />

      {/* Committed history */}
      {history.map(item => (
        <div key={item.id} className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {item.command && (
            <div className="flex items-center gap-2 text-foreground">
              <span className="text-[var(--claude-orange)] font-bold text-lg">›</span>
              <span className={item.isAI ? "text-muted-foreground italic text-xs" : ""}>{item.command}</span>
            </div>
          )}
          {item.output && <div className="pl-6 mr-4 break-words">{item.output}</div>}
        </div>
      ))}

      {/* Live streaming response */}
      {streamingText !== null && (
        <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-[var(--claude-orange)] font-bold text-lg">›</span>
            <span className="text-muted-foreground italic text-xs">{streamingCmd}</span>
          </div>
          <div className="pl-6 mr-4">
            <ChittiResponse text={streamingText} remaining={remainingAI} streaming />
          </div>
        </div>
      )}

      {/* Pre-stream thinking dots */}
      {isAIThinking && streamingText === "" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 pl-6 text-[var(--claude-orange)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--claude-orange)] animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--claude-orange)] animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--claude-orange)] animate-bounce" style={{ animationDelay: "300ms" }} />
        </motion.div>
      )}

      {/* Autocomplete suggestions */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
          className="ml-6 mr-4 border border-border rounded bg-panel overflow-hidden"
        >
          {suggestions.slice(0, 6).map((s, i) => (
            <div
              key={s.cmd}
              onMouseDown={() => acceptSuggestion(s.cmd)}
              className={`flex items-center gap-3 px-3 py-1.5 cursor-pointer transition-colors text-xs ${
                i === suggestionIndex
                  ? "bg-[var(--claude-orange)] bg-opacity-10 border-l-2 border-[var(--claude-orange)]"
                  : "hover:bg-selection border-l-2 border-transparent"
              }`}
            >
              <span className={`font-mono font-medium ${i === suggestionIndex ? "text-[var(--claude-orange)]" : "text-foreground"}`}>
                {s.cmd}
              </span>
              <span className="text-muted-foreground text-[10px]">{s.hint}</span>
              {i === 0 && suggestionIndex < 0 && (
                <span className="ml-auto text-[9px] text-muted-foreground opacity-50 font-mono">tab</span>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 text-foreground">
        <span className="text-[var(--claude-orange)] font-bold text-lg">›</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none caret-[var(--claude-orange)] text-foreground placeholder:text-muted-foreground placeholder:text-xs"
          autoFocus
          autoComplete="off"
          spellCheck="false"
          disabled={isAIThinking}
          placeholder={isAIThinking ? "" : "type a command or ask me anything..."}
        />
      </div>

      {remainingAI !== null && remainingAI <= 5 && (
        <p className="text-[10px] text-muted-foreground pl-6">
          {remainingAI} AI message{remainingAI !== 1 ? "s" : ""} remaining · commands are unlimited
        </p>
      )}

      <div ref={bottomRef} className="h-4" />
    </div>
  );
}

// Extracted Chitti response component with markdown rendering
function ChittiResponse({ text, remaining, streaming }: { text: string; remaining: number | null; streaming?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[var(--claude-orange)] text-[10px] font-bold tracking-wider uppercase">Chitti</span>
        {remaining !== null && !streaming && (
          <span className="text-muted-foreground text-[9px]">({remaining} AI msgs left)</span>
        )}
        {streaming && (
          <span className="text-muted-foreground text-[9px] animate-pulse">streaming...</span>
        )}
      </div>
      <div className="border-l-2 border-[var(--claude-orange)] border-opacity-30 pl-3">
        <Markdown text={text} streaming={streaming} />
      </div>
    </div>
  );
}
