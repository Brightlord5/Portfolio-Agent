"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const debugScript = [
  { delay: 0, level: "LOG", text: "Initializing anas.js runtime..." },
  { delay: 400, level: "LOG", text: 'Loading module: "curiosity"... ✓' },
  { delay: 700, level: "LOG", text: 'Loading module: "deep-learning"... ✓' },
  { delay: 1000, level: "LOG", text: 'Loading module: "agentic-ai"... ✓' },
  { delay: 1300, level: "WARN", text: 'sleep() deprecated in anas.js — use "build_things()" instead' },
  { delay: 1700, level: "LOG", text: "Running diagnostics on life.js..." },
  { delay: 2100, level: "LOG", text: "  ✓ ambition: HIGH" },
  { delay: 2300, level: "LOG", text: "  ✓ chocolate_dependency: true (non-negotiable)" },
  { delay: 2500, level: "LOG", text: "  ✓ cinema_mode: Telugu >> everything else" },
  { delay: 2700, level: "LOG", text: "  ✓ screenplay_buffer: 3 scripts in progress" },
  { delay: 2900, level: "LOG", text: "  ✓ github_commits: within normal range" },
  { delay: 3100, level: "ERROR", text: '  ✗ free_time: undefined (known issue, filed as bug #404)' },
  { delay: 3500, level: "LOG", text: "Checking skill tree..." },
  { delay: 3800, level: "LOG", text: "  AI and LLMs: ██████████ 100%" },
  { delay: 4000, level: "LOG", text: "  ML and DL: ████████░░ 90%" },
  { delay: 4100, level: "LOG", text: "  Cinema knowledge: ██████████ 100%" },
  { delay: 4200, level: "LOG", text: "  Screenplay buffer: ████░░░░░░ 3 scripts WIP" },
  { delay: 4300, level: "LOG", text: "  Chocolate intake: ██████████ critical levels" },
  { delay: 4400, level: "LOG", text: "  Sleep schedule: ███░░░░░░░ 28%" },
  { delay: 4500, level: "WARN", text: "Memory leak detected in procrastination.ts — auto-patched" },
  { delay: 4900, level: "LOG", text: "Deploying personality to production..." },
  { delay: 5300, level: "LOG", text: "  Port 3000: listening (portfolio)" },
  { delay: 5600, level: "LOG", text: "  Port 8080: listening (ambitions)" },
  { delay: 5900, level: "LOG", text: "  Port 9000: listening (ideas)" },
  { delay: 6200, level: "LOG", text: "All systems nominal. Anas is online. 🚀" },
];

const levelColors: Record<string, string> = {
  LOG: "text-muted-foreground",
  WARN: "text-yellow-400",
  ERROR: "text-red-400",
  INFO: "text-[var(--claude-orange)]",
};

const levelLabel: Record<string, string> = {
  LOG: "LOG",
  WARN: "WRN",
  ERROR: "ERR",
  INFO: "INF",
};

export function DebugPanel() {
  const [visibleLines, setVisibleLines] = useState<typeof debugScript>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    debugScript.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
      timers.push(t);
    });
    const doneTimer = setTimeout(() => setDone(true), debugScript[debugScript.length - 1].delay + 300);
    timers.push(doneTimer);
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-xs flex flex-col gap-2">
      <div className="text-muted-foreground text-[10px] mb-2 border-b border-border pb-2">
        DEBUG CONSOLE · anas.js · runtime v{new Date().getFullYear()}.{new Date().getMonth() + 1}
      </div>

      <AnimatePresence>
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex gap-3 items-start"
          >
            <span className={`shrink-0 font-bold text-[10px] w-7 ${levelColors[line.level]}`}>
              {levelLabel[line.level]}
            </span>
            <span className={levelColors[line.level]}>{line.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-[var(--claude-orange)] text-[11px] mb-3">// Easter eggs — try these in the Terminal tab:</p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {[
              ["sudo hire me", "Sends a compelling argument"],
              ["vim", "You know what happens"],
              ["ls -la", "Reveals hidden files"],
              ["git log --oneline", "Anas's life commits"],
              ["cat secret_keys.pem", "Nice try"],
              ["ping anas.dev", "Checking latency..."],
            ].map(([cmd, desc]) => (
              <div key={cmd} className="flex gap-2">
                <span className="text-[var(--claude-orange)] shrink-0">&gt; {cmd}</span>
                <span className="text-muted-foreground"># {desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
