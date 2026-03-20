"use client";

import { motion } from "framer-motion";
import { Download, CheckCircle2, Award, Briefcase, GraduationCap, FileText } from "lucide-react";

const outputLines = [
  { type: "header", text: "anas-shaik@deriv:~$ ./career --timeline" },
  { type: "info", text: "[2026] Judged Deriv x LabLab.ai Hackathon" },
  { type: "success", text: "[2025] AI Engineer @ Deriv — Full-time (Aug 2025–Present)" },
  { type: "success", text: "[2025] AI Engineer @ Dalil AI — 60% token reduction, 70% latency cut" },
  { type: "success", text: "[2025] Graduated — B.E. Computer Science, BITS Pilani Dubai" },
  { type: "info", text: "[2024] Published patent on Nanoparticles + AI for Agriculture" },
  { type: "success", text: "[2024] Data Science & LLMOps Intern @ Foulath Holding, Bahrain" },
  { type: "info", text: "[2024] Technical Head, Microsoft Tech Club" },
  { type: "info", text: "[2024] Teaching Assistant — Database Systems, BITS" },
  { type: "success", text: "[2023] 2nd Place — MTC ESL Gen AI Summit (2000 AED)" },
  { type: "success", text: "[2023] Operations Research Intern @ Emirates" },
  { type: "info", text: "[2023] Deep Learning Specialization — Andrew Ng / DeepLearning.AI" },
  { type: "info", text: "[2023] Robotics Club (IFOR) Software Team" },
  { type: "info", text: "[2022] Data Science Intern @ Cognerium" },
  { type: "success", text: "[2022] Academic Excellence Award — First Rank, 9.95 CGPA" },
  { type: "info", text: "[2021] Enrolled — BITS Pilani Dubai, Computer Engineering" },
  { type: "info", text: "[2021] Outstanding Delegate, UNHCR Committee — IMUN 69.0" },
  { type: "info", text: "[2019] Best Project — CBSE Science Exhibition (Regional Level)" },
  { type: "header", text: "" },
  { type: "header", text: "Exit code: 0  |  Build successful ✓" },
];

const colorMap: Record<string, string> = {
  header: "text-muted-foreground",
  info: "text-[var(--claude-orange)]",
  success: "text-green-400",
  error: "text-red-400",
};

export function OutputPanel() {
  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-xs flex flex-col gap-4">
      {/* Resume download */}
      <div className="flex items-center justify-between p-3 border border-border rounded bg-panel">
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-[var(--claude-orange)]" />
          <div>
            <p className="text-foreground text-sm font-medium">Shaik Anas — Resume</p>
            <p className="text-muted-foreground text-xs">PDF · Last updated 2025</p>
          </div>
        </div>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--claude-orange)] text-black text-xs font-medium rounded hover:opacity-90 transition-opacity"
        >
          <Download className="w-3 h-3" />
          Download
        </a>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <Briefcase className="w-4 h-4" />, label: "Companies", value: "5+" },
          { icon: <Award className="w-4 h-4" />, label: "Awards", value: "4+" },
          { icon: <GraduationCap className="w-4 h-4" />, label: "CGPA", value: "9.7" },
        ].map((stat) => (
          <div key={stat.label} className="p-3 border border-border rounded flex flex-col items-center gap-1 bg-panel">
            <span className="text-[var(--claude-orange)]">{stat.icon}</span>
            <span className="text-foreground font-bold text-lg">{stat.value}</span>
            <span className="text-muted-foreground text-[10px]">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Career timeline output */}
      <div className="border border-border rounded p-3 bg-background space-y-0.5">
        {outputLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className={`${colorMap[line.type] || "text-foreground"} leading-relaxed`}
          >
            {line.text || "\u00A0"}
          </motion.p>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <p className="text-[var(--claude-orange)] text-xs font-bold mb-2 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Certifications
        </p>
        <div className="grid grid-cols-1 gap-1">
          {[
            "Generative AI with LLMs — AWS (2024)",
            "Deep Learning Specialization — DeepLearning.AI (2023)",
            "Sequence Models — DeepLearning.AI (2023)",
            "Convolutional Neural Networks — DeepLearning.AI (2023)",
            "Data Visualizations with Plotly — LinkedIn (2023)",
            "MySQL Advanced Topics — LinkedIn (2023)",
            "AI for Everyone — DeepLearning.AI (2021)",
            "Introduction to IoT — Cisco (2021)",
          ].map((cert) => (
            <p key={cert} className="text-muted-foreground text-[11px]">
              · {cert}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
