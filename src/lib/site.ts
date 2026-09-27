/** Single source of truth for the canonical site origin (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://desk.theworthguide.com"
).replace(/\/+$/, "");
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_NAME = "DeskWorth";
export const SITE_TITLE = "DeskWorth — Honest picks for a better home office";
export const SITE_DESCRIPTION =
  "Editorial reviews and buying guides for standing desks, ergonomic chairs, monitors, keyboards, webcams, and home office accessories — tradeoffs spelled out, no invented scores.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
export const DEFAULT_OG_IMAGE_METADATA = {
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: "DeskWorth — honest picks for a better home office",
};

/** Category → related guide / compare paths for internal linking (only real routes). */
export const CATEGORY_CROSS_LINKS: Partial<
  Record<
    string,
    { guides?: { href: string; label: string }[]; compares?: { href: string; label: string }[] }
  >
> = {
  "standing-desks": {
    guides: [
      { href: "/guides/how-to-choose-a-standing-desk", label: "How to choose a standing desk" },
      {
        href: "/guides/sit-stand-converter-vs-standing-desk",
        label: "Converter vs standing desk",
      },
      {
        href: "/guides/best-power-strip-for-standing-desk",
        label: "Best power strip for a standing desk",
      },
    ],
    compares: [{ href: "/compare", label: "Standing desk comparison" }],
  },
  "desk-converters": {
    guides: [
      {
        href: "/guides/sit-stand-converter-vs-standing-desk",
        label: "Converter vs standing desk",
      },
    ],
    compares: [{ href: "/compare/desk-converters", label: "Desk converter comparison" }],
  },
  "monitor-arms": {
    guides: [
      { href: "/guides/how-to-choose-a-monitor-arm", label: "How to choose a monitor arm" },
    ],
    compares: [{ href: "/compare/monitor-arms", label: "Monitor arm comparison" }],
  },
  "standing-mats": {
    guides: [
      { href: "/guides/best-standing-desk-mat", label: "Best standing desk mat" },
    ],
    compares: [{ href: "/compare/standing-mats", label: "Standing mat comparison" }],
  },
  "usb-c-docks": {
    compares: [{ href: "/compare/usb-c-docks", label: "USB-C dock comparison" }],
  },
  "cable-management": {
    guides: [
      {
        href: "/guides/best-power-strip-for-standing-desk",
        label: "Best power strip for a standing desk",
      },
    ],
    compares: [{ href: "/compare/cable-management", label: "Cable management comparison" }],
  },
  "boom-arms": {
    compares: [{ href: "/compare/boom-arms", label: "Boom arm comparison" }],
  },
  "office-chairs": {
    guides: [
      {
        href: "/guides/ergonomic-home-office-starter-kit",
        label: "Ergonomic starter kit",
      },
      {
        href: "/guides/best-footrest-for-short-people",
        label: "Best footrest for short people",
      },
    ],
  },
  "laptop-stands": {
    guides: [
      { href: "/guides/best-laptop-stand-for-desk", label: "Best laptop stand for a desk" },
    ],
  },
  footrests: {
    guides: [
      {
        href: "/guides/best-footrest-for-short-people",
        label: "Best footrest for short people",
      },
    ],
  },
  "desk-power": {
    guides: [
      {
        href: "/guides/best-power-strip-for-standing-desk",
        label: "Best power strip for a standing desk",
      },
    ],
    compares: [{ href: "/compare/cable-management", label: "Cable management comparison" }],
  },
};

export function websiteOrganizationLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
  ];
}
