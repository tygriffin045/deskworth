import type { Guide } from "./types";

export const guides: Guide[] = [
  {
    slug: "how-to-choose-a-standing-desk",
    title: "How to Choose a Standing Desk (Without Overpaying)",
    description:
      "Motors, stability, size, and warranties — a practical checklist so you buy once and actually use the standing positions.",
    readingTime: "8 min read",
    publishedAt: "2026-08-12",
    productSlugs: [
      "cedarline-flex-lite",
      "northframe-rise-pro",
      "apex-lift-studio",
    ],
    sections: [
      {
        heading: "Start with how you work — not the marketing",
        body: "If you mostly sit and stand for short stretches, a solid single-motor desk is enough. If you switch heights several times a day or run a heavy dual-monitor setup, dual motors and a stiffer frame matter more than a fancy control app. Be honest about weight: monitor arms, a dock, speakers, and a desktop PC add up fast.",
      },
      {
        heading: "Stability beats silent motors (but you can have both)",
        body: "Wobble at standing height ruins the experience. Look for a wider foot stance, thicker columns, and reviews that mention typing at full height. Dual motors are usually quieter and more even under load. Memory presets sound optional until you share a desk — then they become essential.",
      },
      {
        heading: "Size the top for your real footprint",
        body: "A 48-inch top works in apartments; 60 inches is the sweet spot for laptop + monitor + notebook; 72 inches is for multi-monitor or creative layouts. Leave room for a keyboard tray or arm if your chair arms don’t tuck under. Cable management is not optional — a hanging power strip and a rear tray keep the lift path clear.",
      },
      {
        heading: "Our shortlist by budget",
        body: "Budget testers can start with the Cedarline Flex Lite. Most remote workers will be happier long-term with the Northframe Rise Pro. Heavy setups and long ownership horizons justify the Apex Lift Studio. Compare them side-by-side on our comparison page before you buy.",
      },
    ],
  },
  {
    slug: "ergonomic-home-office-starter-kit",
    title: "Ergonomic Home Office Starter Kit Under Real Budgets",
    description:
      "Chair, desk height, screen position, input devices, and lighting — the order that actually reduces strain without buying everything at once.",
    readingTime: "10 min read",
    publishedAt: "2026-09-01",
    productSlugs: [
      "harbor-seat-ergo",
      "northframe-rise-pro",
      "lumenview-32u",
      "keynest-quiet-65",
      "glidepoint-ergo-mouse",
      "glowbar-desk-pro",
      "pulse-audio-pro",
    ],
    sections: [
      {
        heading: "Fix the chair before the gadgets",
        body: "Your hips should be roughly level with or slightly above your knees, feet flat, and lumbar filled in without forcing a military posture. If your dining chair fails that test, prioritize a supportive task or mesh chair first. The Harbor Seat Ergo is our mid-range pick when you sit most of the day; Softline Cloud Task is fine for part-time desks.",
      },
      {
        heading: "Get the screen to eye level",
        body: "The top third of the screen should sit near eye height so you’re not craning down at a laptop all day. A height-adjustable monitor stand (or a monitor with a good stand, like the LumenView 32U) often helps more than an expensive keyboard. If you stand part-time, match desk height so elbows stay near 90°.",
      },
      {
        heading: "Input devices that reduce strain",
        body: "A quieter compact keyboard (Keynest Quiet 65) keeps shoulders relaxed by bringing the mouse closer. If your wrist aches from a flat mouse, try a vertical shape like the GlidePoint Ergo Mouse — give it a week before judging. Lighting matters too: a simple bias/task light like GlowBar Desk Pro cuts evening eye fatigue and makes video look less like a cave.",
      },
      {
        heading: "Calls, focus, and buying in phases",
        body: "You don’t need everything day one. Phase 1: chair + screen height. Phase 2: desk that fits sit/stand if you want movement. Phase 3: keyboard/mouse and lighting. Add headphones (Pulse Audio Pro) when meetings dominate your calendar. Buy what you’ll use daily; skip the RGB and the ‘productivity’ accessories that become clutter.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
