"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Search, Menu, LogOut } from "lucide-react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
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
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
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
          
          {isLoaded && isSignedIn ? (
            <>
              <span className="hidden md:flex text-sm text-muted-foreground">
                Hello, <span className="font-medium text-foreground ml-1">{user?.firstName || user?.username || 'User'}</span>
              </span>
              <SignOutButton>
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </SignOutButton>
            </>
          ) : (
            <>
              {isLoaded && (
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    Sign In
                  </Button>
                </SignInButton>
              )}
              <Button asChild className="hidden md:flex">
                <Link href="/demo">Try Demo</Link>
              </Button>
            </>
          )}

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
                
                {isLoaded && isSignedIn ? (
                  <>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">
                        Hello, <span className="font-medium text-foreground">{user?.firstName || user?.username || 'User'}</span>
                      </p>
                      <SignOutButton>
                        <Button variant="outline" className="w-full gap-2">
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </SignOutButton>
                    </div>
                  </>
                ) : (
                  <>
                    {isLoaded && (
                      <SignInButton mode="modal">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </SignInButton>
                    )}
                    <Button asChild>
                      <Link href="/demo">Try Demo</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
