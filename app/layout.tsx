import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarketPulse Berlin — explore Berlin's 12 districts",
  description: "Interactive choropleth map of Berlin's 12 Bezirke with real-estate stats, demographic data, and commercial-property context. Built with Next.js, MapLibre and open Berlin data.",
  openGraph: {
    title: "MarketPulse Berlin",
    description: "Interactive map of Berlin's 12 districts with real-estate and demographic stats.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
