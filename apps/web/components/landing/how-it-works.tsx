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
    description:
      "Install globally with pnpm, npm, or use npx for instant execution without installation.",
    code: "npx find-my-domain",
    color: "text-blue-500",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "AI Generation",
    description:
      "Provide keywords or example domains. Our AI analyzes patterns and generates creative, brandable names.",
    code: "--keywords tech startup",
    color: "text-purple-500",
  },
  {
    number: 3,
    icon: Search,
    title: "WHOIS Check",
    description:
      "Automatically checks domain availability across multiple TLDs using real-time WHOIS lookup.",
    code: "--tlds com io dev",
    color: "text-green-500",
  },
  {
    number: 4,
    icon: Download,
    title: "Export Results",
    description:
      "Get structured JSON output with availability status, timestamps, and detailed statistics.",
    code: "output/results.json",
    color: "text-orange-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-[48rem] flex-col items-center space-y-2 text-center">
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            Simple Process
          </Badge>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
            How It Works
          </h2>
          <p className="max-w-[85%] text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Four simple steps to find your perfect domain
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl gap-3 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className="relative overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-gradient-to-br from-primary/10 to-transparent rounded-full" />
                <CardHeader className="pb-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ${step.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-bold px-2 py-0.5">
                      {step.number}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 pt-0">
                  <CardDescription className="text-xs leading-relaxed">
                    {step.description}
                  </CardDescription>
                  <div className="rounded-md bg-muted/50 px-2 py-1">
                    <code className="text-[10px] text-muted-foreground">
                      {step.code}
                    </code>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
