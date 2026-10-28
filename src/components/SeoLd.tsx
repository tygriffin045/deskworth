import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/site";

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/** BreadcrumbList JSON-LD. Home is added first; pass the rest as [name, path]. */
export function BreadcrumbLd({ trail }: { trail: [string, string][] }) {
  const all: [string, string][] = [["Home", "/"], ...trail];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map(([name, path], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          item: abs(path),
        })),
      }}
    />
  );
}

/** ItemList JSON-LD of on-site URLs (no price, rating, or review fields). */
export function ItemListLd({ name, items }: { name: string; items: { name: string; path: string }[] }) {
  if (items.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          url: abs(it.path),
        })),
      }}
    />
  );
}
