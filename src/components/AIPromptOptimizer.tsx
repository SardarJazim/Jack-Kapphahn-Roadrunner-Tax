import React, { useState } from "react";
import { Sparkles, Loader2, History, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { CustomizeState } from "../types";
import { generatePromptMarkdown } from "../data/defaultBlueprints";

interface AIPromptOptimizerProps {
  state: CustomizeState;
  onChange: (updater: (prev: CustomizeState) => CustomizeState) => void;
}

interface OptimizationLog {
  timestamp: string;
  feedback: string;
  advisory: string;
}

export default function AIPromptOptimizer({ state, onChange }: AIPromptOptimizerProps) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [advisoryMsg, setAdvisoryMsg] = useState<string | null>(null);
  const [optimizationLogs, setOptimizationLogs] = useState<OptimizationLog[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setAdvisoryMsg(null);

    const currentPromptText = generatePromptMarkdown(state);

    try {
      const response = await fetch("/api/optimize-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPrompt: currentPromptText,
          userFeedback: feedback,
          currentState: state,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error status ${response.status}`);
      }

      const data = await response.json();

      if (data.improvedNotes) {
        // Append these instructions directly to our state notes
        onChange((prev) => {
          const separator = prev.additionalNotes ? "\n\n" : "";
          return {
            ...prev,
            additionalNotes: prev.additionalNotes + separator + data.improvedNotes,
          };
        });
      }

      const newLog: OptimizationLog = {
        timestamp: new Date().toLocaleTimeString(),
        feedback: feedback,
        advisory: data.advisory || "Prompt updated with optimized parameters.",
      };

      setOptimizationLogs((prev) => [newLog, ...prev]);
      setAdvisoryMsg(data.advisory || "Refinements incorporated safely.");
      setFeedback("");
    } catch (err: any) {
      console.error("Optimization query failed:", err);
      setErrorMsg(
        err.message || "Unable to reach Gemini Prompt Optimizer. Please check backend log details."
      );
    } finally {
      setLoading(false);
    }
  };

  const applyQuickRefinement = (text: string) => {
    setFeedback(text);
  };

  return (
    <div id="ai-prompt-optimizer" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            AI Prompt Optimizer (Gemini-Powered)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Re-wire and enhance your website builder instructions. Provide natural language adjustments to refine output blueprints.
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-indigo-50/70 border border-indigo-100 text-indigo-700 rounded-lg">
          gemini-3.5-flash
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Form Column */}
        <div className="space-y-4">
          <form onSubmit={handleOptimize} className="space-y-3">
            <div>
              <label htmlFor="ai-feedback" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                What would you like to refine?
              </label>
              <textarea
                id="ai-feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="e.g. 'Emphasize Texas oil & gas mineral tax planning specialties.' or 'Add seasonal tax checklists to FAQ accordion.'"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 leading-relaxed transition-all resize-y min-h-[90px]"
              />
            </div>

            <button
              onClick={handleOptimize}
              type="submit"
              disabled={loading || !feedback.trim()}
              id="btn-trigger-optimize"
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                loading
                  ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 border-indigo-500 hover:bg-indigo-500 text-white shadow-sm"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing prompt strategy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Optimize Prompt via Gemini</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="space-y-2">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quick Refining Actions:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Add Tax Saving Metrics", text: "Highlight specific client success metrics, e.g. average savings of $4,500 for small local businesses filed under Texas state regulations." },
                { label: "Target LLC Formations", text: "Integrate dedicated sections highlighting services for startup filings, EIN registrations, and LLC state incorporation compliance." },
                { label: "Include Bookkeeping Video", text: "Add structured layout prompts for a secure video resource overlay, guiding contractors on paperless receipts filing." }
              ].map((act, i) => (
                <button
                  key={i}
                  type="button"
                  id={`quick-shortcut-${i}`}
                  onClick={() => applyQuickRefinement(act.text)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer font-medium text-left truncate max-w-full"
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-xs text-rose-800 leading-relaxed font-mono">
              <strong>Error:</strong> {errorMsg}
            </div>
          )}
        </div>

        {/* Dynamic Advisory Output Column */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              Optimization Status & Advisory
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When you submit changes, Gemini will modify your prompt structure and generate feedback guidance.
            </p>
          </div>

          {advisoryMsg ? (
            <div className="bg-indigo-50 border border-indigo-100/60 p-4 rounded-lg text-[11px] text-indigo-950 leading-relaxed space-y-2.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-indigo-900 border-b border-indigo-200/50 pb-1.5 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>AI Enhancement Advice</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{advisoryMsg}</p>
              <div className="mt-2 text-[10px] text-slate-500">
                ✔️ The recommendations have been directly appended to your <strong>Prompt Tailoring directives</strong> below.
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-6 text-slate-400 min-h-[140px] border border-dashed border-slate-200 rounded-lg">
              <Sparkles className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-xs max-w-[280px] leading-relaxed">
                Waiting for custom refining inputs. Enter a detail or click a shortcut above to test the generator!
              </p>
            </div>
          )}

          {/* History Logger */}
          {optimizationLogs.length > 0 && (
            <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <History className="w-3.5 h-3.5" /> Recent Logs
              </span>
              <div className="space-y-1.5 max-h-24 overflow-y-auto">
                {optimizationLogs.map((log, index) => (
                  <div key={index} className="bg-white border rounded p-1.5 px-2 text-[10px] text-slate-600 flex justify-between gap-1 items-center font-mono">
                    <span className="truncate max-w-[170px]">&quot;{log.feedback}&quot;</span>
                    <span className="text-slate-400 shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
