import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CodeBlock } from "@/components/demo/code-block";
import { Badge } from "@/components/ui/badge";
import { Terminal, Package, Code, BookOpen } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground">
              Everything you need to get started with Find My Domain
            </p>
          </div>

          <Tabs defaultValue="installation" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="installation">
                <Package className="h-4 w-4 mr-2" />
                Installation
              </TabsTrigger>
              <TabsTrigger value="cli">
                <Terminal className="h-4 w-4 mr-2" />
                CLI Usage
              </TabsTrigger>
              <TabsTrigger value="api">
                <Code className="h-4 w-4 mr-2" />
                API
              </TabsTrigger>
              <TabsTrigger value="examples">
                <BookOpen className="h-4 w-4 mr-2" />
                Examples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="installation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>
                    Get started with Find My Domain in seconds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Prerequisites</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Node.js 22 or higher</li>
                      <li>OpenAI API key (get one at platform.openai.com)</li>
                      <li>pnpm, npm, or yarn package manager</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Option 1: Use with npx (No Installation)</h3>
                    <CodeBlock
                      code={`# Set your API key
export OPENAI_API_KEY=sk-your-key-here

# Run immediately
npx find-my-domain --keywords tech startup --count 10`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Option 2: Install Globally</h3>
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
                    <h3 className="text-lg font-semibold">Option 3: Install in Project</h3>
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

            <TabsContent value="cli" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>CLI Usage</CardTitle>
                  <CardDescription>
                    Command-line interface examples and options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Basic Usage</h3>
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
                    <h3 className="text-lg font-semibold">Available Options</h3>
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
                    <h3 className="text-lg font-semibold">Configuration File</h3>
                    <p className="text-sm text-muted-foreground">
                      Create an <code>input.json</code> file for repeated searches:
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

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Programmatic API</CardTitle>
                  <CardDescription>
                    Use Find My Domain in your Node.js applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Generate Domain Names</h3>
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
                    <h3 className="text-lg font-semibold">Check Domain Availability</h3>
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
                    <h3 className="text-lg font-semibold">Streaming Generation</h3>
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
                    <h3 className="text-lg font-semibold">TypeScript Types</h3>
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
                    <span className="font-semibold">Example 1: Find Domain for Startup</span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      You&apos;re launching a new SaaS product and need a memorable domain:
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
                      Expected: 5-10 available domains with strong brand potential
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="devtool">
                  <AccordionTrigger>
                    <span className="font-semibold">Example 2: Developer Tool Domain</span>
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
                    <span className="font-semibold">Example 3: Tech Blog Domain</span>
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
                    <span className="font-semibold">Example 4: Programmatic Usage</span>
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
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Check out the full documentation on GitHub for more examples, troubleshooting,
                and advanced usage.
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

