import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CodeBlock } from "@/components/demo/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Terminal, Package, Code, BookOpen, Info } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-6 md:py-8 px-4">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-3 text-center">
            <Badge variant="outline" className="text-xs px-2.5 py-0.5">
              <BookOpen className="mr-1.5 h-3 w-3" />
              Complete Guide
            </Badge>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Documentation
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Everything you need to get started and master AI-powered domain
              generation
            </p>
          </div>

          <Tabs defaultValue="installation" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto gap-2 p-1">
              <TabsTrigger
                value="installation"
                className="gap-2 flex-col sm:flex-row py-2"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Installation</span>
                <span className="sm:hidden text-xs">Install</span>
              </TabsTrigger>
              <TabsTrigger
                value="cli"
                className="gap-2 flex-col sm:flex-row py-2"
              >
                <Terminal className="h-4 w-4" />
                <span>CLI</span>
              </TabsTrigger>
              <TabsTrigger
                value="api"
                className="gap-2 flex-col sm:flex-row py-2"
              >
                <Code className="h-4 w-4" />
                <span>API</span>
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="gap-2 flex-col sm:flex-row py-2"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Examples</span>
                <span className="sm:hidden text-xs">Ex</span>
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="gap-2 flex-col sm:flex-row py-2"
              >
                <Info className="h-4 w-4" />
                <span>FAQ</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="installation" className="space-y-4">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Quick Start</CardTitle>
                  <CardDescription className="text-sm">
                    Get started with Find My Domain in seconds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">Prerequisites</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Node.js 22 or higher</li>
                      <li>OpenAI API key (get one at platform.openai.com)</li>
                      <li>pnpm, npm, or yarn package manager</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Option 1: Use with npx (No Installation)
                    </h3>
                    <CodeBlock
                      code={`# Set your API key
export OPENAI_API_KEY=sk-your-key-here

# Run immediately
npx find-my-domain --keywords tech startup --count 10`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Option 2: Install Globally
                    </h3>
                    <CodeBlock
                      code={`# Install with pnpm
pnpm install -g find-my-domain

# Or with npm
npm install -g find-my-domain

# Or with yarn
yarn global add find-my-domain`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Option 3: Install in Project
                    </h3>
                    <CodeBlock
                      code={`# Install as dependency
pnpm add find-my-domain

# Use in your code
import { generateDomainNames } from 'find-my-domain';`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cli" className="space-y-4">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">CLI Usage</CardTitle>
                  <CardDescription className="text-sm">
                    Command-line interface examples and options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">Basic Usage</h3>
                    <CodeBlock
                      code={`# Generate 10 domains based on keywords
find-my-domain --keywords tech startup saas --count 10

# Check multiple TLDs
find-my-domain --keywords ai ml --tlds com io dev --count 15

# Use example domains for inspiration
find-my-domain --domains stripe vercel --count 20`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Available Options
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">--keywords, -k</Badge>
                        <span className="text-sm text-muted-foreground">
                          Keywords to incorporate into domain names
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">--domains</Badge>
                        <span className="text-sm text-muted-foreground">
                          Example domains for inspiration
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">--tlds, -t</Badge>
                        <span className="text-sm text-muted-foreground">
                          TLDs to check (space-separated)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">--count, -c</Badge>
                        <span className="text-sm text-muted-foreground">
                          Number of domains to generate (default: 10)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">--model, -m</Badge>
                        <span className="text-sm text-muted-foreground">
                          OpenAI model (default: gpt-4o-mini)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">--stream, -s</Badge>
                        <span className="text-sm text-muted-foreground">
                          Enable streaming mode (default: true)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">--no-save</Badge>
                        <span className="text-sm text-muted-foreground">
                          Don&apos;t save results to file
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Configuration File
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Create an <code>input.json</code> file for repeated
                      searches:
                    </p>
                    <CodeBlock
                      code={`{
  "directory": "output",
  "tlds": ["com", "io", "dev"],
  "domains": ["stripe", "vercel"],
  "keywords": ["fast", "modern", "cloud"],
  "count": 20,
  "model": "gpt-4o-mini"
}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Programmatic API</CardTitle>
                  <CardDescription className="text-sm">
                    Use Find My Domain in your Node.js applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Generate Domain Names
                    </h3>
                    <CodeBlock
                      code={`import { generateDomainNames } from 'find-my-domain';

const domains = await generateDomainNames({
  keywords: ['tech', 'startup'],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4o-mini'
});

console.log(domains); // ['techflow', 'startuplab', ...]`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Check Domain Availability
                    </h3>
                    <CodeBlock
                      code={`import { checkDomainStatus } from 'find-my-domain';

const result = await checkDomainStatus('example.com');

console.log(result);
// {
//   ok: true,
//   domain: 'example.com',
//   available: false,
//   sale: false,
//   duration: 234,
//   createdDate: '1995-08-14',
//   expiryDate: '2025-08-13'
// }`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      Streaming Generation
                    </h3>
                    <CodeBlock
                      code={`import { generateDomainNamesStream, checkDomainStatus } from 'find-my-domain';

const stream = generateDomainNamesStream({
  keywords: ['ai', 'ml'],
  count: 5,
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4o-mini'
});

for await (const name of stream) {
  console.log(\`Generated: \${name}\`);
  const result = await checkDomainStatus(\`\${name}.com\`);
  if (result.available) {
    console.log(\`  ✅ Available!\`);
  }
}`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold">
                      TypeScript Types
                    </h3>
                    <CodeBlock
                      code={`import type {
  DomainStatusResult,
  GenerateDomainNamesOptions,
  InputConfig,
  OutputResult
} from 'find-my-domain';

// Full type safety included`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="startup">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Example 1: Find Domain for Startup
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      You&apos;re launching a new SaaS product and need a
                      memorable domain:
                    </p>
                    <CodeBlock
                      code={`find-my-domain \\
  --domains salesforce hubspot pipedrive \\
  --keywords sales crm pipeline cloud \\
  --tlds com io \\
  --count 50 \\
  --model gpt-4o`}
                    />
                    <p className="text-sm text-muted-foreground">
                      Expected: 5-10 available domains with strong brand
                      potential
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="devtool">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Example 2: Developer Tool Domain
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Finding a domain for a deployment tool:
                    </p>
                    <CodeBlock
                      code={`find-my-domain \\
  --domains vercel netlify railway render \\
  --keywords deploy ship launch cd ci \\
  --tlds dev io sh \\
  --count 30 \\
  --model gpt-4o`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="blog">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Example 3: Tech Blog Domain
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Quick domain search for a personal blog:
                    </p>
                    <CodeBlock
                      code={`find-my-domain \\
  --keywords tech code programming blog tutorials \\
  --tlds com blog dev \\
  --count 20 \\
  --model gpt-4o-mini`}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="api">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Example 4: Programmatic Usage
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Integrate into your application:
                    </p>
                    <CodeBlock
                      code={`import { generateDomainNames, checkDomainsBatch } from 'find-my-domain';

async function findDomain() {
  // Generate names
  const names = await generateDomainNames({
    keywords: ['tech', 'startup'],
    count: 20,
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini'
  });

  // Check availability
  const results = await checkDomainsBatch(names, ['com', 'io']);

  // Filter available
  const available = results.filter(r => r.available);
  console.log(\`Found \${available.length} available domains\`);

  return available;
}`}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Common questions and answers about Find My Domain
                  </CardDescription>
                </CardHeader>
              </Card>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      How much does it cost?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Find My Domain is{" "}
                      <strong>100% free and open source</strong> (MIT license).
                      You only need an OpenAI API key, which has its own
                      pricing:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li>
                        <strong>gpt-4o-mini</strong>: $0.15 per 1M input tokens
                        (very affordable)
                      </li>
                      <li>
                        <strong>gpt-4o</strong>: $2.50 per 1M input tokens
                      </li>
                      <li>
                        Typical search: 10 domains = ~$0.001 with gpt-4o-mini
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Visit{" "}
                      <a
                        href="https://openai.com/api/pricing/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        OpenAI Pricing
                      </a>{" "}
                      for current rates.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Do I need an OpenAI API key?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Yes, you need an OpenAI API key to use the domain
                      generation feature. WHOIS checking works without an API
                      key.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        How to get your API key:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>
                          Sign up at{" "}
                          <a
                            href="https://platform.openai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            platform.openai.com
                          </a>
                        </li>
                        <li>Navigate to API Keys section</li>
                        <li>Create a new secret key</li>
                        <li>Copy and save it securely</li>
                        <li>
                          Set it:{" "}
                          <code className="bg-muted px-2 py-0.5 rounded">
                            export OPENAI_API_KEY=sk-your-key
                          </code>
                        </li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Which AI model should I use?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      It depends on your needs and budget:
                    </p>
                    <div className="space-y-3">
                      <div className="rounded-lg border p-3">
                        <p className="font-medium text-sm mb-1">
                          🚀 gpt-4o-mini (Recommended)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Best balance of speed, cost, and quality. Perfect for
                          most use cases.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="font-medium text-sm mb-1">⭐ gpt-4o</p>
                        <p className="text-xs text-muted-foreground">
                          Higher quality, more creative names. Use for important
                          projects.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="font-medium text-sm mb-1">
                          💡 gpt-4-turbo
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Premium quality. Best for finding that perfect, unique
                          domain.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      How accurate is the WHOIS checking?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      WHOIS checking is <strong>highly accurate</strong> (95%+)
                      but not 100% guaranteed:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li>
                        <strong>Available</strong>: Domain is likely available
                        for registration
                      </li>
                      <li>
                        <strong>Sale</strong>: Domain is registered but listed
                        for sale
                      </li>
                      <li>
                        <strong>Taken</strong>: Domain is registered and not for
                        sale
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      <strong>Important:</strong> Always verify availability on
                      your registrar before purchasing. WHOIS data can have a
                      slight delay (~24-48 hours).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Can I use this in my own project?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Yes! Find My Domain is MIT licensed and can be integrated
                      into your projects:
                    </p>
                    <CodeBlock
                      code={`// Install as dependency
pnpm add find-my-domain

// Use in your code
import { generateDomainNames, checkDomainStatus } from 'find-my-domain';

const names = await generateDomainNames({
  keywords: ['tech', 'startup'],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4o-mini'
});`}
                    />
                    <p className="text-sm text-muted-foreground">
                      Full TypeScript support included. See the{" "}
                      <a href="#api" className="text-primary hover:underline">
                        API tab
                      </a>{" "}
                      for more examples.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-6">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      What TLDs are supported?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      We support 15+ popular TLDs, with more being added:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        ".com",
                        ".io",
                        ".dev",
                        ".ai",
                        ".app",
                        ".net",
                        ".org",
                        ".co",
                        ".tech",
                        ".sh",
                        ".xyz",
                        ".me",
                        ".so",
                        ".gg",
                        ".fm",
                      ].map((tld) => (
                        <Badge key={tld} variant="secondary">
                          {tld}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You can check any TLD by specifying it with the{" "}
                      <code className="bg-muted px-2 py-0.5 rounded">
                        --tlds
                      </code>{" "}
                      flag.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-7">
                  <AccordionTrigger>
                    <span className="font-semibold">Is my data private?</span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Yes, your data is private:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li>
                        <strong>CLI runs locally</strong> on your machine
                      </li>
                      <li>
                        <strong>OpenAI API</strong>: Your prompts are sent to
                        OpenAI&apos;s API (see their{" "}
                        <a
                          href="https://openai.com/policies/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          privacy policy
                        </a>
                        )
                      </li>
                      <li>
                        <strong>WHOIS lookups</strong>: Anonymous public queries
                      </li>
                      <li>
                        <strong>No tracking</strong>: We don&apos;t collect any
                        analytics or usage data
                      </li>
                      <li>
                        <strong>Open source</strong>: You can audit the code
                        yourself
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-8">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      I found a bug or have a feature request
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      We welcome contributions and feedback!
                    </p>
                    <div className="space-y-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <a
                          href="https://github.com/idimetrix/find-my-domain/issues"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Report an Issue on GitHub
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <a
                          href="https://github.com/idimetrix/find-my-domain/pulls"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Submit a Pull Request
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Please include as much detail as possible, including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li>Your Node.js version</li>
                      <li>Command you ran</li>
                      <li>Expected vs actual behavior</li>
                      <li>Error messages or screenshots</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-9">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Can I run this in CI/CD or Docker?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Absolutely! Find My Domain works great in automated
                      environments:
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Docker Example:
                        </p>
                        <CodeBlock
                          code={`FROM node:22-alpine
WORKDIR /app
RUN npm install -g find-my-domain
ENV OPENAI_API_KEY=\${OPENAI_API_KEY}
CMD ["find-my-domain", "--keywords", "tech", "--count", "10"]`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">
                          GitHub Actions Example:
                        </p>
                        <CodeBlock
                          code={`- name: Find Domain
  run: |
    npm install -g find-my-domain
    find-my-domain --keywords tech --count 10 --no-save
  env:
    OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}`}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-10">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      How do I update to the latest version?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Updating is simple:
                    </p>
                    <CodeBlock
                      code={`# If installed globally
pnpm update -g find-my-domain

# Or with npm
npm update -g find-my-domain

# Or just use npx (always latest)
npx find-my-domain@latest --keywords tech --count 10`}
                    />
                    <p className="text-sm text-muted-foreground">
                      Check your current version:{" "}
                      <code className="bg-muted px-2 py-0.5 rounded">
                        find-my-domain --version
                      </code>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Check out the full documentation on GitHub for more examples,
                troubleshooting, and advanced usage.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/idimetrix/find-my-domain#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Full Documentation →
                </a>
                <a
                  href="https://github.com/idimetrix/find-my-domain/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Report an Issue →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
