"use client";

import React from "react";

// Inline markdown parser — renders **bold**, *italic*, `code`, [link](url)
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // **bold**
    const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/);
    // *italic*
    const italicMatch = remaining.match(/^(.*?)\*(.+?)\*/);
    // `code`
    const codeMatch = remaining.match(/^(.*?)`([^`]+)`/);
    // [text](url)
    const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)/);

    const matches = [
      boldMatch && { idx: boldMatch[1].length, len: boldMatch[0].length, type: "bold", content: boldMatch[2], before: boldMatch[1] },
      italicMatch && { idx: italicMatch[1].length, len: italicMatch[0].length, type: "italic", content: italicMatch[2], before: italicMatch[1] },
      codeMatch && { idx: codeMatch[1].length, len: codeMatch[0].length, type: "code", content: codeMatch[2], before: codeMatch[1] },
      linkMatch && { idx: linkMatch[1].length, len: linkMatch[0].length, type: "link", content: linkMatch[2], url: linkMatch[3], before: linkMatch[1] },
    ].filter(Boolean).sort((a, b) => (a as {idx:number}).idx - (b as {idx:number}).idx);

    if (matches.length === 0) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const first = matches[0] as { type: string; content: string; before: string; len: number; url?: string };

    if (first.before) parts.push(<span key={key++}>{first.before}</span>);

    if (first.type === "bold") {
      parts.push(<strong key={key++} className="text-foreground font-bold">{first.content}</strong>);
    } else if (first.type === "italic") {
      parts.push(<em key={key++} className="text-muted-foreground italic">{first.content}</em>);
    } else if (first.type === "code") {
      parts.push(
        <code key={key++} className="text-[var(--claude-orange)] bg-selection px-1 rounded text-[11px] font-mono">
          {first.content}
        </code>
      );
    } else if (first.type === "link") {
      parts.push(
        <a key={key++} href={first.url} target="_blank" rel="noreferrer" className="text-[var(--claude-orange)] hover:underline">
          {first.content}
        </a>
      );
    }

    remaining = remaining.slice(first.len);
  }

  return parts;
}

interface MarkdownProps {
  text: string;
  streaming?: boolean;
}

export function Markdown({ text, streaming }: MarkdownProps) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-1" />);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={i} className="border-border my-2" />);
      i++;
      continue;
    }

    // ### H3
    if (line.startsWith("### ")) {
      elements.push(
        <p key={i} className="text-[var(--claude-orange)] font-bold text-xs uppercase tracking-wider mt-2 mb-1">
          {parseInline(line.slice(4))}
        </p>
      );
      i++;
      continue;
    }

    // ## H2
    if (line.startsWith("## ")) {
      elements.push(
        <p key={i} className="text-foreground font-bold text-sm mt-2 mb-1">
          {parseInline(line.slice(3))}
        </p>
      );
      i++;
      continue;
    }

    // # H1
    if (line.startsWith("# ")) {
      elements.push(
        <p key={i} className="text-foreground font-bold text-base mt-2 mb-1">
          {parseInline(line.slice(2))}
        </p>
      );
      i++;
      continue;
    }

    // Table row  | ... |
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      // Collect all table rows
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableRows.push(lines[i]);
        i++;
      }

      // Filter out separator rows (|---|---|)
      const dataRows = tableRows.filter(r => !r.replace(/[\s|:-]/g, "").length === false && !/^[\s|:\-]+$/.test(r));

      elements.push(
        <div key={`table-${i}`} className="my-2 overflow-x-auto">
          <table className="text-xs w-full border-collapse">
            <tbody>
              {dataRows.map((row, ri) => {
                const cells = row.split("|").slice(1, -1).map(c => c.trim());
                return (
                  <tr key={ri} className={ri === 0 ? "border-b border-[var(--claude-orange)] border-opacity-40" : "border-b border-border"}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className={`py-1 px-2 ${ri === 0 ? "text-[var(--claude-orange)] font-bold" : "text-muted-foreground"}`}>
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Bullet: - item or • item or * item
    if (/^[-•*]\s/.test(line.trim()) || /^\s+[-•*]\s/.test(line)) {
      const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
      const content = line.trim().replace(/^[-•*]\s/, "");
      elements.push(
        <div key={i} className="flex gap-2 items-start" style={{ paddingLeft: indent > 0 ? "1rem" : 0 }}>
          <span className="text-[var(--claude-orange)] shrink-0 mt-0.5">·</span>
          <span className="text-muted-foreground leading-relaxed">{parseInline(content)}</span>
        </div>
      );
      i++;
      continue;
    }

    // Numbered list: 1. item
    if (/^\d+\.\s/.test(line.trim())) {
      const num = line.match(/^(\d+)\./)?.[1];
      const content = line.trim().replace(/^\d+\.\s/, "");
      elements.push(
        <div key={i} className="flex gap-2 items-start">
          <span className="text-[var(--claude-orange)] shrink-0 text-xs font-bold w-4">{num}.</span>
          <span className="text-muted-foreground leading-relaxed">{parseInline(content)}</span>
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-muted-foreground leading-relaxed">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return (
    <div className="space-y-0.5 text-xs">
      {elements}
      {streaming && (
        <span className="inline-block w-1.5 h-3 bg-[var(--claude-orange)] animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}
