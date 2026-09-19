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
      "flexispot-pro-dual-motor",
      "flexispot-e7-pro",
      "uplift-v2",
    ],
    sections: [
      {
        heading: "Start with how you work — not the marketing",
        body: "If you mostly sit and stand for short stretches, a solid dual-motor mid-range desk is enough. If you switch heights several times a day or run a heavy dual-monitor setup, a stiffer frame and higher load rating matter more than a fancy control app. Be honest about weight: monitor arms, a dock, speakers, and a desktop PC add up fast.",
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
        body: "Most remote workers will be happy with the FlexiSpot Pro dual-motor. Heavier multi-monitor setups should look at the FlexiSpot E7 Pro. Long ownership horizons and maximum stability justify the UPLIFT Desk V2. Compare them side-by-side on our comparison page before you buy.",
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
      "branch-ergonomic-chair-pro",
      "sihoo-b100",
      "flexispot-pro-dual-motor",
      "dell-s2725qc",
      "keychron-k2",
      "logitech-mx-master-3s",
      "benq-screenbar",
      "logitech-c920s",
    ],
    sections: [
      {
        heading: "Fix the chair before the gadgets",
        body: "Your hips should be roughly level with or slightly above your knees, feet flat, and lumbar filled in without forcing a military posture. If your dining chair fails that test, prioritize a supportive mesh chair first. The Branch Ergonomic Chair Pro is our premium pick when you sit most of the day; the SIHOO B100 is a named value mesh option around $170.",
      },
      {
        heading: "Get the screen to eye level",
        body: "The top third of the screen should sit near eye height so you’re not craning down at a laptop all day. A height-adjustable monitor stand (or a monitor with a good stand, like the Dell S2725QC) often helps more than an expensive keyboard. If you stand part-time, match desk height so elbows stay near 90°.",
      },
      {
        heading: "Input devices that reduce strain",
        body: "A compact wireless mechanical like the Keychron K2 keeps shoulders relaxed by bringing the mouse closer. For pointer precision and long scrolling sessions, the Logitech MX Master 3S is hard to beat. Lighting matters too: a BenQ ScreenBar cuts evening eye fatigue and makes video look less like a cave.",
      },
      {
        heading: "Calls, focus, and buying in phases",
        body: "You don’t need everything day one. Phase 1: chair + screen height. Phase 2: desk that fits sit/stand if you want movement. Phase 3: keyboard/mouse and lighting. Add a webcam (Logitech C920s) when meetings dominate your calendar. Buy what you’ll use daily; skip the RGB and the ‘productivity’ accessories that become clutter.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-monitor-arm",
    title: "How to Choose a Monitor Arm (Clamp, Gas Spring, Dual)",
    description:
      "VESA patterns, weight ratings, clamp vs grommet, and when a budget dual arm is enough versus a premium Ergotron LX.",
    readingTime: "7 min read",
    publishedAt: "2026-09-19",
    productSlugs: [
      "huanuo-dual-monitor-arm",
      "amazon-basics-dual-monitor-arm",
      "ergotron-lx-monitor-arm",
      "dell-s2725qc",
    ],
    sections: [
      {
        heading: "Confirm VESA and weight before you fall in love with a listing",
        body: "Almost every modern IPS monitor uses 75×75 or 100×100 mm VESA holes — but ultrawides and some curved panels can be heavier or use larger patterns. Weigh the monitor (or check the manual) and leave headroom: a 19–22 lb per-arm rating is fine for many 27\" panels, while heavier 32\" and ultrawide screens may need a higher-capacity arm. If the listing’s weight range starts at 7 lb (like many Ergotron LX arms), very light portable monitors may not balance correctly.",
      },
      {
        heading: "Clamp vs grommet vs freestanding",
        body: "A C-clamp is the default for solid wood and most standing-desk tops — measure thickness and leave clearance behind the desk. Grommet mounts use an existing cable hole and look cleaner on thick tops. Freestanding bases avoid clamping but steal desk real estate. Standing desks with thin laminate edges sometimes need a wider clamp plate or a grommet — check your frame before ordering.",
      },
      {
        heading: "Single premium vs dual budget",
        body: "If you run one primary display and adjust height constantly, a premium single arm like the Ergotron LX pays off in smooth Constant Force motion and long warranty peace of mind. Dual-monitor desks usually get more value from a gas-spring dual mount such as the HUANUO FlowLift, or a simpler budget dual like Amazon Basics when you mainly need alignment. Buying two premium singles is excellent — and expensive.",
      },
      {
        heading: "Our shortlist",
        body: "Start with the HUANUO dual if you need two screens on a budget. Choose Amazon Basics when you want the lowest dual-mount price and basic adjustability. Step up to the Ergotron LX for a single hero display you’ll adjust every day. Pair any arm with a VESA-friendly productivity monitor like the Dell S2725QC, and compare the three arms side-by-side on our monitor-arms comparison page.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
