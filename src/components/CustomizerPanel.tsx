import React from "react";
import { CustomizeState } from "../types";
import { DEFAULT_STATE, ALL_INDUSTRIES, COLOR_PALETTES, TYPOGRAPHY_OPTIONS, TARGET_STACKS, TONE_OPTIONS } from "../data/defaultBlueprints";
import { Building, Phone, MapPin, Mail, Award, Clock, FileText, CheckCircle2 } from "lucide-react";

interface CustomizerPanelProps {
  state: CustomizeState;
  onChange: (updater: (prev: CustomizeState) => CustomizeState) => void;
}

export default function CustomizerPanel({ state, onChange }: CustomizerPanelProps) {
  const updateFirmField = (field: keyof typeof state.firm, value: string) => {
    onChange((prev) => ({
      ...prev,
      firm: {
        ...prev.firm,
        [field]: value,
      },
    }));
  };

  const togglePage = (pageId: string) => {
    onChange((prev) => {
      const active = prev.selectedPages.includes(pageId);
      const updated = active
        ? prev.selectedPages.filter((p) => p !== pageId)
        : [...prev.selectedPages, pageId];
      return { ...prev, selectedPages: updated };
    });
  };

  const toggleIndustry = (industry: string) => {
    onChange((prev) => {
      const active = prev.selectedIndustries.includes(industry);
      const updated = active
        ? prev.selectedIndustries.filter((i) => i !== industry)
        : [...prev.selectedIndustries, industry];
      return { ...prev, selectedIndustries: updated };
    });
  };

  const toggleInteractiveFeature = (feat: string) => {
    onChange((prev) => {
      const active = prev.interactiveFeatures.includes(feat);
      const updated = active
        ? prev.interactiveFeatures.filter((f) => f !== feat)
        : [...prev.interactiveFeatures, feat];
      return { ...prev, interactiveFeatures: updated };
    });
  };

  const resetToDefault = () => {
    onChange(() => JSON.parse(JSON.stringify(DEFAULT_STATE)));
  };

  return (
    <div id="customizer-panel" className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Panel Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-600" />
            Prompt Tailoring Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">Configure parameters to customize the AI prompt</p>
        </div>
        <button
          onClick={resetToDefault}
          type="button"
          id="btn-reset-default"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
        >
          Reset default
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="p-6 overflow-y-auto flex-1 space-y-8 max-h-[70vh]">
        
        {/* Section 1: Firm Meta Information */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-slate-400" />
            1. Firm Information & Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firm-name" className="block text-xs font-medium text-slate-600 mb-1.5">Accounting Firm Name</label>
              <div className="relative">
                <input
                  id="firm-name"
                  type="text"
                  value={state.firm.name}
                  onChange={(e) => updateFirmField("name", e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Firm Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="firm-phone" className="block text-xs font-medium text-slate-600 mb-1.5">Official Contact Number</label>
              <div className="relative">
                <input
                  id="firm-phone"
                  type="text"
                  value={state.firm.phone}
                  onChange={(e) => updateFirmField("phone", e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Firm Phone"
                />
              </div>
            </div>

            <div>
              <label htmlFor="firm-location" className="block text-xs font-medium text-slate-600 mb-1.5">Firm Location / Region</label>
              <div className="relative">
                <input
                  id="firm-location"
                  type="text"
                  value={state.firm.location}
                  onChange={(e) => updateFirmField("location", e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-880 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Address / Area"
                />
              </div>
            </div>

            <div>
              <label htmlFor="firm-email" className="block text-xs font-medium text-slate-600 mb-1.5">Official Inquiry Email</label>
              <div className="relative">
                <input
                  id="firm-email"
                  type="email"
                  value={state.firm.email}
                  onChange={(e) => updateFirmField("email", e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-880 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Inquiry Email"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="firm-credentials" className="block text-xs font-medium text-slate-600 mb-1.5">Certifications & Badges</label>
              <input
                id="firm-credentials"
                type="text"
                value={state.firm.credentials}
                onChange={(e) => updateFirmField("credentials", e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-880 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g. Certified CPAs, QuickBooks ProAdvisors"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="firm-hours" className="block text-xs font-medium text-slate-600 mb-1.5">Hours of Operation</label>
              <input
                id="firm-hours"
                type="text"
                value={state.firm.hours}
                onChange={(e) => updateFirmField("hours", e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-880 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                placeholder="Business Days & Hour details"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Layout & Aesthetics */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            2. Brand Aesthetic & Color Palette
          </h3>
          
          {/* Color Palettes Grid */}
          <div>
            <span className="block text-xs font-medium text-slate-500 mb-2">Color Prescription Scheme</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COLOR_PALETTES.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => onChange((prev) => ({ ...prev, themeColor: palette.id }))}
                  type="button"
                  id={`palette-${palette.id}`}
                  className={`p-3 rounded-xl border flex flex-col items-start text-left hover:border-slate-300 hover:bg-slate-50/30 transition-all cursor-pointer ${
                    state.themeColor === palette.id
                      ? "border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-500/20"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex gap-1">
                      {palette.colors.map((c, i) => (
                        <div
                          key={i}
                          className="w-4.5 h-4.5 rounded-full border border-white"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{palette.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 leading-relaxed">{palette.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Typography options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label htmlFor="select-typography" className="block text-xs font-medium text-slate-600 mb-1.5">Typography Pairing</label>
              <select
                id="select-typography"
                value={state.typography}
                onChange={(e) => onChange((prev) => ({ ...prev, typography: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                {TYPOGRAPHY_OPTIONS.map((typo) => (
                  <option key={typo.id} value={typo.id}>
                    {typo.name} ({typo.display})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="select-tone" className="block text-xs font-medium text-slate-600 mb-1.5">Brand Tone Emphasis</label>
              <select
                id="select-tone"
                value={state.tone}
                onChange={(e) => onChange((prev) => ({ ...prev, tone: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Constraints */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            3. Target Stack / Website Builder Target
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {TARGET_STACKS.map((stack) => (
              <button
                key={stack.id}
                onClick={() => onChange((prev) => ({ ...prev, targetStack: stack.id }))}
                type="button"
                id={`stack-${stack.id}`}
                className={`p-3 rounded-xl border text-left flex justify-between items-start hover:bg-slate-50/50 transition-all cursor-pointer ${
                  state.targetStack === stack.id
                    ? "border-indigo-600 bg-indigo-50/10 ring-1 ring-indigo-500/10"
                    : "border-slate-200"
                }`}
              >
                <div>
                  <span className="block text-xs font-semibold text-slate-800">{stack.name}</span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">{stack.desc}</span>
                </div>
                {state.targetStack === stack.id && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Target Pages Selector */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
            4. Included Website Pages
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Toggle which pages are mapped in the generated system prompt wireframe layout:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "home", label: "01. Home Page" },
              { id: "about", label: "02. About Us" },
              { id: "services", label: "03. Detailed Services" },
              { id: "team", label: "04. Expert Team" },
              { id: "industries", label: "05. Industries Served" },
              { id: "testimonials", label: "06. Client Reviews" },
              { id: "faq", label: "07. Expand FAQ Accordion" },
              { id: "blog", label: "08. Blog / Resources" },
              { id: "contact", label: "09. Consultation Intake" }
            ].map((p) => {
              const active = state.selectedPages.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePage(p.id)}
                  type="button"
                  id={`page-toggle-${p.id}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    active
                      ? "border-blue-600 bg-blue-50/35 text-blue-900"
                      : "border-slate-200 bg-slate-50/20 text-slate-500 hover:bg-slate-100/50"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                    active ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300"
                  }`}>
                    {active && <span className="text-[10px]">✓</span>}
                  </div>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Industries Served Accent */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              5. Regional Texas Verticals Focus
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 bg-slate-100 rounded-full">East Texas Pivot</span>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 border border-slate-100 rounded-xl p-2 bg-slate-50/30">
            {ALL_INDUSTRIES.map((ind) => {
              const active = state.selectedIndustries.includes(ind);
              return (
                <button
                  key={ind}
                  onClick={() => toggleIndustry(ind)}
                  type="button"
                  id={`industry-toggle-${ind.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                    active
                      ? "border-slate-300 bg-slate-50 text-slate-800"
                      : "border-transparent text-slate-500 hover:bg-slate-50/80"
                  }`}
                >
                  <span>{ind}</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                    active ? "bg-slate-800 border-slate-800 text-white" : "border-slate-300"
                  }`}>
                    {active && <span className="text-[8px] font-bold">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 6: Top Announcement Toggle */}
        <div className="space-y-3 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Seasonal Announcement bar</span>
            <button
              onClick={() => onChange((prev) => ({ ...prev, includeAnnouncement: !prev.includeAnnouncement }))}
              type="button"
              id="btn-toggle-announcement"
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                state.includeAnnouncement ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                state.includeAnnouncement ? "translate-x-4" : "translate-x-0"
              }`} />
            </button>
          </div>

          {state.includeAnnouncement && (
            <textarea
              value={state.announcementText}
              onChange={(e) => onChange((prev) => ({ ...prev, announcementText: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-500 transition-all resize-y min-h-[50px]"
              placeholder="Enter announcement text"
            />
          )}
        </div>

        {/* Section 7: Key Interactive features */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            6. Interactive Technical Features
          </h3>
          <div className="space-y-2">
            {[
              "Interactive Consultation Form (linked to dynamic post route)",
              "Expandable FAQ Accordions",
              "Interactive Services Fee Self-Calculator Estimates"
            ].map((feat) => {
              const active = state.interactiveFeatures.includes(feat);
              return (
                <button
                  key={feat}
                  onClick={() => toggleInteractiveFeature(feat)}
                  type="button"
                  id={`feature-toggle-${feat.substring(0, 15).replace(/\s+/g, '-').toLowerCase()}`}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    active
                      ? "border-indigo-300 bg-indigo-50/10 text-indigo-950 font-semibold"
                      : "border-slate-200 bg-slate-50/20 text-slate-500 hover:bg-slate-100/50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    active ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300"
                  }`}>
                    {active && <span className="text-[10px]">✓</span>}
                  </div>
                  {feat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 8: Special Custom Notes */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="additional-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-400">7. Custom AI Builder Directives</label>
            <span className="text-[10px] text-slate-400">Appended to main body</span>
          </div>
          <textarea
            id="additional-notes"
            value={state.additionalNotes}
            onChange={(e) => onChange((prev) => ({ ...prev, additionalNotes: e.target.value }))}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 focus:border-indigo-500 leading-relaxed transition-all resize-y min-h-[110px]"
            placeholder="Add any specific guidelines, custom credentials, team member bios, or regional policies here..."
          />
        </div>

      </div>
    </div>
  );
}
