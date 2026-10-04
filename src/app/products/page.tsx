import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductFilters } from "@/components/ProductFilters";
import { DEFAULT_OG_IMAGE_METADATA, DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "All home office products",
  description:
    "Browse DeskWorth standing desks, chairs, monitors, docks, mats, and accessories. Filter by category and budget.",
  openGraph: {
    title: "All home office products",
    description:
      "Browse DeskWorth standing desks, chairs, monitors, docks, mats, and accessories. Filter by category and budget.",
    url: "/products",
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    title: "All home office products",
    description:
      "Browse DeskWorth standing desks, chairs, monitors, docks, mats, and accessories.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/products" },
};

export default function ProductsIndexPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl text-stone-900">All products</h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Filter by category and budget band. Every product page includes pros,
        cons, who it&apos;s for, and an Amazon price check.
      </p>
      <div className="mt-8">
        <ProductFilters products={products} />
      </div>
    </div>
  );
}
