"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Search, Menu, LogOut, User } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { isSignedIn, user, isLoaded } = useUser();
  
  const userInitials = user?.firstName?.[0] || user?.username?.[0] || "U";
  const userName = user?.firstName || user?.username || "User";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          <span className="text-lg font-bold">Find My Domain</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/demo" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                    Demo
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                    Docs
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
                  <NavigationMenuLink className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                    <Github className="h-4 w-4" />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          {isLoaded && isSignedIn ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {userName}
                </span>
              </div>
              <SignOutButton>
                <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5 h-8">
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </Button>
              </SignOutButton>
            </>
          ) : (
            <>
              {isLoaded && (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="hidden md:flex h-8">
                      Sign In
                    </Button>
                  </SignInButton>
                  <Button asChild size="sm" className="hidden md:flex h-8">
                    <Link href="/demo">Try Demo</Link>
                  </Button>
                </>
              )}
            </>
          )}

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <nav className="flex flex-col gap-2">
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/demo">Demo</Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/docs">Documentation</Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link
                      href="https://github.com/idimetrix/find-my-domain"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                </nav>
                
                <Separator />
                
                {isLoaded && isSignedIn ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{userName}</span>
                    </div>
                    <SignOutButton>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </SignOutButton>
                  </div>
                ) : (
                  <>
                    {isLoaded && (
                      <div className="flex flex-col gap-2">
                        <SignInButton mode="modal">
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </SignInButton>
                        <Button asChild className="w-full">
                          <Link href="/demo">Try Demo</Link>
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
