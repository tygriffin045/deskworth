import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/data/guides";
import { getProduct } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { AffiliateNote } from "@/components/AffiliateNote";
import { AffiliateButton } from "@/components/AffiliateButton";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE_METADATA,
  DEFAULT_OG_IMAGE,
} from "@/lib/site";

const GUIDE_COMPARES: Record<string, { href: string; label: string }[]> = {
  "how-to-choose-a-standing-desk": [
    { href: "/compare", label: "Standing desk comparison" },
    { href: "/compare/standing-mats", label: "Standing mat comparison" },
  ],
  "how-to-choose-a-monitor-arm": [
    { href: "/compare/monitor-arms", label: "Monitor arm comparison" },
  ],
  "best-standing-desk-mat": [
    { href: "/compare/standing-mats", label: "Standing mat comparison" },
  ],
  "sit-stand-converter-vs-standing-desk": [
    { href: "/compare/desk-converters", label: "Desk converter comparison" },
    { href: "/compare", label: "Standing desk comparison" },
  ],
  "ergonomic-home-office-starter-kit": [
    { href: "/compare", label: "Standing desk comparison" },
  ],
  "best-power-strip-for-standing-desk": [
    { href: "/compare/cable-management", label: "Cable management comparison" },
    { href: "/compare", label: "Standing desk comparison" },
  ],
};


type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  const title = guide.metaTitle ?? guide.title;
  const description = guide.metaDescription ?? guide.description;
  const url = `${SITE_URL}/guides/${slug}`;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [DEFAULT_OG_IMAGE_METADATA],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: url },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const picks = (guide.picks ?? [])
    .map((pick) => ({ pick, product: getProduct(pick.productSlug) }))
    .filter(
      (x): x is { pick: typeof x.pick; product: NonNullable<typeof x.product> } =>
        Boolean(x.product),
    );
  const pickSlugs = new Set(picks.map((x) => x.product.slug));
  const linkedProducts = guide.productSlugs
    .filter((s) => !pickSlugs.has(s))
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedGuides = (guide.relatedGuideSlugs ?? [])
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  const faqs = guide.faqs ?? [];
  const guideUrl = `${SITE_URL}/guides/${guide.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    mainEntityOfPage: guideUrl,
    author: { "@type": "Organization", name: SITE_NAME },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: guide.title,
        item: guideUrl,
      },
    ],
  };

  const faqLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;
  const itemListLd =
    picks.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: guide.metaTitle ?? guide.title,
          url: guideUrl,
          numberOfItems: picks.length,
          itemListElement: picks.map(({ product }, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/products/${product.slug}`,
            name: product.name,
          })),
        }
      : null;
  const ldBlocks: Record<string, unknown>[] = [articleLd, breadcrumbLd];
  if (itemListLd) ldBlocks.push(itemListLd);
  if (faqLd) ldBlocks.push(faqLd);

  return (
    <article className="max-w-3xl">
      <JsonLd data={ldBlocks} />
      <p className="text-xs text-stone-500">
        <Link href="/guides" className="hover:text-stone-800">
          Guides
        </Link>{" "}
        · {guide.readingTime} · {guide.publishedAt}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-stone-900">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg text-stone-700">{guide.description}</p>
      <AffiliateNote />

      {picks.length > 0 && (
        <section
          id="quick-picks"
          className="mt-8 rounded-2xl border border-stone-200 bg-white p-6"
        >
          <h2 className="font-serif text-2xl text-stone-900">Quick picks</h2>
          <ol className="mt-4 space-y-4">
            {picks.map(({ pick, product }) => (
              <li key={product.slug} className="text-stone-700">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#a84c1f]">
                  {pick.award}
                </p>
                <p className="mt-1">
                  <a
                    href={`#pick-${product.slug}`}
                    className="font-semibold text-stone-900 underline underline-offset-2"
                  >
                    {product.name}
                  </a>{" "}
                  <span className="text-sm text-stone-500">
                    · {product.priceBand}
                  </span>
                </p>
                <p className="mt-1 text-sm">{pick.quickNote}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {picks.length > 0 && (
        <div className="mt-12 space-y-12">
          {picks.map(({ pick, product }, i) => (
            <section
              key={product.slug}
              id={`pick-${product.slug}`}
              className="scroll-mt-24 border-t border-stone-200 pt-10"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a84c1f]">
                {i + 1}. {pick.award}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-stone-900">
                {product.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-stone-600">
                {product.priceBand}
              </p>
              {product.imageUrl && (
                <Link
                  href={`/products/${product.slug}`}
                  className="relative mt-5 block aspect-[4/3] max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-stone-50"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-contain p-5"
                    priority={i === 0}
                  />
                </Link>
              )}
              <p className="mt-5 leading-relaxed text-stone-700">{pick.verdict}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                  <h3 className="font-serif text-lg text-stone-900">Pros</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
                    {pick.pros.map((pro) => (
                      <li key={pro}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                  <h3 className="font-serif text-lg text-stone-900">Cons</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
                    {pick.cons.map((con) => (
                      <li key={con}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm text-stone-700">
                <span className="font-semibold text-stone-900">Best for:</span>{" "}
                {pick.bestFor}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <AffiliateButton
                  productSlug={product.slug}
                  productName={product.name}
                  amazonAsin={product.amazonAsin}
                  amazonQuery={product.amazonQuery}
                  label="Check price on Amazon"
                />
                <Link
                  href={`/products/${product.slug}`}
                  className="text-sm font-medium text-stone-700 underline underline-offset-4"
                >
                  Read our full review
                </Link>
              </div>
            </section>
          ))}
        </div>
      )}

      {(guide.criteria ?? []).length > 0 && (
        <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
          <h2 className="font-serif text-2xl text-stone-900">
            How to choose
          </h2>
          <dl className="mt-4 space-y-4">
            {guide.criteria!.map((c) => (
              <div key={c.heading}>
                <dt className="font-semibold text-stone-900">{c.heading}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-stone-700">
                  {c.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mt-10 space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-2xl text-stone-900">
              {section.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-stone-700">{section.body}</p>
          </section>
        ))}
      </div>

      {faqs.length > 0 && (
        <section id="faq" className="mt-14">
          <h2 className="font-serif text-2xl text-stone-900">
            Frequently asked questions
          </h2>
          <div className="mt-4 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
            {faqs.map((f) => (
              <div key={f.question} className="p-5">
                <h3 className="font-semibold text-stone-900">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(relatedGuides.length > 0 || (guide.relatedLinks ?? []).length > 0) && (
        <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
          <h2 className="font-serif text-2xl text-stone-900">Keep reading</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {relatedGuides.map((g) => (
              <li key={g.slug}>
                Guide:{" "}
                <Link
                  href={`/guides/${g.slug}`}
                  className="underline underline-offset-2"
                >
                  {g.title}
                </Link>
              </li>
            ))}
            {(guide.relatedLinks ?? []).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline underline-offset-2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(GUIDE_COMPARES[guide.slug] || []).length > 0 && (
        <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
          <h2 className="font-serif text-2xl text-stone-900">
            Related comparisons
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {GUIDE_COMPARES[guide.slug].map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="underline underline-offset-2">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {linkedProducts.length > 0 && (
      <section className="mt-14">
        <h2 className="font-serif text-2xl text-stone-900">
          {picks.length > 0 ? "Also mentioned" : "Products mentioned"}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {linkedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      )}
    </article>
  );
}
