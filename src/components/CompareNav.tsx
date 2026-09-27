import Link from "next/link";

const LINKS = [
  { href: "/compare", label: "Standing desks" },
  { href: "/compare/desk-converters", label: "Desk converters" },
  { href: "/compare/boom-arms", label: "Boom arms" },
  { href: "/compare/monitor-arms", label: "Monitor arms" },
  { href: "/compare/usb-c-docks", label: "USB-C docks" },
  { href: "/compare/standing-mats", label: "Standing mats" },
  { href: "/compare/cable-management", label: "Cable management" },
] as const;

export function CompareNav({ current }: { current: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 text-sm">
      {LINKS.map((link) =>
        link.href === current ? (
          <span
            key={link.href}
            className="rounded-full bg-stone-900 px-3 py-1 text-stone-50"
          >
            {link.label}
          </span>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200"
          >
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
}
