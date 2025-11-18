"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  Search,
  DollarSign,
  Globe,
  Zap,
  Code,
  FileText,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Generation",
    description:
      "Uses OpenAI GPT models (40+ models supported) to generate creative, brandable domain names that match your vision.",
  },
  {
    icon: Search,
    title: "Real-Time WHOIS Check",
    description:
      "Instantly verify domain availability via WHOIS lookup across multiple TLDs including .com, .io, .dev, .ai, and more.",
  },
  {
    icon: DollarSign,
    title: "Sale Detection",
    description:
      "Automatically identifies domains available for purchase, helping you spot premium domain opportunities.",
  },
  {
    icon: Globe,
    title: "Multiple TLD Support",
    description:
      "Check availability across 15+ popular TLDs simultaneously to find the perfect extension for your brand.",
  },
  {
    icon: Zap,
    title: "Streaming Mode",
    description:
      "Get domain availability in real-time as the AI generates names. See results in 2-3 seconds per domain.",
  },
  {
    icon: Code,
    title: "Programmatic API",
    description:
      "Integrate into your Node.js projects with full TypeScript support and comprehensive documentation.",
  },
  {
    icon: FileText,
    title: "Structured Output",
    description:
      "Export results to JSON with detailed statistics, timestamps, and domain metadata for easy analysis.",
  },
  {
    icon: Settings,
    title: "Flexible Configuration",
    description:
      "Use JSON config files, CLI arguments, or both. Perfect for CI/CD pipelines, Docker, and serverless functions.",
  },
];

export function Features() {
  return (
    <section id="features" className="container py-24 md:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to find the perfect domain name for your next
          project
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

