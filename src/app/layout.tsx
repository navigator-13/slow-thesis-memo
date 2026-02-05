import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SYN(THESIS): Creator Fund + Foundation Insights",
  description: "Backing creator-operators in boutique hospitality and strategic insights for the world’s first private farm collection.",
  openGraph: {
    title: "SYN(THESIS): Creator Fund + Foundation Insights",
    description: "Backing creator-operators in boutique hospitality and strategic insights for the world’s first private farm collection.",
    type: "website",
    images: [
      {
        url: "/og-synthesis.png",
        width: 1200,
        height: 630,
        alt: "SYN(THESIS) Creator Fund + Foundation Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SYN(THESIS): Creator Fund + Foundation Insights",
    description: "Backing creator-operators in boutique hospitality and strategic insights for the world’s first private farm collection.",
    images: ["/og-synthesis.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
