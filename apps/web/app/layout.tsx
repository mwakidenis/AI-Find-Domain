import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://find-my-domain.vercel.app"),
  title: {
    default:
      "Find My Domain - AI-Powered Domain Name Generator | Free WHOIS Check",
    template: "%s | Find My Domain",
  },
  description:
    "Generate creative, brandable domain names using OpenAI GPT-4 and check availability in real-time across 25+ TLDs. Free online tool with instant WHOIS lookup. Perfect for startups, developers, and entrepreneurs.",
  keywords: [
    "domain generator",
    "AI domain names",
    "domain name generator",
    "domain availability checker",
    "WHOIS lookup",
    "WHOIS checker",
    "startup domain names",
    "brandable domains",
    "domain search tool",
    "OpenAI domain generator",
    "GPT-4 domain names",
    "free domain checker",
    "available domains",
    "domain name ideas",
    "business name generator",
    "startup name generator",
    "domain search",
    "check domain availability",
    "domain name availability",
    "TLD checker",
    ".com domain checker",
    ".io domain checker",
    "domain registration checker",
    "AI-powered domain search",
  ],
  authors: [
    {
      name: "Dmitrii Selikhov",
      url: "https://www.linkedin.com/in/dimetrix",
    },
  ],
  creator: "Dmitrii Selikhov",
  publisher: "Find My Domain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://find-my-domain.vercel.app",
    title:
      "Find My Domain - AI-Powered Domain Name Generator | Free WHOIS Check",
    description:
      "Generate creative, brandable domain names using OpenAI GPT-4 and check availability in real-time across 25+ TLDs. Free online tool with instant WHOIS lookup.",
    siteName: "Find My Domain",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Find My Domain - AI-Powered Domain Name Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find My Domain - AI-Powered Domain Name Generator",
    description:
      "Generate creative, brandable domain names using OpenAI GPT-4 and check availability in real-time across 25+ TLDs.",
    creator: "@idimetrix",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Sonner />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
