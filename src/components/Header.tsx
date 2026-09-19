import Link from "next/link";
import { categories } from "@/data/categories";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f4ef]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
            DeskWorth
          </span>
          <span className="hidden text-xs text-stone-500 sm:inline">
            home office picks
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-stone-700 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="hover:text-stone-900"
            >
              {c.shortLabel}
            </Link>
          ))}
          <Link href="/products" className="hover:text-stone-900">
            All products
          </Link>
          <Link href="/compare" className="hover:text-stone-900">
            Compare
          </Link>
          <Link href="/guides" className="hover:text-stone-900">
            Guides
          </Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/affiliate-disclosure"
            className="hidden text-stone-500 underline-offset-2 hover:text-stone-800 hover:underline sm:inline"
          >
            Disclosure
          </Link>
          <Link
            href="/products"
            className="rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-medium text-stone-50 hover:bg-stone-800 sm:text-sm"
          >
            Browse picks
          </Link>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto border-t border-stone-200/60 px-4 py-2 text-xs text-stone-600 lg:hidden">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className="whitespace-nowrap rounded-full bg-stone-100 px-3 py-1"
          >
            {c.shortLabel}
          </Link>
        ))}
        <Link
          href="/guides"
          className="whitespace-nowrap rounded-full bg-stone-100 px-3 py-1"
        >
          Guides
        </Link>
      </div>
    </header>
  );
}
