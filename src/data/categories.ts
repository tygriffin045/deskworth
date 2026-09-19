import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "standing-desks",
    name: "Standing Desks",
    shortLabel: "Desks",
    description:
      "Electric and manual sit-stand desks that help you move through the workday without wrecking your posture — or your floors.",
  },
  {
    slug: "office-chairs",
    name: "Office Chairs",
    shortLabel: "Chairs",
    description:
      "Ergonomic chairs built for long sessions: lumbar support that actually supports, seats that don’t go flat, and adjustments you’ll use.",
  },
  {
    slug: "monitors",
    name: "Monitors",
    shortLabel: "Monitors",
    description:
      "Displays for focus and comfort — sharp text, sensible sizes, and stands that let you raise the screen to eye level.",
  },
  {
    slug: "monitor-arms",
    name: "Monitor Arms",
    shortLabel: "Arms",
    description:
      "VESA arms that reclaim desk space and put screens at eye level — single or dual mounts with clamp and grommet options.",
  },
  {
    slug: "desk-mats",
    name: "Desk Mats & Pads",
    shortLabel: "Mats",
    description:
      "Large desk mats and pads that protect the surface, quiet your mouse, and give keyboard and pointer a consistent glide.",
  },
  {
    slug: "laptop-stands",
    name: "Laptop Stands",
    shortLabel: "Stands",
    description:
      "Risers that lift the screen toward eye level for healthier posture — fixed aluminum classics and portable travel stands.",
  },
  {
    slug: "usb-c-docks",
    name: "USB-C Docks & Hubs",
    shortLabel: "Docks",
    description:
      "USB-C hubs and Thunderbolt docks that expand ports, charge the laptop, and drive external displays with fewer adapters.",
  },
  {
    slug: "keyboards-mice",
    name: "Keyboards & Mice",
    shortLabel: "Input",
    description:
      "Keyboards and pointing devices that reduce strain: quiet switches, sensible layouts, and shapes that fit real hands.",
  },
  {
    slug: "webcams-audio",
    name: "Webcams & Audio",
    shortLabel: "AV",
    description:
      "Webcams, mics, and headphones so you look and sound clear on calls without turning your desk into a studio.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
