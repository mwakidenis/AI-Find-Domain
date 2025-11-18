import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Find My Domain</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered domain name generator with real-time availability
              checking.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/idimetrix/find-my-domain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/dimetrix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:selikhov.dmitrey@gmail.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/demo"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/idimetrix/find-my-domain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/idimetrix/find-my-domain#-quick-start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Quick Start
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/idimetrix/find-my-domain#-usage-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Usage Guide
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/idimetrix/find-my-domain/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Issues
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/idimetrix/find-my-domain/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  MIT License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>
            © 2025{" "}
            <Link
              href="https://www.linkedin.com/in/dimetrix"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Dmitrii Selikhov
            </Link>
            . All rights reserved.
          </p>
          <p>
            Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Next.js
            </Link>{" "}
            and{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              shadcn/ui
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

