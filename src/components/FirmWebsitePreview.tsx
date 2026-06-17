import React, { useState } from "react";
import { CustomizeState } from "../types";
import { COLOR_PALETTES } from "../data/defaultBlueprints";
import { 
  Calculator, ShieldCheck, TrendingUp, Users, MapPin, Phone, Mail, 
  ChevronRight, ArrowRight, Menu, X, Check, Star, HelpCircle, FileText, 
  Calendar, Building2, Landmark, Award
} from "lucide-react";

interface FirmWebsitePreviewProps {
  state: CustomizeState;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FirmWebsitePreview({ state, activeTab, setActiveTab }: FirmWebsitePreviewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Calculator State
  const [calcEntity, setCalcEntity] = useState("LLC");
  const [calcFrequency, setCalcFrequency] = useState("monthly");
  const [calcRevenue, setCalcRevenue] = useState("under100k");
  const [calcEstimate, setCalcEstimate] = useState<number | null>(null);
  const [calcCalculated, setCalcCalculated] = useState(false);

  // Contact / Intake Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bizName: "",
    email: "",
    phone: "",
    service: "Tax Preparation",
    revenue: "Under $100k",
    county: "Gregg",
    notes: ""
  });

  // Setup Dynamic Theme Classes based on Palette choice
  const getThemeClasses = () => {
    switch (state.themeColor) {
      case "charcoal":
        return {
          primaryBg: "bg-slate-800",
          primaryText: "text-slate-800",
          accentBg: "bg-teal-600 hover:bg-teal-700",
          accentText: "text-teal-600",
          lightBg: "bg-teal-50/50",
          bannerBg: "bg-slate-900 border-b border-teal-500/20",
          iconColor: "text-teal-600",
          footerBg: "bg-slate-900",
          borderAccent: "border-teal-500/30",
          buttonClasses: "bg-teal-600 hover:bg-teal-700 text-white"
        };
      case "emerald":
        return {
          primaryBg: "bg-emerald-900",
          primaryText: "text-emerald-900",
          accentBg: "bg-emerald-700 hover:bg-emerald-800",
          accentText: "text-emerald-700",
          lightBg: "bg-emerald-50/60",
          bannerBg: "bg-emerald-950 border-b border-emerald-500/10",
          iconColor: "text-emerald-600",
          footerBg: "bg-emerald-950",
          borderAccent: "border-emerald-700/30",
          buttonClasses: "bg-emerald-700 hover:bg-emerald-800 text-white"
        };
      case "gold":
        return {
          primaryBg: "bg-neutral-900",
          primaryText: "text-neutral-950",
          accentBg: "bg-amber-600 hover:bg-amber-700",
          accentText: "text-amber-600",
          lightBg: "bg-amber-50/40",
          bannerBg: "bg-neutral-950 border-b border-amber-500/20",
          iconColor: "text-amber-500",
          footerBg: "bg-neutral-950",
          borderAccent: "border-amber-500/20",
          buttonClasses: "bg-amber-600 hover:bg-amber-700 text-white"
        };
      case "navy":
      default:
        return {
          primaryBg: "bg-blue-900",
          primaryText: "text-blue-900",
          accentBg: "bg-blue-800 hover:bg-blue-900",
          accentText: "text-blue-800",
          lightBg: "bg-blue-50/50",
          bannerBg: "bg-blue-950 border-b border-blue-500/10",
          iconColor: "text-blue-700",
          footerBg: "bg-blue-950",
          borderAccent: "border-blue-700/20",
          buttonClasses: "bg-blue-800 hover:bg-blue-900 text-white"
        };
    }
  };

  const theme = getThemeClasses();

  // Calculator Logic
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let base = 150; // default tax/bk base
    
    // Entity impact
    if (calcEntity === "S-Corp") base += 120;
    if (calcEntity === "C-Corp") base += 150;
    if (calcEntity === "Partnership") base += 100;

    // Bookkeeping speed/freq
    if (calcFrequency === "weekly") base += 220;
    if (calcFrequency === "monthly") base += 110;

    // Revenue scale
    if (calcRevenue === "100k-500k") base += 90;
    if (calcRevenue === "over500k") base += 180;

    setCalcEstimate(base);
    setCalcCalculated(true);
  };

  // Submit Logic
  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  // Roadrunner Running SVG emblem
  const RoadrunnerLogo = () => (
    <svg className="w-8 h-8 text-current shrink-0" viewBox="0 0 100 60" fill="currentColor">
      <path d="M10 40 C 25 35, 45 45, 60 40 C 75 35, 80 20, 85 15 C 80 18, 70 20, 65 18 C 65 15, 68 12, 72 10 C 65 11, 58 14, 55 17 C 45 15, 30 20, 20 28 C 15 32, 8 36, 10 40 Z" />
      <path d="M55 42 L 50 55 M 54 42 L 58 53" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="14" r="2" fill="white" />
    </svg>
  );

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden font-sans text-slate-700 transition-all duration-300`}>
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {state.includeAnnouncement && (
        <div className={`${theme.bannerBg} text-white px-4 py-2.5 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2 animate-fadeIn`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
          <span>{state.announcementText}</span>
        </div>
      )}

      {/* 2. PREMIUM DOCK HEADER / NAVBAR */}
      <nav className="bg-white border-b border-slate-100 px-4 md:px-8 py-4.5 flex justify-between items-center relative z-20">
        {/* Brand visual identity */}
        <div className="flex items-center gap-3">
          <div className={`${theme.accentText} transition-colors`}>
            <RoadrunnerLogo />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-900 leading-none">
                Roadrunner Tax
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded tracking-wide leading-none uppercase">
                Est. 2011
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5 tracking-tight font-mono">
              JACK KAPPHAHN • LONGVIEW, TX
            </span>
          </div>
        </div>

        {/* Desktop Links (Dynamically rendered based on active sitemap page selections) */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
          {[
            { id: "home", label: "Overview" },
            { id: "about", label: "About Firm" },
            { id: "services", label: "Services Provided" },
            { id: "team", label: "Expert Advising" },
            { id: "industries", label: "Sectors" },
            { id: "testimonials", label: "Tax Saving Stories" },
            { id: "blog", label: "Articles" },
            { id: "faq", label: "FAQs" },
            { id: "contact", label: "Consultation" }
          ].map((lnk) => {
            const isIncluded = state.selectedPages.includes(lnk.id);
            if (!isIncluded) return null;

            return (
              <button
                key={lnk.id}
                onClick={() => {
                  setActiveTab(lnk.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg cursor-pointer transition-all ${
                  activeTab === lnk.id
                    ? `${theme.primaryBg} text-white shadow-xs`
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                type="button"
                id={`live-nav-${lnk.id}`}
              >
                {lnk.label}
              </button>
            );
          })}
        </div>

        {/* Mobile toggle anchor */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          id="btn-mobile-nav"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu Dropdown drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 shadow-xl flex flex-col gap-1 z-50 animate-fadeIn">
            {[
              { id: "home", label: "Overview Home" },
              { id: "about", label: "Our Story" },
              { id: "services", label: "Tax & Bookkeeping Services" },
              { id: "team", label: "Expert Advisory Team" },
              { id: "industries", label: "Texas Industries Served" },
              { id: "testimonials", label: "Success Stories" },
              { id: "blog", label: "Articles & News" },
              { id: "faq", label: "FAQs" },
              { id: "contact", label: "Request Free Consultation" }
            ].map((lnk) => {
              const isIncluded = state.selectedPages.includes(lnk.id);
              if (!isIncluded) return null;

              return (
                <button
                  key={lnk.id}
                  onClick={() => {
                    setActiveTab(lnk.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === lnk.id
                      ? `${theme.primaryBg} text-white`
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  type="button"
                >
                  {lnk.label}
                </button>
              );
            })}
            
            <div className="border-t border-slate-100 pt-3 mt-2 flex flex-col gap-2.5 text-xs text-slate-500 font-medium px-4">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-indigo-500" /> +19037594700</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-500" /> Longview, Texas</span>
            </div>
          </div>
        )}
      </nav>

      {/* 3. DYNAMIC SCREEN CONTENT VIEWPORTS */}
      <div className="min-h-[500px] bg-slate-50/30">
        
        {/* ==================== SCREEN A: OVERVIEW / HOME ==================== */}
        {activeTab === "home" && (
          <div className="animate-fadeIn">
            {/* Hero Fold */}
            <div className="bg-slate-900 text-white py-16 px-6 md:px-12 relative overflow-hidden">
              <div className="max-w-4xl mx-auto space-y-6 text-center relative z-10">
                
                {/* Regional Trust Stamp */}
                <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Licensed CPAs, Bookkeepers & Registered Tax Preparers</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                  East Texas Bookkeeping & Tax Services Formulated for <span className="text-amber-400">Absolute Accuracy</span>
                </h1>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                  Jack Kapphahn Roadrunner Tax delivers CPA-level tax planning, certified business audit support, and paperless bookkeeping straight from our Longview head office. No generic templates, no missing files—just absolute financial clarity.
                </p>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3">
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer ${theme.buttonClasses}`}
                    type="button"
                  >
                    <span>Book Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+19037594700"
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-white px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call +1 (903) 759-4700</span>
                  </a>
                </div>

              </div>

              {/* Decorative graphic grids */}
              <div className="absolute top-1/2 left-4 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-4 right-10 w-60 h-60 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Quick Stats Grid */}
            <div className="border-y border-slate-100 bg-white grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center py-6">
              {[
                { label: "Client retention rate", val: "99.2%" },
                { label: "East Texas business audits cleared", val: "100%" },
                { label: "Years in tax advisory practice", val: "15+" },
                { label: "Annual business tax savings", val: "$4.2M" }
              ].map((st, i) => (
                <div key={i} className="p-4 space-y-1">
                  <span className="block text-2xl font-extrabold text-slate-950 font-mono tracking-tight">{st.val}</span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider font-sans">{st.label}</span>
                </div>
              ))}
            </div>

            {/* Interactive Fee Self-Calculator Estimate container */}
            <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Form Col */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold py-1 px-2.5 bg-indigo-50 border border-indigo-100/50 text-indigo-700 rounded-lg uppercase tracking-wider">Estimate Modeler</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">Interactive Fee Calculator Tool</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">Get an instant, customized onboarding estimate based on your exact business needs.</p>
                  </div>

                  <form onSubmit={handleCalculate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Entity Structure</label>
                        <select
                          value={calcEntity}
                          onChange={(e) => setCalcEntity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/70 rounded-lg p-2 text-xs font-semibold outline-none"
                        >
                          <option value="Sole Proprietor">Sole Proprietor</option>
                          <option value="LLC">LLC</option>
                          <option value="S-Corp">S-Corp</option>
                          <option value="C-Corp">C-Corp</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Bookkeeping Freq</label>
                        <select
                          value={calcFrequency}
                          onChange={(e) => setCalcFrequency(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/70 rounded-lg p-2 text-xs font-semibold outline-none"
                        >
                          <option value="weekly">Weekly Updates</option>
                          <option value="monthly">Monthly Ledger</option>
                          <option value="quarterly">Quarterly Check</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Annual Revenue</label>
                        <select
                          value={calcRevenue}
                          onChange={(e) => setCalcRevenue(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/70 rounded-lg p-2 text-xs font-semibold outline-none"
                        >
                          <option value="under100k">Under $100k</option>
                          <option value="100k-500k">$100k - $500k</option>
                          <option value="over500k">Over $500k</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="text-xs font-extrabold uppercase tracking-wider bg-slate-900 hover:bg-slate-850 px-4 py-2.5 rounded-lg text-white w-full transition-all cursor-pointer"
                    >
                      Process Instant Estimate
                    </button>
                  </form>
                </div>

                {/* Estimate Render Col */}
                <div className="md:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-100 text-center flex flex-col justify-center items-center min-h-[180px]">
                  {calcCalculated && calcEstimate ? (
                    <div className="space-y-3 animate-fadeIn">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Custom Base Pricing Estimate</span>
                      <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                        ${calcEstimate}
                        <span className="text-xs font-medium text-slate-500 text-[11px] font-sans">/mo</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed max-w-[190px] mx-auto">
                        Includes standard IRS compliance checks, quarterly bookkeeping reconciliation, and 1099 checklist setup.
                      </p>
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev, 
                            notes: `Calculated estimate online: $${calcEstimate}/mo for ${calcEntity} with ${calcFrequency} books.`
                          }));
                          setActiveTab("contact");
                        }}
                        className={`text-[10px] font-extrabold uppercase tracking-wider block mx-auto px-3 py-1.5 rounded-md ${theme.accentBg} text-white transition-all`}
                      >
                        Lock in rate
                      </button>
                    </div>
                  ) : (
                    <div className="text-slate-400 space-y-2">
                      <Calculator className="w-8 h-8 mx-auto text-slate-300" />
                      <span className="block text-xs font-semibold">Enter details or adjust variables to view custom monthly package estimates.</span>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Visual core services highlight */}
            <div className="bg-white py-12 px-6">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono block">Accounting Pillars</span>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase">Featured Financial Services</h2>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">Precision-centric systems engineered to eliminate your audit anxiety and save costs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Tax Preparation & Strategy", icon: <Award className="w-5 h-5 text-indigo-500" />, desc: "Expert individual filing, S-Corp conversions, partnership federal schedules, and complex Texas state franchise tax minimization schedules." },
                    { title: "Paperless Bookkeeping", icon: <FileText className="w-5 h-5 text-teal-500" />, desc: "Certified QuickBooks ProAdvisor ledger reconciliations, real-time accounts scanning, automated receipts organization matrices." },
                    { title: "Texas Regional Payroll Integration", icon: <Users className="w-5 h-5 text-amber-500" />, desc: "Direct deposits, federal 940/941 scheduling, state unemployment reports, and streamlined annual contractor 1099 automation." },
                    { title: "Business CFO Advisory Session", icon: <Landmark className="w-5 h-5 text-rose-500" />, desc: "Strategic cash-flow forecasting blueprints, joint mineral rights royalty tracking, and robust LLC formation guidance packages." }
                  ].map((srv, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-xl p-5 hover:border-slate-300 hover:bg-slate-50/20 transition-all space-y-2 text-left">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                        {srv.icon}
                      </div>
                      <h4 className="text-xs font-bold uppercase text-slate-900">{srv.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">{srv.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================== SCREEN B: ABOUT US ==================== */}
        {activeTab === "about" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fadeIn">
            
            {/* Split layout firm legacy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-extrabold uppercase bg-slate-100 border px-2 py-1 rounded text-slate-600">Company Heritage</span>
                <h2 className="text-2xl font-black text-slate-900 uppercase">Over 15 Years of Stabilizing East Texas Ledgers</h2>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Founded under core values of absolute compliance and localized accountability, Jack Kapphahn Roadrunner Tax was started to deliver CPA-level precision with the friendly directness of an independent local partner. 
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  We don&apos;t just organize deductions for April deadlines; we engineer year-round strategic tax planning that allows contractor firms and family offices across Longview to grow dynamically with confidence.
                </p>
              </div>

              {/* Visual credential callouts */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] uppercase font-bold text-amber-500 font-mono tracking-widest">Our Credential Badges</span>
                </div>
                
                <div className="space-y-4 text-xs">
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="block font-bold text-white uppercase tracking-wider text-[11px]">IRS Registered Tax Specialist</span>
                      <span className="text-slate-400 mt-0.5">Authorized for complex federal return filings & dispute resolutions.</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Award className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <span className="block font-bold text-white uppercase tracking-wider text-[11px]">Certified QuickBooks ProAdvisors</span>
                      <span className="text-slate-400 mt-0.5">Specialized in automated cloud bookkeeping frameworks & job costing.</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Landmark className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <span className="block font-bold text-white uppercase tracking-wider text-[11px]">Texas State Franchise Professionals</span>
                      <span className="text-slate-400 mt-0.5">Specialist knowledge on margin recalculation laws and franchise filings.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values Section */}
            <div className="bg-white rounded-xl border border-slate-200/65 p-6 text-center space-y-6">
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">Our Four Foundational Guarantees</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left">
                {[
                  { title: "Absolute Accuracy", d: "Zero sloppy overrides. We double-check regulatory classifications on state franchise margin sheets." },
                  { title: "Paperless Streamlining", d: "Say goodbye to receipt shoeboxes. Everything scans directly into secure, cloud-enabled dashboards. " },
                  { title: "Proactive Planning", d: "No shocking tax bills in spring. Strategic forecasts map out your estimated tax obligations over time." },
                  { title: "Texas Local Pride", d: "We love Gregg County. Our accounting strategies respect local resource rates, royalties, and guidelines." }
                ].map((val, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-lg border border-slate-100 space-y-1">
                    <span className="text-xs font-bold uppercase text-slate-900 block">{val.title}</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{val.d}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== SCREEN C: SERVICES ==================== */}
        {activeTab === "services" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fadeIn">
            
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">Expert Accounting pillars</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Strategic Solutions For Longview Businesses</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Click through the options to see our complete tax & consulting deliverables.</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Federal & State Tax Preparation",
                  badge: "Annual Filings & Minimization",
                  tagline: "Keep your earnings. Minimize your state tax liability with bulletproof compliance strategies.",
                  bullets: [
                    "Individual, LLC, and S-Corporation tax form preparation (1040, 1065, 1120S schedules).",
                    "Texas State Franchise tax calculation, margin mapping, and electronic state filing portal integration.",
                    "Proactive mid-year withholding analysis & quarterly estimated schedule calibrations."
                  ]
                },
                {
                  title: "Paperless QuickBooks Bookkeeping",
                  badge: "Certified ProAdvisor Reconciliations",
                  tagline: "A constant clear picture of your cash-flow with organized books accessible 24/7 online.",
                  bullets: [
                    "Accounts Receivable & Accounts Payable ledger reconciliation.",
                    "Automated banking transactions sync, categorization, and receipt scanning configurations.",
                    "Production of premium monthly Balance Sheets and Income/Loss sheets representing true profitability."
                  ]
                },
                {
                  title: "Texas Regional Payroll Management",
                  badge: "Direct Deposits & Employer Filing",
                  tagline: "Ensure your employees are paid on time and your regional payroll filings are complete.",
                  bullets: [
                    "Direct deposit processing & automated salary computation matrices.",
                    "Quarterly and Annual employer state and federal tax payroll filings (Forms 940, 941, W2 / 1099).",
                    "New hire reporting, state unemployment tax calculations, and compliance checks."
                  ]
                }
              ].map((srv, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold uppercase text-slate-900">{srv.title}</h3>
                    <span className="text-[10px] font-bold text-indigo-700 uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">{srv.badge}</span>
                  </div>

                  <p className="text-xs text-slate-800 font-semibold italic">&quot;{srv.tagline}&quot;</p>
                  
                  <ul className="space-y-2.5 text-xs text-slate-500">
                    {srv.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex gap-2 items-start leading-relaxed font-sans">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================== SCREEN D: TEAM ==================== */}
        {activeTab === "team" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">Our Team</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Meet Your Longview Tax Advisors</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Putting human face and proven Texas credentials to your financial planning sheets.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  name: "Jack Kapphahn, CPA / MBA",
                  role: "Lead Financial Strategist & Enrolled Agent",
                  bio: "Over 15 years representing regional contractors, oil mineral royalty holders, and doctors. Expert at structural conversions to S-Corps and Gregg County business valuations.",
                  certs: "Authorized IRS Enrolled Agent, QuickBooks Certified ProAdvisor"
                },
                {
                  name: "Sarah Jenkins, EA",
                  role: "Head of Bookkeeping & Payroll Systems",
                  bio: "Specializes in paperless migration setups, automating direct payroll schedules, and state-wide audits. Dedicated to organizing company receipts so clients reclaim their weekends.",
                  certs: "QuickBooks ProAdvisor Advanced, Payroll Compliance certified"
                }
              ].map((member, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
                  <div className="h-1 bg-slate-900 rounded-t-full" />
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-950 text-sm">{member.name}</h3>
                    <span className="block text-[10px] font-bold text-indigo-700 uppercase">{member.role}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{member.bio}</p>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-500 leading-relaxed font-mono">
                    <strong>Credentials:</strong> {member.certs}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-6 text-center space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Need a direct technical assessment of your accounts?</h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">Our lead professionals monitor cases personally. No junior delegates—you receive direct CPA consulting expertise on every audit sheet.</p>
              <button
                onClick={() => setActiveTab("contact")}
                className="text-xs font-extrabold uppercase bg-white text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-lg transition-all cursor-pointer inline-block"
              >
                Request Consultation Session
              </button>
            </div>
          </div>
        )}

        {/* ==================== SCREEN E: INDUSTRIES ==================== */}
        {activeTab === "industries" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">Texas Specialties</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Local Sectors We Optimize</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Accounting is not cookie-cutter. Your industry dictates your regulatory obligations and special tax deductions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Oil & Gas / Energy Royalty Audits", desc: "Mineral rights payments, joint interest billing reconciliation patterns, depletion deduction optimizations, and complex multi-lease accounting maps for Gregg & Harrison county royalty owners." },
                { title: "Construction, Rigging & Contractors", desc: "Dynamic stage job costing, progressive equipment lease accounting, certified payroll requirements, subcontractor 1099 filings, and Texas state franchise tax margin credits allocation." },
                { title: "Healthcare Clinics & Dentists", desc: "Accounts receivable audits, corporate compliance, and automated payroll operations customized to medical schedules." },
                { title: "Small Retail & Retail Startups", desc: "LLC state registration assistance, county tax registration files, inventory reconciliation, and sales tax reporting calculations." }
              ].map((ind, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200/80 p-5 hover:bg-slate-50/20 transition-all text-left space-y-2">
                  <h3 className="text-xs font-bold uppercase text-slate-950 font-mono tracking-tight border-b border-slate-100 pb-2">{ind.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN F: TESTIMONIALS ==================== */}
        {activeTab === "testimonials" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">Social Proof</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">East Texas Trust Stories</h2>
              <p className="text-xs text-slate-500">Real quotes representing tax liability reductions and automated ledger setups.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  quote: "Jack and Sarah saved my grading contractor business thousands in franchise taxes. The bookkeeping is seamless and paperless.",
                  author: "Marcus D., Gregg County Contractors LLC",
                  score: 5
                },
                {
                  quote: "As a mineral royal owner, tax depletion calculations felt impossible. Roadrunner Tax handles the schedules flawlessly every season.",
                  author: "Elena R., Longview Royalty Holder",
                  score: 5
                },
                {
                  quote: "Moving to paperless payroll was the best operational decision we made. Employees are happier and books are fully optimized.",
                  author: "Dr. Anthony K., Longview Medical Group",
                  score: 5
                }
              ].map((t, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                    &quot;{t.quote}&quot;
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex text-amber-400">
                      {[...Array(t.score)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <span className="block text-[11px] font-bold text-slate-800 uppercase tracking-tight">{t.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN G: BLOG ==================== */}
        {activeTab === "blog" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">Financial resources</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Texas Compliance & Tax Guides</h2>
              <p className="text-xs text-slate-500">Free strategic analysis to optimize your business operations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "How East Texas Contractors Can Avoid Common 1099 Audits",
                  excerpt: "Learn the specific paperwork checklists, invoice structures, and state rules Gregg County contractors must maintain to keep audits smooth.",
                  tag: "Tax Code Updates"
                },
                {
                  title: "Small Business Checklist: Organizing Your Deductions Year-Round",
                  excerpt: "Don't scramble in April. A clean year-round receipt organization matrix saves an average of 42 labor hours per year and yields thousands more in deductions.",
                  tag: "Bookkeeping Tips"
                }
              ].map((post, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                  <div className="p-5 space-y-3">
                    <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border px-2 py-0.5 rounded uppercase tracking-wide inline-block">{post.tag}</span>
                    <h3 className="text-xs font-bold uppercase text-slate-900 leading-snug">{post.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{post.excerpt}</p>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                    <button type="button" className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 justify-end ml-auto cursor-pointer">
                      <span>Read Full Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN H: FAQ ==================== */}
        {activeTab === "faq" && (
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono font-bold">Inquiry Hub</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500">Addressing tax, documentation, and consultation setups transparently.</p>
            </div>

            <div className="space-y-3">
              {[
                { q: "What documents do I need to begin personal tax preparation?", a: "Please compile all W2s, contractor 1099s, mortgage interest statements (Form 1098), mineral royalty statements (Form 1099-MISC), and any business receipt tracking files." },
                { q: "How often are my bookkeeping ledgers updated?", a: "We support weekly, monthly, and quarterly updates depending on your company's transaction volume. Ledgers are securely synchronized via cloud QuickBooks panels." },
                { q: "Do you represent Gregg County clients under audit?", a: "Yes. Our lead strategic team members are IRS registered and CPAs with absolute authority to represent business tax controversies directly with the revenue agencies." },
                { q: "What are your initial consultation fees?", a: "Our introductory onboarding analysis is completely free! We sit down, review past statement files, and advise on cost optimization potential with zero obligation." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-4.5 space-y-2 text-left">
                  <h4 className="text-xs font-bold text-slate-950 flex items-center gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN I: CONTACT ==================== */}
        {activeTab === "contact" && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fadeIn">
            
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">Consultation Hub</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Schedule Your Free Financial Assessment</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">No commitment or setup costs. Speak straight with lead strategic planners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Info Block */}
              <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Jack Kapphahn Roadrunner Tax</h3>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Gregg County, Texas</span>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                    <div>
                      <span className="block font-bold text-slate-900">Physical Office Coordinates</span>
                      <span className="text-slate-500 mt-0.5 block">Longview, Texas 75601</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <span className="block font-bold text-slate-900">Direct Inbound Helpline</span>
                      <span className="text-slate-500 mt-0.5 block">+1 (903) 759-4700</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <span className="block font-bold text-slate-900">Secure Inboxes</span>
                      <span className="text-slate-500 mt-0.5 block">contact@roadrunnertax.com</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="block font-bold text-slate-900">Operating Consultation Hours</span>
                      <span className="text-slate-500 mt-0.5 block">{state.firm.hours}</span>
                    </div>
                  </div>

                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-[10px] text-slate-400 leading-relaxed font-mono">
                  All consultations operate under secure client-advisor privilege rules. Document uploads can be made after credentials authorization.
                </div>
              </div>

              {/* Secure intake form */}
              <div className="md:col-span-7 bg-white border border-slate-200/80 rounded-xl p-6 md:p-8 shadow-xs">
                {formSubmitted ? (
                  <div className="text-center py-10 space-y-4 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold uppercase text-slate-900">Consultation Booked Safely!</h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                        Hi <strong>{formData.name}</strong>, help files have been routed. Jack and Sarah Jenkins will contact you directly on <strong>{formData.phone}</strong> to confirm scheduling.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          bizName: "",
                          email: "",
                          phone: "",
                          service: "Tax Preparation",
                          revenue: "Under $100k",
                          county: "Gregg",
                          notes: ""
                        });
                      }}
                      className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 bg-slate-50 px-4 py-2 rounded-lg transition-all border border-slate-100 cursor-pointer"
                    >
                      Book another session
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleIntakeSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-client-name" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Full Name (Required)</label>
                        <input
                          id="form-client-name"
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Registered name"
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="form-client-biz" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Business Name</label>
                        <input
                          id="form-client-biz"
                          type="text"
                          value={formData.bizName}
                          onChange={(e) => setFormData(prev => ({ ...prev, bizName: e.target.value }))}
                          placeholder="e.g. East Texas Rigging"
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="form-client-email" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Direct Email</label>
                        <input
                          id="form-client-email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="email@address.com"
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="form-client-phone" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Helpline callback No.</label>
                        <input
                          id="form-client-phone"
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Phone number"
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="form-client-service" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Service field</label>
                        <select
                          id="form-client-service"
                          value={formData.service}
                          onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white"
                        >
                          <option value="Tax Preparation">Tax Preparation</option>
                          <option value="Bookkeeping">Bookkeeping Sync</option>
                          <option value="Payroll Systems">Payroll Setup</option>
                          <option value="CFO strategic">Advisory Session</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="form-client-annual" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Annual Revenue</label>
                        <select
                          id="form-client-annual"
                          value={formData.revenue}
                          onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white"
                        >
                          <option value="Under $100k">Under $100k</option>
                          <option value="$100k - $500k">$100k - $500k</option>
                          <option value="Over $500k">Over $500k</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="form-client-county" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Texas County</label>
                        <input
                          id="form-client-county"
                          type="text"
                          value={formData.county}
                          onChange={(e) => setFormData(prev => ({ ...prev, county: e.target.value }))}
                          placeholder="Gregg / Harrison"
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="form-client-notes" className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Key accounting challenges (Optional)</label>
                      <textarea
                        id="form-client-notes"
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Explain any mineral depletion rates, state margin claims, or back-year tax audits needed..."
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400 min-h-[70px] resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer ${theme.buttonClasses}`}
                    >
                      Route Consultation File
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 4. PROFESSIONAL ALIGNED FOOTER */}
      <footer className={`${theme.footerBg} text-slate-400 text-xs py-10 px-6 border-t border-slate-800`}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-left">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <span className="block text-white font-extrabold uppercase tracking-wider text-xs">Roadrunner Tax Services</span>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-medium">
              Precision bookkeeping, tax minimizations, and employer payroll automated systems straight from Gregg County, Texas. Licensed to practice federal and state filings.
            </p>
            <span className="block font-semibold text-[11px] text-amber-500 font-mono">Phone Helpline: +19037594700</span>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <span className="block text-white font-extrabold uppercase tracking-wider text-xs">Active Pages Map</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-sans font-medium">
              {[
                { id: "home", label: "Overview" },
                { id: "about", label: "About" },
                { id: "services", label: "Services Provided" },
                { id: "team", label: "CPA Advisers" },
                { id: "industries", label: "Specialty Sectors" },
                { id: "testimonials", label: "Success Stories" },
                { id: "blog", label: "Resource Articles" },
                { id: "faq", label: "Answers Hub" },
                { id: "contact", label: "Book Consultation" }
              ].map((lnk) => {
                const isIncluded = state.selectedPages.includes(lnk.id);
                if (!isIncluded) return null;
                return (
                  <button
                    key={lnk.id}
                    onClick={() => setActiveTab(lnk.id)}
                    className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                    type="button"
                  >
                    {lnk.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <span className="block text-white font-extrabold uppercase tracking-wider text-xs">Texas Office Coordinate</span>
            <div className="space-y-1.5 font-sans font-medium text-[11px]">
              <span className="block text-slate-300 font-bold">Jack Kapphahn Roadrunner Tax</span>
              <span className="block">Longview, Texas 75601</span>
              <span className="block">Gregg County, USA</span>
              <span className="block text-slate-400 mt-2">Hours: Mon-Fri 8:00 AM - 5:00 PM</span>
            </div>
          </div>

        </div>

        <div className="max-w-4xl mx-auto border-t border-slate-800/80 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono tracking-wider">
          <span>&copy; {new Date().getFullYear()} JACK KAPPHAHN ROADRUNNER TAX • IRS REGISTERED</span>
          <span className="font-bold text-slate-300 uppercase shrink-0 py-0.5 px-2 bg-slate-800/60 rounded">
            Developed by Serwizen.
          </span>
        </div>
      </footer>

    </div>
  );
}
