import React, { useState } from "react";
import { Copy, Check, FileCode, Layers, Info, ListCollapse } from "lucide-react";
import { CustomizeState } from "../types";
import { generatePromptMarkdown } from "../data/defaultBlueprints";

interface PromptViewerProps {
  state: CustomizeState;
}

export default function PromptViewer({ state }: PromptViewerProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fullPromptText = generatePromptMarkdown(state);

  // Stats
  const wordCount = fullPromptText.split(/\s+/).filter(Boolean).length;
  // Estimated tokens (approx 1.3 tokens per word for markdown instructions)
  const estimatedTokens = Math.round(wordCount * 1.35);

  const copyToClipboard = async (text: string, id: string | null = null) => {
    try {
      await navigator.clipboard.writeText(text);
      if (id === null) {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      } else {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  // Helper to extract a segment from the prompt
  const getPromptSegment = (headerName: string): string => {
    // Basic extractor based on major header blocks
    const lines = fullPromptText.split("\n");
    let capturing = false;
    const segmentLines: string[] = [];

    // Let's bundle some structural segments
    if (headerName === "metabrand") {
      // Get sections 1 and 2
      for (const line of lines) {
        if (line.startsWith("# SYSTEM PROMPT") || line.startsWith("## 1. ESSENTIAL") || line.startsWith("## 2. DESIGN") || line.startsWith("## 3. CORE")) {
          capturing = true;
        }
        if (line.startsWith("## 5. REVENUE") || line.startsWith("## 6. MULTI-PAGE")) {
          capturing = false;
        }
        if (capturing) {
          segmentLines.push(line);
        }
      }
      return segmentLines.join("\n");
    }

    if (headerName === "funnel") {
      for (const line of lines) {
        if (line.startsWith("## 4. DEEP TEXAS") || line.startsWith("## 5. REVENUE") || line.startsWith("## 7. CRITICAL")) {
          capturing = true;
        }
        if (line.startsWith("## 6. MULTI-PAGE") || line.startsWith("## 8. CUSTOM")) {
          capturing = false;
        }
        if (capturing) {
          segmentLines.push(line);
        }
      }
      return segmentLines.join("\n");
    }

    if (headerName === "blueprint") {
      for (const line of lines) {
        if (line.startsWith("## 6. MULTI-PAGE")) {
          capturing = true;
        }
        if (line.startsWith("## 7. CRITICAL")) {
          capturing = false;
        }
        if (capturing) {
          segmentLines.push(line);
        }
      }
      return segmentLines.join("\n");
    }

    return fullPromptText;
  };

  return (
    <div id="prompt-viewer" className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden text-slate-100 shadow-2xl relative">
      {/* Console Top Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
          </div>
          <span className="text-xs font-semibold text-slate-400 font-mono ml-2">PROMPT_CONSOLE_ENGINE</span>
        </div>
        <button
          onClick={() => copyToClipboard(fullPromptText)}
          type="button"
          id="btn-copy-full-prompt"
          className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
            copiedAll
              ? "bg-emerald-600 border-emerald-500 text-white"
              : "bg-indigo-600 border-indigo-500 hover:bg-indigo-500 text-white"
          }`}
        >
          {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedAll ? "Entire Prompt Copied!" : "Copy Entire Prompt"}
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800 flex flex-wrap justify-between gap-4">
        <div className="flex gap-6">
          <div className="text-left">
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Word Count</span>
            <span className="text-sm font-semibold tracking-wide font-mono text-indigo-400">{wordCount} words</span>
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Est. Tokens</span>
            <span className="text-sm font-semibold tracking-wide font-mono text-teal-400">{estimatedTokens} tokens</span>
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pages Covered</span>
            <span className="text-sm font-semibold tracking-wide font-mono text-amber-400">{state.selectedPages.length} active</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800/40 border border-slate-800 rounded-lg text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Optimal for Replit or other LLM builders</span>
        </div>
      </div>

      {/* Page Split Prompt Copy Helpers */}
      <div className="bg-slate-950/80 p-3.5 border-b border-slate-800/50 flex flex-wrap gap-2 items-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          Chunk Creator:
        </span>
        
        <button
          onClick={() => copyToClipboard(getPromptSegment("metabrand"), "metabrand")}
          type="button"
          id="btn-copy-chunk-general"
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
        >
          {copiedId === "metabrand" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileCode className="w-3.5 h-3.5 text-indigo-400" />}
          <span>Identity & Color Spec</span>
        </button>

        <button
          onClick={() => copyToClipboard(getPromptSegment("funnel"), "funnel")}
          type="button"
          id="btn-copy-chunk-industries"
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
        >
          {copiedId === "funnel" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ListCollapse className="w-3.5 h-3.5 text-amber-400" />}
          <span>Texas Sectors & Form</span>
        </button>

        <button
          onClick={() => copyToClipboard(getPromptSegment("blueprint"), "blueprint")}
          type="button"
          id="btn-copy-chunk-blueprint"
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
        >
          {copiedId === "blueprint" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Layers className="w-3.5 h-3.5 text-teal-400" />}
          <span>Pages & Copy Blueprint</span>
        </button>
      </div>

      {/* Code Text Area Viewport */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-[300px]">
        <textarea
          readOnly
          value={fullPromptText}
          className="w-full flex-1 bg-slate-900 border-0 p-5 font-mono text-xs text-slate-300 leading-relaxed outline-none focus:ring-0 resize-none overflow-y-auto"
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>

      {/* Code Footer Watermark */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/60 text-center flex justify-between gap-2 items-center px-5 flex-wrap">
        <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider font-mono">JACK KAPPHAHN ROADRUNNER TAX • COMPLIANCE TOOL</span>
        <span className="text-[10px] text-slate-500 font-mono italic">Tailwind CSS Preset Appended Automatically</span>
      </div>
    </div>
  );
}
