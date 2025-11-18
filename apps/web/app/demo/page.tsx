"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { DomainGeneratorForm } from "@/components/demo/domain-generator-form";
import { DomainResults } from "@/components/demo/domain-results";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Sparkles, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/demo/code-block";
import { toast } from "sonner";

interface DomainResult {
  domain: string;
  status: "available" | "sale" | "taken";
}

export default function DemoPage() {
  const [results, setResults] = useState<DomainResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("demo");
  const [error, setError] = useState<string | null>(null);
  const [generatingStatus, setGeneratingStatus] = useState<string>("");

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

      const { names } = await generateResponse.json();
      
      if (!names || names.length === 0) {
        throw new Error("No domain names were generated");
      }

      setGeneratingStatus(`Generated ${names.length} names! Checking availability...`);
      toast.success(`Generated ${names.length} domain names!`);

      // Step 2: Create full domain names with TLDs
      const fullDomains: string[] = [];
      for (const name of names) {
        for (const tld of config.tlds) {
          fullDomains.push(`${name}.${tld}`);
        }
      }

      setGeneratingStatus(`Checking availability for ${fullDomains.length} domains...`);

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
        throw new Error(errorData.error || "Failed to check domain availability");
      }

      const { results: domainResults } = await checkResponse.json();

      // Step 4: Transform results to our format
      const transformedResults: DomainResult[] = domainResults.map((result: any) => ({
        domain: result.domain,
        status: result.available ? "available" : result.sale ? "sale" : "taken",
      }));

      setResults(transformedResults);
      setGeneratingStatus("");
      
      const availableCount = transformedResults.filter(r => r.status === "available").length;
      toast.success(`Found ${availableCount} available domains!`, {
        icon: "🎉",
        duration: 3000,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
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
      <main className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-3 text-center">
            <Badge variant="outline" className="text-xs px-2.5 py-0.5">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Interactive Playground
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Try{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Find My Domain
              </span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Experience AI-driven domain generation with mock data for instant results.
              Install the CLI for real WHOIS checking.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="demo" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Interactive Demo
              </TabsTrigger>
              <TabsTrigger value="info" className="gap-2">
                <Info className="h-4 w-4" />
                Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-6 mt-6">
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Real AI-Powered Demo</AlertTitle>
                <AlertDescription>
                  This demo uses <strong>real OpenAI API</strong> to generate domains and <strong>real WHOIS</strong> to check availability.
                  Results may take 10-30 seconds depending on the number of domains.
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {generatingStatus && (
                <Alert>
                  <Info className="h-4 w-4 animate-pulse" />
                  <AlertTitle>Processing</AlertTitle>
                  <AlertDescription>{generatingStatus}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <DomainGeneratorForm onGenerate={handleGenerate} loading={loading} />
                </div>
                <div>
                  {loading ? (
                    <Card>
                      <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-24 w-full" />
                        </div>
                        <Skeleton className="h-px w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-16 w-full" />
                          <Skeleton className="h-16 w-full" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <DomainResults results={results} />
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="space-y-6 mt-6">
              <Card className="border-2 border-green-500/20 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    This Demo is 100% Real!
                  </CardTitle>
                  <CardDescription>
                    This demo uses <strong>actual OpenAI API</strong> for generation and <strong>real WHOIS</strong> for checking.
                    Install the CLI tool for even more features like custom models, streaming, and batch processing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Quick Start (No Installation)</h3>
                    <CodeBlock
                      code={`# Use npx - instant execution!
npx find-my-domain --keywords tech startup --count 10`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Global Installation</h3>
                    <CodeBlock
                      code={`# Install globally
pnpm install -g find-my-domain

# Set your OpenAI API key
export OPENAI_API_KEY=sk-your-key-here

# Run anywhere
find-my-domain --keywords tech --tlds com io --count 20`}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button asChild variant="default" className="flex-1">
                      <a href="/docs">View Full Documentation</a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a
                        href="https://github.com/idimetrix/find-my-domain"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub Repository
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <p className="font-medium text-sm">Real-time WHOIS</p>
                        <p className="text-xs text-muted-foreground">Instant availability checking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <p className="font-medium text-sm">40+ AI Models</p>
                        <p className="text-xs text-muted-foreground">All OpenAI models supported</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <p className="font-medium text-sm">Streaming Mode</p>
                        <p className="text-xs text-muted-foreground">See results as they generate</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <p className="font-medium text-sm">15+ TLDs</p>
                        <p className="text-xs text-muted-foreground">.com, .io, .dev, and more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <p className="font-medium text-sm">Node.js API</p>
                        <p className="text-xs text-muted-foreground">Full TypeScript support</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <p className="font-medium text-sm">JSON Export</p>
                        <p className="text-xs text-muted-foreground">Structured output files</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/50">
                <CardHeader>
                  <CardTitle className="text-lg">Popular Use Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5">🚀</Badge>
                      <div>
                        <p className="text-sm font-medium">Startup Launch</p>
                        <p className="text-xs text-muted-foreground">
                          Find brandable domains for your new SaaS or product
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5">💻</Badge>
                      <div>
                        <p className="text-sm font-medium">Developer Projects</p>
                        <p className="text-xs text-muted-foreground">
                          Technical names for open source tools and libraries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5">🎨</Badge>
                      <div>
                        <p className="text-sm font-medium">Personal Branding</p>
                        <p className="text-xs text-muted-foreground">
                          Portfolio, blog, or professional website domains
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5">🛍️</Badge>
                      <div>
                        <p className="text-sm font-medium">E-commerce</p>
                        <p className="text-xs text-muted-foreground">
                          Memorable shop names that customers will remember
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

