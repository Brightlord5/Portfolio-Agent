"use client";

import { useState, useEffect } from "react";
import { Files, Bug, Radio, Cpu, Wifi, Activity, HelpCircle, GitCommit } from "lucide-react";
import { PanelTab } from "./panel-tabs";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { commits?: { message: string }[]; pull_request?: { title: string }; ref?: string };
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "just now";
}

function eventSummary(event: GitHubEvent): string {
  const repo = event.repo.name.split("/")[1];
  if (event.type === "PushEvent") {
    const msg = event.payload.commits?.[0]?.message?.split("\n")[0] || "pushed";
    return `pushed to ${repo}: ${msg.slice(0, 40)}`;
  }
  if (event.type === "PullRequestEvent") return `PR: ${event.payload.pull_request?.title?.slice(0, 40)}`;
  if (event.type === "CreateEvent") return `created branch in ${repo}`;
  if (event.type === "WatchEvent") return `starred ${repo}`;
  return `activity on ${repo}`;
}

const navIcons = [
  { id: "terminal" as PanelTab, icon: <Files className="w-4 h-4" />, label: "Terminal" },
  { id: "problems" as PanelTab, icon: <Bug className="w-4 h-4" />, label: "Problems" },
  { id: "output" as PanelTab, icon: <Radio className="w-4 h-4" />, label: "Output" },
  { id: "debug" as PanelTab, icon: <Cpu className="w-4 h-4" />, label: "Debug" },
  { id: "ports" as PanelTab, icon: <Wifi className="w-4 h-4" />, label: "Ports" },
];

interface SidePanelProps {
  activeTab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
}

export function SidePanel({ activeTab, onTabChange }: SidePanelProps) {
  const [activity, setActivity] = useState<GitHubEvent[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Brightlord5/events/public?per_page=5")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setActivity(data.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoadingActivity(false));
  }, []);

  return (
    <div className="hidden md:flex w-60 bg-panel border-r border-border flex-col">
      {/* Activity bar icons */}
      <div className="flex border-b border-border p-2 gap-1">
        {navIcons.map((nav) => (
          <button
            key={nav.id}
            title={nav.label}
            onClick={() => onTabChange(nav.id)}
            className={`p-2 rounded transition-colors ${
              activeTab === nav.id
                ? "bg-selection text-[var(--claude-orange)]"
                : "text-muted hover:text-foreground"
            }`}
          >
            {nav.icon}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5 text-sm">
        {/* GitHub Activity */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted mb-3 flex items-center gap-1.5">
            <Activity className="w-3 h-3" /> Recent Activity
          </h3>
          {loadingActivity ? (
            <p className="text-xs text-muted-foreground">Loading GitHub activity...</p>
          ) : activity.length > 0 ? (
            <ul className="space-y-2.5 border-l border-border ml-1 pl-3">
              {activity.map((event) => (
                <li key={event.id} className="text-xs">
                  <div className="flex items-start gap-1">
                    <GitCommit className="w-2.5 h-2.5 shrink-0 mt-0.5 text-[var(--claude-orange)]" />
                    <span className="text-foreground leading-relaxed">{eventSummary(event)}</span>
                  </div>
                  <p className="text-muted-foreground text-[10px] mt-0.5 pl-3">{timeAgo(event.created_at)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-2 border-l border-border ml-1 pl-3">
              <li className="text-xs text-foreground">pushed portfolio v2<br /><span className="text-muted-foreground text-[10px]">just now</span></li>
              <li className="text-xs text-foreground">shipped PromptSentry<br /><span className="text-muted-foreground text-[10px]">Dec 2025</span></li>
            </ul>
          )}
        </div>

        {/* Tips */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-3 h-3" /> Tips
          </h3>
          <div className="bg-background border border-border p-2.5 rounded text-xs leading-relaxed space-y-1.5">
            <p>Type <span className="text-[var(--claude-orange)] font-bold">help</span> to explore</p>
            <p>Ask Chitti anything in plain English</p>
            <p>Use <span className="text-[var(--claude-orange)]">/non-tech</span> for standard UI</p>
            <p>↑ ↓ for command history</p>
          </div>
        </div>
      </div>
    </div>
  );
}
