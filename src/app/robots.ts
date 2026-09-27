import type { MetadataRoute } from "next";

const HOST = "https://deskworth.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${HOST}/sitemap.xml`,
    host: HOST,
  };
}
