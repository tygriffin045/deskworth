import { guides } from "@/data/guides";
import { getProduct } from "@/data/products";
import { getCategory } from "@/data/categories";
import { TOP10 } from "@/data/top10";

type GuideLike = { slug: string; productSlugs: string[]; categorySlugs?: string[] };

function categoryCounts(g: GuideLike): Map<string, number> {
  const counts = new Map<string, number>();
  for (const s of g.productSlugs) {
    const c = getProduct(s)?.category;
    if (c && TOP10[c]) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return counts;
}

/** Category whose Top 10 page best matches the guide (most products in it). */
export function getGuideTop10(g: GuideLike): { href: string; label: string } | null {
  const explicit = (g.categorySlugs ?? []).find((c) => TOP10[c]);
  let best = explicit;
  if (!best) {
    let n = 0;
    for (const [c, k] of categoryCounts(g)) if (k > n) { best = c; n = k; }
  }
  const cat = best ? getCategory(best) : undefined;
  return cat ? { href: `/categories/${cat.slug}`, label: `Top 10: ${cat.name}` } : null;
}

/** Related guides on this site: preferred slugs first, then by shared products and categories. */
export function getRelatedGuideList<T extends GuideLike>(g: GuideLike, limit = 3, preferred: string[] = []): T[] {
  const all = guides as unknown as T[];
  const out: T[] = [];
  for (const s of preferred) {
    const x = all.find((y) => y.slug === s);
    if (x && x.slug !== g.slug && !out.includes(x)) out.push(x);
  }
  const mine = new Set(g.productSlugs);
  const myCats = categoryCounts(g);
  const scored = all
    .filter((x) => x.slug !== g.slug && !out.includes(x))
    .map((x, i) => {
      let score = x.productSlugs.filter((s) => mine.has(s)).length * 3;
      for (const [c] of categoryCounts(x)) if (myCats.has(c)) score += 1;
      return { x, score, i };
    })
    .sort((a, b) => b.score - a.score || a.i - b.i);
  for (const { x } of scored) { if (out.length >= limit) break; out.push(x); }
  return out.slice(0, limit);
}
