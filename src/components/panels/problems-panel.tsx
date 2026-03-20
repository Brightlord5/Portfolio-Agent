"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";

const problems = [
  {
    severity: "solved",
    title: "How do you detect malicious activity at scale in real-time?",
    detail: "→ Built an AI-powered SOC at Deriv with multi-agent orchestration. Agents monitor, classify, and remediate threats autonomously.",
    tags: ["Agentic AI", "Security", "LangGraph"],
  },
  {
    severity: "solved",
    title: "How do you reduce LLM token costs by 60% without sacrificing quality?",
    detail: "→ Redesigned the Agentic AI architecture at Dalil AI — smarter context management, tool routing, and response caching.",
    tags: ["LLM Optimization", "OpenAI SDK", "Agentic AI"],
  },
  {
    severity: "solved",
    title: "How do you make satellite data accessible to non-experts?",
    detail: "→ Co-authored a 9-min read on Sentinel-2 satellite data — from scratch, for everyone. Read on Medium.",
    tags: ["Research", "ML", "Data Science"],
  },
  {
    severity: "solved",
    title: "How do you forecast CO₂ emissions for a steel plant and make it actionable?",
    detail: "→ Fine-tuned Meta Prophet for time-series forecasting + LLM layer for natural language insights. Deployed on AWS.",
    tags: ["Time Series", "LLM", "AWS"],
  },
  {
    severity: "solved",
    title: "How do you catch prompt injection before it ships to production?",
    detail: "→ Built PromptSentry — an open-source Git pre-commit hook using AST parsing + LM-as-judge. OWASP LLM Top 10 compliant.",
    tags: ["AI Security", "Open Source", "OWASP"],
  },
  {
    severity: "solved",
    title: "Can AI enhance accessibility for the Deaf community in the UAE?",
    detail: "→ Built an Emirati Sign Language translator using LangChain, OpenAI, Whisper, and ChromaDB. Won 2000 AED at Gen AI Summit.",
    tags: ["LangChain", "Whisper", "Accessibility"],
  },
  {
    severity: "warning",
    title: "What's next?",
    detail: "→ Exploring multi-modal agents, autonomous red-teaming systems, and real-time AI pipelines at scale.",
    tags: ["In Progress", "Research"],
  },
];

export function ProblemsPanel() {
  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
        <CheckCircle2 className="w-3 h-3 text-green-400" />
        <span>{problems.filter(p => p.severity === "solved").length} solved</span>
        <span className="mx-2">·</span>
        <Lightbulb className="w-3 h-3 text-yellow-400" />
        <span>{problems.filter(p => p.severity === "warning").length} in progress</span>
      </div>

      <div className="space-y-2">
        {problems.map((problem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3 p-3 border border-border rounded hover:border-[var(--claude-orange)] hover:border-opacity-50 transition-colors group cursor-default"
          >
            <div className="mt-0.5 shrink-0">
              {problem.severity === "solved" ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-medium text-xs group-hover:text-[var(--claude-orange)] transition-colors">
                {problem.title}
              </p>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{problem.detail}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {problem.tags.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-selection rounded text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
