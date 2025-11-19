# Find My Domain - AI-Powered Domain Name Generator CLI

<div align="center">

[![npm version](https://img.shields.io/npm/v/find-my-domain.svg?style=flat-square)](https://www.npmjs.com/package/find-my-domain)
[![npm downloads](https://img.shields.io/npm/dm/find-my-domain.svg?style=flat-square)](https://www.npmjs.com/package/find-my-domain)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg?style=flat-square)](https://nodejs.org/)

**🤖 AI-Powered Domain Name Generator with Real-Time WHOIS Availability Checking**

[🌐 Try Web Demo](https://find-my-domain-web.vercel.app/demo) | [📖 Documentation](https://find-my-domain-web.vercel.app/docs) | [🏠 Website](https://find-my-domain-web.vercel.app/) | [📦 npm Package](https://www.npmjs.com/package/find-my-domain)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage Examples](#-usage-examples)
- [CLI Options Reference](#-cli-options-reference)
- [Advanced Usage](#-advanced-usage)
- [Output Formats](#-output-formats)
- [AI Models](#-ai-models)
- [Programmatic API](#-programmatic-api)
- [Use Cases](#-use-cases)
- [Performance & Optimization](#-performance--optimization)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Additional Resources](#-additional-resources)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Find My Domain** is a powerful command-line tool that revolutionizes domain name discovery by combining cutting-edge AI technology with real-time domain availability checking. Whether you're launching a startup, creating a side project, or helping clients find the perfect domain, this tool streamlines the entire process.

### What Makes It Special?

- 🤖 **AI-Powered Generation**: Leverages OpenAI's GPT-4o and GPT-4 models to create creative, memorable domain names based on your keywords and industry
- 🔍 **Real-Time WHOIS Lookup**: Instantly checks domain availability across multiple TLDs (com, io, dev, ai, and more)
- ⚡ **Streaming Mode**: See results as they're generated - no waiting for the entire batch
- 🎨 **Highly Customizable**: Configure via CLI arguments, environment variables, or JSON config files
- 💾 **Structured Output**: Saves results in JSON format for easy integration with other tools
- 🚀 **Zero Configuration**: Works out of the box with `npx` - no installation required
- 📦 **Monorepo Architecture**: Built with modern TypeScript, fully type-safe and maintainable

---

## ✨ Key Features

### 🤖 AI-Powered Intelligence

- **Smart Generation**: Uses advanced language models to create domain names that match your brand identity
- **Context-Aware**: Considers your keywords, example domains, and industry to generate relevant suggestions
- **Multiple Model Support**: Choose from GPT-4o, GPT-4o-mini, GPT-4-turbo, and more
- **Custom Prompts**: Fine-tune the AI's output with custom prompt templates

### 🌐 Domain Checking

- **Real-Time WHOIS**: Checks actual domain availability, not just DNS records
- **Multi-TLD Support**: Simultaneously check .com, .io, .dev, .ai, .app, and 50+ more TLDs
- **Status Detection**: Identifies available, taken, and premium/for-sale domains
- **Rate Limiting**: Built-in delays to respect WHOIS server limits

### ⚡ Performance

- **Streaming Mode**: Get results as they're generated for faster feedback
- **Batch Mode**: Generate all names first, then check availability
- **Parallel Processing**: Check multiple TLDs simultaneously
- **Efficient WHOIS**: Optimized queries with connection pooling

### 🛠️ Developer Experience

- **3 Configuration Methods**: CLI args, environment variables, or JSON config files
- **TypeScript First**: Fully typed for excellent IDE support
- **Programmatic API**: Use as a Node.js library in your projects
- **Comprehensive Logging**: Detailed output with emojis and colors
- **Error Handling**: Graceful failures with helpful error messages

---

## 🚀 Quick Start

### Instant Use with npx (No Installation)

The fastest way to get started - no installation required:

```bash
# Generate 10 domain names for a tech startup
npx find-my-domain --keywords tech startup innovation --count 10

# Check multiple TLDs
npx find-my-domain --keywords ai saas --tlds com io dev --count 15

# Use example domains for inspiration
npx find-my-domain --domains stripe vercel --count 20
```

**Requirements:**
- Node.js 18+ 
- OpenAI API key (set as `OPENAI_API_KEY` environment variable)

### 30-Second Setup

```bash
# 1. Set your OpenAI API key
export OPENAI_API_KEY=sk-your-key-here

# 2. Run it!
npx find-my-domain --keywords your ideas here --count 10

# 3. Check the results
cat output/output.json
```

---

## 💿 Installation

### Global Installation (Recommended for Frequent Use)

Install once, use everywhere:

```bash
# Using pnpm (recommended)
pnpm install -g find-my-domain

# Using npm
npm install -g find-my-domain

# Using yarn
yarn global add find-my-domain

# Verify installation
find-my-domain --version
```

### Local Project Installation

Add to your Node.js project:

```bash
# Using pnpm
pnpm add find-my-domain

# Using npm
npm install find-my-domain

# Using yarn
yarn add find-my-domain
```

### From Source (For Development)

```bash
# Clone the repository
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# Install dependencies
pnpm install

# Build the CLI
pnpm build:cli

# Link for local testing
cd apps/cli
npm link
```

---

## ⚙️ Configuration

Find My Domain offers **three flexible configuration methods** with complete feature parity. Mix and match them to suit your workflow!

### Configuration Priority (Override System)

```
CLI Arguments  >  input.json  >  .env  >  defaults
   (highest)         (high)      (low)    (lowest)
```

**Example:** If you set `count=20` in `.env` but pass `--count 30` on the CLI, the CLI value (30) wins.

---

### Method 1: CLI Arguments

Perfect for one-off commands and quick experiments:

```bash
find-my-domain \
  --keywords ai saas automation \
  --tlds com io dev \
  --count 25 \
  --model gpt-4o \
  --api-key sk-xxx \
  --directory my-domains
```

**Pros:**
- ✅ Quick and direct
- ✅ Easy to override other settings
- ✅ Perfect for scripting

**Cons:**
- ❌ Can get verbose for many options
- ❌ API key visible in shell history (use .env instead)

---

### Method 2: Environment Variables (.env file)

Best for local development and keeping secrets secure:

**Create a `.env` file:**

```bash
# .env
OPENAI_API_KEY=sk-your-secret-key-here
FMD_KEYWORDS=ai,machine learning,automation
FMD_TLDS=com,io,dev,ai
FMD_COUNT=30
FMD_MODEL=gpt-4o-mini
FMD_DIRECTORY=output
FMD_SAVE=true
FMD_STREAM=true
```

**Then just run:**

```bash
find-my-domain  # Uses all settings from .env
```

**Quick Setup:**

```bash
# Copy example and edit
cp .env.example .env
nano .env

# Add to .gitignore (IMPORTANT!)
echo ".env" >> .gitignore
```

**Pros:**
- ✅ Secure (never commit API keys)
- ✅ Clean command line
- ✅ Easy to switch between environments

**Cons:**
- ❌ Requires file creation
- ❌ Array values must be comma-separated

---

### Method 3: JSON Configuration File

Ideal for complex configurations and team collaboration:

**Create `input.json`:**

```json
{
  "directory": "output",
  "tlds": ["com", "io", "dev", "ai"],
  "domains": ["stripe", "vercel", "linear"],
  "keywords": ["fast", "modern", "cloud", "developer"],
  "count": 50,
  "model": "gpt-4o-mini",
  "apiKey": "sk-your-key-here",
  "prompt": "Generate {COUNT} short, memorable domain names for a {KEYWORDS} business",
  "save": true,
  "stream": true
}
```

**Use it:**

```bash
# Use default input.json
find-my-domain

# Use custom config file
find-my-domain --input myconfig.json

# Override specific values
find-my-domain --input myconfig.json --count 100
```

**Pros:**
- ✅ Best for complex configs
- ✅ Easy to share with team
- ✅ Supports comments (use .jsonc)
- ✅ Version control friendly (without API keys)

**Cons:**
- ❌ Requires valid JSON syntax
- ❌ Don't commit API keys!

---

### Complete Configuration Reference

| Option        | CLI Flag            | JSON Key      | ENV Variable     | Type    | Default         | Description                                 |
|---------------|---------------------|---------------|------------------|---------|-----------------|---------------------------------------------|
| **API Key**   | `--api-key, -a`     | `apiKey`      | `OPENAI_API_KEY` | string  | *required*      | OpenAI API key                              |
| **Keywords**  | `--keywords, -k`    | `keywords`    | `FMD_KEYWORDS`   | array   | `[]`            | Keywords for domain generation              |
| **Domains**   | `--domains`         | `domains`     | `FMD_DOMAINS`    | array   | `[]`            | Example domains for inspiration             |
| **Count**     | `--count, -c`       | `count`       | `FMD_COUNT`      | number  | `10`            | Number of domains to generate               |
| **TLDs**      | `--tlds, -t`        | `tlds`        | `FMD_TLDS`       | array   | `["com"]`       | Top-level domains to check                  |
| **Model**     | `--model, -m`       | `model`       | `FMD_MODEL`      | string  | `gpt-4o-mini`   | AI model to use                             |
| **Directory** | `--directory, -d`   | `directory`   | `FMD_DIRECTORY`  | string  | `output`        | Output directory for results                |
| **Prompt**    | `--prompt, -p`      | `prompt`      | `FMD_PROMPT`     | string  | *default*       | Custom prompt template                      |
| **Prompt File** | `--prompt-file`   | -             | -                | string  | -               | Path to prompt template file                |
| **Input File** | `--input, -i`      | -             | -                | string  | `input.json`    | Path to JSON config file                    |
| **Stream**    | `--stream, -s`      | `stream`      | `FMD_STREAM`     | boolean | `true`          | Enable streaming mode                       |
| **Save**      | `--save`            | `save`        | `FMD_SAVE`       | boolean | `true`          | Save results to file                        |
| **Help**      | `--help, -h`        | -             | -                | -       | -               | Show help information                       |
| **Version**   | `--version`         | -             | -                | -       | -               | Show version number                         |

---

### Data Type Formats Across Methods

| Type        | CLI Example                          | JSON Example                        | ENV Example                        |
|-------------|--------------------------------------|-------------------------------------|------------------------------------|
| **Array**   | `--tlds com io dev`                  | `"tlds": ["com", "io", "dev"]`      | `FMD_TLDS=com,io,dev`              |
| **Boolean** | `--save` or `--no-save`              | `"save": true`                      | `FMD_SAVE=true` or `FMD_SAVE=false` |
| **Number**  | `--count 25`                         | `"count": 25`                       | `FMD_COUNT=25`                     |
| **String**  | `--model gpt-4o`                     | `"model": "gpt-4o"`                 | `FMD_MODEL=gpt-4o`                 |

---

### Configuration Patterns & Best Practices

#### Pattern 1: Local Development

```bash
# .env (secure, never commit)
OPENAI_API_KEY=sk-dev-key-xxx
FMD_COUNT=5
FMD_TLDS=com
FMD_MODEL=gpt-4o-mini  # Faster/cheaper for testing

# Quick iterations with CLI overrides
find-my-domain --keywords test idea --count 3
find-my-domain --keywords another test --count 5
```

#### Pattern 2: Production/CI Pipeline

```bash
# GitHub Actions / CI
export OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }}
export FMD_COUNT=100
export FMD_TLDS=com,io,dev,ai,app
export FMD_MODEL=gpt-4o  # Better quality for production

find-my-domain --keywords $INPUT_KEYWORDS --directory /tmp/domains
```

#### Pattern 3: Shared Team Configuration

```bash
# team-config.json (safe to commit)
{
  "tlds": ["com", "io", "dev"],
  "count": 50,
  "model": "gpt-4o-mini",
  "stream": true
  // ⚠️ NO apiKey here!
}

# Each team member has own .env
# .env (gitignored)
OPENAI_API_KEY=sk-individual-key-xxx

# Usage
find-my-domain --input team-config.json
```

#### Pattern 4: Multiple Projects

```bash
# Project-specific configs
├── .env                    # Shared API key
├── project-a.json         # SaaS product
├── project-b.json         # E-commerce site
└── project-c.json         # Mobile app

# Switch between projects easily
find-my-domain --input project-a.json
find-my-domain --input project-b.json
```

---

## 📖 Usage Examples

### Basic Examples

#### Simple Keyword Search

```bash
# Generate 10 domains based on keywords
find-my-domain --keywords tech startup innovation

# Example output: techflow.com, startupify.io, innovatehub.com
```

#### Multiple TLDs

```bash
# Check .com, .io, and .dev availability
find-my-domain \
  --keywords ai ml --tlds com io dev --count 15

# Checks 15 names × 3 TLDs = 45 total domains
```

#### Use Example Domains

```bash
# Generate names inspired by successful companies
find-my-domain --domains stripe vercel linear --count 20

# AI learns from these naming patterns
```

#### Combined Approach (Recommended)

```bash
# Best results: keywords + examples + multiple TLDs
find-my-domain \
  --keywords cloud developer tools \
  --domains github gitlab \
  --tlds com io dev \
  --count 30 \
  --model gpt-4o
```

---

### Advanced Examples

#### Custom Output Directory

```bash
# Save to specific directory
find-my-domain \
  --keywords fintech blockchain \
  --directory ~/domains/fintech-project \
  --count 25
```

#### Batch Generation for Multiple Industries

```bash
# Script to generate for multiple niches
for industry in "ai saas" "fintech" "healthtech" "edtech"; do
  find-my-domain \
    --keywords $industry \
    --directory output/$industry \
    --count 50
done
```

#### Premium TLDs Only

```bash
# Focus on premium TLDs
find-my-domain \
  --keywords startup \
  --tlds io ai dev app \
  --count 20
```

#### High Volume Generation

```bash
# Generate 100 domains with best model
find-my-domain \
  --keywords your niche here \
  --tlds com \
  --count 100 \
  --model gpt-4o \
  --no-stream  # Faster for large batches
```

---

### Custom Prompts

Customize how the AI generates domain names:

#### Inline Custom Prompt

```bash
find-my-domain \
  --prompt "Generate {COUNT} short domain names (max 8 chars) for {KEYWORDS}" \
  --keywords ai robotics \
  --count 15
```

#### Prompt from File

```bash
# Create custom prompt template
cat > my-prompt.txt << 'EOF'
Generate {COUNT} creative domain names for a {KEYWORDS} business.

Requirements:
- Short and memorable (5-10 characters)
- Easy to spell and pronounce
- Modern and professional
- Avoid hyphens and numbers
- Focus on brandability over keywords

Example format: stripe, vercel, linear, notion
EOF

# Use it
find-my-domain \
  --prompt-file my-prompt.txt \
  --keywords fintech banking \
  --count 30
```

#### Prompt Placeholders

Available placeholders in custom prompts:

- `{COUNT}` - Number of domains to generate
- `{KEYWORDS}` - Your keywords (comma-separated)
- `{DOMAINS}` - Your example domains (comma-separated)
- `{TLDS}` - Target TLDs (comma-separated)

---

### Streaming vs Batch Mode

#### Streaming Mode (Default) ⚡

Get results as they're generated - perfect for interactive use:

```bash
find-my-domain --keywords tech --count 10

# Output appears immediately:
# ✅ AVAILABLE - techflow.com (2s)
# ⏳ Checking nextidea.com... (4s)
# ✅ AVAILABLE - nextidea.com (5s)
```

**When to use:**
- Interactive terminal use
- Small to medium batches (1-30 domains)
- Want immediate feedback
- Need to stop early if you find a good one

#### Batch Mode 📦

Generate all names first, then check sequentially:

```bash
find-my-domain --keywords tech --count 10 --no-stream

# 1. Generates all 10 names (5-10s)
# 2. Then checks availability one by one
```

**When to use:**
- Large batches (50+ domains)
- Background/automated jobs
- Want all names before checking
- Scripting and automation

---

### Configuration File Examples

#### Minimal Config

```json
{
  "keywords": ["tech", "startup"],
  "count": 20
}
```

#### Full Featured Config

```json
{
  "directory": "output",
  "tlds": ["com", "io", "dev", "ai", "app"],
  "domains": ["stripe", "vercel", "linear", "notion"],
  "keywords": ["fast", "modern", "cloud", "developer", "tools"],
  "count": 50,
  "model": "gpt-4o",
  "prompt": "Generate {COUNT} short, memorable domain names",
  "save": true,
  "stream": true
}
```

#### E-commerce Project

```json
{
  "keywords": ["shop", "store", "buy", "commerce"],
  "domains": ["shopify", "etsy"],
  "tlds": ["com", "shop", "store"],
  "count": 30,
  "model": "gpt-4o-mini"
}
```

#### SaaS Startup

```json
{
  "keywords": ["saas", "cloud", "platform", "api"],
  "domains": ["stripe", "twilio", "sendgrid"],
  "tlds": ["com", "io", "dev"],
  "count": 40,
  "model": "gpt-4o"
}
```

---

## 🎛️ CLI Options Reference

### Core Options

| Flag         | Alias | Type   | Required | Description                          |
|--------------|-------|--------|----------|--------------------------------------|
| `--api-key`  | `-a`  | string | Yes*     | OpenAI API key (or use env var)      |
| `--keywords` | `-k`  | array  | No       | Keywords for generation              |
| `--domains`  | -     | array  | No       | Example domains for inspiration      |
| `--count`    | `-c`  | number | No       | Number of domains (default: 10)      |
| `--tlds`     | `-t`  | array  | No       | TLDs to check (default: ["com"])     |
| `--model`    | `-m`  | string | No       | AI model (default: gpt-4o-mini)      |

*Required unless set via `OPENAI_API_KEY` environment variable

### Advanced Options

| Flag            | Type    | Default  | Description                           |
|-----------------|---------|----------|---------------------------------------|
| `--directory`   | string  | `output` | Output directory for results          |
| `--prompt`      | string  | -        | Custom prompt template (inline)       |
| `--prompt-file` | string  | -        | Path to prompt template file          |
| `--input`       | string  | -        | Path to JSON configuration file       |
| `--stream`      | boolean | `true`   | Enable streaming mode                 |
| `--no-stream`   | flag    | -        | Disable streaming (batch mode)        |
| `--save`        | boolean | `true`   | Save results to JSON file             |
| `--no-save`     | flag    | -        | Don't save results                    |

### Utility Options

| Flag        | Alias | Description                |
|-------------|-------|----------------------------|
| `--help`    | `-h`  | Show help information      |
| `--version` | -     | Show version number        |

---

## 🎯 Advanced Usage

### Optimization Strategies

#### Strategy 1: Fast Iteration

```bash
# Quick tests with gpt-4o-mini (faster, cheaper)
find-my-domain \
  --keywords test idea \
  --count 5 \
  --model gpt-4o-mini \
  --tlds com
```

#### Strategy 2: Quality Over Quantity

```bash
# Fewer, better domains with gpt-4o
find-my-domain \
  --keywords premium brand \
  --domains apple tesla stripe \
  --count 10 \
  --model gpt-4o \
  --tlds com io
```

#### Strategy 3: Exhaustive Search

```bash
# Cast a wide net
find-my-domain \
  --keywords your niche \
  --count 100 \
  --tlds com net org io ai dev app co uk \
  --no-stream
```

---

### Integration Examples

#### Shell Script Integration

```bash
#!/bin/bash
# domain-finder.sh

set -e

KEYWORDS="$1"
OUTPUT_DIR="domains/$(date +%Y%m%d_%H%M%S)"

echo "🔍 Finding domains for: $KEYWORDS"

find-my-domain \
  --keywords $KEYWORDS \
  --directory $OUTPUT_DIR \
  --count 50 \
  --tlds com io dev

echo "✅ Results saved to: $OUTPUT_DIR"

# Extract available domains
jq -r '.results.available[]' $OUTPUT_DIR/output.json > $OUTPUT_DIR/available.txt

echo "📋 Available domains:"
cat $OUTPUT_DIR/available.txt
```

Usage:

```bash
chmod +x domain-finder.sh
./domain-finder.sh "ai saas startup"
```

#### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/find-domains.yml
name: Find Domains

on:
  workflow_dispatch:
    inputs:
      keywords:
        description: 'Keywords for domain generation'
        required: true
        type: string

jobs:
  find:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Generate domains
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          npx find-my-domain \
            --keywords ${{ inputs.keywords }} \
            --count 50 \
            --directory domains
      
      - name: Upload results
        uses: actions/upload-artifact@v4
        with:
          name: domain-results
          path: domains/
```

#### Docker Container

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install globally
RUN npm install -g find-my-domain

# Set entrypoint
ENTRYPOINT ["find-my-domain"]
CMD ["--help"]
```

Usage:

```bash
# Build image
docker build -t find-my-domain .

# Run with environment variables
docker run --rm \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  -v $(pwd)/output:/app/output \
  find-my-domain \
  --keywords tech startup \
  --count 20
```

---

## 📊 Output Formats

### Console Output

Beautiful, colorful terminal output with real-time status:

```
╔══════════════════════════════════════════════════════════════╗
║   🔍 FIND MY DOMAIN - AI-Powered Domain Generator           ║
╚══════════════════════════════════════════════════════════════╝

📋 Loading configuration...
✅ Configuration loaded (12ms)

  📂 Directory: output
  🌐 TLDs: com, io, dev
  📝 Example Domains: stripe, vercel
  🔑 Keywords: tech, startup, saas
  🎯 Count: 20
  🤖 AI Model: gpt-4o-mini
  ⚡ Stream: Enabled

🤖 Starting AI domain generation stream...
✅ Generated: techflow
✅ Generated: rapidhub
✅ Generated: cloudly

🔍 Checking availability for .com, .io, .dev domains...

📍 Checking .com domains:
✅ AVAILABLE - techflow.com (whois: 1.2s)
💰 SALE/PREMIUM - rapidhub.com (whois: 1.5s)
❌ TAKEN - cloudly.com (whois: 0.8s)

📍 Checking .io domains:
✅ AVAILABLE - techflow.io (whois: 1.1s)
✅ AVAILABLE - rapidhub.io (whois: 1.3s)
❌ TAKEN - cloudly.io (whois: 0.9s)

📊 SUMMARY
═══════════════════════════════════════
✅ AVAILABLE: 12 domains
💰 SALE/PREMIUM: 3 domains
❌ TAKEN: 45 domains
───────────────────────────────────────
⏱️  Total Time: 28.5s
💾 Results saved to: output/output.json
```

### JSON Output

Structured data saved to `output/output.json`:

```json
{
  "timestamp": "2025-11-19T10:30:00.000Z",
  "version": "2.0.6",
  "config": {
    "directory": "output",
    "tlds": ["com", "io", "dev"],
    "domains": ["stripe", "vercel"],
    "keywords": ["tech", "startup", "saas"],
    "count": 20,
    "model": "gpt-4o-mini",
    "stream": true
  },
  "generated": [
    "techflow",
    "rapidhub",
    "cloudly",
    "nextstep",
    "buildfast"
  ],
  "results": {
    "available": [
      "techflow.com",
      "techflow.io",
      "rapidhub.io",
      "nextstep.dev",
      "buildfast.dev"
    ],
    "sale": [
      "rapidhub.com",
      "cloudly.dev"
    ],
    "taken": [
      "cloudly.com",
      "cloudly.io",
      "nextstep.com",
      "buildfast.com"
    ]
  },
  "summary": {
    "total": 60,
    "generated": 20,
    "checked": 60,
    "available": 12,
    "sale": 3,
    "taken": 45,
    "duration_ms": 28543
  },
  "metadata": {
    "ai_model": "gpt-4o-mini",
    "api_calls": 1,
    "whois_queries": 60,
    "rate_limited": false
  }
}
```

### Programmatic Access

Process results in your scripts:

```bash
# Extract available .com domains
jq -r '.results.available[] | select(endswith(".com"))' output/output.json

# Count by status
jq '.summary' output/output.json

# Get cheapest available (assuming .com > .io > .dev pricing)
jq -r '.results.available[] | select(endswith(".com"))' output/output.json | head -5
```

---

## 🤖 AI Models

### Model Selection Guide

| Model           | Speed   | Cost  | Quality   | Token Limit | Best For                    |
|-----------------|---------|-------|-----------|-------------|-----------------------------|
| `gpt-4o-mini`   | ⚡⚡⚡⚡ | $     | ⭐⭐⭐    | 128K        | Testing, high volume        |
| `gpt-4o`        | ⚡⚡⚡   | $$    | ⭐⭐⭐⭐⭐ | 128K        | Production, best quality    |
| `gpt-4-turbo`   | ⚡⚡⚡   | $$$   | ⭐⭐⭐⭐⭐ | 128K        | Premium, complex prompts    |
| `gpt-4`         | ⚡⚡     | $$$   | ⭐⭐⭐⭐⭐ | 8K          | Legacy, complex reasoning   |
| `gpt-3.5-turbo` | ⚡⚡⚡⚡ | $     | ⭐⭐      | 16K         | Budget, simple tasks        |

### Available Models

**GPT-4o Family** (Recommended):
- `gpt-4o` - Latest flagship model
- `gpt-4o-mini` - Fast and efficient (default)
- `gpt-4o-2024-11-20` - Dated version
- `gpt-4o-2024-08-06` - Previous version
- `chatgpt-4o-latest` - ChatGPT web version

**GPT-4 Family**:
- `gpt-4` - Original GPT-4
- `gpt-4-turbo` - Faster GPT-4
- `gpt-4-turbo-2024-04-09` - Dated version
- `gpt-4-0613` - Legacy version

**O-Series** (Advanced Reasoning):
- `o1` - Advanced reasoning model
- `o3` - Latest reasoning model
- `o3-mini` - Efficient reasoning

**GPT-3.5** (Budget):
- `gpt-3.5-turbo` - Fast and cheap

### Model Comparison Examples

```bash
# Fast iteration with gpt-4o-mini
find-my-domain --keywords tech --count 20 --model gpt-4o-mini
# Cost: ~$0.001 | Time: ~3s

# Best quality with gpt-4o
find-my-domain --keywords tech --count 20 --model gpt-4o
# Cost: ~$0.01 | Time: ~5s

# Premium with gpt-4-turbo
find-my-domain --keywords tech --count 20 --model gpt-4-turbo
# Cost: ~$0.02 | Time: ~5s
```

### Cost Optimization Tips

1. **Start with gpt-4o-mini**: Test your prompts and keywords
2. **Use gpt-4o for production**: Better names, more brandable
3. **Batch requests**: Generate more domains per API call
4. **Use streaming**: Stop early if you find a good domain

---

## 💻 Programmatic API

Use Find My Domain as a Node.js library in your applications:

### Installation

```bash
npm install find-my-domain
# or
pnpm add find-my-domain
```

### Basic Usage

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
  
  // Rate limiting
  await wait(500);
}
```

### Streaming API (Recommended)

Get results as they're generated:

```typescript
import { generateDomainNamesStream, checkDomainStatus } from "find-my-domain";

const stream = generateDomainNamesStream({
  keywords: ["ai", "ml"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
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

### Advanced API Usage

```typescript
import {
  generateDomainNames,
  checkDomainStatus,
  DEFAULT_CONFIG,
  POPULAR_TLDS,
  type DomainStatusResult,
} from "find-my-domain";

// Custom configuration
const config = {
  ...DEFAULT_CONFIG,
  keywords: ["fintech", "banking"],
  count: 20,
  model: "gpt-4o",
};

// Generate with custom prompt
const names = await generateDomainNames({
  ...config,
  apiKey: process.env.OPENAI_API_KEY!,
  customPrompt: `Generate ${config.count} short, memorable domain names for ${config.keywords.join(", ")}`,
});

// Check multiple TLDs in parallel
const tlds = ["com", "io", "dev"];
const results: Record<string, DomainStatusResult[]> = {};

for (const name of names) {
  results[name] = await Promise.all(
    tlds.map((tld) => checkDomainStatus(`${name}.${tld}`))
  );
}

// Find best available domains
const available = Object.entries(results)
  .filter(([_, tldResults]) => tldResults.some((r) => r.available))
  .map(([name, tldResults]) => ({
    name,
    available: tldResults.filter((r) => r.available).map((r) => r.domain),
  }));

console.log("Available domains:", available);
```

### TypeScript Types

```typescript
import type {
  InputConfig,
  DomainStatusResult,
  GenerateDomainNamesOptions,
  OutputResult,
} from "find-my-domain";

// Full type safety
const config: InputConfig = {
  directory: "output",
  tlds: ["com", "io"],
  keywords: ["tech"],
  count: 10,
  model: "gpt-4o-mini",
  apiKey: "sk-...",
  save: true,
  stream: true,
};

// Type-safe results
const result: DomainStatusResult = await checkDomainStatus("example.com");

if (result.available) {
  // TypeScript knows available is true
  console.log(`${result.domain} is available!`);
}
```

### React Integration Example

```typescript
import { useState } from "react";
import { generateDomainNamesStream, checkDomainStatus } from "find-my-domain";

function DomainFinder() {
  const [keywords, setKeywords] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const findDomains = async () => {
    setLoading(true);
    setDomains([]);

    try {
      const stream = generateDomainNamesStream({
        keywords: keywords.split(" "),
        count: 10,
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
        model: "gpt-4o-mini",
      });

      for await (const name of stream) {
        // Check availability
        const result = await checkDomainStatus(`${name}.com`);
        
        if (result.available) {
          setDomains((prev) => [...prev, `${name}.com`]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter keywords"
      />
      <button onClick={findDomains} disabled={loading}>
        {loading ? "Searching..." : "Find Domains"}
      </button>
      
      <ul>
        {domains.map((domain) => (
          <li key={domain}>✅ {domain}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🎬 Use Cases

### Startup Launch

You're launching a new SaaS startup and need the perfect domain:

```bash
find-my-domain \
  --keywords saas cloud platform api automation \
  --domains stripe twilio sendgrid \
  --tlds com io \
  --count 50 \
  --model gpt-4o
```

### Agency Client Work

Finding domains for multiple clients:

```bash
# Create client configs
for client in client-a client-b client-c; do
  find-my-domain \
    --keywords $(cat clients/$client/keywords.txt) \
    --directory output/$client \
    --count 30
done
```

### Domain Investing

Finding available premium domains:

```bash
find-my-domain \
  --keywords luxury premium exclusive elite \
  --tlds com net org \
  --count 100 \
  --model gpt-4o \
  --no-stream
```

### Side Project

Quick domain search for your weekend project:

```bash
npx find-my-domain \
  --keywords your project idea \
  --count 20
```

### Rebranding

Finding a new name for your company:

```bash
find-my-domain \
  --keywords your industry values \
  --domains competitors you-admire \
  --tlds com io \
  --count 40 \
  --model gpt-4o
```

---

## ⚡ Performance & Optimization

### Performance Characteristics

- **AI Generation**: 2-5 seconds for 10 domains (streaming)
- **WHOIS Lookup**: 0.5-2 seconds per domain
- **Streaming Overhead**: Minimal (~100ms per domain)
- **Memory Usage**: ~50MB base + ~1MB per 100 domains

### Optimization Tips

#### 1. Use Streaming for Real-Time Feedback

```bash
# See results immediately
find-my-domain --keywords tech --count 20 --stream
```

#### 2. Batch Mode for Large Volumes

```bash
# More efficient for 50+ domains
find-my-domain --keywords tech --count 100 --no-stream
```

#### 3. Limit TLDs for Speed

```bash
# Check only .com for fastest results
find-my-domain --keywords tech --tlds com --count 30
```

#### 4. Use Cheaper Models for Iteration

```bash
# gpt-4o-mini is 10x cheaper than gpt-4o
find-my-domain --model gpt-4o-mini --count 50
```

#### 5. Parallel Processing (Programmatic)

```typescript
// Check multiple TLDs in parallel
const results = await Promise.all(
  tlds.map((tld) => checkDomainStatus(`${name}.${tld}`))
);
```

### Rate Limiting

**WHOIS Rate Limits:**
- Most WHOIS servers: ~50 queries/minute
- Built-in delays: 500ms between queries
- Automatic retry on rate limit

**OpenAI API Rate Limits:**
- Free tier: 3 RPM
- Tier 1: 500 RPM
- Tier 2: 5000 RPM

**Tips:**
- Use streaming to spread out API calls
- Implement exponential backoff
- Monitor API usage in dashboard

---

## 🔧 Development

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# Install dependencies (from monorepo root)
pnpm install

# Build all packages
pnpm build

# Build CLI specifically
pnpm build:cli
```

### Development Scripts

```bash
# Run CLI in development mode (hot reload)
cd apps/cli
pnpm dev

# Run with tsx (faster for testing)
pnpm start

# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix

# Testing
pnpm test
pnpm test:watch

# Building
pnpm build
pnpm build:watch

# Cleaning
pnpm clean
```

### Project Structure

```
apps/cli/
├── src/
│   ├── index.ts              # Main CLI logic
│   ├── config.ts             # Configuration loading
│   ├── prompts.ts            # Prompt templates
│   └── utils/
│       ├── logger.ts         # Logging utilities
│       └── validator.ts      # Input validation
├── bin/
│   └── cli.js                # Binary entry point
├── test/
│   ├── index.test.ts         # Unit tests
│   ├── integration.test.ts   # Integration tests
│   └── fixtures/             # Test fixtures
├── dist/                     # Build output
├── node_modules/
├── .env.example              # Example environment vars
├── input.example.json        # Example config
├── prompt.example.txt        # Example prompt
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Testing

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test index.test.ts

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Local Testing with npm link

```bash
# Link CLI locally
cd apps/cli
npm link

# Test globally
find-my-domain --version
find-my-domain --keywords test --count 5

# Unlink when done
npm unlink -g find-my-domain
```

### Publishing (Maintainers Only)

```bash
# Update version
pnpm changeset

# Build everything
pnpm build

# Publish to npm
pnpm publish:cli
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "OPENAI_API_KEY is required"

**Problem:** API key not found in environment or config.

**Solution:**

```bash
# Set environment variable
export OPENAI_API_KEY=sk-your-key-here

# Or create .env file
echo "OPENAI_API_KEY=sk-your-key" > .env

# Or pass as argument
find-my-domain --api-key sk-your-key --keywords tech
```

#### Issue: "WHOIS rate limiting" or "Too many requests"

**Problem:** WHOIS server is rate limiting your queries.

**Solution:**

```bash
# 1. Check fewer TLDs
find-my-domain --tlds com --count 10

# 2. Use batch mode (adds delays)
find-my-domain --no-stream --count 20

# 3. Wait a few minutes and try again
```

#### Issue: "Module not found" errors

**Problem:** Dependencies not built or installed correctly.

**Solution:**

```bash
# From monorepo root
pnpm clean
pnpm install
pnpm build

# Or rebuild CLI specifically
cd apps/cli
pnpm clean
pnpm build
```

#### Issue: "Invalid API key" or "401 Unauthorized"

**Problem:** OpenAI API key is incorrect or expired.

**Solution:**

```bash
# Check your API key at: https://platform.openai.com/api-keys

# Test with curl
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# If that fails, generate a new key
```

#### Issue: "Command not found: find-my-domain"

**Problem:** CLI not installed globally or not in PATH.

**Solution:**

```bash
# Use npx (no installation)
npx find-my-domain --keywords tech

# Or install globally
npm install -g find-my-domain

# Or check PATH
echo $PATH
which find-my-domain
```

#### Issue: Slow generation or timeouts

**Problem:** Large batch size or slow model.

**Solution:**

```bash
# Use faster model
find-my-domain --model gpt-4o-mini

# Reduce batch size
find-my-domain --count 10

# Enable streaming
find-my-domain --stream
```

#### Issue: No available domains found

**Problem:** All generated names are taken.

**Solution:**

```bash
# 1. Increase count
find-my-domain --count 50

# 2. Be more specific with keywords
find-my-domain --keywords specific niche keywords

# 3. Try different TLDs
find-my-domain --tlds io dev ai app

# 4. Use better model
find-my-domain --model gpt-4o

# 5. Custom prompt for uniqueness
find-my-domain --prompt "Generate unique, invented words"
```

---

## ❓ FAQ

### General Questions

**Q: Do I need an OpenAI API key?**

A: Yes, an OpenAI API key is required for domain generation. You can get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys). Free tier includes $5 credit.

**Q: How much does it cost to use?**

A: The CLI is free and open source. You only pay for OpenAI API usage:
- gpt-4o-mini: ~$0.0001 per 10 domains
- gpt-4o: ~$0.001 per 10 domains
- WHOIS lookups are free

**Q: Can I use it without installing?**

A: Yes! Use `npx find-my-domain` to run without installation.

**Q: Does it check actual domain availability?**

A: Yes, it performs real-time WHOIS lookups to check actual registration status, not just DNS records.

### Technical Questions

**Q: Which model should I use?**

A: 
- **Quick tests**: `gpt-4o-mini` (default, fast, cheap)
- **Production**: `gpt-4o` (best quality/cost balance)
- **Premium**: `gpt-4-turbo` (highest quality)

**Q: What's the difference between streaming and batch mode?**

A:
- **Streaming**: Results appear as generated (better UX, faster feedback)
- **Batch**: Generates all first, then checks (more efficient for large batches)

**Q: Can I check custom TLDs?**

A: Yes, use `--tlds` with any valid TLD:

```bash
find-my-domain --tlds com io dev ai app co uk de fr
```

**Q: How do I save results without displaying them?**

A: Redirect stderr or use `--no-save` and pipe stdout:

```bash
find-my-domain --keywords tech 2>/dev/null | jq .
```

**Q: Can I use it in my commercial project?**

A: Yes! It's MIT licensed - free for personal and commercial use.

### Usage Questions

**Q: How many domains should I generate?**

A: Depends on availability:
- **Competitive niches**: 50-100 domains
- **Normal niches**: 20-30 domains  
- **Unique niches**: 10-15 domains

**Q: What makes a good domain name?**

A:
- ✅ Short (5-10 characters)
- ✅ Easy to spell and pronounce
- ✅ Memorable and unique
- ✅ Relevant to your brand
- ✅ .com available (preferred)
- ❌ Avoid hyphens and numbers
- ❌ Avoid trademark conflicts

**Q: Can I filter results by length?**

A: Use a custom prompt:

```bash
find-my-domain \
  --prompt "Generate {COUNT} domain names under 8 characters for {KEYWORDS}" \
  --keywords tech
```

**Q: How do I generate brandable vs descriptive names?**

A:
```bash
# Brandable (invented words)
find-my-domain --domains stripe vercel notion

# Descriptive (keyword-based)
find-my-domain --keywords tech startup saas platform
```

---

## 📚 Additional Resources

### Documentation

- **[CLI Usage Guide](CLI-USAGE.md)** - Comprehensive CLI documentation
- **[Deployment Guide](DEPLOY.md)** - Publishing to npm
- **[Monorepo README](../../README.md)** - Project overview
- **[Core Package](../../packages/core/README.md)** - Core library API
- **[Publishing Guide](../../PUBLISHING.md)** - Release process

### Related Projects

- **[Web Application](../../apps/web/README.md)** - Interactive web interface
- **[Core Library](../../packages/core/README.md)** - Shared utilities

### External Links

- **[OpenAI API Documentation](https://platform.openai.com/docs)** - API reference
- **[WHOIS Protocol](https://www.rfc-editor.org/rfc/rfc3912)** - WHOIS specification
- **[Domain Name System](https://www.icann.org/resources/pages/dns-basics)** - DNS basics

### Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/idimetrix/find-my-domain/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/idimetrix/find-my-domain/discussions)
- **Email**: [selikhov.dmitrey@gmail.com](mailto:selikhov.dmitrey@gmail.com)
- **LinkedIn**: [@dimetrix](https://www.linkedin.com/in/dimetrix)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Quick Contribution Guide

1. **Fork the repository**

```bash
gh repo fork idimetrix/find-my-domain
```

2. **Create a feature branch**

```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**

```bash
# Make changes
pnpm install
pnpm build
pnpm test
```

4. **Commit and push**

```bash
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Contribution Areas

We're especially interested in:

- 🐛 **Bug fixes** - Found a bug? Fix it!
- ✨ **New features** - Have an idea? Implement it!
- 📝 **Documentation** - Improve examples or guides
- 🧪 **Tests** - Add test coverage
- 🎨 **UI improvements** - Better output formatting
- 🌍 **Localization** - Add language support

### Development Workflow

```bash
# 1. Setup
git clone your-fork
cd find-my-domain
pnpm install

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes
# ... edit files ...

# 4. Test
pnpm lint
pnpm typecheck
pnpm test
pnpm build

# 5. Commit
git add .
git commit -m "feat: add my feature"

# 6. Push and open PR
git push origin feature/my-feature
```

### Code Style

We use:
- **ESLint** for linting
- **Prettier** for formatting  
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

### Pull Request Checklist

- [ ] Tests pass (`pnpm test`)
- [ ] Types are correct (`pnpm typecheck`)
- [ ] Code is linted (`pnpm lint`)
- [ ] Documentation is updated
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)

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
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🔗 Links

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/idimetrix/find-my-domain)
[![npm](https://img.shields.io/badge/npm-Package-red?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/find-my-domain)
[![Website](https://img.shields.io/badge/Website-Live_Demo-blue?style=for-the-badge&logo=vercel)](https://find-my-domain-web.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Author-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/dimetrix)

**[⬆ Back to Top](#find-my-domain---ai-powered-domain-name-generator-cli)**

</div>

---

<div align="center">

**Made with ❤️ by [Dmitrii Selikhov](https://github.com/idimetrix)**

**Happy Domain Hunting! 🚀**

</div>
