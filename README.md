# Find My Domain 🔍

> **AI-Powered Domain Name Generator** with real-time WHOIS availability checking

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10+-orange.svg)](https://pnpm.io/)

**Monorepo** containing a powerful CLI tool, beautiful web showcase, and shared core library for AI-powered domain name generation.

---

## ✨ What's Inside

This monorepo includes three packages:

| Package                                   | Description                             | Tech Stack                                           |
| ----------------------------------------- | --------------------------------------- | ---------------------------------------------------- |
| **[@find-my-domain/cli](apps/cli)**       | Command-line tool for domain generation | Node.js, TypeScript, OpenAI                          |
| **[@find-my-domain/web](apps/web)**       | **100% REAL** web demo + showcase       | Next.js 15, shadcn/ui, Tailwind, Real OpenAI + WHOIS |
| **[@find-my-domain/core](packages/core)** | Shared types and utilities              | TypeScript, Zod, AI SDK                              |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22 or higher
- **pnpm** 10 or higher
- **OpenAI API Key** (get one at [platform.openai.com](https://platform.openai.com))
- **Clerk Account** (for web app auth - [clerk.com](https://clerk.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Usage

#### Web App (100% Real Demo with Auth)

The web app includes a **fully functional demo** with real OpenAI generation, WHOIS checking, and Clerk authentication!

```bash
# Configure environment variables
cd apps/web

# Create .env.local with:
# OPENAI_API_KEY=sk-your-openai-key
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-key
# CLERK_SECRET_KEY=sk_test_your-clerk-key

# Start web app in development
cd ../..
pnpm dev

# Visit http://localhost:3000
# Try the REAL demo at http://localhost:3000/demo
```

**The demo is 100% real** - it uses:

- ✅ **Clerk authentication** for user sign-in
- ✅ **Rate limiting** (5 free generations per user, no database!)
- ✅ **Actual OpenAI API** to generate domains
- ✅ **Real WHOIS** to check availability

#### CLI Tool

```bash
# Start CLI in development
pnpm dev:cli -- --keywords tech startup --count 10

# Or use the built version
cd apps/cli
pnpm start -- --keywords ai ml --tlds com io --count 20
```

---

## 📦 Package Documentation

Each package has its own detailed README:

- **[CLI Documentation](apps/cli/README.md)** - Command-line tool usage
- **[Web Documentation](apps/web/README.md)** - Web app development guide
- **[Core Documentation](packages/core/README.md)** - Shared library API

---

## 🏗️ Monorepo Structure

```
find-my-domain/
├── apps/
│   ├── cli/                    # CLI application
│   │   ├── src/
│   │   │   └── index.ts        # Main CLI logic
│   │   ├── bin/
│   │   │   └── cli.js          # Binary entry point
│   │   ├── test/               # Tests
│   │   └── package.json
│   │
│   └── web/                    # Next.js web app
│       ├── app/                # App router pages
│       ├── components/         # React components
│       │   ├── ui/            # shadcn/ui components (48)
│       │   ├── landing/       # Landing page components
│       │   └── demo/          # Demo page components
│       ├── lib/               # Utilities
│       └── package.json
│
├── packages/
│   └── core/                  # Shared core library
│       ├── src/
│       │   ├── types.ts       # TypeScript types
│       │   ├── constants.ts   # Constants (TLDs, models)
│       │   └── utils/         # Core utilities
│       │       ├── ai.ts      # AI generation
│       │       ├── whois.ts   # WHOIS checking
│       │       ├── logger.ts  # Logging
│       │       └── wait.ts    # Utilities
│       └── package.json
│
├── package.json               # Root workspace config
├── pnpm-workspace.yaml        # pnpm workspace config
├── CHANGELOG.md               # Version history
└── README.md                  # This file
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start web app (http://localhost:3000)
pnpm dev:cli          # Start CLI tool
pnpm dev:all          # Start all in parallel

# Building
pnpm build            # Build all packages
pnpm build:web        # Build web app only
pnpm build:cli        # Build CLI only
pnpm build:core       # Build core package only

# Quality
pnpm typecheck        # Type check all packages
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix linting issues
pnpm test             # Run all tests
pnpm clean            # Clean all build outputs

# Formatting
pnpm format           # Format all code
pnpm format:check     # Check formatting
```

### Workspace Dependencies

The project uses **pnpm workspaces** for efficient dependency management:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

**Dependency Graph:**

```
@find-my-domain/core (no internal deps)
  ↑
  ├── @find-my-domain/cli (depends on core)
  └── @find-my-domain/web (types only from core)
```

---

## 🎯 Features

### CLI Tool

- ✅ AI-powered domain generation (40+ OpenAI models)
- ✅ Real-time WHOIS availability checking
- ✅ Multiple TLD support (25+ TLDs: .com, .io, .dev, .ai, etc.)
- ✅ Streaming and batch modes
- ✅ JSON export with statistics
- ✅ Programmatic API for Node.js

### Web Showcase

- ✅ Beautiful landing page with hero & features
- ✅ **100% REAL interactive demo** (OpenAI + WHOIS)
- ✅ Live progress tracking & toast notifications
- ✅ Complete documentation with examples
- ✅ One-click copy on all code blocks
- ✅ Responsive design (mobile-first)
- ✅ Dark mode ready
- ✅ 48 shadcn/ui components integrated

### Core Library

- ✅ Shared TypeScript types
- ✅ AI generation utilities
- ✅ WHOIS checking utilities
- ✅ Logging and timing utilities
- ✅ Zod schemas for validation

---

## 📊 Tech Stack

### CLI & Core

- **Runtime**: Node.js 22+
- **Language**: TypeScript 5.9
- **AI**: OpenAI SDK, Vercel AI SDK
- **WHOIS**: whoiser
- **Build**: Vite
- **Testing**: Vitest

### Web App

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (48 components)
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Tooling

- **Package Manager**: pnpm (workspaces)
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode

---

## 🚢 Deployment

### Web App (Vercel)

```bash
# Deploy to Vercel
cd apps/web
vercel

# Or use the Vercel dashboard
# Import: idimetrix/find-my-domain
# Root: apps/web
```

### CLI (npm)

```bash
# Publish CLI to npm
cd apps/cli
pnpm build
pnpm publish
```

### Docker

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install && pnpm build
CMD ["pnpm", "--filter", "@find-my-domain/cli", "start"]
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Test**: `pnpm typecheck && pnpm test && pnpm lint`
6. **Commit**: `git commit -m 'Add amazing feature'`
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

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Start development
pnpm dev        # Web app
pnpm dev:cli    # CLI tool
```

---

## 📄 License

MIT © [Dmitrii Selikhov](https://github.com/idimetrix)

See [LICENSE](LICENSE) for details.

---

## 🔗 Links

- **GitHub**: https://github.com/idimetrix/find-my-domain
- **npm Package**: https://www.npmjs.com/package/find-my-domain
- **Author**: [Dmitrii Selikhov](https://www.linkedin.com/in/dimetrix)
- **Issues**: https://github.com/idimetrix/find-my-domain/issues
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

## 📞 Support

- 📖 **Documentation**: See package READMEs
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/idimetrix/find-my-domain/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/idimetrix/find-my-domain/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/idimetrix/find-my-domain/discussions)

---

## 🙏 Acknowledgments

Built with amazing open-source tools:

- **[OpenAI](https://openai.com)** - AI models for domain generation
- **[Next.js](https://nextjs.org)** - React framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful component library
- **[Vercel AI SDK](https://sdk.vercel.ai)** - AI integration
- **[whoiser](https://github.com/LayeredStudio/whoiser)** - WHOIS lookup
- **[Tailwind CSS](https://tailwindcss.com)** - Styling
- **[pnpm](https://pnpm.io)** - Fast, efficient package manager

---

**Made with ❤️ by developers, for developers**

Happy domain hunting! 🚀
