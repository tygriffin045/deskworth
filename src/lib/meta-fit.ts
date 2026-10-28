/** Shorten text at a word boundary so titles and descriptions stay within search-result limits. */
export function fit(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const i = cut.lastIndexOf(" ");
  return `${(i > max * 0.6 ? cut.slice(0, i) : cut).replace(/[\s,;:—–\-·|(]+$/, "")}…`;
}
