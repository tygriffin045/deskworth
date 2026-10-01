export type CategorySlug =
  | "standing-desks"
  | "office-chairs"
  | "monitors"
  | "keyboards-mice"
  | "webcams-audio"
  | "monitor-arms"
  | "desk-mats"
  | "laptop-stands"
  | "usb-c-docks"
  | "standing-mats"
  | "cable-management"
  | "footrests"
  | "desk-power"
  | "desk-converters"
  | "boom-arms"
  | "desk-organizers"
  | "wrist-rests"
  | "desk-lamps";

export type BudgetBand = "budget" | "mid" | "premium";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  tagline: string;
  summary: string;
  priceBand: string;
  budget: BudgetBand;
  priceMin: number;
  priceMax: number;
  imageGradient: string;
  imageAlt: string;
  /** Amazon CDN product image when available */
  imageUrl?: string;
  featured: boolean;
  pros: string[];
  cons: string[];
  whoItsFor: string;
  specs: ProductSpec[];
  relatedSlugs: string[];
  /** Amazon ASIN when known — preferred for affiliate links */
  amazonAsin?: string;
  /** Amazon search query used until a real ASIN is set */
  amazonQuery: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  shortLabel: string;
}

export interface GuidePick {
  productSlug: string;
  /** Short award label, e.g. "Best for most desks" */
  award: string;
  /** One-line reason shown in the quick-pick summary */
  quickNote: string;
  verdict: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideLink {
  href: string;
  label: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** Optional SEO overrides (fall back to title / description) */
  metaTitle?: string;
  metaDescription?: string;
  readingTime: string;
  publishedAt: string;
  productSlugs: string[];
  sections: { heading: string; body: string }[];
  /** Buying-guide format: ranked picks with pros/cons (rendered before sections) */
  picks?: GuidePick[];
  /** Short buying-criteria checklist */
  criteria?: { heading: string; body: string }[];
  /** FAQ entries — also emitted as FAQPage JSON-LD */
  faqs?: GuideFaq[];
  /** Other guides worth reading next (slugs of existing guides) */
  relatedGuideSlugs?: string[];
  /** Extra internal links (compares, categories) */
  relatedLinks?: GuideLink[];
}
