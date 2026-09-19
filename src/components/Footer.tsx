import Link from "next/link";
import { categories } from "@/data/categories";
import { AFFILIATE_DISCLOSURE_SHORT } from "@/lib/affiliate";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-stone-50">DeskWorth</p>
          <p className="mt-2 text-sm text-stone-400">
            Honest picks for a better home office. We research gear so you can
            buy once and work comfortably.
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
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Categories
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="hover:text-stone-50"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
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
              <Link href="/guides" className="hover:text-stone-50">
                Buying guides
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-stone-50">
                About
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
