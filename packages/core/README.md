# @find-my-domain/core

> **Shared Core Library for Find My Domain**

TypeScript library containing shared types, constants, and utilities for AI-powered domain name generation and WHOIS checking.

🌐 **[Website](https://find-my-domain-web.vercel.app/)** | 🚀 **[Try Demo](https://find-my-domain-web.vercel.app/demo)** | 📖 **[Full Docs](https://find-my-domain-web.vercel.app/docs)**

---

## 📦 What's Inside

This package provides the core functionality used by both the CLI and web applications:

- **Types** - TypeScript interfaces and types
- **Constants** - TLDs, AI models, status indicators
- **AI Utilities** - Domain generation with OpenAI
- **WHOIS Utilities** - Domain availability checking
- **Logger Utilities** - Logging and timing functions
- **Helper Utilities** - Common helpers (wait, etc.)

---

## 🚀 Installation

This package is part of the monorepo and uses workspace dependencies:

```bash
# From monorepo root
pnpm install

# Build core package
pnpm build:core
```

### Using in Other Packages

```json
{
  "dependencies": {
    "@find-my-domain/core": "workspace:*"
  }
}
```

---

## 📚 API Reference

### Types

```typescript
import type {
  // Configuration
  InputConfig,
  CliArguments,

  // Domain Status
  DomainStatusResult,
  DomainStatusOptions,

  // AI Generation
  GenerateDomainNamesOptions,

  // Output
  OutputResult,
} from "@find-my-domain/core";
```

#### `InputConfig`

Configuration for domain generation:

```typescript
interface InputConfig {
  directory?: string; // Output directory (default: "output")
  tlds?: string[]; // TLDs to check (default: ["com"])
  domains?: string[]; // Example domains for inspiration
  keywords?: string[]; // Keywords to incorporate
  count?: number; // Number of domains to generate
  model?: string; // OpenAI model to use
  apiKey?: string; // OpenAI API key
  prompt?: string; // Custom prompt template
  promptFile?: string; // Path to prompt file
  save?: boolean; // Save results to file (default: true)
  stream?: boolean; // Enable streaming (default: true)
}
```

#### `DomainStatusResult`

Result from WHOIS lookup:

```typescript
interface DomainStatusResult {
  ok: boolean; // Was the check successful?
  domain: string; // Full domain name
  available: boolean; // Is it available?
  sale: boolean; // Is it for sale?
  duration: number; // Check duration (ms)
  createdDate?: string; // Registration date
  updatedDate?: string; // Last update date
  expiryDate?: string; // Expiration date
}
```

#### `GenerateDomainNamesOptions`

Options for AI generation:

```typescript
interface GenerateDomainNamesOptions {
  domains?: string[]; // Example domains
  keywords?: string[]; // Keywords to use
  count: number; // Number to generate
  apiKey: string; // OpenAI API key
  model: string; // Model ID
  customPrompt?: string; // Custom prompt
}
```

---

### Constants

```typescript
import {
  DEFAULT_CONFIG, // Default configuration values
  POPULAR_TLDS, // Array of popular TLDs
  AVAILABLE_MODELS, // List of available AI models
  STATUS, // Status indicators (✅, 💰, ❌)
} from "@find-my-domain/core";
```

#### `DEFAULT_CONFIG`

```typescript
const DEFAULT_CONFIG = {
  DIRECTORY: "output",
  COUNT: 10,
  MODEL: "gpt-4o-mini",
  TLDS: ["com"],
  STREAM: true,
  SAVE: true,
} as const;
```

#### `POPULAR_TLDS`

```typescript
const POPULAR_TLDS = [
  "com",
  "io",
  "dev",
  "ai",
  "app",
  "net",
  "org",
  "co",
  "tech",
  "sh",
  "xyz",
  "me",
  "so",
  "gg",
  "fm",
] as const;
```

#### `AVAILABLE_MODELS`

```typescript
const AVAILABLE_MODELS = [
  // GPT-4o Family
  "gpt-4o",
  "gpt-4o-mini",
  "chatgpt-4o-latest",

  // GPT-4 Family
  "gpt-4",
  "gpt-4-turbo",

  // O-Series
  "o1",
  "o3",
  "o3-mini",

  // GPT-3.5
  "gpt-3.5-turbo",
] as const;
```

---

### AI Utilities

#### `generateDomainNames()`

Generate domain names in batch mode:

```typescript
import { generateDomainNames } from "@find-my-domain/core";

const names = await generateDomainNames({
  keywords: ["tech", "startup"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});
// Returns: ["techflow", "startuplab", ...]
```

#### `generateDomainNamesStream()`

Generate domain names with streaming:

```typescript
import { generateDomainNamesStream } from "@find-my-domain/core";

const stream = generateDomainNamesStream({
  keywords: ["ai", "ml"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

for await (const name of stream) {
  console.log(`Generated: ${name}`);
}
```

---

### WHOIS Utilities

#### `checkDomainStatus()`

Check if a domain is available:

```typescript
import { checkDomainStatus } from "@find-my-domain/core";

const result = await checkDomainStatus("example.com");

console.log(result);
// {
//   ok: true,
//   domain: "example.com",
//   available: false,
//   sale: false,
//   duration: 234,
//   createdDate: "1995-08-14",
//   expiryDate: "2025-08-13"
// }
```

**With options:**

```typescript
const result = await checkDomainStatus(
  "example.com",
  undefined, // whoisOptions
  {
    attempts: 3, // Max retry attempts
    delay: 2000, // Delay between retries (ms)
  },
);
```

---

### Logger Utilities

All logger utilities are exported as a namespace for better organization:

```typescript
import { logger } from "@find-my-domain/core";
```

#### Example Usage

```typescript
// Start a timer
logger.startTimer("generation");

// Do some work
await generateDomains();

// Log success with elapsed time
logger.success("Generated domains", "generation");
// Output: ✅ Generated domains (2.34s)

// Format time
const time = logger.formatTime(2.5); // "2.50s"

// Add spacing
logger.spacer(); // Empty line
logger.separator(); // ==============================
logger.banner("RESULTS"); // Formatted title

// Other logging functions
logger.log("🎉", "Custom message");
logger.error("Something went wrong");
logger.warn("Warning message");
logger.info("Information message");

// Timing functions
logger.getElapsed("generation"); // Get elapsed time for a timer
logger.getTotalElapsed(); // Get total elapsed time since start
```

---

### Helper Utilities

#### `wait()`

Delay execution:

```typescript
import { wait } from "@find-my-domain/core";

// Wait 1 second
await wait(1000);

// Rate limiting example
for (const domain of domains) {
  await checkDomain(domain);
  await wait(500); // Wait between checks
}
```

---

## 🏗️ Project Structure

```
packages/core/
├── src/
│   ├── index.ts           # Main exports
│   ├── types.ts           # TypeScript types
│   ├── constants.ts       # Constants
│   └── utils/             # Utility functions
│       ├── ai.ts          # AI generation
│       ├── whois.ts       # WHOIS checking
│       ├── logger.ts      # Logging utilities
│       └── wait.ts        # Helper utilities
│
├── dist/                  # Compiled JavaScript
│   ├── index.js
│   ├── index.d.ts
│   └── utils/
│
├── package.json
├── tsconfig.json
└── README.md             # This file
```

---

## 🔧 Development

### Building

```bash
# From monorepo root
pnpm build:core

# Or from this directory
cd packages/core
pnpm build
```

### Type Checking

```bash
# From monorepo root
pnpm typecheck

# Or from this directory
cd packages/core
pnpm typecheck
```

### Watch Mode

```bash
cd packages/core
pnpm dev  # Watch mode with tsc --watch
```

---

## 📝 Usage Examples

### Full Example: Generate and Check Domains

```typescript
import {
  generateDomainNames,
  checkDomainStatus,
  wait,
  logger,
} from "@find-my-domain/core";

async function findDomains() {
  logger.banner("DOMAIN SEARCH");

  // Start timing
  logger.startTimer("total");

  try {
    // Generate names
    const names = await generateDomainNames({
      keywords: ["tech", "startup"],
      count: 10,
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-4o-mini",
    });

    logger.success(`Generated ${names.length} domain names`, "total");

    // Check availability
    const available = [];
    for (const name of names) {
      const result = await checkDomainStatus(`${name}.com`);

      if (result.available) {
        available.push(result.domain);
        console.log(`✅ ${result.domain}`);
      }

      await wait(500); // Rate limiting
    }

    logger.success(`Found ${available.length} available domains`, "total");
    return available;
  } catch (err) {
    logger.error(`Search failed: ${err}`);
    throw err;
  }
}

// Run
findDomains().then(console.log);
```

### Streaming Example

```typescript
import {
  generateDomainNamesStream,
  checkDomainStatus,
  logger,
} from "@find-my-domain/core";

async function streamingSearch() {
  const stream = generateDomainNamesStream({
    keywords: ["ai", "ml"],
    count: 10,
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o-mini",
  });

  for await (const name of stream) {
    logger.log("✨", `Generated: ${name}`);

    const result = await checkDomainStatus(`${name}.com`);
    const status = result.available ? "✅ Available" : "❌ Taken";
    logger.log("🔍", `${name}.com - ${status}`);
  }
}
```

---

## ⚠️ Important Notes

### Node.js Only

This package includes **Node.js-specific** modules:

- `fs` (file system) - used in AI utilities
- `net` (networking) - used in WHOIS utilities

**For Browser/Web:**

- ✅ Import types only
- ❌ Cannot use utility functions directly
- ✅ Use API routes to call utilities server-side

```typescript
// ✅ OK in browser (types only)
import type { DomainStatusResult } from "@find-my-domain/core";

// ❌ NOT OK in browser (Node.js modules)
import { checkDomainStatus } from "@find-my-domain/core";
```

---

## 🧪 Testing

```bash
# Run tests (from monorepo root)
pnpm test

# Or from this directory
cd packages/core
pnpm test
```

---

## 📄 License

MIT © [Dmitrii Selikhov](https://github.com/idimetrix)

---

## 🔗 Links

- **Main Repo**: https://github.com/idimetrix/find-my-domain
- **CLI Package**: [../cli](../../apps/cli)
- **Web Package**: [../web](../../apps/web)
- **Author**: [Dmitrii Selikhov](https://www.linkedin.com/in/dimetrix)

---

**Core utilities powering Find My Domain** 🚀
