import React, { useState } from "react";
import { CustomizeState } from "./types";
import { DEFAULT_STATE } from "./data/defaultBlueprints";
import CustomizerPanel from "./components/CustomizerPanel";
import PromptViewer from "./components/PromptViewer";
import BlueprintVisualizer from "./components/BlueprintVisualizer";
import AIPromptOptimizer from "./components/AIPromptOptimizer";
import FirmWebsitePreview from "./components/FirmWebsitePreview";
import { 
  Building, Phone, MapPin, Grid, Terminal, Sparkles, BookOpen, 
  Layers, AppWindow, FileCode, CheckCircle2, ChevronRight, Activity
} from "lucide-react";

export default function App() {
  const [state, setState] = useState<CustomizeState>(() =>
    JSON.parse(JSON.stringify(DEFAULT_STATE))
  );

  // Master view state: "website" (live corporate app) or "prompt" (strategy studio)
  const [appViewMode, setAppViewMode] = useState<"website" | "prompt">("website");
  
  // Customizer internal tabs
  const [activeTabLeft, setActiveTabLeft] = useState<"customize" | "optimize">("customize");
  
  // Website active sub-page
  const [websiteActivePage, setWebsiteActivePage] = useState<string>("home");

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col justify-between" id="applet-root">
      
      {/* 1. Header with direct business credentials */}
      <header className="bg-white border-b border-slate-100 shadow-xs px-6 py-4.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo brand signature */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold tracking-tight shadow-md shrink-0 relative overflow-hidden group">
              <span className="font-mono text-sm group-hover:scale-110 transition-transform select-none">RRT</span>
              <div className="absolute inset-0 bg-linear-to-tr from-indigo-50/20 to-transparent pointer-events-none" />
            </div>
            
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-slate-900 text-sm sm:text-base tracking-tight leading-none uppercase">
                  Jack Kapphahn Roadrunner Tax
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-md">
                  Gregg County, TX
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium italic">
                CPA-Level Tax Planning & Complete Bookkeeping Services
              </p>
            </div>
          </div>

          {/* Quick contact / locations */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href="tel:+19037594700"
              className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-650 transition-colors font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/50 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>+1 (903) 759-4700</span>
            </a>
            
            <div className="flex items-center gap-1.5 text-slate-600 font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/50">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Longview, Texas</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-sans text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse" />
              <span>Licensed Practice Authorized</span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Primary Sub-Navbar View Selector */}
      <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-xs uppercase font-extrabold tracking-wider">WORKSPACE MODE:</span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-md">
              {appViewMode === "website" ? "LIVE CORPORATE PREVIEW" : "AI INSTRUCTION CONSOLE"}
            </span>
          </div>

          {/* Switcher Controls */}
          <div className="flex bg-slate-850 p-1 border border-slate-800 rounded-xl gap-1 w-full sm:w-auto">
            <button
              onClick={() => {
                setAppViewMode("website");
                setWebsiteActivePage("home");
              }}
              type="button"
              id="switch-btn-website"
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                appViewMode === "website"
                  ? "bg-indigo-650 text-white shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <AppWindow className="w-4 h-4 shrink-0" />
              <span>💻 View Corporate Website</span>
            </button>

            <button
              onClick={() => setAppViewMode("prompt")}
              type="button"
              id="switch-btn-prompt"
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                appViewMode === "prompt"
                  ? "bg-indigo-650 text-white shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileCode className="w-4 h-4 shrink-0" />
              <span>🛠️ AI Strategy Prompt Hub</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Primary Content Panel */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex-1 w-full space-y-6">
        
        {/* VIEW 1: THE REAL, FULLY INTERACTIVE CLIENT PREVIEW WEBSITE */}
        {appViewMode === "website" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Context Widget informing on the Customizer link */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex gap-3 items-start">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-950 leading-relaxed font-sans">
                  <strong>Live Responsive Mockup Mode:</strong> You are viewing the fully formed, copy-rich CPA and bookkeeper web application itself! Use the navigation titles to click pages or input records in the interactive fee modeler below. 
                  <span className="block mt-1 font-medium text-amber-900 text-[11px] font-mono">
                    💡 Changing options in the <strong>Strategy Prompt Hub</strong> immediately changes this site&apos;s styling colors, credentials, active alerts, and industry directives!
                  </span>
                </p>
              </div>
              <button
                onClick={() => setAppViewMode("prompt")}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg shrink-0 cursor-pointer"
                type="button"
              >
                Tweak Colors & Directives
              </button>
            </div>

            {/* Render complete real accounting app */}
            <FirmWebsitePreview 
              state={state} 
              activeTab={websiteActivePage} 
              setActiveTab={setWebsiteActivePage} 
            />

          </div>
        )}

        {/* VIEW 2: THE ADVANCED WEBSITE BUILDER PROMPT & AI ENGINEER DECK */}
        {appViewMode === "prompt" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Explanatory introduction */}
            <div className="bg-linear-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1 relative z-10 text-left">
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-white uppercase font-sans">
                  AI Website-Builder Strategy Console
                </h2>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl font-sans">
                  Configure corporate parameters, select dynamic palettes (classic navy, corporate charcoal, gold, emerald), customize included pages, and let Gemini rewrite/optimize your custom instructions on the fly. Copy the output prompt below to load it into Replit, Lovable, or v0 for immediate deployment!
                </p>
              </div>
              <button
                onClick={() => {
                  setAppViewMode("website");
                  setWebsiteActivePage("home");
                }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-extrabold uppercase px-4 py-2.5 rounded-xl shrink-0 cursor-pointer select-none"
                type="button"
              >
                Go Back to Website View
              </button>
              {/* Radial gradient background accent */}
              <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Split controls bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Customize sliders (left column) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Secondary tabs block */}
                <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/50 flex gap-1">
                  <button
                    onClick={() => setActiveTabLeft("customize")}
                    type="button"
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTabLeft === "customize"
                        ? "bg-white text-indigo-950 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Grid className="w-4 h-4 text-slate-400" />
                    <span>Branding Preset</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTabLeft("optimize")}
                    type="button"
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTabLeft === "optimize"
                        ? "bg-white text-indigo-950 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span>AI Assistant</span>
                  </button>
                </div>

                {/* Sub Panel */}
                <div className="flex-1 min-h-[500px]">
                  {activeTabLeft === "customize" ? (
                    <CustomizerPanel state={state} onChange={setState} />
                  ) : (
                    <AIPromptOptimizer state={state} onChange={setState} />
                  )}
                </div>

              </div>

              {/* Console Viewer (right column) */}
              <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
                <PromptViewer state={state} />
              </div>

            </div>

            {/* Visual Blueprint element map */}
            <BlueprintVisualizer state={state} />

          </div>
        )}

      </main>

      {/* 4. Main Applet Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 mt-12 text-slate-400 text-xs text-center w-full">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 font-medium">
            &copy; 2026 Jack Kapphahn <span className="font-semibold text-slate-700">Roadrunner Tax Services</span>. Longview, Texas.
          </div>
          
          <div className="text-slate-400 font-mono text-[11px] flex gap-4 items-center">
            <span>SEC/IRS Compliance Ready</span>
            <span>•</span>
            <span className="font-semibold text-slate-600 bg-slate-50 border px-2.5 py-1.5 rounded-md">
              Developed by Serwizen.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
