"use client";

import { motion } from "framer-motion";

// Clean AI robot character — silver body, orange glowing eyes & chest panel
// H=highlight silver, S=silver, D=dark, O=orange, _=bg
const pixelMap = [
  "_________OO_________",
  "_________SS_________",
  "______HHHHHHHH______",
  "_____HSSSSSSSSH_____",
  "_____HSSSSSSSSH_____",
  "_____HSOOSSOOSH_____",
  "_____HSOOSSOOSH_____",
  "_____HSSSSSSSSH_____",
  "_____HSDDDDDDSH_____",
  "_____HSSSSSSSSH_____",
  "_____HHHHHHHHHH_____",
  "_______SSSSSS_______",
  "____HHHHHHHHHHHH____",
  "____HSSSSSSSSSSH____",
  "____HSOOOOOOOOSH____",
  "____HSSSSSSSSSSH____",
  "____HHHHHHHHHHHH____",
];

const colorMap: Record<string, string> = {
  H: "#e2e8f0",
  S: "#94a3b8",
  D: "#1e293b",
  O: "#e5a44f",
  _: "transparent",
};

const PIXEL_SIZE = 4;

function RobotPixel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${pixelMap[0].length}, ${PIXEL_SIZE}px)`,
        gap: 0,
      }}
    >
      {pixelMap.map((row, ri) =>
        row.split("").map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            style={{
              width: PIXEL_SIZE,
              height: PIXEL_SIZE,
              backgroundColor: colorMap[cell] ?? "transparent",
            }}
          />
        ))
      )}
    </div>
  );
}

export function WelcomeBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border border-[var(--claude-orange)] rounded-sm my-4 font-mono text-sm overflow-hidden"
    >
      {/* Header bar */}
      <div className="px-3 py-1 text-[var(--claude-orange)] text-xs border-b border-[var(--claude-orange)] opacity-80">
        — Chitti v1.0 · Anas&apos;s Portfolio Assistant —
      </div>

      <div className="flex">
        {/* Left panel — Identity */}
        <div className="flex-1 px-5 py-4 flex flex-col items-center justify-center gap-2 border-r border-[var(--claude-orange)] border-opacity-30 min-w-[220px]">
          <RobotPixel />
          <div className="text-center mt-2">
            <p className="text-foreground font-bold text-sm">Hi, I&apos;m Chitti!</p>
            <p className="text-muted-foreground text-xs mt-0.5">Anas&apos;s AI Portfolio Assistant</p>
          </div>
          <div className="text-[10px] text-muted-foreground text-center space-y-0.5 mt-1">
            <p>groq/compound · high effort</p>
            <p>AI Engineer @ Deriv · Dubai, UAE</p>
          </div>
        </div>

        {/* Right panel — Tips */}
        <div className="flex-1 px-5 py-4 flex flex-col gap-4">
          <div>
            <p className="text-[var(--claude-orange)] text-xs font-bold mb-2">Getting started</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Type <span className="text-[var(--claude-orange)]">help</span> to see all available commands</p>
              <p>Type <span className="text-[var(--claude-orange)]">about</span> to learn about Anas</p>
              <p>Type <span className="text-[var(--claude-orange)]">projects</span> to explore his work</p>
              <p>Or just ask me anything in natural language!</p>
            </div>
          </div>

          <div>
            <p className="text-[var(--claude-orange)] text-xs font-bold mb-2">Quick tips</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>↑ ↓ Arrow keys for command history</p>
              <p>Try <span className="text-[var(--claude-orange)]">/non-tech</span> for standard UI</p>
              <p>Check the panel tabs above for more</p>
              <p>Try <span className="text-[var(--claude-orange)]">easter</span> for hidden commands</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
