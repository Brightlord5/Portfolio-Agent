"use client";

import { motion } from "framer-motion";

const skills = [
    { category: "AI & ML", items: ["Generative AI", "Agentic AI", "LangChain", "LangGraph", "LLMs", "Deep Learning", "Computer Vision", "NLP"] },
    { category: "Languages", items: ["Python", "TypeScript", "JavaScript", "C/C++", "SQL"] },
    { category: "AI Tools", items: ["OpenAI SDK", "Whisper", "HuggingFace", "ChromaDB", "BERT", "MCP", "LangSmith"] },
    { category: "Cloud & DevOps", items: ["AWS", "GCP", "Docker", "GitHub Actions", "Automation Anywhere"] },
    { category: "Data & Frameworks", items: ["Pandas", "XGBoost", "Meta Prophet", "PowerBI", "Snowflake", "Plotly", "Streamlit", "FastAPI", "Next.js"] },
];

export function SkillsCommand() {
    return (
        <div className="py-2">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-foreground mb-4"
            >
                Technical Aptitude Matrix
                <div className="text-muted-foreground text-xs mt-1">Found {skills.length} primary clusters:</div>
            </motion.div>

            <div className="space-y-6 pl-2 border-l border-border">
                {skills.map((skillGroup, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -left-[13px] top-1.5 w-2 h-2 bg-[var(--claude-orange)] rounded-full" />
                        <div className="text-[var(--claude-orange)] font-bold uppercase tracking-wider text-xs mb-2">
                            {skillGroup.category}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.items.map((skill, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: (idx * 0.2) + (i * 0.1) }}
                                    className="px-2 py-1 bg-selection text-foreground rounded text-xs border border-border hover:border-[var(--claude-orange)] transition-colors cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
