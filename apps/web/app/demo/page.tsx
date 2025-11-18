"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { DomainGeneratorForm } from "@/components/demo/domain-generator-form";
import { DomainResults } from "@/components/demo/domain-results";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/demo/code-block";

interface DomainResult {
  domain: string;
  status: "available" | "sale" | "taken";
}

// Mock domain generation for demo purposes
const generateMockDomains = (config: {
  keywords: string[];
  domains: string[];
  tlds: string[];
  count: number;
}): DomainResult[] => {
  const prefixes = [
    "swift", "rapid", "quick", "fast", "smart", "bright", "tech", "dev", 
    "cloud", "cyber", "digital", "next", "future", "modern", "pro"
  ];
  
  const suffixes = [
    "hub", "lab", "space", "flow", "wave", "sync", "link", "base",
    "zone", "spot", "point", "edge", "core", "nest", "grid"
  ];

  const results: DomainResult[] = [];
  const generated = new Set<string>();

  // Use keywords if provided
  const sources = config.keywords.length > 0 ? config.keywords : prefixes;

  for (let i = 0; i < config.count; i++) {
    const prefix = sources[Math.floor(Math.random() * sources.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const name = `${prefix}${suffix}`;

    // Generate for each TLD
    config.tlds.forEach((tld) => {
      const domain = `${name}.${tld}`;
      if (!generated.has(domain)) {
        generated.add(domain);
        
        // Random status with realistic distribution
        const rand = Math.random();
        let status: "available" | "sale" | "taken";
        if (rand < 0.3) status = "available";
        else if (rand < 0.4) status = "sale";
        else status = "taken";

        results.push({ domain, status });
      }
    });
  }

  return results.slice(0, config.count * config.tlds.length);
};

export default function DemoPage() {
  const [results, setResults] = useState<DomainResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("demo");

  const handleGenerate = async (config: {
    keywords: string[];
    domains: string[];
    tlds: string[];
    count: number;
  }) => {
    setLoading(true);
    setResults([]);

    // Simulate API delay with progressive loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockResults = generateMockDomains(config);
    setResults(mockResults);
    setLoading(false);
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

            <TabsContent value="demo" className="space-y-8 mt-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Mock Data Demo</AlertTitle>
                <AlertDescription>
                  This demo uses mock data for demonstration purposes. Install the CLI tool to
                  check real domain availability with OpenAI integration.
                </AlertDescription>
              </Alert>

              <div className="grid gap-8 lg:grid-cols-2">
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
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Ready for the real thing?
                  </CardTitle>
                  <CardDescription>
                    Install the CLI tool to access the full power of AI-generated domains with real WHOIS checking
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

