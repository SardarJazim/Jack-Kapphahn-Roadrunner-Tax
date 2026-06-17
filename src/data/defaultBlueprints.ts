import { CustomizeState, PageBlueprint } from "../types";

export const DEFAULT_STATE: CustomizeState = {
  firm: {
    name: "Jack Kapphahn Roadrunner Tax",
    location: "Longview, Texas",
    phone: "+19037594700",
    email: "contact@roadrunnertax.com",
    hours: "Monday - Friday: 8:00 AM - 5:00 PM (Saturdays by appointment during tax season)",
    experience: "Over 15 years serving the East Texas business community",
    credentials: "IRS Registered Tax Prep Specialists / Bookkeepers / QuickBooks ProAdvisors"
  },
  themeColor: "navy",
  typography: "space-grotesk",
  targetStack: "flask",
  tone: "trustworthy",
  includeAnnouncement: true,
  announcementText: "Now Booking 2026 Tax Planning & Compliance Consultations - Call +19037594700 today!",
  selectedPages: [
    "home",
    "about",
    "services",
    "team",
    "industries",
    "testimonials",
    "faq",
    "blog",
    "contact"
  ],
  selectedIndustries: [
    "Oil & Gas / Royalties",
    "Construction & Contractors",
    "Small Business & Startups",
    "Healthcare & Medical",
    "Real Estate & Property Management"
  ],
  additionalNotes: "Emphasize CPA-level precision and deep knowledge of Texas state franchise tax laws and local county compliance. Include our iconic roadrunner emblem in header design.",
  interactiveFeatures: [
    "Interactive Consultation Form (linked to dynamic post route)",
    "Expandable FAQ Accordions",
    "Interactive Services Fee Self-Calculator Estimates"
  ]
};

export const COLOR_PALETTES = [
  { id: "navy", name: "Classic Navy & Slate Blue", primary: "text-blue-900", bg: "bg-blue-900", colors: ["#1e3a8a", "#475569", "#f8fafc"], desc: "Most popular for accounting: trustworthy, stable, professional" },
  { id: "charcoal", name: "Corporate Gray & Teal", primary: "text-teal-700", bg: "bg-slate-800", colors: ["#1f2937", "#0f766e", "#f3f4f6"], desc: "Modern tech-forward compliance feel: clean, fast, accurate" },
  { id: "emerald", name: "Deep Green & Charcoal", primary: "text-emerald-800", bg: "bg-emerald-900", colors: ["#064e3b", "#374151", "#ffffff"], desc: "Signals wealth, stability, financial growth, and advisory precision" },
  { id: "gold", name: "Rich Charcoal & Gold Accent", primary: "text-yellow-600", bg: "bg-neutral-900", colors: ["#171717", "#d97706", "#f5f5f5"], desc: "High-end premium wealth management/advisory focus" }
];

export const TYPOGRAPHY_OPTIONS = [
  { id: "space-grotesk", name: "Space Grotesk + Inter", display: "Space Grotesk", body: "Inter", desc: "Tech-forward, premium, balanced" },
  { id: "playfair", name: "Playfair Display + Inter", display: "Playfair Display", body: "Inter", desc: "Traditional, established, premium editorial" },
  { id: "jetbrains", name: "JetBrains Mono + Inter", display: "JetBrains Mono", body: "Inter", desc: "Modern brutalist, high accuracy, absolute precision look" },
  { id: "outfit", name: "Outfit + Outfit", display: "Outfit", body: "Outfit", desc: "Sleek, geometric, corporate friendly" }
];

export const TARGET_STACKS = [
  { id: "flask", name: "Flask (Python) + Jinja & Tailwind", desc: "Generates HTML templates styled with Tailwind, perfect for Flask-based deployments." },
  { id: "react", name: "React (Vite) + Tailwind & Motion", desc: "Modern client-side Single Page App with fluid micro-interactive transitions." },
  { id: "html", name: "Pure Semantic HTML5 + Vanilla JS + CSS", desc: "Direct, ultra-fast static loading layout compatible with raw website builders." }
];

export const TONE_OPTIONS = [
  { id: "trustworthy", name: "Trustworthy & Established", desc: "Emphasizes longevity, compliance, and friendly local service." },
  { id: "modern", name: "Fast & Tech-Enabled", desc: "Emphasizes cloud accounting, paperless tax prep, and tech stack efficiency." },
  { id: "conversion", name: "Direct & Call-to-Action Heavy", desc: "High conversion layouts with large inquiry cards on every scroll fold." }
];

