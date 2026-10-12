import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products/screenbar-halo", destination: "/categories/desk-lighting", permanent: true },
      { source: "/products/benq-screenbar-halo", destination: "/categories/desk-lighting", permanent: true },
      { source: "/categories/desk-lamps", destination: "/categories/desk-lighting", permanent: true },
      {
        source: "/products/flexispot-e7-pro",
        destination: "/products/flexispot-e6-dual-motor-55x28",
        permanent: true,
      },
      { source: "/products/c920-desk", destination: "/products/logitech-c920s", permanent: true },
      { source: "/products/k2-desk", destination: "/products/keychron-k2", permanent: true },
      {
        source: "/products/uplift-v2",
        destination: "/products/uplift-v3",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
