import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulmahesh.design"),
  title: {
    default: "Rahul Mahesh — AI Product Engineer",
    template: "%s | Rahul Mahesh",
  },
  description:
    "AI Product Engineer building full-stack SaaS platforms, AI automation agents, and scalable systems. TypeScript, React, Next.js, NestJS.",
  keywords: [
    "AI Product Engineer",
    "Full-Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "NestJS",
  ],
  authors: [{ name: "Rahul Mahesh" }],
  creator: "Rahul Mahesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulmahesh.design",
    title: "Rahul Mahesh — Product Design + Engineering",
    description:
      "I design product experiences that grow adoption, retention, and revenue.",
    siteName: "Rahul Mahesh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Mahesh — Product Design + Engineering",
    description:
      "I design product experiences that grow adoption, retention, and revenue.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
