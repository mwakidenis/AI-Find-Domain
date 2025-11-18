"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Search, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6" />
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Find My Domain</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/demo" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm font-medium transition-colors hover:text-primary px-4 py-2">
                    Demo
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm font-medium transition-colors hover:text-primary px-4 py-2">
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="https://github.com/idimetrix/find-my-domain"
                  target="_blank"
                  rel="noopener noreferrer"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className="text-sm font-medium transition-colors hover:text-primary px-4 py-2">
                    GitHub
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden md:flex"
          >
            <Link
              href="https://github.com/idimetrix/find-my-domain"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button asChild className="hidden md:flex">
            <Link href="/demo">Try Demo</Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/demo"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Demo
                </Link>
                <Link
                  href="/docs"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Documentation
                </Link>
                <Link
                  href="https://github.com/idimetrix/find-my-domain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  GitHub
                </Link>
                <Button asChild className="mt-4">
                  <Link href="/demo">Try Demo</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
