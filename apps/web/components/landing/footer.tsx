import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-6">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h3 className="text-sm font-semibold">Find My Domain</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-powered domain name generator with real-time availability
              checking.
            </p>
            <div className="flex gap-2">
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <Link
                  href="https://github.com/mwakidenis/domain-map"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <Link
                  href="https://www.linkedin.com/in/denisit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <Link href="mailto:mwakidenice@gmail.com">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Product</h3>
            <nav className="flex flex-col gap-2">
              <Button
                asChild
                variant="link"
                className="h-auto p-0 justify-start text-xs text-muted-foreground"
              >
                <Link href="/demo">Demo</Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="h-auto p-0 justify-start text-xs text-muted-foreground"
              >
                <Link href="/docs">Documentation</Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="h-auto p-0 justify-start text-xs text-muted-foreground"
              >
                <Link
                  href="https://github.com/mwakidenis/domain-map"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </Button>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Button
                asChild
                variant="link"
                className="h-auto p-0 justify-start text-xs text-muted-foreground"
              >
                <Link
                  href="https://github.com/mwakidenis/domain-map#-quick-start"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quick Start
                </Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="h-auto p-0 justify-start text-xs text-muted-foreground"
              >
                <Link
                  href="https://github.com/mwakidenis/domain-map#-usage-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Usage Guide
                </Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="h-auto p-0 justify-start text-xs text-muted-foreground"
              >
                <Link
                  href="https://github.com/mwakidenis/domain-map/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issues
                </Link>
              </Button>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Button
                asChild
                variant="link"
                className="h-auto p-0 justify-start text-xs text-muted-foreground"
              >
                <Link
                  href="https://github.com/mwakidenis/domain-map/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MIT License
                </Link>
              </Button>
            </nav>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>
            © 2025{" "}
            <Button asChild variant="link" className="h-auto p-0 text-xs">
              <Link
                href="https://www.linkedin.com/in/denisit"
                target="_blank"
                rel="noopener noreferrer"
              >
                mwakidenis
              </Link>
            </Button>
          </p>
          <p>
            Built with{" "}
            <Button asChild variant="link" className="h-auto p-0 text-xs">
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </Link>
            </Button>{" "}
            and{" "}
            <Button asChild variant="link" className="h-auto p-0 text-xs">
              <Link
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                shadcn/ui
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </footer>
  );
}
