"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Zap,
  Github,
  Check,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

function CopyCommandCard() {
  const [copied, setCopied] = useState(false);
  const command =
    "npx find-my-domain --keywords tech startup --count 10 --tlds com io dev";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Command copied!", { icon: "✓", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mt-6 rounded-lg border bg-card p-4 shadow-md max-w-3xl w-full group hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" />
            <span className="font-medium">
              Quick Start - No Installation Required
            </span>
          </div>
          <div className="rounded-md bg-muted/50 px-3 py-2 border">
            <code className="text-xs sm:text-sm">
              <span className="text-muted-foreground select-none">$ </span>
              <span className="text-foreground">npx find-my-domain </span>
              <span className="text-blue-500">--keywords</span>{" "}
              <span className="text-green-500">tech startup</span>{" "}
              <span className="text-blue-500">--count</span>{" "}
              <span className="text-orange-500">10</span>{" "}
              <span className="text-blue-500">--tlds</span>{" "}
              <span className="text-purple-500">com io dev</span>
            </code>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 shrink-0 hover:bg-primary/10 transition-all duration-200 hover:scale-110"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500 animate-in zoom-in duration-200" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}

export function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center space-y-6 py-16 md:py-24 lg:py-32">
      <Badge variant="secondary" className="px-3 py-1 text-xs">
        <Sparkles className="mr-1.5 h-3 w-3" />
        AI-Powered Domain Discovery
      </Badge>

      <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Find Your Perfect
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-gradient">
            Domain Name
          </span>
          <br />
          with AI
        </h1>

        <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
          Generate creative, memorable domain names using OpenAI and check their
          real-time availability across multiple TLDs. Perfect for startups,
          developers, and entrepreneurs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-green-500" />
            <span>40+ AI Models</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-green-500" />
            <span>Real-time WHOIS</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-green-500" />
            <span>Open Source</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-green-500" />
            <span>Free Forever</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="default" className="gap-2">
          <Link href="/demo">
            <Sparkles className="h-4 w-4" />
            Try Interactive Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="default" className="gap-2">
          <Link href="/docs">
            <Terminal className="h-4 w-4" />
            Documentation
          </Link>
        </Button>
        <Button asChild variant="ghost" size="default" className="gap-2">
          <Link
            href="https://github.com/idimetrix/find-my-domain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </Button>
      </div>

      <CopyCommandCard />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 text-center max-w-4xl w-full">
        <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-3">
            <Zap className="h-5 w-5 text-blue-500" />
          </div>
          <h3 className="font-semibold">Lightning Fast</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Results in seconds with streaming mode
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="rounded-full bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-3">
            <Sparkles className="h-5 w-5 text-purple-500" />
          </div>
          <h3 className="font-semibold">AI-Powered</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            40+ OpenAI models for creative names
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-3">
            <Terminal className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="font-semibold">CLI & API</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            CLI tool or Node.js integration
          </p>
        </div>
      </div>
    </section>
  );
}
