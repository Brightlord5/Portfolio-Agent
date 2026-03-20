"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BookOpen, FileText, ExternalLink } from "lucide-react";

const ports = [
  {
    port: "443",
    protocol: "HTTPS",
    service: "LinkedIn",
    status: "open",
    icon: <Linkedin className="w-4 h-4" />,
    description: "Professional network · 1,431 followers · 500+ connections",
    url: "https://www.linkedin.com/in/anas-shaik/",
    label: "Connect",
  },
  {
    port: "22",
    protocol: "SSH/Git",
    service: "GitHub",
    status: "open",
    icon: <Github className="w-4 h-4" />,
    description: "Source code, open-source projects · github.com/Brightlord5",
    url: "https://github.com/Brightlord5",
    label: "View repos",
  },
  {
    port: "25",
    protocol: "SMTP",
    service: "Email",
    status: "open",
    icon: <Mail className="w-4 h-4" />,
    description: "shaikanas0510@gmail.com · Response time: usually fast",
    url: "mailto:shaikanas0510@gmail.com",
    label: "Send email",
  },
  {
    port: "9000",
    protocol: "FILE",
    service: "Resume",
    status: "open",
    icon: <FileText className="w-4 h-4" />,
    description: "Shaik Anas — AI Engineer · PDF",
    url: "/resume.pdf",
    label: "Download",
    download: true,
  },
];

export function PortsPanel() {
  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
      <div className="text-muted-foreground text-xs mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
        {ports.length} ports open · all services listening
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[60px_80px_120px_1fr_100px] gap-3 text-[10px] text-muted-foreground uppercase tracking-widest mb-2 px-3">
        <span>Port</span>
        <span>Protocol</span>
        <span>Service</span>
        <span>Info</span>
        <span>Action</span>
      </div>

      <div className="space-y-2">
        {ports.map((port, i) => (
          <motion.div
            key={port.port}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="grid grid-cols-[60px_80px_120px_1fr_100px] gap-3 items-center p-3 border border-border rounded hover:border-[var(--claude-orange)] hover:border-opacity-60 transition-colors group"
          >
            <span className="text-[var(--claude-orange)] font-bold text-xs">{port.port}</span>
            <span className="text-muted-foreground text-xs">{port.protocol}</span>
            <div className="flex items-center gap-1.5 text-foreground text-xs">
              <span className="text-[var(--claude-orange)] group-hover:text-foreground transition-colors">{port.icon}</span>
              {port.service}
            </div>
            <span className="text-muted-foreground text-xs truncate">{port.description}</span>
            <a
              href={port.url}
              target={port.download ? undefined : "_blank"}
              rel="noreferrer"
              download={port.download}
              className="flex items-center gap-1 text-[10px] px-2 py-1 border border-[var(--claude-orange)] text-[var(--claude-orange)] rounded hover:bg-[var(--claude-orange)] hover:text-black transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-2.5 h-2.5" />
              {port.label}
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 border border-border rounded bg-panel text-xs text-muted-foreground">
        <p className="text-[var(--claude-orange)] mb-1">// want to collaborate?</p>
        <p>Anas is open to research collaborations and solving interesting problems.</p>
        <p className="mt-1">
          Reach out at{" "}
          <a href="mailto:shaikanas0510@gmail.com" className="text-[var(--claude-orange)] hover:underline">
            shaikanas0510@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
