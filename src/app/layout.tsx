import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brock Exchange — Trade • Invest • Grow",
  description:
    "Brock Exchange is a next-generation crypto trading platform. Predict market movements, trade binary options with up to 50% returns in minutes, and grow your portfolio.",
  keywords: [
    "Brock Exchange",
    "crypto",
    "trading",
    "bitcoin",
    "ethereum",
    "binary options",
    "exchange",
  ],
  authors: [{ name: "Brock Exchange" }],
  metadataBase: new URL("https://brockexchange.buzz"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32.png"],
  },
  openGraph: {
    title: "Brock Exchange — Trade • Invest • Grow",
    description: "Next-generation crypto trading platform. Predict markets, trade smart, grow your portfolio.",
    siteName: "Brock Exchange",
    type: "website",
    url: "https://brockexchange.buzz",
    images: ["/icon-512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brock Exchange",
    description: "Next-generation crypto trading platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
