"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Sparkles, Search, Download } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Terminal,
    title: "Install CLI Tool",
    description: "Install globally with pnpm, npm, or use npx for instant execution without installation.",
    code: "npx find-my-domain",
    color: "text-blue-500",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "AI Generation",
    description: "Provide keywords or example domains. Our AI analyzes patterns and generates creative, brandable names.",
    code: "--keywords tech startup",
    color: "text-purple-500",
  },
  {
    number: 3,
    icon: Search,
    title: "WHOIS Check",
    description: "Automatically checks domain availability across multiple TLDs using real-time WHOIS lookup.",
    code: "--tlds com io dev",
    color: "text-green-500",
  },
  {
    number: 4,
    icon: Download,
    title: "Export Results",
    description: "Get structured JSON output with availability status, timestamps, and detailed statistics.",
    code: "output/results.json",
    color: "text-orange-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container py-16 md:py-20 bg-muted/30">
      <div className="mx-auto flex max-w-[56rem] flex-col items-center space-y-3 text-center">
        <Badge variant="outline" className="text-xs px-2.5 py-0.5">
          Simple Process
        </Badge>
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
          How It Works
        </h2>
        <p className="max-w-[85%] text-sm leading-relaxed text-muted-foreground sm:text-base">
          Four simple steps to find your perfect domain
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.number}
              className="relative overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-gradient-to-br from-primary/10 to-transparent rounded-full" />
              <CardHeader className="pb-3">
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ${step.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-sm font-bold">
                    {step.number}
                  </Badge>
                </div>
                <CardTitle className="text-base">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <CardDescription className="text-xs leading-relaxed">
                  {step.description}
                </CardDescription>
                <div className="rounded-md bg-muted/50 px-2 py-1.5">
                  <code className="text-[10px] text-muted-foreground">
                    {step.code}
                  </code>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

