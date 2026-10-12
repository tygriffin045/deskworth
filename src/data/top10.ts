import type { Product } from "./types";
import { products, getProductsByCategory } from "./products";

/**
 * Top 10 picks per category page (ordered). Every ASIN was checked live and in stock on amazon.com on Oct 3, 2026.
 * Picks marked in TOP10_BESTSELLERS appeared on the matching Amazon Best Sellers list when checked.
 */
export const TOP10: Record<string, string[]> = {
  "standing-desks": ["flexispot-pro-dual-motor", "flexispot-e6-dual-motor-55x28", "uplift-v3", "ergear-48-x-24-inch-height", "fezibo-standing-desk-48-24-inch", "veken-63-x28-wider-large-standing", "huanuo-32x19-inch-small-electric-standing", "vivo-black-60-x-24-in", "dumos-40-inch-electric-standing-desk", "cubiker-standing-desk"],
  "office-chairs": ["branch-ergonomic-chair-pro", "sihoo-b100", "hyken", "bestoffice-ergonomic-office-chair", "marsail-ergonomic-office-chair-office-desk", "tralt-office-chair-ergonomic-desk-chair", "neo-chair-office-desk-chair-high", "elabest-x100-ergonomic-mesh-office-chair", "amazon-basics-classic-puresoft-pu-padded", "amazon-basics-office-task-chair-with"],
  "monitors": ["dell-s2725qc", "dell-s2725qs", "dell-24-monitor-se2426h-23-8", "philips-24-inch-computer-monitor-fhd", "sceptre-new-22-inch-gaming-monitor", "sansui-34-inch-curved-gaming-monitor", "samsung-32-odyssey", "sceptre-27-inch-prime-gaming-monitor", "sansui-27-inch-curved-160hz-gaming", "dell-27-plus-qhd-monitor-s2725dsm"],
  "monitor-arms": ["huanuo-dual-monitor-arm", "amazon-basics-dual-monitor-arm", "ergotron-lx-monitor-arm", "ergear-single-monitor-arm", "wali-adjustable-single-monitor-arm-for", "vivo-dual-monitor-desk-mount", "nb-smoovex-monitor-arm", "vivo-stand-v002f-dual-led-lcd", "vivo-dual-monitor-stand", "vivo-single-13-to-38-inch"],
  "desk-mats": ["logitech-desk-mat-studio", "corsair-mm350-pro-xl", "aothia-leather-desk-pad", "ysagi-leather-desk-protector", "afiing-desk-pad-protector-23-6", "ysagi-non-slip-leather-desk-pad", "homieazicozi-cork-desk-mat-dual-sided", "cadono-leather-desk-pad-protector-non", "ysagi-double-sided-desk-pad", "ohocut-scalloped-desk-mat"],
  "laptop-stands": ["rain-design-mstand", "twelve-south-curve-flex", "roost-v3-laptop-stand", "nulaxy-ergonomic-adjustable-laptop-stand-for", "gogoonike-adjustable-laptop-stand-for-desk", "loxp-adjustable-laptop-stand", "amazon-basics-sturdy-and-portable-ergonomic", "lamicall-aluminum-laptop-stand-for-desk", "tonmom-laptop-stand-for-desk", "ugreen-vertical-laptop-stand-holder-for"],
  "usb-c-docks": ["anker-7in1-usb-c-hub", "plugable-thunderbolt-4-dock", "caldigit-ts4", "anker-usb-c-hub", "ugreen-usb-c-hub-5-in", "benfei-usb-c-hub-5-in", "anker-laptop-docking-station-dual-monitor", "hodo-usb-c-docking-station-dual", "hiearcool-7-in-1-usb-c", "dell-pro-laptop-docking-station-wd25"],
  "keyboards-mice": ["keychron-k2", "logitech-mx-master-3s", "amazon-basics-wired-qwerty-keyboard", "logitech-m185-compact-ambidextrous-2-4", "logitech-k400-plus-wireless-touch-tv", "tecknet-wireless-mouse", "logitech-mx-keys-s-wireless-keyboard", "wegear-usb-wireless-mouse-for-laptop", "sablute-wireless-mouse-for-laptop", "logitech-mk120-full-size-wired-keyboard"],
  "webcams-audio": ["logitech-c920s", "logitech-brio-101-full-hd-1080p", "emeet-c960-1080p-webcam-with-microphone", "logitech-c920x-hd-pro-pc-webcam", "acer-a610-1080p-webcam-for-pc", "logitech-mx-brio-ultra-hd-4k", "xweiryn-webcam-for-pc-hd-1080p", "emeet-s600-4k-webcam-for-streaming", "logitech-c920e-hd-1080p-mic-enabled"],
  "standing-mats": ["ergodriven-topo-comfort-mat", "gelpro-newlife-eco-pro-mat", "sky-solutions-anti-fatigue-mat", "kitchenclouds-kitchen-mat-cushioned-anti-fatigue", "comfilife-anti-fatigue-floor-mat-3", "featol-anti-fatigue-mat-for-standing", "ophanie-kitchen-mats-for-floor-3", "gorilla-grip-cushioned-kitchen-mats-for", "featol-0-9-anti-fatigue-mat", "tranquilmoments-1-extra-thick-anti-fatigue"],
  "cable-management": ["under-desk-metal-cable-tray", "eveo-j-channel-cable-kit", "d-line-half-round-cord-cover", "delamu-cord-hider", "alex-tech-10ft-1-2-inch", "yesbes-cord-hider-kit-for-wall", "alex-tech-25ft-1-4-inch", "yecaye-tv-cord-hider", "alex-tech-50ft-1-4-inch", "d-line-157in-cord-cover-kit"],
  "footrests": ["huanuo-adjustable-footrest", "everlasting-comfort-foot-rest", "mind-reader-adjustable-footrest", "casazenith-foot-rest", "casazenith-foot-rest-under-desk-at", "blisstrends-foot-rest-under-desk", "comfilife-foot-rest-for-under-desk", "tranquilrelax-foot-rest-under-desk", "comfyinlove-foot-rest-for-under-desk", "vecelo-office-foot-rest-under-desk"],
  "desk-power": ["anker-nano-desk-clamp-power-strip", "anker-12-outlet-usb-c-power-strip", "belkin-12-outlet-usb-surge", "amazon-basics-6-outlet-surge-protector", "surge-protector-power-strip-chcore-5ft", "superdanny-extension-cord-flat-plug-surge", "belkin-12-outlet-surge-protector-power", "one-beat-surge-protector-power-strip", "yintar-6ft-surge-protector-power-strip", "superdanny-10ft-flat-extension-cord-with"],
  "desk-converters": ["varidesk-pro-plus-36", "flexispot-36-desk-converter", "vivo-36-desk-converter", "versadesk-powerpro-36-inch-electric-standing", "vivo-26-in-single-top-standing", "techorbits-32-in-standing-desk-converter", "raathionty-height-adjustable-standing-desk-converter", "vivo-32-in-standing-desk-riser", "jylh-joyseeker-32-standing-desk-converter", "mount-it-standing-desk-converter-32"],
  "boom-arms": ["elgato-wave-mic-arm-lp", "rode-psa1-plus", "innogear-mic-boom-cable-mgmt", "innogear-boom-arm-microphone-mic-stand", "fifine-bm88-low-profile-microphone-boom", "todi-mic-arm-for-lightweight-mics", "sunmon-quadcast-boom-arm", "fifine-cs1-scissor-microphone-boom-arm", "fifine-bm66-heavy-metal-microphone-boom", "aa-audio-accessory-mic-arm-desk"],
  "desk-organizers": ["simple-houseware-desk-file-organizer", "amazon-basics-mesh-desk-organizer", "simple-houseware-drawer-organizer-6pack", "wali-desk-file-organizer", "marbrasse-pen-organizer-with-2-drawer", "marbrasse-6-tier-paper-organizer-letter", "amazon-basics-wire-mesh-pen-holder", "leketree-desk-organizers-and-accessories", "supeasy-5-trays-paper-organizer-letter", "sinboun-letter-tray-paper-organizer-5"],
  "wrist-rests": ["gorilla-grip-wrist-rest-set", "3m-gel-keyboard-wrist-rest", "fellowes-gel-mouse-wrist-rest", "mosiso-wrist-rest-support-for-mouse", "sushret-cloud-wrist-rest-keyboard", "yolanda-keyboard-wrist-rest-memory-foam", "vaydeer-wrist-rest-for-keyboard-and", "ktrio-keyboard-wrist-rest-mouse-pad", "demon-chest-ergocomfort-gel-wrist-rest", "laborio-computer-keyboard-wrist-rest"],
  "desk-lighting": ["benq-screenbar", "quntis-computer-monitor-lamp", "samphon-monitor-light-bar", "yeelight-monitor-light-bar", "onway-curved-monitor-light-bar-with", "samphon-rgb-monitor-light-bar", "catpower-portable-laptop-monitor-light-bar", "colorpanda-16-14-monitor-light-bar", "quntis-curved-monitor-light-bar-15", "pzloz-led-desk-lamp-for-office"],
};

