import React, { useState } from "react";
import { BLUEPRINTS } from "../data/defaultBlueprints";
import { CustomizeState } from "../types";
import { Layers, FileText, Image, PenTool, Layout, CheckCircle } from "lucide-react";

interface BlueprintVisualizerProps {
  state: CustomizeState;
}

export default function BlueprintVisualizer({ state }: BlueprintVisualizerProps) {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>("home");

  const activeBlueprints = state.selectedPages
    .map((id) => BLUEPRINTS[id])
    .filter(Boolean);

  const selectedBlueprint = BLUEPRINTS[selectedBlueprintId];

  return (
    <div id="blueprint-visualizer" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
      {/* Visualizer Header */}
      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Layout className="w-5 h-5 text-indigo-600" />
            Interactive Wireframe Blueprint
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Explore how this generated prompt maps elements, structured layout sections, and custom copywriting.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-700 block">{activeBlueprints.length} of 9 Pages Included</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Customized in AI instructions</span>
        </div>
      </div>

      {/* Grid of Pages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2">
        {[
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "services", label: "Services" },
          { id: "team", label: "Team" },
          { id: "industries", label: "Industries" },
          { id: "testimonials", label: "Review" },
          { id: "faq", label: "FAQ" },
          { id: "blog", label: "Resources" },
          { id: "contact", label: "Contact" }
        ].map((item) => {
          const isIncluded = state.selectedPages.includes(item.id);
          const isSelected = selectedBlueprintId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => isIncluded && setSelectedBlueprintId(item.id)}
              disabled={!isIncluded}
              type="button"
              id={`blueprint-tab-${item.id}`}
              className={`py-2 px-1 text-center rounded-xl border font-medium text-xs flex flex-col justify-center items-center h-16 transition-all ${
                !isIncluded
                  ? "bg-slate-50/50 border-slate-100 text-slate-300 opacity-40 cursor-not-allowed"
                  : isSelected
                  ? "border-indigo-600 bg-indigo-50/45 text-indigo-900 ring-2 ring-indigo-500/10 font-semibold shadow-sm cursor-pointer"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
              }`}
            >
              <span className="block truncate max-w-full text-[10px] uppercase font-bold tracking-wider mb-1">
                {item.id}
              </span>
              <span className="block text-[11px] truncate max-w-full font-medium">
                {item.label}
              </span>
              {isIncluded && !isSelected && (
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Page Blueprint Details */}
      {selectedBlueprint ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/65 rounded-xl p-5 border border-slate-100">
          
          {/* Section List */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Section Wireframe Map</span>
            </div>
            <div className="space-y-1.5">
              {selectedBlueprint.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200/60 shadow-sm text-xs text-slate-700 leading-relaxed font-mono"
                >
                  <span className="font-bold text-slate-400 shrink-0 select-none">[{idx + 1}]</span>
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copywriting Intent */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <PenTool className="w-4 h-4 text-slate-400" />
              <span>Copywriting & Text Directives</span>
            </div>
            <div className="space-y-2">
              {selectedBlueprint.copyDirectives.map((copy, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3.5 py-3 rounded-lg border border-slate-200/60 shadow-sm text-xs text-slate-700 italic leading-relaxed border-l-2 border-l-indigo-500"
                >
                  "{copy}"
                </div>
              ))}
              <div className="bg-amber-50/50 border border-amber-100/60 p-3 rounded-lg text-[11px] text-amber-900 leading-relaxed">
                <strong>Local Texas Target Context:</strong> Prompt instructs the AI builder to dynamically pair Longview, Texas geographic targets, specific area phone number (+19037594700), and custom team assignments into every copy generation block.
              </div>
            </div>
          </div>

          {/* Imagery Recommendations */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <Image className="w-4 h-4 text-slate-400" />
              <span>Visual Media Directives</span>
            </div>
            <div className="space-y-2">
              {selectedBlueprint.images.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3.5 py-3 rounded-lg border border-slate-200/60 shadow-sm text-xs text-slate-700 leading-relaxed font-sans flex items-start gap-2.5"
                >
                  <div className="w-5 h-5 rounded bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    Image
                  </div>
                  <span>{img}</span>
                </div>
              ))}
              
              {/* Prompt output advice */}
              <div className="bg-blue-50/40 border border-blue-100/50 p-3 rounded-lg text-[11px] text-slate-700 leading-relaxed space-y-1">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  No Broken Images Safeguard
                </span>
                <p>
                  High-fidelity royalty-free keywords are structured into the prompt to prevent lorem mockup placeholders or broken image path symbols in output structures.
                </p>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 text-xs">
          Please toggle and select an active page blueprint tab to inspect elements.
        </div>
      )}
    </div>
  );
}
