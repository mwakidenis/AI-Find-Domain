"use client";

import { useState, useEffect, useRef } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { DomainGeneratorForm } from "@/components/demo/domain-generator-form";
import { DomainResults } from "@/components/demo/domain-results";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Sparkles, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/demo/code-block";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface DomainResult {
  domain: string;
  status: "available" | "sale" | "taken";
}

interface DomainCheckResult {
  domain: string;
  available: boolean;
  sale: boolean;
  ok: boolean;
  duration: number;
}

export default function DemoPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [results, setResults] = useState<DomainResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("demo");
  const [error, setError] = useState<string | null>(null);
  const [generatingStatus, setGeneratingStatus] = useState<string>("");
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(
    null,
  );
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const signInButtonRef = useRef<HTMLButtonElement>(null);

  // Fetch remaining attempts when user is loaded
  useEffect(() => {
    const fetchAttempts = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const response = await fetch("/api/attempts");
          if (response.ok) {
            const data = await response.json();
            setRemainingAttempts(data.remaining);
          }
        } catch (err) {
          console.error("Failed to fetch attempts:", err);
        } finally {
          setLoadingAttempts(false);
        }
      } else if (isLoaded) {
        setLoadingAttempts(false);
      }
    };

    fetchAttempts();
  }, [isLoaded, isSignedIn]);

  const handleGenerate = async (config: {
    keywords: string[];
    domains: string[];
    tlds: string[];
    count: number;
  }) => {
    setLoading(true);
    setResults([]);
    setError(null);
    setGeneratingStatus("Generating domain names with AI...");

    try {
      // Step 1: Generate domain names using OpenAI
      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: config.keywords,
          domains: config.domains,
          count: config.count,
          model: "gpt-4o-mini",
        }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || "Failed to generate domain names");
      }

      const { names, remaining } = await generateResponse.json();

      // Update remaining attempts from the response
      if (typeof remaining === "number") {
        setRemainingAttempts(remaining);
      }

      if (!names || names.length === 0) {
        throw new Error("No domain names were generated");
      }

      setGeneratingStatus(
        `Generated ${names.length} names! Checking availability...`,
      );
      toast.success(`Generated ${names.length} domain names!`);

      // Step 2: Create full domain names with TLDs
      const fullDomains: string[] = [];
      for (const name of names) {
        for (const tld of config.tlds) {
          fullDomains.push(`${name}.${tld}`);
        }
      }

      setGeneratingStatus(
        `Checking availability for ${fullDomains.length} domains...`,
      );

      // Step 3: Check domain availability with WHOIS
      const checkResponse = await fetch("/api/check-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domains: fullDomains,
        }),
      });

      if (!checkResponse.ok) {
        const errorData = await checkResponse.json();
        throw new Error(
          errorData.error || "Failed to check domain availability",
        );
      }

      const { results: domainResults } = await checkResponse.json();

      // Step 4: Transform results to our format
      const transformedResults: DomainResult[] = domainResults.map(
        (result: DomainCheckResult) => ({
          domain: result.domain,
          status: result.available
            ? "available"
            : result.sale
              ? "sale"
              : "taken",
        }),
      );

      setResults(transformedResults);
      setGeneratingStatus("");

      const availableCount = transformedResults.filter(
        (r) => r.status === "available",
      ).length;
      toast.success(`Found ${availableCount} available domains!`, {
        icon: "🎉",
        duration: 3000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setGeneratingStatus("");
      toast.error(errorMessage, {
        duration: 5000,
      });
      console.error("Error generating domains:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-6 md:py-8 px-4">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                <Sparkles className="mr-1 h-3 w-3" />
                Interactive Playground
              </Badge>
              <SignInButton mode="modal" fallbackRedirectUrl="/demo">
                <button
                  ref={signInButtonRef}
                  style={{ display: "none" }}
                  aria-hidden="true"
                />
              </SignInButton>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Try{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899] dark:from-[#c084fc] dark:to-[#f472b6]">
                Find My Domain
              </span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto">
              Experience 100% real AI-driven domain generation with actual
              OpenAI and WHOIS checking.
            </p>

            {/* Attempts Counter */}
            {isSignedIn && !loadingAttempts && remainingAttempts !== null && (
              <Card className="max-w-sm mx-auto">
                <CardContent className="pt-3 pb-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Remaining Attempts</span>
                      <span className="text-sm font-bold">
                        {remainingAttempts} / 5
                      </span>
                    </div>
                    <Progress
                      value={(remainingAttempts / 5) * 100}
                      className="h-1.5"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      {remainingAttempts === 0
                        ? "No attempts left. Contact support to get more."
                        : `${remainingAttempts} generation${remainingAttempts !== 1 ? "s" : ""} remaining`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="demo" className="gap-1.5 text-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Demo
              </TabsTrigger>
              <TabsTrigger value="info" className="gap-1.5 text-sm">
                <Info className="h-3.5 w-3.5" />
                Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-4 mt-4">
              <Alert className="border-2 border-primary/50 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10">
                <Sparkles className="h-5 w-5" />
                <AlertTitle className="text-base font-bold">
                  Real AI-Powered Demo
                </AlertTitle>
                <AlertDescription className="text-sm">
                  This demo uses <strong>real OpenAI API</strong> to generate
                  domains and <strong>real WHOIS</strong> to check availability.
                  {isSignedIn && remainingAttempts !== null && (
                    <>
                      {" "}
                      You have <strong>
                        {remainingAttempts} / 5 attempts
                      </strong>{" "}
                      remaining.
                    </>
                  )}
                  {!isSignedIn && isLoaded && (
                    <div className="mt-2">
                      <strong className="text-base">
                        ✨ Sign in to get 5 free generations!
                      </strong>
                    </div>
                  )}
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm">Error</AlertTitle>
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {generatingStatus && (
                <Alert>
                  <Info className="h-4 w-4 animate-pulse" />
                  <AlertTitle className="text-sm">Processing</AlertTitle>
                  <AlertDescription className="text-xs">
                    {generatingStatus}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <DomainGeneratorForm
                    onGenerate={handleGenerate}
                    loading={loading}
                    disabled={
                      loading || (isSignedIn && remainingAttempts === 0)
                    }
                    isSignedIn={isLoaded && isSignedIn}
                    onSignInRequired={() => {
                      if (signInButtonRef.current) {
                        signInButtonRef.current.click();
                      } else {
                        toast.error("Please wait for sign-in to load...");
                      }
                    }}
                  />
                </div>
                <div>
                  {loading ? (
                    <Card>
                      <CardHeader className="pb-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <Skeleton className="h-20 w-full" />
                          <Skeleton className="h-20 w-full" />
                          <Skeleton className="h-20 w-full" />
                        </div>
                        <Skeleton className="h-px w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-14 w-full" />
                          <Skeleton className="h-14 w-full" />
                          <Skeleton className="h-14 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <DomainResults results={results} />
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="space-y-4 mt-4">
              <Card className="border-2 border-green-500/20 bg-green-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    This Demo is 100% Real!
                  </CardTitle>
                  <CardDescription className="text-xs">
                    This demo uses <strong>actual OpenAI API</strong> for
                    generation and <strong>real WHOIS</strong> for checking.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold">
                      Quick Start (No Installation)
                    </h3>
                    <CodeBlock
                      code={`# Use npx - instant execution!
npx find-my-domain --keywords tech startup --count 10`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold">
                      Global Installation
                    </h3>
                    <CodeBlock
                      code={`# Install globally
pnpm install -g find-my-domain

# Set your OpenAI API key
export OPENAI_API_KEY=sk-your-key-here

# Run anywhere
find-my-domain --keywords tech --tlds com io --count 20`}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="flex-1"
                    >
                      <a href="/docs">Docs</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <a
                        href="https://github.com/idimetrix/find-my-domain"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Info className="h-4 w-4" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-start gap-2 rounded-lg border p-2.5">
                      <span className="text-green-500 text-base">✓</span>
                      <div>
                        <p className="font-medium text-xs">Real-time WHOIS</p>
                        <p className="text-xs text-muted-foreground">
                          Instant availability
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-2.5">
                      <span className="text-green-500 text-base">✓</span>
                      <div>
                        <p className="font-medium text-xs">40+ AI Models</p>
                        <p className="text-xs text-muted-foreground">
                          All OpenAI models
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-2.5">
                      <span className="text-green-500 text-base">✓</span>
                      <div>
                        <p className="font-medium text-xs">Streaming Mode</p>
                        <p className="text-xs text-muted-foreground">
                          Real-time results
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-2.5">
                      <span className="text-green-500 text-base">✓</span>
                      <div>
                        <p className="font-medium text-xs">25+ TLDs</p>
                        <p className="text-xs text-muted-foreground">
                          .com, .io, .dev, more
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-2.5">
                      <span className="text-green-500 text-base">✓</span>
                      <div>
                        <p className="font-medium text-xs">Node.js API</p>
                        <p className="text-xs text-muted-foreground">
                          TypeScript support
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border p-2.5">
                      <span className="text-green-500 text-base">✓</span>
                      <div>
                        <p className="font-medium text-xs">JSON Export</p>
                        <p className="text-xs text-muted-foreground">
                          Structured output
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Popular Use Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <Badge
                        variant="secondary"
                        className="mt-0.5 text-xs px-2 py-0.5"
                      >
                        🚀
                      </Badge>
                      <div>
                        <p className="text-xs font-medium">Startup Launch</p>
                        <p className="text-xs text-muted-foreground">
                          Find brandable domains for your SaaS or product
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge
                        variant="secondary"
                        className="mt-0.5 text-xs px-2 py-0.5"
                      >
                        💻
                      </Badge>
                      <div>
                        <p className="text-xs font-medium">
                          Developer Projects
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Names for open source tools and libraries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge
                        variant="secondary"
                        className="mt-0.5 text-xs px-2 py-0.5"
                      >
                        🎨
                      </Badge>
                      <div>
                        <p className="text-xs font-medium">Personal Branding</p>
                        <p className="text-xs text-muted-foreground">
                          Portfolio, blog, or professional website
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge
                        variant="secondary"
                        className="mt-0.5 text-xs px-2 py-0.5"
                      >
                        🛍️
                      </Badge>
                      <div>
                        <p className="text-xs font-medium">E-commerce</p>
                        <p className="text-xs text-muted-foreground">
                          Memorable shop names customers remember
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