export const TOP10_BESTSELLERS: Record<string, string[]> = {
  "standing-desks": ["ergear-48-x-24-inch-height", "fezibo-standing-desk-48-24-inch", "veken-63-x28-wider-large-standing", "huanuo-32x19-inch-small-electric-standing", "vivo-black-60-x-24-in", "dumos-40-inch-electric-standing-desk", "cubiker-standing-desk"],
  "office-chairs": ["bestoffice-ergonomic-office-chair", "marsail-ergonomic-office-chair-office-desk", "tralt-office-chair-ergonomic-desk-chair", "neo-chair-office-desk-chair-high", "elabest-x100-ergonomic-mesh-office-chair", "amazon-basics-classic-puresoft-pu-padded", "amazon-basics-office-task-chair-with"],
  "monitors": ["dell-s2725qs", "dell-24-monitor-se2426h-23-8", "philips-24-inch-computer-monitor-fhd", "sceptre-new-22-inch-gaming-monitor", "sansui-34-inch-curved-gaming-monitor", "samsung-32-odyssey", "sceptre-27-inch-prime-gaming-monitor", "sansui-27-inch-curved-160hz-gaming", "dell-27-plus-qhd-monitor-s2725dsm"],
  "monitor-arms": ["huanuo-dual-monitor-arm", "amazon-basics-dual-monitor-arm", "ergear-single-monitor-arm", "wali-adjustable-single-monitor-arm-for", "vivo-dual-monitor-desk-mount", "nb-smoovex-monitor-arm", "vivo-stand-v002f-dual-led-lcd", "vivo-dual-monitor-stand", "vivo-single-13-to-38-inch"],
  "desk-mats": ["ysagi-leather-desk-protector", "afiing-desk-pad-protector-23-6", "ysagi-non-slip-leather-desk-pad", "homieazicozi-cork-desk-mat-dual-sided", "cadono-leather-desk-pad-protector-non", "ysagi-double-sided-desk-pad", "ohocut-scalloped-desk-mat"],
  "laptop-stands": ["nulaxy-ergonomic-adjustable-laptop-stand-for", "gogoonike-adjustable-laptop-stand-for-desk", "loxp-adjustable-laptop-stand", "amazon-basics-sturdy-and-portable-ergonomic", "lamicall-aluminum-laptop-stand-for-desk", "tonmom-laptop-stand-for-desk", "ugreen-vertical-laptop-stand-holder-for"],
  "usb-c-docks": ["anker-7in1-usb-c-hub", "plugable-thunderbolt-4-dock", "anker-usb-c-hub", "ugreen-usb-c-hub-5-in", "benfei-usb-c-hub-5-in", "anker-laptop-docking-station-dual-monitor", "hodo-usb-c-docking-station-dual", "hiearcool-7-in-1-usb-c", "dell-pro-laptop-docking-station-wd25"],
  "keyboards-mice": ["amazon-basics-wired-qwerty-keyboard", "logitech-m185-compact-ambidextrous-2-4", "logitech-k400-plus-wireless-touch-tv", "tecknet-wireless-mouse", "logitech-mx-keys-s-wireless-keyboard", "wegear-usb-wireless-mouse-for-laptop", "sablute-wireless-mouse-for-laptop", "logitech-mk120-full-size-wired-keyboard"],
  "webcams-audio": ["logitech-c920s", "logitech-brio-101-full-hd-1080p", "emeet-c960-1080p-webcam-with-microphone", "logitech-c920x-hd-pro-pc-webcam", "acer-a610-1080p-webcam-for-pc", "logitech-mx-brio-ultra-hd-4k", "xweiryn-webcam-for-pc-hd-1080p", "emeet-s600-4k-webcam-for-streaming", "logitech-c920e-hd-1080p-mic-enabled"],
  "standing-mats": ["ergodriven-topo-comfort-mat", "kitchenclouds-kitchen-mat-cushioned-anti-fatigue", "comfilife-anti-fatigue-floor-mat-3", "featol-anti-fatigue-mat-for-standing", "ophanie-kitchen-mats-for-floor-3", "gorilla-grip-cushioned-kitchen-mats-for", "featol-0-9-anti-fatigue-mat", "tranquilmoments-1-extra-thick-anti-fatigue"],
  "cable-management": ["eveo-j-channel-cable-kit", "delamu-cord-hider", "alex-tech-10ft-1-2-inch", "yesbes-cord-hider-kit-for-wall", "alex-tech-25ft-1-4-inch", "yecaye-tv-cord-hider", "alex-tech-50ft-1-4-inch", "d-line-157in-cord-cover-kit"],
  "footrests": ["huanuo-adjustable-footrest", "mind-reader-adjustable-footrest", "casazenith-foot-rest", "casazenith-foot-rest-under-desk-at", "blisstrends-foot-rest-under-desk", "comfilife-foot-rest-for-under-desk", "tranquilrelax-foot-rest-under-desk", "comfyinlove-foot-rest-for-under-desk", "vecelo-office-foot-rest-under-desk"],
  "desk-power": ["anker-12-outlet-usb-c-power-strip", "amazon-basics-6-outlet-surge-protector", "surge-protector-power-strip-chcore-5ft", "superdanny-extension-cord-flat-plug-surge", "belkin-12-outlet-surge-protector-power", "one-beat-surge-protector-power-strip", "yintar-6ft-surge-protector-power-strip", "superdanny-10ft-flat-extension-cord-with"],
  "desk-converters": ["varidesk-pro-plus-36", "flexispot-36-desk-converter", "versadesk-powerpro-36-inch-electric-standing", "vivo-26-in-single-top-standing", "techorbits-32-in-standing-desk-converter"],
  "boom-arms": ["rode-psa1-plus", "innogear-mic-boom-cable-mgmt", "innogear-boom-arm-microphone-mic-stand", "fifine-bm88-low-profile-microphone-boom", "todi-mic-arm-for-lightweight-mics", "sunmon-quadcast-boom-arm", "fifine-cs1-scissor-microphone-boom-arm", "fifine-bm66-heavy-metal-microphone-boom", "aa-audio-accessory-mic-arm-desk"],
  "desk-organizers": ["wali-desk-file-organizer", "marbrasse-pen-organizer-with-2-drawer", "marbrasse-6-tier-paper-organizer-letter", "amazon-basics-wire-mesh-pen-holder", "leketree-desk-organizers-and-accessories", "supeasy-5-trays-paper-organizer-letter", "sinboun-letter-tray-paper-organizer-5"],
  "wrist-rests": ["gorilla-grip-wrist-rest-set", "mosiso-wrist-rest-support-for-mouse", "sushret-cloud-wrist-rest-keyboard", "yolanda-keyboard-wrist-rest-memory-foam", "vaydeer-wrist-rest-for-keyboard-and", "ktrio-keyboard-wrist-rest-mouse-pad", "demon-chest-ergocomfort-gel-wrist-rest", "laborio-computer-keyboard-wrist-rest"],
  "desk-lighting": ["quntis-computer-monitor-lamp", "samphon-monitor-light-bar", "yeelight-monitor-light-bar", "onway-curved-monitor-light-bar-with", "samphon-rgb-monitor-light-bar", "catpower-portable-laptop-monitor-light-bar"],
};

