import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AffiliateNote } from "@/components/AffiliateNote";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_METADATA,
  websiteOrganizationLd,
} from "@/lib/site";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · DeskWorth`,
  },
  description: SITE_DESCRIPTION,
  verification: {
    google: "FN6qrZKJIgH6gtQS2rIEQe-jjDmKVIUoBq3DwQUX8yk",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DeskWorth",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_METADATA],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} min-h-screen antialiased`}
      >
        <JsonLd data={websiteOrganizationLd()} />
        <Header />
        <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10 sm:px-6">
          <AffiliateNote className="mb-4 mt-0" />
          {children}
        </main>
        <Footer />
        <Analytics />
      <script src="https://theworthguide.com/visit.js" defer></script></body>
    </html>
  );
}
