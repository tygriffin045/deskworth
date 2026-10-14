// Revamp content gate (run in `npm run build`). Fails on: Top 10 size != 10, missing/invalid picks,
// missing tier, pros outside 2-4, cons outside 1-3, Top 10 slugs that don't exist.
import { products } from "../src/data/products";
import { guides as _gg } from "../src/data/guides";
import { categories } from "../src/data/categories";
import { TOP10, PICKS, getTopPicks } from "../src/data/top10";


const errors: string[] = [];
const warnings: string[] = [];
const TIERS = new Set(["$", "$$", "$$$"]);

for (const p of products) {
  if (!TIERS.has((p as { tier?: string }).tier ?? "")) errors.push(`${p.slug}: missing/invalid tier`);
  if (p.pros.length < 2 || p.pros.length > 4) errors.push(`${p.slug}: ${p.pros.length} pros (need 2-4)`);
  if (p.cons.length < 1 || p.cons.length > 3) errors.push(`${p.slug}: ${p.cons.length} cons (need 1-3)`);
  // Listing-voice gate: no pasted Amazon copy markers in visible product text.
  const texts = [p.summary, p.tagline, p.whoItsFor, ...p.pros, ...p.cons];
  for (const t of texts) {
    if (/not tested hands-on|we have not tested it hands-on/i.test(t)) errors.push(`${p.slug}: per-product testing boilerplate: ${t.slice(0, 60)}`);
    if (/^Shoppers comparing/i.test(t)) errors.push(`${p.slug}: generic who-it's-for line`);
    if (/^Sizes, colors, and bundles vary/i.test(t)) errors.push(`${p.slug}: variant boilerplate con`);
    if (/per the amazon listing/i.test(t)) errors.push(`${p.slug}: contains "Per the Amazon listing": ${t.slice(0, 60)}`);
    if (/(^|[.;]\s+)[A-Z0-9][A-Z0-9 &'\-\/]{3,}\s*[:：]/.test(t)) errors.push(`${p.slug}: ALL-CAPS label bullet: ${t.slice(0, 60)}`);
    const sv = t.replace(/\bour\b[^.;]{0,40}\bpicks?\b/gi, "");
    const m = sv.match(/\b(our|ours|you'll love|effortlessly|say goodbye|experience (smooth|the)|maximize)\b/i);
    if (m) errors.push(`${p.slug}: seller voice "${m[0]}": ${t.slice(0, 70)}`);
    if (/[✔✅【】♛➤]/.test(t)) errors.push(`${p.slug}: listing emoji/bracket marker: ${t.slice(0, 60)}`);
  }
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
// Gift-guide copy gate: picks must exist, no seller voice, no "under $N" phrasing, hedged (no absolute claims).
{
  for (const g of _gg as unknown as { slug: string; title: string; description: string; picks?: { productSlug: string; verdict: string; quickNote: string; pros: string[]; cons: string[]; bestFor: string }[]; sections: { body: string }[]; faqs?: { answer: string }[] }[]) {
    if (!g.slug.startsWith("gifts-")) continue;
    const _slugs = new Set(products.map((p: { slug: string }) => p.slug));
    for (const pk of g.picks ?? []) if (!_slugs.has(pk.productSlug)) errors.push(`guide ${g.slug}: pick not found ${pk.productSlug}`);
    const texts = [g.title, g.description, ...g.sections.map((s) => s.body), ...(g.faqs ?? []).map((f) => f.answer), ...(g.picks ?? []).flatMap((p) => [p.verdict, p.quickNote, p.bestFor, ...p.pros, ...p.cons])];
    for (const t of texts) {
      const m = t.match(/\b(you'll love|effortlessly|say goodbye|maximize|guaranteed|the best ever|perfect for everyone|must-have)\b/i);
      if (m) errors.push(`guide ${g.slug}: seller voice / unhedged "${m[0]}": ${t.slice(0, 60)}`);
      if (/under\s*\$|\$\s*\d/i.test(t)) errors.push(`guide ${g.slug}: price phrasing: ${t.slice(0, 60)}`);
    }
  }
}
for (const w of warnings) console.warn(`validate-revamp: WARNING ${w}`);
if (errors.length) {
  console.error(`validate-revamp: ${errors.length} error(s)\n` + errors.join("\n"));
  process.exit(1);
}
console.log(`validate-revamp: OK — ${products.length} products, ${categories.length} categories, picks + tiers + pros/cons valid`);
