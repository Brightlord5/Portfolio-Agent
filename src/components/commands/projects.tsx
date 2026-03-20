"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Lock } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function ProjectsCommand() {
    const projects = portfolioData.projects;

    return (
        <div className="py-2">
            <p className="text-muted-foreground mb-4">
                Fetching repositories...{" "}
                <span className="text-[var(--claude-orange)]">Done.</span>{" "}
                {projects.length} projects found.
            </p>

            <div className="grid gap-3 md:grid-cols-2 max-w-4xl">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="p-3 border border-border rounded bg-panel hover:border-[var(--claude-orange)] transition-colors group flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-[var(--claude-orange)] font-bold text-sm group-hover:underline underline-offset-4 decoration-dashed leading-snug flex-1 mr-2">
                                {project.name}
                                {"featured" in project && project.featured && (
                                    <span className="ml-2 text-[9px] text-black bg-[var(--claude-orange)] px-1 py-0.5 rounded font-bold uppercase tracking-wider align-middle">
                                        featured
                                    </span>
                                )}
                            </h3>
                            <div className="flex gap-1.5 text-muted shrink-0">
                                {project.link ? (
                                    <>
                                        <a href={project.link} target="_blank" rel="noreferrer">
                                            <Github className="w-3.5 h-3.5 hover:text-foreground cursor-pointer" />
                                        </a>
                                        <a href={project.link} target="_blank" rel="noreferrer">
                                            <ExternalLink className="w-3.5 h-3.5 hover:text-foreground cursor-pointer" />
                                        </a>
                                    </>
                                ) : (
                                    <Lock className="w-3.5 h-3.5 opacity-40" />
                                )}
                            </div>
                        </div>

                        <p className="text-[10px] text-muted-foreground mb-1.5">
                            {project.company} · {project.period}
                        </p>
                        <p className="text-foreground text-xs flex-1 mb-2 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 text-[9px] uppercase tracking-wider text-muted-foreground">
                            {project.tags.map((t, idx) => (
                                <span key={idx} className="bg-background px-1.5 py-0.5 rounded">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
