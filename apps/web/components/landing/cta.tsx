"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Github, Terminal } from "lucide-react";

export function CTA() {
  return (
    <section className="container py-24 md:py-32">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <CardContent className="relative flex flex-col items-center justify-center gap-6 p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Find Your Domain?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Install now and start generating creative domain names in seconds.
            Free and open source.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/demo">
                Try Interactive Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link
                href="https://github.com/idimetrix/find-my-domain"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>

          <div className="mt-6 rounded-lg bg-card border p-4 shadow-sm">
            <div className="flex items-start gap-2 text-sm">
              <Terminal className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="text-left">
                <code className="text-xs sm:text-sm">
                  <span className="text-muted-foreground">$</span> pnpm install
                  -g find-my-domain
                  <br />
                  <span className="text-muted-foreground">$</span>{" "}
                  find-my-domain --keywords tech --count 10
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

