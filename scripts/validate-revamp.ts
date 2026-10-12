// Revamp content gate (run in `npm run build`). Fails on: Top 10 size != 10, missing/invalid picks,
// missing tier, pros outside 2-4, cons outside 1-3, Top 10 slugs that don't exist.
import { products } from "../src/data/products";
import { categories } from "../src/data/categories";
import { TOP10, PICKS, getTopPicks } from "../src/data/top10";


const errors: string[] = [];
const warnings: string[] = [];
const TIERS = new Set(["$", "$$", "$$$"]);

for (const p of products) {
  if (!TIERS.has((p as { tier?: string }).tier ?? "")) errors.push(`${p.slug}: missing/invalid tier`);
  if (p.pros.length < 2 || p.pros.length > 4) errors.push(`${p.slug}: ${p.pros.length} pros (need 2-4)`);
  if (p.cons.length < 1 || p.cons.length > 3) errors.push(`${p.slug}: ${p.cons.length} cons (need 1-3)`);
  if ("budget" in p || "priceBand" in p || "priceMin" in p || "priceMax" in p) errors.push(`${p.slug}: leftover budget/price field`);
}
const slugs = new Set(products.map((p) => p.slug));
for (const c of categories) {
  const list = TOP10[c.slug] ?? [];
  for (const s of list) if (!slugs.has(s)) errors.push(`${c.slug}: Top 10 slug not found: ${s}`);
  const n = getTopPicks(c.slug).length;
  if (n !== 10) {
    errors.push(`${c.slug}: Top 10 has ${n} items (need exactly 10)`);
  }
  const pk = PICKS[c.slug];
  if (!pk) { errors.push(`${c.slug}: missing picks`); continue; }
  if (list[0] !== pk.best) errors.push(`${c.slug}: Best Overall ${pk.best} is not #1 in Top 10`);
  for (const [k, s] of Object.entries(pk)) {
    if (!slugs.has(s)) errors.push(`${c.slug}: ${k} pick not found: ${s}`);
    else if (!list.includes(s)) errors.push(`${c.slug}: ${k} pick ${s} not in Top 10`);
  }
  const R: Record<string, number> = { $: 1, $$: 2, $$$: 3 };
  const bySlug = (x: string) => products.find((p) => p.slug === x);
  const [b, pr, v] = [bySlug(pk.best), bySlug(pk.premium), bySlug(pk.value)];
  if (b && pr && R[pr.tier] < R[b.tier]) errors.push(`${c.slug}: Premium ${pr.slug} (${pr.tier}) is below Best Overall ${b.slug} (${b.tier})`);
  const top = getTopPicks(c.slug);
  if (v && top.some((p) => p.tier === "$") && v.tier !== "$") errors.push(`${c.slug}: Value ${v.slug} is ${v.tier} but the Top 10 has a $ item`);
  if (new Set(Object.values(pk)).size !== 3) errors.push(`${c.slug}: picks are not 3 distinct products`);
}
for (const w of warnings) console.warn(`validate-revamp: WARNING ${w}`);
if (errors.length) {
  console.error(`validate-revamp: ${errors.length} error(s)\n` + errors.join("\n"));
  process.exit(1);
}
console.log(`validate-revamp: OK — ${products.length} products, ${categories.length} categories, picks + tiers + pros/cons valid`);
