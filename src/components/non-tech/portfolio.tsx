"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Github, Linkedin, Mail, Award, Briefcase, GraduationCap,
  Code2, ExternalLink, Terminal, FileText, Cpu,
  Star, BookOpen, Users, ChevronRight, Zap, Lock,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const PHOTOS = [
  { src: "/photos/esl-award.jpeg",           rotate: "2.5deg",  label: "ESL Award",    center: false },
  { src: "/photos/another-award.jpeg",       rotate: "-2.5deg", label: "Award",        center: false },
  { src: "/photos/emirates-internship.jpeg", rotate: "-1.5deg", label: "Emirates",     center: false },
  { src: "/photos/jashn-award.jpeg",         rotate: "0deg",    label: "Jashn 2025",   center: true  }, // center
  { src: "/photos/dalil-internship.jpeg",    rotate: "3deg",    label: "Dalil AI",     center: false },
  { src: "/photos/foulath-internship.jpeg",  rotate: "-2deg",   label: "Foulath",      center: false },
  { src: "/photos/volunteering.jpeg",        rotate: "1.5deg",  label: "Volunteering", center: false },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function useCounter(target: number, inView: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return val;
}

function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function SectionHeader({ icon, title, sub }: { icon: React.ReactNode; title: string; sub?: string }) {
  return (
    <FadeUp className="mb-10">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-[var(--claude-orange)] bg-opacity-10 flex items-center justify-center text-[var(--claude-orange)]">
          {icon}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--claude-orange)] to-transparent opacity-20" />
      </div>
      {sub && <p className="text-gray-600 text-xs font-mono ml-11">{sub}</p>}
    </FadeUp>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 bg-[#111116] border border-[#222230] text-gray-500 text-[10px] rounded font-mono">
      {label}
    </span>
  );
}

