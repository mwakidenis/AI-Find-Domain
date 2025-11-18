"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Github, Terminal, Copy, Check } from "lucide-react";
import { toast } from "sonner";

function CTACommandCard() {
  const [copied, setCopied] = useState(false);
  const command = `pnpm install -g find-my-domain
find-my-domain --keywords tech --count 10`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Commands copied!", { icon: "✓", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg bg-card border p-3 shadow-sm group hover:shadow-md transition-shadow max-w-xl w-full">
      <div className="flex items-start gap-2">
        <Terminal className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
        <div className="flex-1 text-left">
          <code className="text-xs sm:text-sm">
            <span className="text-muted-foreground">$</span> pnpm install -g
            find-my-domain
            <br />
            <span className="text-muted-foreground">$</span> find-my-domain
            --keywords tech --count 10
          </code>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 shrink-0 hover:bg-primary/10 transition-all duration-200 hover:scale-110"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500 animate-in zoom-in duration-200" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section className="container mx-auto py-12 md:py-16 px-4">
      <Card className="relative overflow-hidden mx-auto max-w-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <CardContent className="relative flex flex-col items-center justify-center gap-3 p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to Find Your Domain?
          </h2>
          <p className="max-w-md text-xs text-muted-foreground sm:text-sm">
            Install now and start generating creative domain names in seconds.
            Free and open source.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row justify-center">
            <Button asChild size="default" className="gap-2">
              <Link href="/demo">
                Try Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="gap-2">
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

          <div className="flex justify-center w-full">
            <CTACommandCard />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
