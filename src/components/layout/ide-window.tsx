"use client";

import React, { useState } from "react";
import { TitleBar } from "./title-bar";
import { StatusBar } from "./status-bar";
import { SidePanel } from "./side-panel";
import { PanelTabs, PanelTab } from "./panel-tabs";
import { ProblemsPanel } from "@/components/panels/problems-panel";
import { OutputPanel } from "@/components/panels/output-panel";
import { DebugPanel } from "@/components/panels/debug-panel";
import { PortsPanel } from "@/components/panels/ports-panel";
import { Terminal } from "@/components/terminal/terminal";
import { motion } from "framer-motion";

export function IDEWindow() {
  const [activeTab, setActiveTab] = useState<PanelTab>("terminal");

  const renderPanel = () => {
    switch (activeTab) {
      case "terminal":
        return <Terminal />;
      case "problems":
        return <ProblemsPanel />;
      case "output":
        return <OutputPanel />;
      case "debug":
        return <DebugPanel />;
      case "ports":
        return <PortsPanel />;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground scanlines">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <SidePanel activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 flex flex-col min-w-0 bg-background relative">
          <PanelTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={`flex-1 flex flex-col overflow-hidden ${activeTab === "terminal" ? "overflow-y-auto px-4 py-4 md:px-6" : ""}`}
          >
            {renderPanel()}
          </motion.div>
          {/* CRT glow */}
          <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-5 bg-[radial-gradient(circle_at_center,var(--claude-orange)_0%,transparent_70%)]" />
        </main>
      </div>
      <StatusBar activeTab={activeTab} />
    </div>
  );
}
