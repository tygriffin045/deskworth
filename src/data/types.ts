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
  | "wrist-rests";

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

export interface Guide {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  productSlugs: string[];
  sections: { heading: string; body: string }[];
}
