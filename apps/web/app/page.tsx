import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Stats } from "@/components/landing/stats";
import { UseCases } from "@/components/landing/use-cases";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "AI Domain Name Generator - Generate Brandable Domains with OpenAI",
  description:
    "Free AI-powered domain name generator using OpenAI GPT-4. Generate creative, brandable domain names and check availability across 25+ TLDs instantly. Real-time WHOIS lookup, no signup required. Perfect for startups, businesses, and developers.",
  keywords: [
    "AI domain generator",
    "OpenAI domain names",
    "GPT-4 domain generator",
    "free domain name generator",
    "brandable domain names",
    "startup domain generator",
    "business name generator",
    "domain availability checker",
    "WHOIS lookup tool",
    "domain search",
    "creative domain names",
    "available domains",
  ],
  alternates: {
    canonical: "https://find-my-domain.vercel.app",
  },
  openGraph: {
    title: "AI Domain Name Generator - Generate Brandable Domains with OpenAI",
    description:
      "Free AI-powered domain name generator using OpenAI GPT-4. Generate creative, brandable domain names and check availability across 25+ TLDs instantly.",
    url: "https://find-my-domain.vercel.app",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Stats />
          <Features />
          <HowItWorks />
          <UseCases />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
