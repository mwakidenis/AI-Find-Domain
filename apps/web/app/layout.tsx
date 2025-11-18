import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Find My Domain - AI-Powered Domain Name Generator",
  description:
    "Generate creative, available domain names using AI and check their availability in real-time across multiple TLDs. Perfect for startups, developers, and entrepreneurs.",
  keywords: [
    "domain generator",
    "AI domain names",
    "domain availability",
    "WHOIS checker",
    "startup tools",
    "domain search",
  ],
  authors: [
    {
      name: "Dmitrii Selikhov",
      url: "https://www.linkedin.com/in/dimetrix",
    },
  ],
  creator: "Dmitrii Selikhov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://find-my-domain.vercel.app",
    title: "Find My Domain - AI-Powered Domain Name Generator",
    description:
      "Generate creative, available domain names using AI and check their availability in real-time.",
    siteName: "Find My Domain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find My Domain - AI-Powered Domain Name Generator",
    description:
      "Generate creative, available domain names using AI and check their availability in real-time.",
    creator: "@idimetrix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable,
          )}
        >
          {children}
          <Toaster />
          <Sonner />
        </body>
      </html>
    </ClerkProvider>
  );
}