// Animated stat card
function StatCard({ icon, value, suffix = "", label, delay }: { icon: React.ReactNode; value: number; suffix?: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, inView);
  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.45, delay, ease: "easeOut" } } }}
      className="p-5 border border-[#1c1c28] rounded-2xl bg-[#0d0d12] text-center hover:border-[var(--claude-orange)] transition-colors group cursor-default"
    >
      <div className="text-[var(--claude-orange)] flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl font-bold text-white tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-gray-600 text-xs mt-1 font-mono">{label}</div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function NonTechPortfolio() {
  const p = portfolioData;
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const collageOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const collageY = useTransform(scrollYProgress, [0, 0.22], [0, -40]);

  const tagline = useTypewriter("AI Engineer · Builder · Cinema Fan", 45);

  return (
    <div className="min-h-screen bg-[#09090c] text-white font-sans">

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[var(--claude-orange)] z-[60] origin-left"
        style={{ width: progressWidth }}
      />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e5a44f 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--claude-orange)] opacity-[0.035] blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-orange-700 opacity-[0.02] blur-[100px] rounded-full" />
      </div>

      {/* Top banner */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 py-2 px-3 bg-[var(--claude-orange)] text-black text-xs font-medium">
        <Terminal className="w-3 h-3" />
        Standard View
        <button
          onClick={() => router.push('/')}
          className="px-2 py-0.5 bg-black text-[var(--claude-orange)] rounded text-xs hover:opacity-80 transition-opacity font-mono"
        >
          ← Terminal mode
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-28 relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 flex flex-col items-center text-center">

          {/* Photo collage — fades out on scroll */}
          <motion.div
            style={{ opacity: collageOpacity, y: collageY }}
            className="w-full mb-10 relative h-52 sm:h-64"
          >
            {/* Gradient fades at edges */}
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #09090c 0%, transparent 15%, transparent 85%, #09090c 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, #09090c)" }} />

            {/* Photos row */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 px-2">
              {PHOTOS.map((photo, i) => {
                const isCenter = photo.center;
                return (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, y: isCenter ? 30 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
                  className={`relative shrink-0 overflow-hidden shadow-2xl border ${isCenter ? "rounded-2xl border-[var(--claude-orange)] border-opacity-50 z-10 ring-2 ring-[var(--claude-orange)] ring-opacity-20" : "rounded-xl border-white/10"}`}
                  style={{
                    width: isCenter ? 140 : 95,
                    height: isCenter ? 185 : 125,
                    rotate: photo.rotate,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                  {!isCenter && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />}
                </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-[var(--claude-orange)] font-mono text-xs tracking-[0.3em] uppercase mb-3 h-4">
              {tagline}<span className="animate-pulse">_</span>
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold mb-5 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Shaik Anas
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">{p.about}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-8 flex-wrap"
          >
            <a href={p.linkedin} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-[#222230] rounded-xl hover:border-[var(--claude-orange)] hover:text-white transition-all text-sm text-gray-400 group bg-[#0d0d12]">
              <Linkedin className="w-4 h-4 group-hover:text-[var(--claude-orange)] transition-colors" /> LinkedIn
            </a>
            <a href={p.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-[#222230] rounded-xl hover:border-[var(--claude-orange)] hover:text-white transition-all text-sm text-gray-400 group bg-[#0d0d12]">
              <Github className="w-4 h-4 group-hover:text-[var(--claude-orange)] transition-colors" /> GitHub
            </a>
            <a href={`mailto:${p.email}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--claude-orange)] text-black rounded-xl hover:opacity-90 transition-opacity text-sm font-semibold shadow-lg shadow-orange-900/30">
              <Mail className="w-4 h-4" /> Get in touch
            </a>
          </motion.div>
        </section>

        {/* ── STATS ──────────────────────────────────────────────────────────── */}
        <Section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16 sm:mb-24">
          <StatCard icon={<Briefcase className="w-5 h-5" />} value={5} suffix="+" label="Companies" delay={0} />
          <StatCard icon={<Code2 className="w-5 h-5" />} value={p.projects.length} label="Projects" delay={0.08} />
          <StatCard icon={<Award className="w-5 h-5" />} value={4} suffix="+" label="Awards" delay={0.16} />
          <StatCard icon={<GraduationCap className="w-5 h-5" />} value={9} suffix=".7" label="CGPA (÷10)" delay={0.04} />
        </Section>

        {/* ── EXPERIENCE ──────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<Briefcase className="w-4 h-4" />} title="Experience" sub="// full work history" />
          </Section>
          <div className="relative pl-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--claude-orange)] via-[#2a1f0f] to-transparent" />
            <div className="space-y-5">
              {p.experience.map((exp, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-80px" });
                return (
                  <motion.div
                    key={exp.company + exp.period}
                    ref={ref}
                    initial={{ opacity: 0, x: -32 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: i * 0.05 + 0.1 }}
                      className="absolute -left-8 top-4 w-3.5 h-3.5 rounded-full border-2 border-[var(--claude-orange)] bg-[#09090c]"
                    />
                    <div className="p-5 border border-[#1c1c28] rounded-2xl bg-[#0d0d12] hover:border-[#2a2a3a] transition-all hover:-translate-y-0.5 group">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-1">
                        <div>
                          <p className="font-semibold text-white text-base">{exp.role}</p>
                          <p className="text-[var(--claude-orange)] text-sm mt-0.5 flex flex-wrap gap-x-1 items-center">
                            {exp.company}
                            <span className="text-gray-700">·</span>
                            <span className="text-gray-500 text-xs">{exp.type}</span>
                            <span className="text-gray-700">·</span>
                            <span className="text-gray-500 text-xs">{exp.location}</span>
                          </p>
                        </div>
                        <span className="text-gray-600 text-xs font-mono px-2 py-1 bg-[#111116] rounded border border-[#1c1c28] self-start">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((h, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -12 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.05 + j * 0.04 + 0.15 }}
                            className="flex gap-2 text-sm text-gray-400 leading-relaxed"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-[var(--claude-orange)] shrink-0 mt-0.5" />
                            {h}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((s) => <Tag key={s} label={s} />)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<Code2 className="w-4 h-4" />} title="Projects" sub={`// ${p.projects.length} total`} />
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.projects.map((proj, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              const isFeatured = "featured" in proj && proj.featured;
              return (
                <motion.div
                  key={proj.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.1, ease: "easeOut" }}
                  className={`h-full p-5 border rounded-2xl bg-[#0d0d12] flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg group ${
                    isFeatured
                      ? "border-[var(--claude-orange)] border-opacity-30 hover:shadow-orange-900/20"
                      : "border-[#1c1c28] hover:border-[#2a2a3a]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 mr-3">
                      <p className="font-semibold text-sm text-white leading-snug">{proj.name}</p>
                      {isFeatured && (
                        <span className="inline-block mt-1.5 px-1.5 py-0.5 bg-[var(--claude-orange)] text-black text-[9px] font-bold uppercase tracking-wider rounded">
                          featured
                        </span>
                      )}
                    </div>
                    {proj.link ? (
                      <a href={proj.link} target="_blank" rel="noreferrer"
                        className="text-gray-600 hover:text-[var(--claude-orange)] transition-colors shrink-0">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-gray-800 shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-600 text-[11px] mb-2 font-mono">{proj.company} · {proj.period}</p>
                  <p className="text-gray-400 text-xs leading-relaxed flex-1 mb-3">{proj.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── SKILLS ──────────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<Cpu className="w-4 h-4" />} title="Skills" sub="// tech stack" />
          </Section>
          <div className="space-y-6">
            {Object.entries(p.skills).map(([category, skillList], i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  key={category}
                  ref={ref}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <p className="text-[var(--claude-orange)] text-[10px] font-mono font-medium mb-2.5 uppercase tracking-[0.2em]">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, j) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.06 + j * 0.03 }}
                        className="px-3 py-1.5 border border-[#1c1c28] rounded-lg text-xs text-gray-300 hover:border-[var(--claude-orange)] hover:text-white hover:bg-[var(--claude-orange)] hover:bg-opacity-5 transition-all cursor-default bg-[#0d0d12]"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── ACHIEVEMENTS ────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<Award className="w-4 h-4" />} title="Achievements" sub="// awards & recognition" />
          </Section>
          <div className="space-y-3">
            {p.achievements.map((a, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  key={a.title}
                  ref={ref}
                  initial={{ opacity: 0, x: 32 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex gap-4 p-4 border border-[#1c1c28] rounded-2xl bg-[#0d0d12] hover:border-[#2a2a3a] transition-all hover:-translate-y-0.5 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--claude-orange)] bg-opacity-10 flex items-center justify-center shrink-0 group-hover:bg-opacity-20 transition-all">
                    <Star className="w-4 h-4 text-[var(--claude-orange)]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{a.title}</p>
                    <p className="text-gray-600 text-xs mt-0.5 font-mono">{a.org} · {a.year}</p>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{a.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── PATENT ──────────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<FileText className="w-4 h-4" />} title="Patent" sub="// published research" />
          </Section>
          {(() => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-80px" });
            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="p-6 border border-[var(--claude-orange)] border-opacity-25 rounded-2xl bg-gradient-to-br from-[#0f0e0b] to-[#0d0d12] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--claude-orange)] opacity-[0.04] blur-[60px] rounded-full" />
                <div className="flex flex-col sm:flex-row items-start gap-4 relative">
                  <div className="w-11 h-11 rounded-xl bg-[var(--claude-orange)] bg-opacity-10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[var(--claude-orange)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white leading-snug mb-2">{p.patent.title}</p>
                    <p className="text-[var(--claude-orange)] text-xs font-mono mb-1">
                      Patent No. {p.patent.number} · Issued {p.patent.issued}
                    </p>
                    <p className="text-gray-600 text-xs mb-3">
                      Co-authored with {p.patent.coAuthors.join(", ")}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.patent.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </section>

        {/* ── EDUCATION ───────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<GraduationCap className="w-4 h-4" />} title="Education" sub="// academic background" />
          </Section>
          <div className="space-y-4">
            {p.education.map((edu, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  key={`${edu.institution}-${i}`}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="p-5 border border-[#1c1c28] rounded-2xl bg-[#0d0d12] hover:border-[#2a2a3a] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1 gap-1">
                    <p className="font-semibold text-white">{edu.institution}</p>
                    <span className="text-gray-600 text-[10px] font-mono px-2 py-1 bg-[#111116] rounded border border-[#1c1c28] self-start">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-[var(--claude-orange)] text-sm mb-1">{edu.degree}</p>
                  <p className="text-gray-500 text-xs mb-3">{edu.grade}</p>
                  {edu.activities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {edu.activities.map((a) => <Tag key={a} label={a} />)}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── EXTRACURRICULARS ────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<Users className="w-4 h-4" />} title="Leadership & Activities" sub="// beyond the desk" />
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {p.extracurriculars.map((ec, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              const isHighlight = "highlight" in ec && ec.highlight;
              return (
                <motion.div
                  key={ec.role}
                  ref={ref}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.07 }}
                  className={`p-4 border rounded-2xl bg-[#0d0d12] transition-all h-full hover:-translate-y-0.5 ${
                    isHighlight
                      ? "border-[var(--claude-orange)] border-opacity-30"
                      : "border-[#1c1c28] hover:border-[#2a2a3a]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isHighlight && (
                      <Zap className="w-4 h-4 text-[var(--claude-orange)] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm text-white leading-snug">{ec.role}</p>
                      <p className="text-gray-600 text-[10px] font-mono mt-0.5">{ec.org} · {ec.period}</p>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed">{ec.detail}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── CERTIFICATIONS ──────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<BookOpen className="w-4 h-4" />} title="Certifications" sub={`// ${p.certifications.length} credentials`} />
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {p.certifications.map((cert, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div
                  key={cert.name}
                  ref={ref}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: Math.floor(i / 2) * 0.05 }}
                  className="flex items-center gap-3 p-3 border border-[#1c1c28] rounded-xl bg-[#0d0d12] hover:border-[#2a2a3a] transition-colors group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--claude-orange)] shrink-0 group-hover:scale-150 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{cert.name}</p>
                    <p className="text-gray-600 text-[10px] font-mono">{cert.org} · {cert.year}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── PERSONAL ────────────────────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <Section>
            <SectionHeader icon={<Star className="w-4 h-4" />} title="Beyond the Code" sub="// the human behind the AI" />
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {p.personalFacts.map((fact, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-3 items-start p-4 border border-[#1c1c28] rounded-2xl bg-[#0d0d12] hover:border-[#2a2a3a] transition-colors"
                >
                  <span className="text-[var(--claude-orange)] text-xl leading-none shrink-0 mt-0.5">·</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{fact}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
        <div className="text-center py-10 border-t border-[#1c1c28]">
          <p className="text-gray-600 text-xs font-mono mb-1">built by anas shaik</p>
          <p className="text-gray-700 text-[10px] font-mono mb-5">next.js · groq · framer motion</p>
          <motion.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--claude-orange)] border-opacity-40 rounded-xl text-[var(--claude-orange)] hover:bg-[var(--claude-orange)] hover:text-black transition-all text-xs font-mono group"
          >
            <Terminal className="w-3.5 h-3.5" />
            Switch to Terminal mode
          </motion.button>
        </div>

      </div>
    </div>
  );
}
