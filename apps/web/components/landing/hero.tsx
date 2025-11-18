"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Sparkles, Terminal, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center space-y-8 py-24 md:py-32">
      <Badge variant="secondary" className="mb-4">
        <Sparkles className="mr-2 h-3 w-3" />
        AI-Powered Domain Discovery
      </Badge>

      <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Perfect
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {" "}
            Domain Name{" "}
          </span>
          with AI
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Generate creative, memorable domain names using OpenAI and check
          their real-time availability across multiple TLDs. Perfect for
          startups, developers, and entrepreneurs.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="gap-2">
          <Link href="/demo">
            Try Interactive Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/docs">
            <Terminal className="h-4 w-4" />
            View Documentation
          </Link>
        </Button>
      </div>

      <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-start gap-2 text-sm">
          <Terminal className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <code className="text-xs sm:text-sm">
              <span className="text-muted-foreground">$</span> npx
              find-my-domain --keywords tech startup --count 10 --tlds com io
            </code>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Lightning Fast</h3>
          <p className="text-sm text-muted-foreground">
            Get results in seconds with streaming mode
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">AI-Powered</h3>
          <p className="text-sm text-muted-foreground">
            40+ OpenAI models for creative naming
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Terminal className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">CLI & API</h3>
          <p className="text-sm text-muted-foreground">
            Use as CLI tool or integrate into your apps
          </p>
        </div>
      </div>
    </section>
  );
}

