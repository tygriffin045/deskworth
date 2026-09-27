import type { CategorySlug } from "./types";
import { getCategory } from "./categories";

export interface NavCategoryLink {
  slug: CategorySlug;
  href: string;
  label: string;
  shortLabel: string;
}

export interface NavGroup {
  id: string;
  label: string;
  description: string;
  categorySlugs: CategorySlug[];
}

/** Shop mega-menu / mobile sheet groups — single source of truth for IA. */
export const navGroups: NavGroup[] = [
  {
    id: "desks-seating",
    label: "Desks & seating",
    description: "Sit-stand surfaces, chairs, and standing comfort",
    categorySlugs: [
      "standing-desks",
      "desk-converters",
      "office-chairs",
      "footrests",
      "standing-mats",
    ],
  },
  {
    id: "screens-mounts",
    label: "Screens & mounts",
    description: "Displays, arms, and laptop height",
    categorySlugs: ["monitors", "monitor-arms", "laptop-stands"],
  },
  {
    id: "input-audio",
    label: "Input & audio",
    description: "Keyboards, pointing, calls, and wrist support",
    categorySlugs: [
      "keyboards-mice",
      "webcams-audio",
      "boom-arms",
      "wrist-rests",
    ],
  },
  {
    id: "desk-setup",
    label: "Desk setup",
    description: "Mats, cables, power, docks, and organizers",
    categorySlugs: [
      "desk-mats",
      "cable-management",
      "desk-power",
      "usb-c-docks",
      "desk-organizers",
    ],
  },
];

export function getNavGroupLinks(group: NavGroup): NavCategoryLink[] {
  return group.categorySlugs.map((slug) => {
    const cat = getCategory(slug);
    if (!cat) {
      throw new Error(`nav group "${group.id}" references unknown category: ${slug}`);
    }
    return {
      slug,
      href: `/categories/${slug}`,
      label: cat.name,
      shortLabel: cat.shortLabel,
    };
  });
}

export function getAllNavGroupsWithLinks() {
  return navGroups.map((group) => ({
    ...group,
    links: getNavGroupLinks(group),
  }));
}
