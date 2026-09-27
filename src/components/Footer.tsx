import Link from "next/link";
import { getAllNavGroupsWithLinks } from "@/data/nav";
import { AFFILIATE_DISCLOSURE_SHORT } from "@/lib/affiliate";

const groups = getAllNavGroupsWithLinks();

export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-serif text-2xl text-stone-50">DeskWorth</p>
          <p className="mt-2 text-sm text-stone-400">
            Desk setup reviews with tradeoffs spelled out — desks, converters, boom
            arms, organizers, mats, cables, and desk power.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            {AFFILIATE_DISCLOSURE_SHORT}{" "}
            <Link
              href="/affiliate-disclosure"
              className="underline underline-offset-2 hover:text-stone-300"
            >
              Full disclosure
            </Link>
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group.id}>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {group.label}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.slug}>
                    <Link href={link.href} className="hover:text-stone-50">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Site
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-stone-50">
                All products
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-stone-50">
                Desk comparison
              </Link>
            </li>
            <li>
              <Link href="/compare/monitor-arms" className="hover:text-stone-50">
                Monitor arm comparison
              </Link>
            </li>
            <li>
              <Link href="/compare/usb-c-docks" className="hover:text-stone-50">
                USB-C dock comparison
              </Link>
            </li>
            <li>
              <Link href="/compare/standing-mats" className="hover:text-stone-50">
                Standing mat comparison
              </Link>
            </li>
            <li>
              <Link
                href="/compare/cable-management"
                className="hover:text-stone-50"
              >
                Cable management comparison
              </Link>
            </li>
            <li>
              <Link
                href="/compare/desk-converters"
                className="hover:text-stone-50"
              >
                Desk converter comparison
              </Link>
            </li>
            <li>
              <Link href="/compare/boom-arms" className="hover:text-stone-50">
                Boom arm comparison
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-stone-50">
                Buying guides
              </Link>
            </li>
            <li>
              <Link
                href="/affiliate-disclosure"
                className="hover:text-stone-50"
              >
                Affiliate disclosure
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-600">
        © {new Date().getFullYear()} DeskWorth. As an Amazon Associate we earn from qualifying purchases.
      </div>
    </footer>
  );
}
