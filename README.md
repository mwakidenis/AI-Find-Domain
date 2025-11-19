# Find My Domain - AI-Powered Domain Name Generator

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/find-my-domain.svg?style=flat-square)](https://www.npmjs.com/package/find-my-domain)
[![npm downloads](https://img.shields.io/npm/dm/find-my-domain.svg?style=flat-square)](https://www.npmjs.com/package/find-my-domain)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10+-orange.svg?style=flat-square)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?style=flat-square)](https://nextjs.org/)

**🤖 Revolutionary AI-Powered Domain Name Generator with Real-Time WHOIS Availability Checking**

*Enterprise-grade monorepo featuring a powerful CLI tool, stunning web showcase, and shared TypeScript core library*

[🌐 Try Live Demo](https://find-my-domain-web.vercel.app/demo) | [📖 Full Documentation](https://find-my-domain-web.vercel.app/docs) | [📦 npm Package](https://www.npmjs.com/package/find-my-domain) | [🏠 Website](https://find-my-domain-web.vercel.app/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [What's Inside](#-whats-inside)
- [Key Features](#-key-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Monorepo Architecture](#-monorepo-architecture)
- [Development](#-development)
- [Tech Stack](#-tech-stack)
- [Deployment](#-deployment)
- [Package Documentation](#-package-documentation)
- [Configuration](#-configuration)
- [Use Cases](#-use-cases)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [Support](#-support)
- [Changelog](#-changelog)
- [License](#-license)

---

## 🎯 Overview

**Find My Domain** is a comprehensive, production-ready solution for AI-powered domain name discovery. Built with modern TypeScript and designed for developers, startups, and domain enthusiasts, it combines cutting-edge AI technology with real-time domain availability checking to streamline the entire domain search process.

### Why Find My Domain?

- 🤖 **AI-Powered Intelligence**: Leverages OpenAI's GPT-4o, GPT-4, and other advanced models to generate creative, brandable domain names
- 🔍 **Real-Time WHOIS**: Instantly checks actual domain availability across 50+ TLDs, not just DNS records
- ⚡ **Multiple Interfaces**: Use via CLI for automation, web app for interactive exploration, or as a Node.js library
- 🏗️ **Production Ready**: Built with TypeScript, fully tested, with comprehensive documentation
- 🚀 **Zero Configuration**: Works out of the box with sensible defaults
- 🎨 **Beautiful UI**: Stunning web interface with 55 shadcn/ui components
- 📦 **Monorepo Architecture**: Clean separation of concerns, easy to maintain and extend
- 🔐 **Enterprise Features**: Authentication, rate limiting, error handling, and more

### Perfect For

- 🚀 **Startups**: Find the perfect domain for your next venture
- 💼 **Agencies**: Help clients discover available domains quickly
- 🎯 **Domain Investors**: Identify valuable available domains
- 👨‍💻 **Developers**: Integrate into your own projects via API
- 🎨 **Creatives**: Generate brandable names for projects

---

## ✨ What's Inside

This monorepo contains three interconnected packages:

| Package | Description | Features | Tech Stack |
|---------|-------------|----------|------------|
| **[@find-my-domain/cli](apps/cli)** | Command-line interface tool | • 40+ AI models<br>• Streaming & batch modes<br>• 3 config methods<br>• JSON export<br>• Programmatic API | Node.js, TypeScript, OpenAI SDK, yargs, Vite |
| **[@find-my-domain/web](apps/web)** | Interactive web application | • 100% real demo<br>• Clerk auth<br>• Rate limiting<br>• Beautiful UI<br>• 55 components | Next.js 15, React 19, shadcn/ui, Tailwind, Framer Motion |
| **[@find-my-domain/core](packages/core)** | Shared core library | • Type definitions<br>• AI utilities<br>• WHOIS checking<br>• Validation<br>• Logging | TypeScript, Zod, Vercel AI SDK, whoiser |

### Package Relationships

```
┌─────────────────────────────────────────┐
│  @find-my-domain/core                   │
│  (Foundation Layer)                     │
│  • Types & Interfaces                   │
│  • Core Utilities                       │
│  • Constants                            │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌──────────────┐  ┌─────────────────┐
│ CLI Tool     │  │ Web App         │
│ (Consumer)   │  │ (Consumer)      │
└──────────────┘  └─────────────────┘
```

---

## 🎯 Key Features

### 🤖 AI-Powered Generation

- **40+ OpenAI Models**: GPT-4o, GPT-4o-mini, GPT-4-turbo, o1, o3, and more
- **Smart Context Understanding**: Considers keywords, example domains, and industry
- **Custom Prompts**: Fine-tune generation with custom prompt templates
- **Streaming Support**: Get results as they're generated for faster feedback
- **Batch Processing**: Generate hundreds of domains efficiently

### 🌐 Real-Time Domain Checking

- **Actual WHOIS Lookups**: Not just DNS checks - real registration status
- **50+ TLD Support**: .com, .io, .dev, .ai, .app, .co, and many more
- **Status Detection**: Available, taken, premium/for-sale identification
- **Parallel Processing**: Check multiple TLDs simultaneously
- **Rate Limit Handling**: Built-in delays and retry logic

### 💻 Multiple Interfaces

#### CLI Tool (Terminal)

```bash
# Quick generation with npx (no installation)
npx find-my-domain --keywords tech startup --count 10

# Or install globally
npm install -g find-my-domain
find-my-domain --keywords ai ml --tlds com io --count 20
```

#### Web Application (Browser)

- Beautiful, responsive interface
- Interactive demo with real AI and WHOIS
- Live progress tracking
- One-click domain copying
- Dark mode ready

#### Programmatic API (Node.js)

```typescript
import { generateDomainNames, checkDomainStatus } from "find-my-domain";

const names = await generateDomainNames({
  keywords: ["tech", "startup"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
});

for (const name of names) {
  const status = await checkDomainStatus(`${name}.com`);
  if (status.available) console.log(`✅ ${name}.com is available!`);
}
```

### 🔧 Developer Experience

- **TypeScript First**: 100% type-safe with excellent IDE support
- **Multiple Config Methods**: CLI args, environment variables, or JSON files
- **Comprehensive Documentation**: Detailed guides for every feature
- **Well Tested**: Unit and integration tests
- **Easy Integration**: Use as CLI, library, or via web API
- **Error Handling**: Graceful failures with helpful messages

### 🎨 Web Showcase Features

- **100% Real Demo**: Actual OpenAI API and WHOIS lookups (not mocked!)
- **Clerk Authentication**: Secure user sign-in
- **Rate Limiting**: 5 free generations per user (no database needed)
- **Beautiful UI**: 55 shadcn/ui components professionally integrated
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Live Notifications**: Toast messages for real-time feedback
- **Code Examples**: Comprehensive documentation with syntax highlighting
- **One-Click Copy**: Every code block has a copy button

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher ([download](https://nodejs.org/))
- **pnpm** 10 or higher ([install](https://pnpm.io/installation))
- **OpenAI API Key** ([get one](https://platform.openai.com/api-keys))
- **Clerk Account** (optional, only for web app auth - [sign up](https://clerk.com))

### 30-Second Start (CLI)

The fastest way to try it:

```bash
# 1. Set your API key
export OPENAI_API_KEY=sk-your-key-here

# 2. Run with npx (no installation!)
npx find-my-domain --keywords your ideas here --count 10

# 3. Check results
cat output/output.json
```

### Full Installation

For development or to run the web app:

```bash
# 1. Clone the repository
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# 2. Install dependencies
pnpm install

# 3. Build all packages
pnpm build

# 4. Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit apps/web/.env.local with your API keys

# 5. Start the web app
pnpm dev
# Visit http://localhost:3000

# Or start the CLI
pnpm dev:cli -- --keywords tech startup --count 10
```

---

## 💿 Installation

### CLI Tool (Global)

Install once, use anywhere:

```bash
# Using npm
npm install -g find-my-domain

# Using pnpm (recommended)
pnpm add -g find-my-domain

# Using yarn
yarn global add find-my-domain

# Verify
find-my-domain --version
```

### As a Library (Local Project)

Add to your Node.js project:

```bash
npm install find-my-domain
# or
pnpm add find-my-domain
```

### From Source (Development)

```bash
# Clone
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# Install dependencies
pnpm install

# Build everything
pnpm build

# Link CLI locally (optional)
cd apps/cli && npm link
```

---

## 📖 Usage

### CLI Examples

#### Basic Usage

```bash
# Simple keyword search
find-my-domain --keywords tech startup --count 10

# Multiple TLDs
find-my-domain --keywords ai ml --tlds com io dev --count 15

# With example domains for inspiration
find-my-domain --domains stripe vercel --count 20

# Everything combined (recommended)
find-my-domain \
  --keywords cloud developer tools \
  --domains github gitlab \
  --tlds com io dev \
  --count 30 \
  --model gpt-4o
```

#### Advanced CLI Usage

```bash
# Custom output directory
find-my-domain --keywords fintech --directory ~/domains --count 25

# Custom prompt
find-my-domain \
  --prompt "Generate {COUNT} short domain names for {KEYWORDS}" \
  --keywords ai robotics \
  --count 15

# Using config file
echo '{"keywords": ["tech"], "count": 50}' > config.json
find-my-domain --input config.json

# Environment variables
export OPENAI_API_KEY=sk-xxx
export FMD_KEYWORDS=tech,startup
export FMD_COUNT=20
find-my-domain
```

📖 **Full CLI Documentation**: [CLI README](apps/cli/README.md)

### Web App Usage

#### Local Development

```bash
# Start development server
pnpm dev

# Visit in browser
open http://localhost:3000

# Try the interactive demo
open http://localhost:3000/demo
```

#### Web App Features

The web application includes:

- **Landing Page**: Beautiful hero section with features showcase
- **Interactive Demo**: 100% real AI generation with WHOIS checking
  - Clerk authentication (sign in to use)
  - Rate limiting (5 free generations per user)
  - Real-time progress tracking
  - Toast notifications
- **Documentation**: Complete guides with code examples
- **API Reference**: Comprehensive API documentation
- **Responsive Design**: Works perfectly on mobile and desktop

📖 **Full Web Documentation**: [Web README](apps/web/README.md)

### Programmatic API Usage

#### Basic Generation

```typescript
import { generateDomainNames, checkDomainStatus, wait } from "find-my-domain";

// Generate domain names
const names = await generateDomainNames({
  keywords: ["tech", "startup"],
  domains: ["stripe", "vercel"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

console.log("Generated:", names);
// ['techflow', 'rapidhub', 'cloudly', ...]

// Check availability
for (const name of names) {
  const result = await checkDomainStatus(`${name}.com`);
  
  if (result.available) {
    console.log(`✅ ${name}.com is available!`);
  } else if (result.forSale) {
    console.log(`💰 ${name}.com is for sale`);
  } else {
    console.log(`❌ ${name}.com is taken`);
  }
  
  await wait(500); // Rate limiting
}
```

#### Streaming API

```typescript
import { generateDomainNamesStream } from "find-my-domain";

const stream = generateDomainNamesStream({
  keywords: ["ai", "ml"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
});

for await (const name of stream) {
  console.log(`Generated: ${name}`);
  
  // Check immediately
  const result = await checkDomainStatus(`${name}.com`);
  if (result.available) {
    console.log(`🎉 ${name}.com is AVAILABLE!`);
    break; // Found a good one!
  }
}
```

📖 **Full API Documentation**: [Core README](packages/core/README.md)

---

## 🏗️ Monorepo Architecture

### Project Structure

```
find-my-domain/
├── apps/
│   ├── cli/                           # Command-line tool
│   │   ├── src/
│   │   │   └── index.ts               # Main CLI logic
│   │   ├── bin/
│   │   │   └── cli.js                 # Binary entry point
│   │   ├── test/                      # CLI tests
│   │   ├── .env.example               # Example environment
│   │   ├── input.example.json         # Example config
│   │   ├── prompt.example.txt         # Example prompt
│   │   ├── package.json               # CLI dependencies
│   │   ├── tsconfig.json              # TypeScript config
│   │   ├── vite.config.ts             # Build config
│   │   ├── CLI-USAGE.md               # Usage guide
│   │   ├── DEPLOY.md                  # Deployment guide
│   │   └── README.md                  # CLI documentation
│   │
│   └── web/                           # Next.js web application
│       ├── app/                       # App router pages
│       │   ├── layout.tsx             # Root layout
│       │   ├── page.tsx               # Landing page
│       │   ├── demo/                  # Demo page
│       │   ├── docs/                  # Documentation
│       │   └── api/                   # API routes
│       ├── components/
│       │   ├── ui/                    # shadcn/ui (55 components)
│       │   ├── landing/               # Landing page components
│       │   ├── demo/                  # Demo components
│       │   └── docs/                  # Documentation components
│       ├── lib/                       # Utilities & helpers
│       ├── public/                    # Static assets
│       ├── styles/                    # Global styles
│       ├── middleware.ts              # Auth middleware
│       ├── package.json               # Web dependencies
│       ├── next.config.ts             # Next.js config
│       ├── tailwind.config.ts         # Tailwind config
│       └── README.md                  # Web documentation
│
├── packages/
│   └── core/                          # Shared core library
│       ├── src/
│       │   ├── index.ts               # Main exports
│       │   ├── types.ts               # TypeScript types
│       │   ├── constants.ts           # Constants (TLDs, models)
│       │   └── utils/                 # Core utilities
│       │       ├── ai.ts              # AI generation logic
│       │       ├── whois.ts           # WHOIS checking
│       │       ├── logger.ts          # Logging utilities
│       │       ├── helpers.ts         # Helper functions
│       │       └── wait.ts            # Timing utilities
│       ├── test/                      # Core tests
│       ├── package.json               # Core dependencies
│       ├── tsconfig.json              # TypeScript config
│       ├── vite.config.ts             # Build config
│       └── README.md                  # Core documentation
│
├── .github/                           # GitHub configuration
│   ├── workflows/                     # CI/CD workflows
│   ├── ISSUE_TEMPLATE/                # Issue templates
│   └── pull_request_template.md       # PR template
│
├── .changeset/                        # Changesets for versioning
├── node_modules/                      # Dependencies (gitignored)
├── package.json                       # Root workspace config
├── pnpm-workspace.yaml                # pnpm workspace definition
├── pnpm-lock.yaml                     # Lockfile
├── tsconfig.json                      # Base TypeScript config
├── .gitignore                         # Git ignore rules
├── .prettierrc                        # Prettier config
├── .eslintrc.json                     # ESLint config
├── CHANGELOG.md                       # Version history
├── PUBLISHING.md                      # Publishing guide
├── LICENSE                            # MIT license
└── README.md                          # This file
```

### Dependency Management

The project uses **pnpm workspaces** for efficient dependency management:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

**Dependency Flow:**

```
@find-my-domain/core
  ↓ (depends on)
  • openai
  • ai (Vercel AI SDK)
  • whoiser
  • zod

@find-my-domain/cli
  ↓ (depends on)
  • @find-my-domain/core (workspace:*)
  • yargs
  • dotenv

@find-my-domain/web
  ↓ (depends on)
  • next
  • react
  • @clerk/nextjs
  • (types from @find-my-domain/core)
```

### Build Order

```bash
# Correct build order
1. pnpm build:core    # Build core first
2. pnpm build:cli     # CLI depends on core
3. pnpm build:web     # Web uses core types

# Or build everything
pnpm build            # Builds in correct order
```

---

## 🛠️ Development

### Development Scripts

```bash
# Development
pnpm dev              # Start web app (http://localhost:3000)
pnpm dev:cli          # Start CLI in development mode
pnpm dev:all          # Start all packages in parallel

# Building
pnpm build            # Build all packages
pnpm build:web        # Build web app only
pnpm build:cli        # Build CLI only
pnpm build:core       # Build core package only

# Type Checking
pnpm typecheck        # Type check all packages
pnpm typecheck:web    # Type check web app
pnpm typecheck:cli    # Type check CLI
pnpm typecheck:core   # Type check core

# Linting
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix linting issues
pnpm lint:web         # Lint web app only
pnpm lint:cli         # Lint CLI only

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage

# Formatting
pnpm format           # Format all code with Prettier
pnpm format:check     # Check formatting

# Cleaning
pnpm clean            # Remove all build outputs
pnpm clean:web        # Remove web build output
pnpm clean:cli        # Remove CLI build output
pnpm clean:core       # Remove core build output
```

### Development Workflow

1. **Setup Development Environment**

```bash
# Clone repository
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# Install dependencies
pnpm install

# Build packages
pnpm build
```

2. **Start Development**

```bash
# Terminal 1: Start web app
pnpm dev

# Terminal 2: Start CLI in watch mode
pnpm dev:cli

# Or start everything at once
pnpm dev:all
```

3. **Make Changes**

```bash
# Edit files in your IDE
# Hot reload is enabled for both web and CLI

# Check types
pnpm typecheck

# Run tests
pnpm test
```

4. **Commit Changes**

```bash
# Format code
pnpm format

# Lint and fix
pnpm lint:fix

# Run all checks
pnpm typecheck && pnpm test && pnpm lint

# Commit with conventional commits
git add .
git commit -m "feat: add amazing feature"
```

### Environment Setup

#### CLI Environment

```bash
# apps/cli/.env
OPENAI_API_KEY=sk-your-key-here
FMD_KEYWORDS=tech,startup
FMD_COUNT=10
FMD_TLDS=com,io,dev
FMD_MODEL=gpt-4o-mini
```

#### Web App Environment

```bash
# apps/web/.env.local
OPENAI_API_KEY=sk-your-openai-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-key
CLERK_SECRET_KEY=sk_test_your-clerk-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📊 Tech Stack

### Core Technologies

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **Node.js** | 18+ | Runtime environment | [nodejs.org](https://nodejs.org/) |
| **TypeScript** | 5.7 | Type-safe JavaScript | [typescriptlang.org](https://www.typescriptlang.org/) |
| **pnpm** | 10+ | Package manager | [pnpm.io](https://pnpm.io/) |

### CLI & Core Stack

| Package | Purpose | Why We Use It |
|---------|---------|---------------|
| **OpenAI SDK** | AI generation | Official SDK for OpenAI API |
| **Vercel AI SDK** | Streaming AI | Unified interface for AI providers |
| **whoiser** | WHOIS lookups | Reliable WHOIS data parsing |
| **yargs** | CLI argument parsing | Robust CLI framework |
| **dotenv** | Environment variables | Easy .env file loading |
| **Zod** | Schema validation | Type-safe validation |
| **Vite** | Build tool | Fast builds with HMR |
| **Vitest** | Testing | Vite-native test runner |

### Web App Stack

| Package | Purpose | Why We Use It |
|---------|---------|---------------|
| **Next.js 15** | React framework | App Router, SSR, API routes |
| **React 19** | UI library | Latest React features |
| **shadcn/ui** | Component library | Beautiful, accessible components |
| **Tailwind CSS** | Styling | Utility-first CSS |
| **Framer Motion** | Animations | Smooth, performant animations |
| **Clerk** | Authentication | Complete auth solution |
| **Lucide React** | Icons | Beautiful icon library |
| **next-themes** | Dark mode | Theme switching |
| **Sonner** | Toast notifications | Beautiful notifications |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Changesets** | Version management |
| **GitHub Actions** | CI/CD pipeline |
| **Vercel** | Web hosting |
| **npm** | CLI package publishing |

---

## 🚢 Deployment

### Web App Deployment (Vercel)

#### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/idimetrix/find-my-domain&project-name=find-my-domain&repository-name=find-my-domain&root-directory=apps/web)

#### Manual Deploy

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy from web directory
cd apps/web
vercel

# 3. Set environment variables in Vercel dashboard
# - OPENAI_API_KEY
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY

# 4. Deploy to production
vercel --prod
```

#### Vercel Configuration

```json
{
  "name": "find-my-domain-web",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "OPENAI_API_KEY": "@openai-api-key",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": "@clerk-publishable-key",
    "CLERK_SECRET_KEY": "@clerk-secret-key"
  }
}
```

### CLI Deployment (npm)

#### Prerequisites

- npm account
- Sufficient permissions
- Version updated in package.json

#### Publish to npm

```bash
# 1. Build CLI
cd apps/cli
pnpm build

# 2. Test locally
npm link
find-my-domain --version

# 3. Login to npm
npm login

# 4. Publish
npm publish

# 5. Verify
npx find-my-domain --version
```

📖 **Full Publishing Guide**: [PUBLISHING.md](PUBLISHING.md)

### Docker Deployment

#### Dockerfile

```dockerfile
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/cli ./apps/cli
COPY packages/core ./packages/core

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm build

# CLI entrypoint
FROM base AS cli
WORKDIR /app/apps/cli
ENTRYPOINT ["node", "bin/cli.js"]
CMD ["--help"]
```

#### Build and Run

```bash
# Build image
docker build -t find-my-domain .

# Run CLI
docker run --rm \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  -v $(pwd)/output:/app/output \
  find-my-domain \
  --keywords tech startup \
  --count 20
```

### GitHub Actions CI/CD

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "pnpm"
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test
```

---

## 📚 Package Documentation

Each package has comprehensive documentation:

### CLI Documentation

- **[CLI README](apps/cli/README.md)** - Complete CLI reference
- **[CLI Usage Guide](apps/cli/CLI-USAGE.md)** - Detailed usage examples
- **[Deployment Guide](apps/cli/DEPLOY.md)** - Publishing to npm

### Web App Documentation

- **[Web README](apps/web/README.md)** - Web app development guide
- **[Live Documentation](https://find-my-domain-web.vercel.app/docs)** - Interactive docs

### Core Library Documentation

- **[Core README](packages/core/README.md)** - API reference and examples

### Project Documentation

- **[CHANGELOG](CHANGELOG.md)** - Version history
- **[PUBLISHING](PUBLISHING.md)** - Release process

---

## ⚙️ Configuration

### CLI Configuration

The CLI supports **3 flexible configuration methods**:

#### 1. CLI Arguments (Highest Priority)

```bash
find-my-domain \
  --keywords ai saas \
  --tlds com io \
  --count 20 \
  --model gpt-4o \
  --api-key sk-xxx
```

#### 2. Environment Variables

```bash
# .env file
OPENAI_API_KEY=sk-your-key
FMD_KEYWORDS=tech,startup
FMD_TLDS=com,io,dev
FMD_COUNT=20
FMD_MODEL=gpt-4o-mini

# Run
find-my-domain
```

#### 3. JSON Configuration (Lowest Priority)

```json
{
  "keywords": ["tech", "startup"],
  "tlds": ["com", "io"],
  "count": 20,
  "model": "gpt-4o-mini"
}
```

```bash
find-my-domain --input config.json
```

**Priority**: CLI args > input.json > .env > defaults

📖 **Full Configuration Guide**: [CLI README - Configuration](apps/cli/README.md#-configuration)

---

## 🎬 Use Cases

### 1. Startup Launch

Finding the perfect domain for your new startup:

```bash
find-my-domain \
  --keywords saas cloud platform automation \
  --domains stripe twilio sendgrid \
  --tlds com io \
  --count 50 \
  --model gpt-4o
```

### 2. Agency Client Work

Managing multiple client domain searches:

```bash
# Create client-specific configs
for client in client-a client-b client-c; do
  find-my-domain \
    --input configs/$client.json \
    --directory output/$client
done
```

### 3. Domain Investing

Finding available premium domains:

```bash
find-my-domain \
  --keywords luxury premium exclusive \
  --tlds com net org \
  --count 100 \
  --model gpt-4o
```

### 4. Side Projects

Quick domain search for weekend projects:

```bash
npx find-my-domain --keywords your project idea --count 20
```

### 5. Rebranding

Finding a new name for your company:

```bash
find-my-domain \
  --keywords your-industry modern innovative \
  --domains successful-competitors \
  --count 40
```

---

## ⚡ Performance

### Benchmarks

| Operation | Time | Notes |
|-----------|------|-------|
| AI Generation (10 domains) | 2-5s | Using gpt-4o-mini |
| WHOIS Lookup (per domain) | 0.5-2s | Varies by TLD |
| Streaming Overhead | ~100ms | Per domain |
| Memory Usage | ~50MB | Base + ~1MB per 100 domains |

### Optimization Tips

1. **Use gpt-4o-mini**: 10x cheaper, 2x faster than gpt-4o
2. **Enable Streaming**: Get results as they're generated
3. **Limit TLDs**: Check only .com for fastest results
4. **Batch Processing**: More efficient for 50+ domains
5. **Parallel WHOIS**: Check multiple TLDs simultaneously

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Quick Contribution Steps

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Test**: `pnpm typecheck && pnpm test && pnpm lint`
6. **Commit**: `git commit -m 'feat: add amazing feature'`
7. **Push**: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/find-my-domain.git
cd find-my-domain

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run checks
pnpm typecheck
pnpm lint
pnpm test

# Start development
pnpm dev        # Web app
pnpm dev:cli    # CLI tool
```

### Contribution Guidelines

- **Code Style**: Follow existing patterns, use Prettier
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/)
- **Tests**: Add tests for new features
- **Documentation**: Update relevant READMEs
- **Type Safety**: Maintain 100% TypeScript coverage

### Areas We Need Help

- 🐛 **Bug fixes** - Found a bug? Fix it!
- ✨ **New features** - Have an idea? Implement it!
- 📝 **Documentation** - Improve examples or guides
- 🧪 **Tests** - Increase test coverage
- 🌍 **Localization** - Add language support
- 🎨 **UI improvements** - Enhance the web interface

---

## ❓ FAQ

### General Questions

**Q: Is this free to use?**  
A: Yes, the software is MIT licensed and free. You only pay for OpenAI API usage (starts at $5 free credit).

**Q: Do I need an OpenAI API key?**  
A: Yes, you need an OpenAI API key to generate domain names. Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

**Q: How much does it cost to run?**  
A: The CLI is free. OpenAI API costs: ~$0.0001 per 10 domains (gpt-4o-mini) or ~$0.001 per 10 domains (gpt-4o). WHOIS lookups are free.

**Q: Can I use this commercially?**  
A: Yes! MIT license allows commercial use.

### Technical Questions

**Q: Which package should I use?**  
A:
- **CLI**: For terminal use, automation, or scripts
- **Web App**: For interactive exploration with UI
- **Core Library**: For integrating into your Node.js projects

**Q: What's the difference between streaming and batch mode?**  
A:
- **Streaming**: Results appear as generated (faster feedback)
- **Batch**: Generates all first, then checks (more efficient for large batches)

**Q: Can I check custom TLDs?**  
A: Yes, use `--tlds` with any valid TLD. We support 50+ TLDs including .com, .io, .dev, .ai, etc.

**Q: How accurate are the WHOIS checks?**  
A: Very accurate - we perform actual WHOIS lookups, not just DNS checks. Results show real registration status.

### Development Questions

**Q: How do I contribute?**  
A: See the [Contributing](#-contributing) section above!

**Q: Can I self-host the web app?**  
A: Yes, deploy to Vercel, Netlify, or any Node.js hosting platform.

**Q: Where can I get help?**  
A: Open an issue on [GitHub](https://github.com/idimetrix/find-my-domain/issues) or start a [Discussion](https://github.com/idimetrix/find-my-domain/discussions).

---

## 📞 Support

### Getting Help

- 📖 **Documentation**: Check package READMEs and guides
- 🐛 **Bug Reports**: [Open an issue](https://github.com/idimetrix/find-my-domain/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](https://github.com/idimetrix/find-my-domain/issues/new?template=feature_request.md)
- 💬 **Questions**: [GitHub Discussions](https://github.com/idimetrix/find-my-domain/discussions)
- 📧 **Email**: [selikhov.dmitrey@gmail.com](mailto:selikhov.dmitrey@gmail.com)

### Community

- **GitHub**: [github.com/idimetrix/find-my-domain](https://github.com/idimetrix/find-my-domain)
- **npm**: [npmjs.com/package/find-my-domain](https://www.npmjs.com/package/find-my-domain)
- **LinkedIn**: [@dimetrix](https://www.linkedin.com/in/dimetrix)

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

**Latest Version: 2.0.6**

### Recent Updates

- ✅ Version synchronization across all packages
- ✅ Enhanced CLI README with comprehensive documentation
- ✅ Fixed shadcn/ui component count (55 components)
- ✅ CSS formatting improvements
- ✅ Documentation consistency improvements

---

## 📄 License

**MIT License** © [Dmitrii Selikhov](https://github.com/idimetrix)

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

See [LICENSE](LICENSE) for full license text.

---

## 🔗 Links

<div align="center">

[![Website](https://img.shields.io/badge/Website-Live_Demo-blue?style=for-the-badge&logo=vercel)](https://find-my-domain-web.vercel.app/)
[![Documentation](https://img.shields.io/badge/Docs-Read_Here-green?style=for-the-badge&logo=readthedocs)](https://find-my-domain-web.vercel.app/docs)
[![npm](https://img.shields.io/badge/npm-Package-red?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/find-my-domain)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/idimetrix/find-my-domain)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Author-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/dimetrix)

</div>

### Quick Links

- 🌐 **Website**: https://find-my-domain-web.vercel.app/
- 🚀 **Live Demo**: https://find-my-domain-web.vercel.app/demo
- 📖 **Documentation**: https://find-my-domain-web.vercel.app/docs
- 📦 **npm Package**: https://www.npmjs.com/package/find-my-domain
- 💻 **GitHub**: https://github.com/idimetrix/find-my-domain
- 👨‍💻 **Author**: [Dmitrii Selikhov](https://www.linkedin.com/in/dimetrix)
- 🐛 **Issues**: https://github.com/idimetrix/find-my-domain/issues
- 📝 **Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

## 🙏 Acknowledgments

Built with amazing open-source tools and technologies:

### Core Technologies

- **[OpenAI](https://openai.com)** - GPT models for domain generation
- **[Node.js](https://nodejs.org)** - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[pnpm](https://pnpm.io)** - Fast, efficient package manager

### Web Framework & UI

- **[Next.js](https://nextjs.org)** - React framework
- **[React](https://react.dev)** - UI library
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful component library
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion)** - Animation library
- **[Lucide](https://lucide.dev)** - Icon library

### Libraries & Tools

- **[Vercel AI SDK](https://sdk.vercel.ai)** - AI integration utilities
- **[whoiser](https://github.com/LayeredStudio/whoiser)** - WHOIS lookup library
- **[Clerk](https://clerk.com)** - Authentication platform
- **[Zod](https://zod.dev)** - Schema validation
- **[Vite](https://vitejs.dev)** - Build tool
- **[yargs](https://yargs.js.org)** - CLI argument parser

### Services

- **[Vercel](https://vercel.com)** - Web hosting platform
- **[npm](https://npmjs.com)** - Package registry
- **[GitHub](https://github.com)** - Code hosting and CI/CD

---

<div align="center">

**Made with ❤️ by developers, for developers**

**Happy Domain Hunting! 🚀**

[⬆ Back to Top](#find-my-domain---ai-powered-domain-name-generator)

</div>
