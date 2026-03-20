"use client";

import React from "react";
import { AboutCommand } from "@/components/commands/about";
import { SkillsCommand } from "@/components/commands/skills";
import { ProjectsCommand } from "@/components/commands/projects";
import { portfolioData } from "@/data/portfolio";

export async function parseCommand(cmd: string): Promise<React.ReactNode> {
  const normalized = cmd.toLowerCase().trim();

  await new Promise((resolve) => setTimeout(resolve, 200));

  if (normalized.startsWith("sudo")) {
    return (
      <div className="space-y-2">
        <p className="text-red-400 font-bold">Error: Anas is not in the sudoers file. This incident will be reported.</p>
        <p className="text-muted-foreground text-xs">But seriously — if you want to hire him, just type <span className="text-[var(--claude-orange)]">contact</span>.</p>
      </div>
    );
  }

  switch (normalized) {
    case "help":
      return (
        <div className="my-1 space-y-3 text-sm">
          <p className="text-muted-foreground text-xs">Available commands — or just type naturally and Chitti AI will answer.</p>
          <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1.5">
            <span className="text-[var(--claude-orange)]">about</span>
            <span className="text-muted-foreground">Who Anas is and what drives him</span>

            <span className="text-[var(--claude-orange)]">experience</span>
            <span className="text-muted-foreground">Full work experience — Deriv, Dalil AI, Emirates...</span>

            <span className="text-[var(--claude-orange)]">projects</span>
            <span className="text-muted-foreground">Key projects and what they solved</span>

            <span className="text-[var(--claude-orange)]">skills</span>
            <span className="text-muted-foreground">Tech stack and capabilities</span>

            <span className="text-[var(--claude-orange)]">achievements</span>
            <span className="text-muted-foreground">Awards, patent, hackathons</span>

            <span className="text-[var(--claude-orange)]">education</span>
            <span className="text-muted-foreground">BITS Pilani Dubai — 9.7 CGPA</span>

            <span className="text-[var(--claude-orange)]">certifications</span>
            <span className="text-muted-foreground">AWS, DeepLearning.AI, Cisco...</span>

            <span className="text-[var(--claude-orange)]">contact</span>
            <span className="text-muted-foreground">Get in touch with Anas</span>

            <span className="text-[var(--claude-orange)]">patent</span>
            <span className="text-muted-foreground">Published patent on AI + Agriculture</span>

            <span className="text-[var(--claude-orange)]">/non-tech</span>
            <span className="text-muted-foreground">Switch to standard portfolio UI</span>

            <span className="text-[var(--claude-orange)]">clear</span>
            <span className="text-muted-foreground">Clear terminal output</span>
          </div>
          <p className="text-muted-foreground text-xs mt-2">
            <span className="text-[var(--claude-orange)]">Tip:</span> Type anything naturally — &quot;what has Anas worked on at Deriv?&quot; — and Chitti will answer.
          </p>
        </div>
      );

    case "about":
      return <AboutCommand />;

    case "skills":
      return <SkillsCommand />;

    case "projects":
      return <ProjectsCommand />;

    case "experience": {
      const p = portfolioData;
      return (
        <div className="space-y-4 text-sm">
          {p.experience.map((exp) => (
            <div key={exp.company + exp.period} className="border border-border rounded p-3 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-foreground font-semibold">{exp.role}</span>
                  <span className="text-muted-foreground"> @ </span>
                  <span className="text-[var(--claude-orange)]">{exp.company}</span>
                  <span className="text-muted-foreground"> · {exp.type}</span>
                </div>
                <span className="text-muted-foreground text-xs whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-muted-foreground text-xs">{exp.location}</p>
              <ul className="space-y-1">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="text-muted-foreground text-xs flex gap-2">
                    <span className="text-[var(--claude-orange)] shrink-0">·</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    case "education": {
      const p = portfolioData;
      return (
        <div className="space-y-3 text-sm">
          {p.education.map((edu) => (
            <div key={edu.institution} className="border border-border rounded p-3 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[var(--claude-orange)] font-semibold">{edu.institution}</span>
                <span className="text-muted-foreground text-xs whitespace-nowrap">{edu.period}</span>
              </div>
              <p className="text-foreground text-xs">{edu.degree}</p>
              <p className="text-green-400 text-xs">{edu.grade}</p>
              {edu.activities && (
                <p className="text-muted-foreground text-xs">Activities: {edu.activities.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    case "achievements": {
      const p = portfolioData;
      return (
        <div className="space-y-2 text-sm">
          {p.achievements.map((a) => (
            <div key={a.title} className="flex gap-3 border border-border rounded p-2.5">
              <span className="text-[var(--claude-orange)] text-lg shrink-0">★</span>
              <div>
                <p className="text-foreground font-medium text-xs">{a.title}</p>
                <p className="text-muted-foreground text-xs">{a.org} · {a.year}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case "patent": {
      const p = portfolioData.patent;
      return (
        <div className="border border-[var(--claude-orange)] border-opacity-40 rounded p-4 space-y-2 text-sm">
          <p className="text-[var(--claude-orange)] font-bold text-xs uppercase tracking-wide">Patent</p>
          <p className="text-foreground font-semibold">{p.title}</p>
          <p className="text-muted-foreground text-xs">Application No: {p.number} · Issued {p.issued}</p>
          <p className="text-muted-foreground text-xs">Co-authors: {p.coAuthors.join(", ")}</p>
          <p className="text-foreground text-xs mt-2">{p.detail}</p>
        </div>
      );
    }

    case "certifications": {
      const certs = portfolioData.certifications;
      return (
        <div className="space-y-1 text-sm">
          {certs.map((c) => (
            <div key={c.name} className="flex items-center justify-between py-1 border-b border-border last:border-0">
              <div>
                <span className="text-foreground text-xs">{c.name}</span>
                <span className="text-muted-foreground text-xs"> — {c.org}</span>
              </div>
              <span className="text-[var(--claude-orange)] text-xs">{c.year}</span>
            </div>
          ))}
        </div>
      );
    }

    case "contact":
      return (
        <div className="py-1 space-y-2 text-sm">
          <p className="text-foreground">Reach out — Anas is open to interesting conversations.</p>
          <div className="grid grid-cols-[90px_1fr] gap-2">
            <span className="text-[var(--claude-orange)]">Email</span>
            <a href="mailto:shaikanas0510@gmail.com" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">
              shaikanas0510@gmail.com
            </a>
            <span className="text-[var(--claude-orange)]">LinkedIn</span>
            <a href="https://www.linkedin.com/in/anas-shaik/" target="_blank" rel="noreferrer" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">
              linkedin.com/in/anas-shaik
            </a>
            <span className="text-[var(--claude-orange)]">GitHub</span>
            <a href="https://github.com/Brightlord5" target="_blank" rel="noreferrer" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">
              github.com/Brightlord5
            </a>
          </div>
        </div>
      );

    // Easter eggs
    case "vim":
    case "vi":
      return (
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">Opening vim...</p>
          <p className="text-muted-foreground">.</p>
          <p className="text-muted-foreground">.</p>
          <p className="text-red-400">Error: Unable to quit vim. (This is a known bug since 1976.)</p>
          <p className="text-muted-foreground text-xs">Type <span className="text-[var(--claude-orange)]">help</span> to escape.</p>
        </div>
      );

    case "ls":
    case "ls -la":
      return (
        <div className="font-mono text-muted-foreground text-xs whitespace-pre">
          {`drwxr-xr-x  anas  staff  about.txt
drwxr-xr-x  anas  staff  projects/
drwxr-xr-x  anas  staff  experience/
-rw-r--r--  anas  staff  patent.pdf
-rw-r--r--  anas  staff  secret_keys.pem
-rw-r--r--  anas  staff  .chitti_config
-rw-r--r--  anas  staff  life.js`}
        </div>
      );

    case "cat secret_keys.pem":
    case "cat ./secret_keys.pem":
      return <div className="text-red-500">Access Denied. Nice try. Chitti has logged this incident. 👁️</div>;

    case "git log --oneline":
      return (
        <div className="font-mono text-xs text-muted-foreground space-y-0.5">
          <p><span className="text-[var(--claude-orange)]">f9a2c1</span> feat: judge Deriv x LabLab.ai hackathon</p>
          <p><span className="text-[var(--claude-orange)]">a3f2c1</span> feat: ship AI-powered SOC @ Deriv (saves hours daily)</p>
          <p><span className="text-[var(--claude-orange)]">9b1d4e</span> feat: AI threat intelligence platform live</p>
          <p><span className="text-[var(--claude-orange)]">7c3a2f</span> release: PromptSentry v0.1.7 — OWASP LLM Top 10</p>
          <p><span className="text-[var(--claude-orange)]">5e8b1d</span> feat: ship CareerPath.AI with LangGraph multi-agents</p>
          <p><span className="text-[var(--claude-orange)]">2f4c9a</span> feat: graduate BITS Pilani, CGPA 9.7</p>
          <p><span className="text-[var(--claude-orange)]">1c8b3d</span> feat: Head of Stage Management, Jashn 2025 (5000+ ppl)</p>
          <p><span className="text-[var(--claude-orange)]">e2a9f1</span> chore: eat more chocolate, watch more Telugu films</p>
          <p><span className="text-[var(--claude-orange)]">b4c2d8</span> feat: win 2000 AED at Gen AI hackathon</p>
          <p><span className="text-[var(--claude-orange)]">0a1b2c</span> feat: first rank BITS Pilani first year (9.95 CGPA)</p>
          <p><span className="text-[var(--claude-orange)]">dead42</span> init: born, curious about everything</p>
        </div>
      );

    case "ping anas.dev":
      return (
        <div className="font-mono text-xs space-y-0.5">
          <p className="text-muted-foreground">PING anas.dev (shaikanas0510@gmail.com)</p>
          <p className="text-green-400">64 bytes from anas.dev: icmp_seq=1 ttl=64 time=0.3ms</p>
          <p className="text-green-400">64 bytes from anas.dev: icmp_seq=2 ttl=64 time=0.2ms</p>
          <p className="text-[var(--claude-orange)]">--- anas.dev ping statistics ---</p>
          <p className="text-muted-foreground">2 packets transmitted, 2 received, 0% packet loss</p>
          <p className="text-muted-foreground">Anas is online and responsive. 🟢</p>
        </div>
      );

    case "whoami":
      return (
        <div className="text-sm">
          <p className="text-[var(--claude-orange)]">anas@deriv</p>
          <p className="text-muted-foreground text-xs mt-1">AI Engineer · Dubai, UAE · BITS Pilani 2025</p>
        </div>
      );

    case "pwd":
      return <p className="text-muted-foreground text-xs">/Users/anas/Desktop/career</p>;

    case "chitti":
      return (
        <div className="text-sm space-y-1">
          <p className="text-[var(--claude-orange)] font-bold">Hi! I&apos;m Chitti 🤖</p>
          <p className="text-muted-foreground">Anas&apos;s AI assistant, powered by groq/compound.</p>
          <p className="text-muted-foreground text-xs">Just type naturally — ask me anything about Anas!</p>
        </div>
      );

    case "easter":
      return (
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="text-[var(--claude-orange)]">// discovered easter eggs:</p>
          <p>· vim — cannot exit (classic)</p>
          <p>· git log --oneline — Anas&apos;s life commits</p>
          <p>· ls -la — hidden files</p>
          <p>· cat secret_keys.pem — nice try</p>
          <p>· ping anas.dev — latency check</p>
          <p>· sudo hire me — send it</p>
          <p>· whoami / pwd — you know</p>
        </div>
      );

    case "sudo hire me":
    case "sudo hire-me":
      return (
        <div className="space-y-2 text-sm">
          <p className="text-green-400 font-bold">[sudo] password for recruiter: ****</p>
          <p className="text-green-400">Authentication successful.</p>
          <p className="text-foreground mt-2">Executing: hire anas --role=&quot;AI Engineer&quot; --start=&quot;ASAP&quot;</p>
          <p className="text-[var(--claude-orange)]">→ Strong case detected. CGPA 9.7, AI SOC at Deriv, patent, 5+ companies.</p>
          <p className="text-muted-foreground text-xs">Reach out: <a href="mailto:shaikanas0510@gmail.com" className="text-[var(--claude-orange)] hover:underline">shaikanas0510@gmail.com</a></p>
        </div>
      );

    default:
      return (
        <div className="text-sm space-y-1">
          <p className="text-red-400">
            Command not found: <span className="font-bold">{cmd}</span>
          </p>
          <p className="text-muted-foreground text-xs">
            Type <span className="text-[var(--claude-orange)]">help</span> for commands, or ask Chitti anything naturally.
          </p>
        </div>
      );
  }
}
