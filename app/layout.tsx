import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deven Rikame | Full Stack Developer",
  description:
    "Portfolio of Deven Rikame, a Mumbai-based full-stack developer building production websites, CRM systems, SaaS platforms, and AI-powered applications with React, Next.js, TypeScript, Node.js, Firebase, Supabase, and SQL.",
  keywords: [
    "Deven Rikame",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Mumbai",
  ],
  authors: [{ name: "Deven Rikame" }],
  creator: "Deven Rikame",
  openGraph: {
    title: "Deven Rikame | Full Stack Developer",
    description:
      "Full-stack developer delivering production websites, CRM systems, SaaS platforms, and AI-powered applications.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Deven Rikame | Full Stack Developer",
    description:
      "Full-stack developer building practical, production-ready web products.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
