import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { guides } from "@/data/guides";

const HOST = "https://deskworth.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/guides",
    "/compare",
    "/compare/monitor-arms",
    "/compare/usb-c-docks",
    "/compare/standing-mats",
    "/compare/cable-management",
    "/compare/desk-converters",
    "/compare/boom-arms",
    "/affiliate-disclosure",
  ].map((path) => ({
    url: `${HOST}${path || "/"}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${HOST}/categories/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideRoutes = guides.map((g) => ({
    url: `${HOST}/guides/${g.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const productRoutes = products.map((p) => ({
    url: `${HOST}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...guideRoutes, ...productRoutes];
}
