"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Rocket,
  Code2,
  Briefcase,
  Heart,
  ShoppingCart,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const useCases = [
  {
    icon: Rocket,
    title: "Startups & SaaS",
    description:
      "Find memorable, brandable domains for your next big idea. Generate names that resonate with your target market.",
    examples: ["stripe", "vercel", "notion"],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Code2,
    title: "Developer Tools",
    description:
      "Create technical, descriptive names for your open source projects, libraries, or development platforms.",
    examples: ["github", "gitlab", "docker"],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Briefcase,
    title: "Agency & Consulting",
    description:
      "Establish professional online presence with domains that reflect your expertise and services.",
    examples: ["acme", "summit", "nexus"],
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stores",
    description:
      "Discover catchy, memorable names that customers will remember and return to for shopping.",
    examples: ["shopify", "etsy", "amazon"],
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Heart,
    title: "Personal Brands",
    description:
      "Build your personal brand with unique domains for portfolios, blogs, or professional websites.",
    examples: ["johndoe", "mystudio", "mywork"],
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: GraduationCap,
    title: "Educational Projects",
    description:
      "Create clear, educational domain names for courses, tutorials, or learning platforms.",
    examples: ["academy", "learn", "courses"],
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="w-full py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-[56rem] flex-col items-center space-y-3 text-center">
          <Badge variant="outline" className="text-xs px-2.5 py-0.5">
            Use Cases
          </Badge>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            Perfect For Every Project
          </h2>
          <p className="max-w-[85%] text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whether you&apos;re building a startup, side project, or personal
            brand, Find My Domain helps you discover the perfect name
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <Card
                key={useCase.title}
                className="relative overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <CardHeader className="pb-3">
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${useCase.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${useCase.color}`} />
                  </div>
                  <CardTitle className="text-base">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <CardDescription className="text-xs leading-relaxed">
                    {useCase.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1.5">
                    {useCase.examples.map((example) => (
                      <Badge
                        key={example}
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5"
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Card className="max-w-2xl w-full bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
              <h3 className="text-2xl font-bold">
                Ready to Find Your Perfect Domain?
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Try our interactive demo or install the CLI tool to start
                generating AI-powered domain names right now
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/demo">
                    Try Interactive Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
