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
  {
    slug: "standing-mats",
    name: "Anti-Fatigue Standing Mats",
    shortLabel: "Stand mats",
    description:
      "Floor mats that make standing sessions lasting — textured Topo-style terrain versus dense flat foam, matched to how long you actually stand.",
  },
  {
    slug: "cable-management",
    name: "Cable Management",
    shortLabel: "Cables",
    description:
      "Under-desk trays, J-channel raceways, and cord covers that keep power bricks and HDMI runs out of the lift path and off the floor.",
  },
  {
    slug: "footrests",
    name: "Footrests",
    shortLabel: "Footrests",
    description:
      "Under-desk footrests that fix dangling feet and restless legs — rocking plastic platforms versus memory-foam cushions.",
  },
  {
    slug: "desk-power",
    name: "Desk Power & Charging",
    shortLabel: "Power",
    description:
      "Surge strips, USB desk chargers, and clamp-mounted power bars that feed monitors, docks, and phones without a floor tangle.",
  },
  {
    slug: "desk-converters",
    name: "Sit-Stand Desk Converters",
    shortLabel: "Converters",
    description:
      "Desktop risers that turn a fixed desk into sit-stand — keep the furniture you already own and lift the work surface instead.",
  },
  {
    slug: "boom-arms",
    name: "Mic & Webcam Boom Arms",
    shortLabel: "Boom arms",
    description:
      "Desk-clamp boom arms that get mics and cameras off the desk surface — low-profile streamer arms versus broadcast spring mounts.",
  },
  {
    slug: "desk-organizers",
    name: "Desk Organizers",
    shortLabel: "Organizers",
    description:
      "File trays, mesh caddies, and drawer bins that clear the desktop so keyboard, mouse, and notebook actually have room.",
  },
  {
    slug: "wrist-rests",
    name: "Wrist Rests & Palm Supports",
    shortLabel: "Wrist rests",
    description:
      "Keyboard and mouse wrist supports that reduce hard-edge pressure on long typing days — foam sets versus classic gel pads.",
  },,
  {
    slug: "desk-lighting",
    name: "Desk Lighting",
    shortLabel: "Lighting",
    description: "Monitor lights and desk lamps that light the work, not the ceiling.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}