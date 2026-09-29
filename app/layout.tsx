import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header, Footer } from "@/components/chrome";
import { SITE_URL } from "@/lib/site";
import "katex/dist/katex.min.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Interspeech 2026 — Research Wiki",
    template: "%s | Interspeech 2026 Wiki",
  },
  description:
    "Explore 1,379 Interspeech 2026 papers. Read connected research digests, browse 14 categories, discover institutions, and find code and resources. Curated by Wei-Ren Lan.",
  openGraph: {
    title: "Interspeech 2026 — Research Wiki",
    description:
      "Find your next idea in speech research. 1,379 papers. 14 categories. One open wiki.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