export function getTopPicks(category: string): Product[] {
  const slugs = TOP10[category];
  if (!slugs) return getProductsByCategory(category).slice(0, 10);
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Editorial picks per category (Maya review, Oct 12 2026). Best Overall is always #1 in TOP10;
 * Premium and Value must also appear in that category's Top 10 (checked by scripts/validate-revamp.ts).
 */
export const PICKS: Record<string, { best: string; premium: string; value: string }> = {
  "standing-desks": { best: "flexispot-pro-dual-motor", premium: "uplift-v3", value: "fezibo-standing-desk-48-24-inch" },
  "office-chairs": { best: "branch-ergonomic-chair-pro", premium: "elabest-x100-ergonomic-mesh-office-chair", value: "neo-chair-office-desk-chair-high" },
  "monitors": { best: "dell-s2725qc", premium: "samsung-32-odyssey", value: "dell-24-monitor-se2426h-23-8" },
  "monitor-arms": { best: "huanuo-dual-monitor-arm", premium: "ergotron-lx-monitor-arm", value: "amazon-basics-dual-monitor-arm" },
  "desk-mats": { best: "logitech-desk-mat-studio", premium: "corsair-mm350-pro-xl", value: "afiing-desk-pad-protector-23-6" },
  "laptop-stands": { best: "rain-design-mstand", premium: "roost-v3-laptop-stand", value: "nulaxy-ergonomic-adjustable-laptop-stand-for" },
  "usb-c-docks": { best: "anker-7in1-usb-c-hub", premium: "caldigit-ts4", value: "ugreen-usb-c-hub-5-in" },
  "keyboards-mice": { best: "keychron-k2", premium: "logitech-mx-keys-s-wireless-keyboard", value: "logitech-m185-compact-ambidextrous-2-4" },
  "webcams-audio": { best: "logitech-c920s", premium: "logitech-mx-brio-ultra-hd-4k", value: "logitech-brio-101-full-hd-1080p" },
  "standing-mats": { best: "ergodriven-topo-comfort-mat", premium: "gelpro-newlife-eco-pro-mat", value: "gorilla-grip-cushioned-kitchen-mats-for" },
  "cable-management": { best: "under-desk-metal-cable-tray", premium: "d-line-157in-cord-cover-kit", value: "alex-tech-10ft-1-2-inch" },
  "footrests": { best: "huanuo-adjustable-footrest", premium: "vecelo-office-foot-rest-under-desk", value: "mind-reader-adjustable-footrest" },
  "desk-power": { best: "anker-nano-desk-clamp-power-strip", premium: "belkin-12-outlet-usb-surge", value: "amazon-basics-6-outlet-surge-protector" },
  "desk-converters": { best: "varidesk-pro-plus-36", premium: "versadesk-powerpro-36-inch-electric-standing", value: "vivo-26-in-single-top-standing" },
  "boom-arms": { best: "elgato-wave-mic-arm-lp", premium: "rode-psa1-plus", value: "innogear-boom-arm-microphone-mic-stand" },
  "desk-organizers": { best: "simple-houseware-desk-file-organizer", premium: "marbrasse-6-tier-paper-organizer-letter", value: "amazon-basics-mesh-desk-organizer" },
  "wrist-rests": { best: "gorilla-grip-wrist-rest-set", premium: "3m-gel-keyboard-wrist-rest", value: "ktrio-keyboard-wrist-rest-mouse-pad" },
  "desk-lighting": { best: "benq-screenbar", premium: "quntis-curved-monitor-light-bar-15", value: "samphon-monitor-light-bar" },
};

export function getThreePicks(category: string) {
  const m = PICKS[category];
  if (!m) return null;
  const find = (s: string) => products.find((p) => p.slug === s);
  const best = find(m.best), premium = find(m.premium), value = find(m.value);
  if (!best || !premium || !value) return null;
  return { best, premium, value };
}

/** Desk home Top 10: the Best Overall from each of the ten core desk categories. */
export const HOME_TOP10_CATEGORIES = [
  "standing-desks",
  "office-chairs",
  "monitors",
  "monitor-arms",
  "keyboards-mice",
  "webcams-audio",
  "desk-converters",
  "usb-c-docks",
  "laptop-stands",
  "desk-lighting",
];

export function getHomeTop10(): Product[] {
  return HOME_TOP10_CATEGORIES.map((c) => getTopPicks(c)[0]).filter(Boolean);
}
