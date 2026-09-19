import type { Product } from "./types";

export const products: Product[] = [
  {
    slug: "northframe-rise-pro",
    name: "Northframe Rise Pro",
    brand: "Northframe",
    category: "standing-desks",
    tagline: "Quiet dual-motor desk with a calm, durable top",
    summary:
      "A dual-motor sit-stand desk that lifts smoothly, remembers two heights, and doesn’t rattle when you type. The bamboo-look laminate top feels solid without the premium price spike of solid wood.",
    priceBand: "$450–$650",
    budget: "mid",
    priceMin: 450,
    priceMax: 650,
    imageGradient: "from-stone-700 via-amber-800 to-stone-900",
    imageAlt: "Abstract warm wood-toned standing desk illustration",
    featured: true,
    pros: [
      "Nearly silent dual motors with stable lift",
      "Two memory presets that actually stick",
      "Cable tray included — rare at this price",
      "Weight capacity handles dual-monitor arms",
    ],
    cons: [
      "Assembly takes about 45–60 minutes",
      "No built-in wireless charging",
      "Control panel is plastic, not metal",
    ],
    whoItsFor:
      "Remote workers who want a reliable everyday standing desk without paying flagship prices. Great if you share the desk and need quick height presets.",
    specs: [
      { label: "Height range", value: "28–48 in" },
      { label: "Motors", value: "Dual" },
      { label: "Top size", value: "60 × 30 in" },
      { label: "Max load", value: "265 lb" },
      { label: "Warranty", value: "5 years frame / 2 years electronics" },
    ],
    relatedSlugs: ["cedarline-flex-lite", "apex-lift-studio", "harbor-seat-ergo"],
  },
  {
    slug: "cedarline-flex-lite",
    name: "Cedarline Flex Lite",
    brand: "Cedarline",
    category: "standing-desks",
    tagline: "Budget sit-stand that still feels grown-up",
    summary:
      "A single-motor desk that keeps costs down without feeling like a folding table. Ideal for apartments and starter home offices where you stand a few hours a day.",
    priceBand: "$220–$320",
    budget: "budget",
    priceMin: 220,
    priceMax: 320,
    imageGradient: "from-teal-800 via-emerald-700 to-slate-900",
    imageAlt: "Abstract teal standing desk illustration",
    featured: false,
    pros: [
      "Lowest price that still feels stable for typing",
      "Compact 48-inch top fits tight spaces",
      "Simple up/down controls — no app needed",
    ],
    cons: [
      "Single motor is slower and a bit louder",
      "No memory presets",
      "Max load is modest for heavy monitor setups",
    ],
    whoItsFor:
      "Students, renters, and anyone testing standing desks before committing to a dual-motor frame.",
    specs: [
      { label: "Height range", value: "29–46 in" },
      { label: "Motors", value: "Single" },
      { label: "Top size", value: "48 × 24 in" },
      { label: "Max load", value: "154 lb" },
      { label: "Warranty", value: "2 years" },
    ],
    relatedSlugs: ["northframe-rise-pro", "apex-lift-studio", "keynest-quiet-65"],
  },
  {
    slug: "apex-lift-studio",
    name: "Apex Lift Studio",
    brand: "Apex Form",
    category: "standing-desks",
    tagline: "Premium frame for heavy multi-monitor setups",
    summary:
      "A three-stage dual-motor desk aimed at power users: wider stance, higher weight rating, and a thicker top that shrugs off monitor arms and a full-size dock.",
    priceBand: "$750–$1,100",
    budget: "premium",
    priceMin: 750,
    priceMax: 1100,
    imageGradient: "from-slate-800 via-indigo-900 to-zinc-950",
    imageAlt: "Abstract dark premium standing desk illustration",
    featured: true,
    pros: [
      "Exceptional stability at full height",
      "Four memory presets + sit/stand reminder",
      "Optional solid-wood top upgrade",
      "Anti-collision that works with thick rugs",
    ],
    cons: [
      "Price jumps quickly with top upgrades",
      "Heavier frame — plan delivery carefully",
      "Overkill if you mostly sit",
    ],
    whoItsFor:
      "Designers, traders, and dual/triple-monitor setups that need rock-solid lift and long-term durability.",
    specs: [
      { label: "Height range", value: "25–51 in" },
      { label: "Motors", value: "Dual, 3-stage" },
      { label: "Top size", value: "72 × 30 in" },
      { label: "Max load", value: "330 lb" },
      { label: "Warranty", value: "10 years frame / 5 years electronics" },
    ],
    relatedSlugs: ["northframe-rise-pro", "lumenview-32u", "harbor-seat-ergo"],
  },
  {
    slug: "harbor-seat-ergo",
    name: "Harbor Seat Ergo",
    brand: "Harbor Seat",
    category: "office-chairs",
    tagline: "Mid-range mesh chair with honest lumbar support",
    summary:
      "A breathable mesh chair that hits the sweet spot: adjustable lumbar, 4D armrests, and a seat that doesn’t pancake after six months. Not flashy — just comfortable for eight-hour days.",
    priceBand: "$320–$420",
    budget: "mid",
    priceMin: 320,
    priceMax: 420,
    imageGradient: "from-sky-900 via-cyan-800 to-slate-900",
    imageAlt: "Abstract blue ergonomic office chair illustration",
    featured: true,
    pros: [
      "True adjustable lumbar (height + depth)",
      "4D arms that tuck under most desks",
      "Mesh back stays cool in summer",
      "Smooth tilt tension that’s easy to dial in",
    ],
    cons: [
      "Seat pad is firmer than plush foam chairs",
      "Headrest is an add-on, not included",
      "Assembly instructions are average",
    ],
    whoItsFor:
      "Anyone who sits most of the day and wants adjustable support without a $1,000 chair budget.",
    specs: [
      { label: "Weight capacity", value: "300 lb" },
      { label: "Back", value: "Breathable mesh" },
      { label: "Armrests", value: "4D" },
      { label: "Recline", value: "90–135°" },
      { label: "Warranty", value: "7 years" },
    ],
    relatedSlugs: ["softline-cloud-task", "northframe-rise-pro", "pulse-audio-pro"],
  },
  {
    slug: "softline-cloud-task",
    name: "Softline Cloud Task",
    brand: "Softline",
    category: "office-chairs",
    tagline: "Budget task chair that won’t punish your back",
    summary:
      "A no-nonsense task chair with decent lumbar contour and a wider seat. You won’t get 4D arms, but you will get something better than the dining chair you’ve been borrowing.",
    priceBand: "$120–$180",
    budget: "budget",
    priceMin: 120,
    priceMax: 180,
    imageGradient: "from-rose-900 via-orange-800 to-stone-900",
    imageAlt: "Abstract warm-toned task chair illustration",
    featured: false,
    pros: [
      "Surprisingly supportive for the price",
      "Wide seat for different body types",
      "Lightweight and easy to move",
    ],
    cons: [
      "Fixed armrests only",
      "Fabric shows wear after heavy use",
      "Limited recline range",
    ],
    whoItsFor:
      "Part-time home offices, guest desks, and budget builds where a full ergo chair can wait.",
    specs: [
      { label: "Weight capacity", value: "250 lb" },
      { label: "Back", value: "Fabric" },
      { label: "Armrests", value: "Fixed" },
      { label: "Recline", value: "Limited tilt" },
      { label: "Warranty", value: "1 year" },
    ],
    relatedSlugs: ["harbor-seat-ergo", "cedarline-flex-lite", "keynest-quiet-65"],
  },
  {
    slug: "lumenview-32u",
    name: "LumenView 32U",
    brand: "LumenView",
    category: "monitors",
    tagline: "32-inch 4K workhorse with a stand you’ll actually raise",
    summary:
      "A sharp 32-inch 4K IPS panel aimed at writing, spreadsheets, and light creative work. The stand goes high enough for eye-level viewing without buying a separate arm on day one.",
    priceBand: "$380–$480",
    budget: "mid",
    priceMin: 380,
    priceMax: 480,
    imageGradient: "from-violet-900 via-blue-800 to-slate-950",
    imageAlt: "Abstract purple-blue monitor illustration",
    featured: true,
    pros: [
      "Crisp 4K text for coding and docs",
      "Height, tilt, and swivel on the stand",
      "USB-C with 65W laptop charging",
      "Low blue-light mode that doesn’t look muddy",
    ],
    cons: [
      "Not a gaming refresh-rate champ",
      "Speakers are tinny — use headphones",
      "Bezel is thicker than ultrawides",
    ],
    whoItsFor:
      "Knowledge workers who want one large, sharp screen and fewer cables via USB-C.",
    specs: [
      { label: "Size / res", value: "32 in / 3840×2160" },
      { label: "Panel", value: "IPS" },
      { label: "Refresh", value: "60 Hz" },
      { label: "Ports", value: "HDMI, DP, USB-C 65W" },
      { label: "VESA", value: "100×100" },
    ],
    relatedSlugs: ["clearspan-27f", "apex-lift-studio", "keynest-quiet-65"],
  },
  {
    slug: "clearspan-27f",
    name: "Clearspan 27F",
    brand: "Clearspan",
    category: "monitors",
    tagline: "Affordable 27-inch FHD for focused single-screen setups",
    summary:
      "A clean 27-inch Full HD monitor with good brightness and a basic height-adjustable stand. Perfect as a secondary display or a first upgrade from a laptop screen.",
    priceBand: "$140–$190",
    budget: "budget",
    priceMin: 140,
    priceMax: 190,
    imageGradient: "from-zinc-700 via-slate-600 to-zinc-900",
    imageAlt: "Abstract gray monitor illustration",
    featured: false,
    pros: [
      "Bright, even panel for the price",
      "Height-adjustable stand included",
      "Easy on the eyes for long reading sessions",
    ],
    cons: [
      "FHD on 27 inches — not for pixel-peepers",
      "No USB-C",
      "Plastic stand feels light",
    ],
    whoItsFor:
      "Budget builds and secondary screens where 4K would be wasted on email and docs.",
    specs: [
      { label: "Size / res", value: "27 in / 1920×1080" },
      { label: "Panel", value: "IPS" },
      { label: "Refresh", value: "75 Hz" },
      { label: "Ports", value: "HDMI, VGA" },
      { label: "VESA", value: "75×75" },
    ],
    relatedSlugs: ["lumenview-32u", "cedarline-flex-lite", "softline-cloud-task"],
  },
  {
    slug: "keynest-quiet-65",
    name: "Keynest Quiet 65",
    brand: "Keynest",
    category: "keyboards-mice",
    tagline: "Low-profile mechanical that won’t annoy the household",
    summary:
      "A 65% low-profile mechanical keyboard with dampened switches. Compact enough for laptop-plus-desk setups, quiet enough for late-night work next to sleeping kids.",
    priceBand: "$90–$130",
    budget: "mid",
    priceMin: 90,
    priceMax: 130,
    imageGradient: "from-amber-900 via-yellow-800 to-stone-950",
    imageAlt: "Abstract amber compact keyboard illustration",
    featured: true,
    pros: [
      "Genuinely quiet for a mechanical board",
      "65% layout frees desk space",
      "Hot-swap switches for tinkering later",
      "Solid wireless + wired modes",
    ],
    cons: [
      "Learning curve if you’re used to full-size",
      "Keycaps are PBT but not shine-proof forever",
      "No number pad — accountants beware",
    ],
    whoItsFor:
      "Writers and developers who want tactile typing without the clack soundtrack.",
    specs: [
      { label: "Layout", value: "65%" },
      { label: "Switches", value: "Low-profile quiet linear" },
      { label: "Connectivity", value: "2.4 GHz / BT / USB-C" },
      { label: "Battery", value: "~40 hrs backlight on" },
      { label: "Hot-swap", value: "Yes" },
    ],
    relatedSlugs: ["glidepoint-ergo-mouse", "northframe-rise-pro", "pulse-audio-pro"],
  },
  {
    slug: "glidepoint-ergo-mouse",
    name: "GlidePoint Ergo Mouse",
    brand: "GlidePoint",
    category: "keyboards-mice",
    tagline: "Vertical mouse that reduces wrist twist",
    summary:
      "A vertical wireless mouse shaped to keep your forearm more neutral. Sensor is accurate enough for design work; shape takes a few days to feel natural.",
    priceBand: "$45–$70",
    budget: "budget",
    priceMin: 45,
    priceMax: 70,
    imageGradient: "from-lime-900 via-green-800 to-emerald-950",
    imageAlt: "Abstract green ergonomic mouse illustration",
    featured: false,
    pros: [
      "Noticeably less wrist pronation",
      "Reliable wireless with long battery life",
      "Quiet clicks for shared spaces",
    ],
    cons: [
      "Adjustment period of 3–7 days",
      "Not ideal for fast FPS gaming",
      "Only two thumb buttons",
    ],
    whoItsFor:
      "Anyone with wrist fatigue from a flat mouse who still needs everyday precision.",
    specs: [
      { label: "Shape", value: "Vertical / right-hand" },
      { label: "DPI", value: "800–2400" },
      { label: "Connectivity", value: "2.4 GHz + BT" },
      { label: "Battery", value: "Up to 6 months" },
      { label: "Buttons", value: "6" },
    ],
    relatedSlugs: ["keynest-quiet-65", "harbor-seat-ergo", "framecam-1080"],
  },
  {
    slug: "framecam-1080",
    name: "FrameCam 1080",
    brand: "FrameCam",
    category: "webcams-audio",
    tagline: "Sharp 1080p webcam with auto-framing that isn’t creepy",
    summary:
      "A clip-on 1080p webcam with solid low-light performance and gentle auto-framing. Looks better than most laptop cams without needing a DSLR on a desk clamp.",
    priceBand: "$70–$110",
    budget: "mid",
    priceMin: 70,
    priceMax: 110,
    imageGradient: "from-fuchsia-900 via-purple-800 to-slate-950",
    imageAlt: "Abstract purple webcam illustration",
    featured: false,
    pros: [
      "Natural color in typical room lighting",
      "Auto-framing that doesn’t over-zoom",
      "Privacy shutter built in",
      "Works on Windows and macOS without drivers",
    ],
    cons: [
      "Not 4K — fine for calls, not for streaming heroes",
      "Mic is okay, not great",
      "Clip can loosen on thick monitor tops",
    ],
    whoItsFor:
      "Hybrid workers who want to look put-together on Zoom without a full camera kit.",
    specs: [
      { label: "Resolution", value: "1080p30" },
      { label: "FOV", value: "78°" },
      { label: "Features", value: "Auto-frame, shutter" },
      { label: "Mic", value: "Dual stereo" },
      { label: "Mount", value: "Clip / tripod thread" },
    ],
    relatedSlugs: ["pulse-audio-pro", "lumenview-32u", "glowbar-desk-pro"],
  },
  {
    slug: "pulse-audio-pro",
    name: "Pulse Audio Pro",
    brand: "Pulse Audio",
    category: "webcams-audio",
    tagline: "Wireless ANC headphones for deep focus and clear calls",
    summary:
      "Over-ear headphones with effective noise canceling, all-day battery, and a boom-mic mode via the included detachable mic — rare in this category and useful for long meetings.",
    priceBand: "$180–$250",
    budget: "mid",
    priceMin: 180,
    priceMax: 250,
    imageGradient: "from-cyan-900 via-sky-800 to-blue-950",
    imageAlt: "Abstract cyan headphones illustration",
    featured: true,
    pros: [
      "ANC that handles HVAC and street noise",
      "Detachable boom mic for clearer calls",
      "Comfortable clamps for 4+ hour wear",
      "Multipoint Bluetooth for laptop + phone",
    ],
    cons: [
      "Case is bulky for travel",
      "App EQ is limited",
      "Not the absolute best for music audiophiles",
    ],
    whoItsFor:
      "People who take a lot of calls and need both focus and a mic that doesn’t sound like a tunnel.",
    specs: [
      { label: "ANC", value: "Hybrid active" },
      { label: "Battery", value: "Up to 35 hrs ANC on" },
      { label: "Connectivity", value: "BT 5.3 + USB-C dongle" },
      { label: "Mic", value: "Built-in + boom add-on" },
      { label: "Weight", value: "9.1 oz" },
    ],
    relatedSlugs: ["framecam-1080", "harbor-seat-ergo", "keynest-quiet-65"],
  },
  {
    slug: "glowbar-desk-pro",
    name: "GlowBar Desk Pro",
    brand: "GlowBar",
    category: "webcams-audio",
    tagline: "Bias + task lighting that flatters video and reduces eye strain",
    summary:
      "A dual-arm desk light with warm-to-cool color control and a soft rear bias glow for your monitor. Makes evening work easier on the eyes and video calls less cave-like.",
    priceBand: "$55–$85",
    budget: "budget",
    priceMin: 55,
    priceMax: 85,
    imageGradient: "from-yellow-700 via-amber-600 to-orange-900",
    imageAlt: "Abstract warm desk lighting illustration",
    featured: false,
    pros: [
      "Flicker-free dimming across the range",
      "Monitor bias light improves perceived contrast",
      "USB-powered — no wall wart hunt",
    ],
    cons: [
      "Arms are plastic, not aluminum",
      "No smart-home integration",
      "Brightest setting can wash out pale walls",
    ],
    whoItsFor:
      "Anyone on video often, or who works late and wants less glare and eye fatigue.",
    specs: [
      { label: "Color temp", value: "3000–6500K" },
      { label: "Power", value: "USB-C 10W" },
      { label: "Modes", value: "Task + bias" },
      { label: "Dimming", value: "Stepless" },
      { label: "Mount", value: "Clamp / weighted base" },
    ],
    relatedSlugs: ["framecam-1080", "lumenview-32u", "northframe-rise-pro"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
}
