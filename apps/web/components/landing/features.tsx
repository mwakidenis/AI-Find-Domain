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
    <section id="features" className="container mx-auto py-12 md:py-16 px-4">
      <div className="mx-auto flex max-w-[48rem] flex-col items-center space-y-2 text-center">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
          Features
        </h2>
        <p className="max-w-[85%] text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Everything you need to find the perfect domain name
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-3 py-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="relative overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
            >
              <CardHeader className="pb-2">
                <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-sm">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
