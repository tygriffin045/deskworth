import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductFilters } from "@/components/ProductFilters";

export const metadata: Metadata = {
  title: "All products",
  description:
    "Browse DeskWorth home office picks. Filter by category and budget.",
};

export default function ProductsIndexPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl text-stone-900">All products</h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Filter by category and budget band. Every product page includes pros,
        cons, who it&apos;s for, and a placeholder affiliate CTA.
      </p>
      <div className="mt-8">
        <ProductFilters products={products} />
      </div>
    </div>
  );
}
