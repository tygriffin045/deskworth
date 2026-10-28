import { fit } from "@/lib/meta-fit";
import { BreadcrumbLd } from "@/components/SeoLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getTopPicks, getThreePicks } from "@/data/top10";
import { AffiliateButton } from "@/components/AffiliateButton";
import { StickyAffiliateBar } from "@/components/StickyAffiliateBar";
import { Top10List } from "@/components/Top10List";
import { JsonLd } from "@/components/JsonLd";
import { BadgePicks } from "@/components/BadgePicks";
import {
  SITE_URL,
  CATEGORY_CROSS_LINKS,
  DEFAULT_OG_IMAGE_METADATA,
  DEFAULT_OG_IMAGE,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  const title = `${category.name} — DeskWorth picks`;
  const description = fit(`${category.description} Our Top 10 with pros, cons, and budget tiers.`, 160);
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: `/categories/${slug}`,
      images: [DEFAULT_OG_IMAGE_METADATA],
    },
    twitter: { title, description, images: [DEFAULT_OG_IMAGE] },
    alternates: { canonical: `/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getTopPicks(slug);
  const cross = CATEGORY_CROSS_LINKS[slug];
  const lead = getThreePicks(slug)?.best ?? items[0];
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/categories/${slug}`,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/products/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <div>
      <BreadcrumbLd trail={[[category.name, `/categories/${category.slug}`]]} />
      <JsonLd data={listLd} />
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Category
      </p>
      <h1 className="mt-1 font-serif text-4xl text-stone-900">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-stone-600">{category.description}</p>
      {lead && (
        <div
          className="mt-5 flex flex-col gap-3 rounded-2xl border-2 border-[#9a3f12]/25 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          data-top-cta
        >
          <p className="text-sm text-stone-700">
            <span className="font-bold uppercase tracking-wide text-[#9a3f12]">Best Overall:</span>{" "}
            <Link href={`/products/${lead.slug}`} className="font-semibold text-stone-900 underline underline-offset-2">
              {lead.name}
            </Link>
          </p>
          <AffiliateButton
            productSlug={lead.slug}
            productName={lead.name}
            amazonAsin={lead.amazonAsin}
            amazonQuery={lead.amazonQuery}
            placement="category_top"
            className="shrink-0"
          />
        </div>
      )}
      <p className="mt-4 text-sm text-stone-500">
        <Link href="/products" className="underline underline-offset-2">
          All products
        </Link>{" "}
        · Top {items.length} picks
      </p>
      {(cross?.guides?.length || cross?.compares?.length) && (
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
          {cross?.guides?.map((g) => (
            <Link key={g.href} href={g.href} className="underline underline-offset-2">
              {g.label}
            </Link>
          ))}
          {cross?.compares?.map((c) => (
            <Link key={c.href} href={c.href} className="underline underline-offset-2">
              {c.label}
            </Link>
          ))}
        </p>
      )}
      <BadgePicks category={slug} />
      <Top10List items={items} heading={`Top ${items.length} ${category.name}`} />
      {lead && (
        <StickyAffiliateBar
          productSlug={lead.slug}
          productName={lead.name}
          amazonAsin={lead.amazonAsin}
          amazonQuery={lead.amazonQuery}
          label="Best Overall"
          placement="category_sticky"
        />
      )}
    </div>
  );
}
