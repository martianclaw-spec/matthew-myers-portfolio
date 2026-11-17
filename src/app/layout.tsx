import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://matthew-myers.vercel.app";
const siteTitle = "Matthew Myers Builds";
const siteDescription =
  "Matthew Myers is an AI-native product engineer, full stack developer, and systems builder. After ten years in B2B SaaS sales, he built the Hacktivist platform (hacktivist.ai), which runs golf and sim-racing venues with booking, payments, kiosks, TrackMan and Assetto Corsa / rFactor 2 rig control, plus an MCP server that lets AI agents help run them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Matthew Myers",
    "product engineer",
    "full stack developer",
    "AI-native engineer",
    "founding engineer",
    "systems builder",
    "Hacktivist",
    "hacktivist.ai",
    "sim racing software",
    "Assetto Corsa",
    "rFactor 2",
    "MCP",
    "solutions engineer",
    "forward deployed engineer",
    "Next.js",
    "React",
    "Supabase",
  ],
  authors: [{ name: "Matthew Myers" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} dark`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
