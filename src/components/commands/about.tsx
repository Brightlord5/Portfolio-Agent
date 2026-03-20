"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function AboutCommand() {
    const p = portfolioData;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-1 space-y-3 text-sm">
            <div className="border border-border rounded p-3 space-y-1">
                <p className="text-[var(--claude-orange)] font-bold text-base">{p.name}</p>
                <p className="text-foreground text-xs">{p.tagline}</p>
                <p className="text-muted-foreground text-xs">{p.location}</p>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">{p.about}</p>
            <div className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-1.5 text-xs border-t border-border pt-2">
                <span className="text-[var(--claude-orange)]">Currently</span>
                <span className="text-foreground">AI Engineer @ Deriv · Full-time · Dubai, UAE</span>
                <span className="text-[var(--claude-orange)]">Education</span>
                <span className="text-foreground">B.E. Computer Science, BITS Pilani Dubai · CGPA 9.7/10 · First Rank (1st year)</span>
                <span className="text-[var(--claude-orange)]">Focus</span>
                <span className="text-foreground">Generative AI · Agentic AI · LLMs · Security AI</span>
                <span className="text-[var(--claude-orange)]">Patent</span>
                <span className="text-foreground">Nanoparticles + AI for Agricultural Water Management (2024)</span>
            </div>
            <p className="text-muted-foreground text-xs">
                Type <span className="text-[var(--claude-orange)]">experience</span>, <span className="text-[var(--claude-orange)]">projects</span>, or <span className="text-[var(--claude-orange)]">achievements</span> for more detail.
            </p>
        </motion.div>
    );
}
