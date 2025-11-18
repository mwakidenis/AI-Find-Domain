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
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Interactive Demo</h1>
            <p className="text-muted-foreground">
              Try out the domain generator with mock data. For real domain checking,
              install the CLI tool.
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
              <Card>
                <CardHeader>
                  <CardTitle>Ready for the real thing?</CardTitle>
                  <CardDescription>
                    Install the CLI tool to access the full power of AI-generated domains
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    The CLI tool provides real-time WHOIS checking with OpenAI integration:
                  </p>
                  <pre className="rounded bg-muted p-4 text-sm overflow-x-auto">
                    <code>
                      {`# Install globally
pnpm install -g find-my-domain

# Run with your OpenAI API key
export OPENAI_API_KEY=sk-your-key
find-my-domain --keywords tech startup --count 10 --tlds com io`}
                    </code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Real-time WHOIS availability checking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>40+ OpenAI models supported</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Streaming or batch processing modes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Multiple TLD support (.com, .io, .dev, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Programmatic API for Node.js integration</span>
                    </li>
                  </ul>
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

