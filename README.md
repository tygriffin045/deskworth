# DeskWorth

**Honest picks for a better home office**

DeskWorth is a Next.js affiliate marketing site for home office gadgets — standing desks, ergonomic chairs, monitors, keyboards, webcams, lighting, and accessories. Catalog entries use real Amazon products with verified ASINs where available; affiliate URLs go through `src/lib/affiliate.ts` with tag `deskworth20-20`.

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

All product CTAs use `getAffiliateUrl(...)` from `src/lib/affiliate.ts`.

- Prefer `amazonAsin` → `https://www.amazon.com/dp/ASIN?tag=deskworth20-20`
- Else `amazonQuery` → Amazon search with the same tag
- Override tag with `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` if needed

## Add a product

1. Open `src/data/products.ts`
2. Add a `Product` object (slug, category, pros/cons, specs, `relatedSlugs`, `amazonQuery`, optional `amazonAsin`)
3. Only use verified ASINs — never invent them
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
| `/affiliate-disclosure` | FTC-style disclosure |

## Deploy to Vercel

1. Push this repo to GitHub (already set up for `tygriffin045/deskworth`)
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: Next.js
4. Add `NEXT_PUBLIC_AFFILIATE_BASE_URL` in Project → Settings → Environment Variables
5. Deploy

## License

Private project starter for DeskWorth. Replace disclosure/contact copy before a public launch.

<!-- Deploys automatically from GitHub main via Vercel. -->