export const ALL_INDUSTRIES = [
  "Oil & Gas / Royalties",
  "Construction & Contractors",
  "Small Business & Startups",
  "Healthcare & Medical",
  "Real Estate & Property Management",
  "Professional Services Integration",
  "Retail & E-commerce",
  "Nonprofits & Community Programs"
];

export const BLUEPRINTS: Record<string, PageBlueprint> = {
  home: {
    id: "home",
    title: "Home Page",
    summary: "Establish financial trust, highlight expertise, and route prospects to consultation bookings.",
    sections: [
      "Top Announcement Bar (seasonal tax booking info)",
      "Hero Fold (Firm Headline, Trust badge list, Action CTAs, Roadrunner emblem layout)",
      "Instant Tax Advisory Video placeholder or main greeting",
      "Interactive Consultation Scheduler Intake card",
      "Core Services Grid (Tax preparation, bookkeeping, custom options)",
      "Why Choose Roadrunner Tax (experience, Longview local engagement)",
      "Target Texas Industries Showcase",
      "Direct phone helpline callback triggers",
      "Professional Footer"
    ],
    images: [
      "Expert advisor review session representing CPA professionalism",
      "Clean financial dashboard charts on modern desktop",
      "Historic Longview landmarks or styled local business facade"
    ],
    copyDirectives: [
      "Main Headline: East Texas Bookkeeping & Tax Services Formulated for Absolute Accuracy",
      "Subheading: Jack Kapphahn Roadrunner Tax delivers CPA-level tax advisory, paperless bookkeeping, and local business support straight from Longview.",
      "CTA Button Text: Book Free Consultation"
    ]
  },
  about: {
    id: "about",
    title: "About Us Page",
    summary: "Deliver localized credibility and showcase credentials that validate tax compliance mastery.",
    sections: [
      "Company story & legacy in Texas",
      "Mission & core values of high-trust accountability",
      "Credentials grid (Enrolled agents, ProAdvisor certs, tax specialist badges)",
      "Texas state compliance and policy commitments",
      "Visual timeline of steady firm growth in East Texas"
    ],
    images: [
      "Jack Kapphahn or lead tax specialists consulting at a desk",
      "Trust certificate close-ups, badges, and QuickBooks ProAdvisor badges"
    ],
    copyDirectives: [
      "Legacy focus: Boldly state 'Over 15 years of stabilizing financial statements and filing complex federal and state returns for Longview families.'",
      "Values emphasized: Integrity, Absolute Accuracy, Personalized Service, Proactive Year-Round Tax Planning."
    ]
  },
  services: {
    id: "services",
    title: "Services Main & Sub-Pages",
    summary: "Detailed overview of the four primary accounting pillars.",
    sections: [
      "Interactive Tabs or Cards mapping to Services",
      "Tax Preparation & Planning section with multi-tier tax season guidance",
      "Bookkeeping Services division (accounts receivable/payable, custom reconciliation)",
      "Payroll Services division (automated deposits, federal 940/941 filers, W2/1099 exports)",
      "Business Advisory / Strategic CFO Services (wealth planning, cost optimization layouts)"
    ],
    images: [
      "Organized IRS forms, tablets displaying spreadsheet sheets",
      "Friendly handshakes after business plan alignment meetings"
    ],
    copyDirectives: [
      "Highlight: We take the anxiety out of filing. Don't just prepare for taxes in April; plan for them year-round in Texas.",
      "Bookkeeping motto: Clean ledgers mean clean business profits. Reclaim your weekends while we manage the audits."
    ]
  },
  team: {
    id: "team",
    title: "Team Page",
    summary: "Bring human connection to the numbers with specialist profiles.",
    sections: [
      "Header encouraging direct expert-client relationship trust",
      "Leader Profile Cards showing specialized credentials",
      "Tax preparation advisors grid",
      "Dedicated bookkeeping specialists grid",
      "Call to Action matching client to service fields"
    ],
    images: [
      "Professional team headshots with natural workspace lighting",
      "Candid shots of team members collaborating in the office"
    ],
    copyDirectives: [
      "Bio headers: Experienced advisors who know the IRS tax code inside and out.",
      "Credentials to mention: Certified QuickBooks ProAdvisors, Tax Compliance Experts."
    ]
  },
  industries: {
    id: "industries",
    title: "Industries Served Page",
    summary: "Prove customized expertise in deep Texas-centric sectors.",
    sections: [
      "Custom tabs showing solution pages per industry vertical",
      "Texas Oil & Gas, mineral rights, and energy royalty accounting",
      "Construction & contracting multi-stage job costing and audit logs",
      "Medical & Dental clinic practice compliance layouts",
      "E-commerce & retail physical inventory state tracking"
    ],
    images: [
      "Industrial energy rigs, building blueprints, medicine offices",
      "Structured accounting panels illustrating sector tracking parameters"
    ],
    copyDirectives: [
      "Key Texas context: We understand complex mineral rights, joint interest billing, and Texas franchise tax structures. No generic cookie-cutter advice."
    ]
  },
  testimonials: {
    id: "testimonials",
    title: "Testimonials Page",
    summary: "Host social proof through client quotes, business growth highlights, and reviews.",
    sections: [
      "High impact quote headers",
      "Responsive review cards grid",
      "Case highlight cards showing tax savings metrics before/after",
      "Link to public Google Review check-in anchors"
    ],
    images: [
      "Smiling Texas local business owners on their storefront property"
    ],
    copyDirectives: [
      "Review sample: 'Jack and the Roadrunner Tax team saved my contractor business thousands in franchise taxes. The bookkeeping is seamless.'",
      "Growth metrics: 4.9 Star Rating on Local Reviews."
    ]
  },
  faq: {
    id: "faq",
    title: "FAQ Page",
    summary: "Address direct questions on consultation fees, document uploads, and tax preparation.",
    sections: [
      "Category tabs (Tax Prep, Bookkeeping, Onboarding)",
      "Interactive accordion panels displaying key compliance questions",
      "Ask a custom question block with an email routing target"
    ],
    images: [
      "Friendly support visual with an inquiry placeholder illustration"
    ],
    copyDirectives: [
      "Tax audit questions addressed: 'What documents do I need to bring for tax preparation?' Answer: Checklists for 1099s, W2s, and business receipts checklist provided.",
      "Process questions: 'How often are books updated?' Answer: Weekly or monthly options to keep financial reporting current."
    ]
  },
  blog: {
    id: "blog",
    title: "Blog / Financial Resources",
    summary: "Establishes authority with articles mapping to strategic bookkeeping.",
    sections: [
      "Featured article layout (e.g., Texas state tax guidelines for 1099 contractors)",
      "Latest articles grid with categories",
      "Search and newsletter signup forms for year-round filing alerts"
    ],
    images: [
      "Office calculator with notebook, financial charts",
      "Digital tax filing mobile screen mockup"
    ],
    copyDirectives: [
      "Featured Title: How East Texas Contractors Can Avoid Common 1099 Audits",
      "Resource title: Small Business Checklist: Organizing Your Deductions Year-Round"
    ]
  },
  contact: {
    id: "contact",
    title: "Contact & Consultation",
    summary: "Route client contact directly with fields tailored to accounting requirements.",
    sections: [
      "Consultation Intake Form integrated with Flask actions",
      "Physical Office maps (indicating Longview TX coordinates)",
      "Official Contact Details card (phone, email, secure fax)",
      "Operating hours with weekend seasonal details"
    ],
    images: [
      "Beautiful map overlay depicting East Texas / Longview coordinate bounds"
    ],
    copyDirectives: [
      "Address target: Longview, Texas. Phone: +19037594700",
      "Form text: Select required service: [Personal Tax Preparation | Business Tax Strategy | Bookkeeping Services | Payroll Setup | Custom Advisor Session]"
    ]
  }
};

