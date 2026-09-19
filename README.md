# DeskWorth

**Honest picks for a better home office**

DeskWorth is a Next.js affiliate marketing site for home office gadgets — standing desks, ergonomic chairs, monitors, keyboards, webcams, lighting, and accessories. Product names are fictional placeholders; affiliate URLs go through one shared helper so you can plug in Amazon Associates later.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Typed product / category / guide data in `src/data`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Affiliate links

All product CTAs use `getAffiliateUrl(slug)` from `src/lib/affiliate.ts`.

Default pattern:

```text
https://example.com/aff/PRODUCT_SLUG
```

To point at your network (e.g. Amazon Associates tracking domain or a link shortener):

1. Copy `.env.example` to `.env.local`
2. Set `NEXT_PUBLIC_AFFILIATE_BASE_URL` (no trailing slash), for example:

```bash
NEXT_PUBLIC_AFFILIATE_BASE_URL=https://www.amazon.com/dp
```

Or change the helper to build full Associates URLs with your tag. Keep CTAs calling the helper so you never hardcode links in page components.

## Add a product

1. Open `src/data/products.ts`
2. Add a `Product` object (slug, category, pros/cons, specs, `relatedSlugs`, etc.)
3. Use a fictional brand/name unless you have rights and real review notes
4. Optionally mark `featured: true` for the homepage
5. Link it from a guide in `src/data/guides.ts` if relevant

Categories live in `src/data/categories.ts`. Types are in `src/data/types.ts`.

## Main routes

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/products` | Index + category/budget filters |
| `/products/[slug]` | Product review |
| `/categories/[slug]` | Category listing |
| `/compare` | 3 standing desks side-by-side |
| `/guides` | Guide index |
| `/guides/[slug]` | Buying guide |
| `/about` | About |
| `/affiliate-disclosure` | FTC-style disclosure |

## Deploy to Vercel

1. Push this repo to GitHub (already set up for `tygriffin045/deskworth`)
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: Next.js
4. Add `NEXT_PUBLIC_AFFILIATE_BASE_URL` in Project → Settings → Environment Variables
5. Deploy

## License

Private project starter for DeskWorth. Replace disclosure/contact copy before a public launch.
