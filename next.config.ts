import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/flexispot-e7-pro",
        destination: "/products/flexispot-e6-dual-motor-55x28",
        permanent: true,
      },
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
