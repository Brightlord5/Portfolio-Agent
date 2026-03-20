"use client";

import { Terminal, Bug, Radio, Cpu, Wifi } from "lucide-react";

export type PanelTab = "terminal" | "problems" | "output" | "debug" | "ports";

const tabs: { id: PanelTab; label: string; icon: React.ReactNode }[] = [
  { id: "problems", label: "Problems", icon: <Bug className="w-3 h-3" /> },
  { id: "output", label: "Output", icon: <Radio className="w-3 h-3" /> },
  { id: "debug", label: "Debug Console", icon: <Cpu className="w-3 h-3" /> },
  { id: "terminal", label: "Terminal", icon: <Terminal className="w-3 h-3" /> },
  { id: "ports", label: "Ports", icon: <Wifi className="w-3 h-3" /> },
];

interface PanelTabsProps {
  activeTab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
}

export function PanelTabs({ activeTab, onTabChange }: PanelTabsProps) {
  return (
    <div className="flex items-center border-b border-border bg-panel select-none text-xs overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1.5 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? "border-[var(--claude-orange)] text-foreground bg-background"
              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-selection"
          }`}
        >
          <span className={activeTab === tab.id ? "text-[var(--claude-orange)]" : ""}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
