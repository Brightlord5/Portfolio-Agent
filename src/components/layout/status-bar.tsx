"use client";

import { GitBranch, XCircle, AlertTriangle, Zap } from "lucide-react";
import { PanelTab } from "./panel-tabs";

const tabInfo: Record<PanelTab, { right: string }> = {
  terminal: { right: "Chitti v1.0 · groq/compound" },
  problems: { right: "Problems · 6 solved · 1 in-progress" },
  output: { right: "Output · career timeline" },
  debug: { right: "Debug Console · anas.js" },
  ports: { right: "Ports · 5 open" },
};

export function StatusBar({ activeTab }: { activeTab: PanelTab }) {
  return (
    <div className="flex items-center justify-between h-7 px-4 bg-panel border-t border-border select-none text-[10px] text-muted tracking-wider">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:text-foreground cursor-pointer transition-colors">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <XCircle className="w-3 h-3 text-red-400" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-yellow-400" />
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[var(--claude-orange)]">
          <Zap className="w-3 h-3" />
          <span>AI Engineer @ Deriv</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-[var(--claude-orange)] opacity-80">{tabInfo[activeTab]?.right}</span>
        <span>UTF-8</span>
        <span>TypeScript React</span>
      </div>
    </div>
  );
}