export function generatePromptMarkdown(state: CustomizeState): string {
  const palette = COLOR_PALETTES.find((p) => p.id === state.themeColor) || COLOR_PALETTES[0];
  const typo = TYPOGRAPHY_OPTIONS.find((t) => t.id === state.typography) || TYPOGRAPHY_OPTIONS[0];
  const stack = TARGET_STACKS.find((s) => s.id === state.targetStack) || TARGET_STACKS[0];
  const tone = TONE_OPTIONS.find((t) => t.id === state.tone) || TONE_OPTIONS[0];

  const pagesText = state.selectedPages
    .map((p) => {
      const b = BLUEPRINTS[p];
      if (!b) return "";
      return `### ${b.title}
* **Goal**: ${b.summary}
* **Core Structuring Sections**:
${b.sections.map((s) => `  - ${s}`).join("\n")}
* **Imagery Description**:
${b.images.map((i) => `  - ${i}`).join("\n")}
* **Copywriting Guidance & Directives**:
${b.copyDirectives.map((c) => `  - ${c}`).join("\n")}
`;
    })
    .filter(Boolean)
    .join("\n---\n\n");

  const promoSection = state.includeAnnouncement
    ? `* **Top Announcement Bar Active**: "${state.announcementText}"`
    : `* **Top Announcement Bar**: Disabled`;

  const interactiveSection = state.interactiveFeatures.length > 0
    ? state.interactiveFeatures.map((f) => `- ${f}`).join("\n")
    : "No custom interactive components.";

  const industriesSection = state.selectedIndustries.length > 0
    ? state.selectedIndustries.map((ind) => `- ${ind}`).join("\n")
    : "General Small Business";

  return `# SYSTEM PROMPT: AI WEBSITE BUILDER DIRECTIVE
# TARGET PRODUCT: PREMIUM MULTI-PAGE ACCOUNTING FIRM WEBSITE
# DEVELOPER CREDIT INSTRUCTIONS: Include "Developed by Serwizen." in footer.

You are acting as an elite, senior front-end software architect and financial UX strategist. Your goal is to write a pristine, content-rich, highly professional corporate Accounting website.

---

## 1. ESSENTIAL FIRM METADATA
* **Accounting Firm Name**: ${state.firm.name}
* **Primary Location**: ${state.firm.location}
* **Contact Phone Number**: ${state.firm.phone}
* **Inquiry Email**: ${state.firm.email}
* **Operating Hours**: ${state.firm.hours}
* **Credentials & Badges**: ${state.firm.credentials}
* **Firm Heritage**: ${state.firm.experience}

---

## 2. DESIGN & BRANDING IDENTITY
* **Target Architecture / Stack**: **${stack.name}** (${stack.desc})
* **Brand Vibe & Tone**: **${tone.name}** (${tone.desc})
* **Color Palette Standard**: 
  - Primary Theme Selected: ${palette.name}
  - Primary Color Hex: ${palette.colors[0]}
  - Secondary Accent Color Hex: ${palette.colors[1]}
  - Background Base Hex: ${palette.colors[2]}
  - Palette Philosophy: ${palette.desc}
* **Typography Pairing Guide**:
  - Display Headers: "${typo.display}"
  - Body Paragraphs: "${typo.body}" (Inter/Slab based)
  ${promoSection}

---

## 3. CORE INTERACTIVE FEATURES TO OPERATIONALIZE
${interactiveSection}

---

## 4. DEEP TEXAS INDUSTRY TARGETS
Our client base in East Texas is highly targeted. Every reference to business services must explicitly highlight and map to the financial, accounting, tax planning, and filing needs of:
${industriesSection}

---

## 5. REVENUE-DRIVING CONSULTATION FUNNEL
Implement a high-fidelity Consultation Intake module as a central CTA block on the website pages.
* Form layout should contain fields:
  - Full Name (required)
  - Registered Business Name
  - Primary Contact Number & Email Address
  - Service Type Picker: Tax Preparation, Full-Scale Bookkeeping, Payroll Setup, CFO Consulting, IRS Dispute Advisor
  - Estimated Annual Revenue bounds
  - Texas County/City check

---

## 6. MULTI-PAGE WIREFRAME INDEX & COMPREHENSIVE TEXT SPECIFICATION
Build a fully integrated structure with real, robust copy. Prevent mock content, lorem ipsum text, or broken modules. Every section must have professional financial writing. No placeholders.

${pagesText}

---

## 7. CRITICAL CODING AND STYLE RULES
1. **Responsive Fluidity**: Implement fully responsive layouts across mobile standard widths (44px target touch sizes), tables, and ultra-wide responsive bounds.
2. **Typography**: Ensure perfect readability, contrast rations, and elegant spacing. Use the listed fonts strictly.
3. **Icons & Emblems**: Include standard professional outline icons from the lucide library (specifically: calculator, shield-check, trending-up, file-text, users, map-pin, phone, mail, calendar, ChevronRight). Add a styled silhouette representing the Roadrunner Tax brand identity next to the navbar text.
4. **Imagery Quality**: Use clean, descriptive royalty-free URLs. Always handle error fallbacks with graceful CSS frames. Do not display broken image indicators.
5. **Form Integration**: Connect the Contact & Consultation forms to a clean POST endpoint handler (/api/consultation) mapping state correctly. Return immediate clean confirmation messages.
6. **Footer Requirements**:
  - Dynamically render current year (2026)
  - Include navigation routes to all customized pages
  - Complete phone, email, and address info
  - Developer Credit: MUST print "Developed by Serwizen." in clean, readable negative space.

---

## 8. CUSTOM INJECTS & STRATEGIC ENHANCEMENTS
${state.additionalNotes || "None provided"}
`;
}
