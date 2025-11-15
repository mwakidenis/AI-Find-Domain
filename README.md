# Find My Domain 🔍

**AI-Powered Domain Name Discovery Tool**

Find My Domain is an intelligent command-line tool that generates creative domain name suggestions using OpenAI's GPT models and checks their real-time availability across multiple TLDs. Perfect for startups, developers, and entrepreneurs looking for the perfect domain name.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

---

## 🎯 Why Find My Domain?

Finding the perfect domain name is **hard**. You need something that's:

- ✅ Available (not already taken)
- ✅ Memorable and catchy
- ✅ Easy to spell and pronounce
- ✅ On-brand and professional
- ✅ Affordable (not premium priced)

**This tool solves all these problems** by combining AI creativity with real-time availability checking. No more manually searching GoDaddy for hours!

---

## ✨ Features

- 🤖 **AI-Powered Generation** - Uses OpenAI GPT models to generate creative, brandable domain names
- 🔍 **Real-Time Availability Check** - Instantly verifies domain availability via WHOIS lookup
- 💰 **Sale Detection** - Identifies domains that are available for purchase (often at premium prices)
- 🌐 **Multiple TLD Support** - Check .com, .io, .dev, .ai, and more simultaneously
- 📝 **Smart Input Options** - Generate domains from example names, keywords, or both
- ⚙️ **Flexible Configuration** - Use JSON config files or command-line arguments
- 📊 **Structured Output** - Export results to JSON with detailed statistics
- 🎯 **Custom Prompts** - Fully customizable AI prompt templates
- 🚀 **Fast & Efficient** - Optimized for bulk domain searches with rate limiting
- 💻 **CLI & Programmatic API** - Use as a command-line tool or integrate into your Node.js projects

---

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have:

- **Node.js** 22 or higher ([Download here](https://nodejs.org/))
- **OpenAI API Key** - Get one at [platform.openai.com](https://platform.openai.com/)
  - Note: You'll need to add credits to your OpenAI account (starts at $5)
  - GPT-4o-mini costs ~$0.15 per million tokens (very affordable!)

### Installation

```bash
# Clone the repository
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# Install dependencies (using npm, pnpm, or yarn)
npm install
# or
pnpm install
# or
yarn install
```

### Setup (5 Minutes)

**Step 1: Create your environment file**

```bash
# Copy the example env file
cp .env.example .env
```

**Step 2: Add your OpenAI API key**

Open `.env` in your favorite editor and add your API key:

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> 💡 **Tip**: Keep your API key secret! Never commit `.env` to git.

**Step 3: Create your configuration file**

```bash
# Copy the example config
cp input.example.json input.json
```

**Step 4: Customize `input.json`**

Open `input.json` and configure your search:

```json
{
  "directory": "output",
  "tlds": ["com", "io", "dev"],
  "domains": ["stripe", "vercel", "notion"],
  "keywords": ["fast", "modern", "cloud"],
  "count": 20,
  "model": "gpt-4o-mini"
}
```

**Step 5: Create your prompt template**

```bash
# Copy the example prompt
cp prompt.example.txt prompt.txt
```

> 💡 **Tip**: You can customize `prompt.txt` to match your brand style!

**Step 6: Run the tool!**

```bash
npm start
```

**That's it! 🎉**

You'll see output like:

```
🤖 Generating new domain names with AI...

✨ Generated 20 names:
  1. swiftpay
  2. rapidhub
  3. cloudly
  ...

🔍 Checking availability for .com, .io, .dev domains...

✅ AVAILABLE - swiftpay.com
💰 SALE - rapidhub.com
❌ TAKEN - cloudly.com
...

📊 SUMMARY
✅ AVAILABLE (5)
💰 SALE (3)
❌ TAKEN (12)

💾 Saved results to: output/output.json
```

---

## 📖 Usage Guide

### Basic Usage

The simplest way to use the tool is with the default configuration:

```bash
npm start
```

This will:

1. Load settings from `input.json`
2. Generate domain names using AI
3. Check availability across your specified TLDs
4. Save results to `output/output.json`

### Command Line Arguments

You can override any `input.json` setting using CLI arguments:

#### Example 1: Quick Test (5 domains)

```bash
npm start -- --count 5 --model gpt-4o-mini
```

This is perfect for testing your configuration without using too many API tokens.

#### Example 2: Multiple TLDs

```bash
npm start -- --tlds com io dev ai --count 15 --model gpt-4o-mini
```

Check your domains across 4 different extensions. Great for finding alternatives!

#### Example 3: Keyword-Based Generation

```bash
npm start -- --keywords startup tech saas platform --count 20 --model gpt-4o-mini
```

Generate domains based purely on keywords. Perfect when you're starting from scratch.

#### Example 4: Domain-Based Variations

```bash
npm start -- --domains stripe vercel linear --count 15 --model gpt-4o-mini
```

Generate names similar to successful companies. Great for inspiration!

#### Example 5: Combined Approach (Recommended)

```bash
npm start -- --domains github gitlab --keywords code dev tools --tlds com io dev --count 30 --model gpt-4o
```

Combine example domains + keywords for the best results. Uses premium GPT-4o model.

#### Example 6: Custom Output Directory

```bash
npm start -- --directory my-search-$(date +%Y%m%d) --count 25 --model gpt-4o-mini
```

Organize multiple searches with dated directories.

#### Example 7: Bulk Search

```bash
npm start -- --count 100 --tlds com --model gpt-4o
```

Generate 100 domains with the premium model. Great for serious domain hunting!

#### Example 8: Use Custom Config File

```bash
npm start -- --input startup-search.json
```

Use a different configuration file for different projects.

### Full CLI Options Reference

| Option        | Alias | Type   | Description                     | Example                   |
| ------------- | ----- | ------ | ------------------------------- | ------------------------- |
| `--count`     | `-c`  | number | Number of domains to generate   | `--count 25`              |
| `--model`     | `-m`  | string | OpenAI model to use             | `--model gpt-4o`          |
| `--tlds`      | `-t`  | array  | TLDs to check (space-separated) | `--tlds com io dev`       |
| `--domains`   |       | array  | Example domains for inspiration | `--domains stripe vercel` |
| `--keywords`  | `-k`  | array  | Keywords to incorporate         | `--keywords fast modern`  |
| `--directory` | `-d`  | string | Output directory                | `--directory results`     |
| `--input`     | `-i`  | string | Input JSON config file          | `--input config.json`     |
| `--help`      | `-h`  |        | Show help message               | `--help`                  |

---

## ⚙️ Configuration

### Input Configuration File

The `input.json` file is your main configuration. Here's a detailed explanation:

```json
{
  "directory": "output",
  "tlds": ["com", "io", "dev", "ai"],
  "domains": ["stripe", "vercel", "notion"],
  "keywords": ["fast", "modern", "cloud", "platform"],
  "count": 30,
  "model": "gpt-4o-mini"
}
```

#### Configuration Options Explained

| Field       | Type     | Required | Default    | Description                                                                        |
| ----------- | -------- | -------- | ---------- | ---------------------------------------------------------------------------------- |
| `directory` | string   | No       | `"output"` | Where to save results                                                              |
| `tlds`      | string[] | No       | `["com"]`  | Top-level domains to check (without the dot)                                       |
| `domains`   | string[] | No       | `[]`       | Example domains to inspire AI (can be without TLD: "stripe" or with: "stripe.com") |
| `keywords`  | string[] | No       | `[]`       | Keywords to incorporate into names (e.g., "fast", "cloud")                         |
| `count`     | number   | Yes      | -          | Number of domain names to generate (1-100 recommended)                             |
| `model`     | string   | Yes      | -          | OpenAI model: `gpt-4o-mini` (fast, cheap) or `gpt-4o` (better quality)             |

#### Real-World Configuration Examples

**For a SaaS Startup:**

```json
{
  "directory": "saas-search",
  "tlds": ["com", "io"],
  "domains": ["salesforce", "hubspot", "pipedrive"],
  "keywords": ["sales", "crm", "pipeline", "deals"],
  "count": 50,
  "model": "gpt-4o"
}
```

**For a Developer Tool:**

```json
{
  "directory": "dev-tool-search",
  "tlds": ["dev", "io", "sh"],
  "domains": ["github", "gitlab", "vercel"],
  "keywords": ["code", "deploy", "ci", "git"],
  "count": 30,
  "model": "gpt-4o-mini"
}
```

**For an E-commerce Brand:**

```json
{
  "directory": "ecommerce-search",
  "tlds": ["com", "shop", "store"],
  "domains": ["shopify", "etsy", "amazon"],
  "keywords": ["shop", "buy", "store", "market"],
  "count": 40,
  "model": "gpt-4o"
}
```

**For a Tech Blog:**

```json
{
  "directory": "blog-search",
  "tlds": ["com", "blog", "io"],
  "keywords": ["tech", "code", "dev", "blog", "news"],
  "count": 25,
  "model": "gpt-4o-mini"
}
```

### Prompt Template Customization

The `prompt.txt` file controls how the AI generates domain names. Customize it to match your needs!

**Default Prompt Structure:**

```text
Generate {COUNT} creative, memorable, SHORT and NICE domain names.

Focus on creating names that are:
- Short (ideally under 10 characters)
- Pleasant sounding and catchy
- Easy to remember and type

Create variations SIMILAR to these domain names: {DOMAINS}

IMPORTANT: Generate domains that:
- Follow similar naming patterns and word structures
- Use similar word combinations (e.g., if "facebook" is given, try "facespace", "facehub", etc.)
- Maintain the same style and tone
- Feel like they belong to the same family of names
- Are creative variations, not exact copies

Based on these keywords: {KEYWORDS}
- Incorporate keywords directly or creatively
- Combine multiple keywords
- Use synonyms and related terms

IMPORTANT: Return ONLY the name part WITHOUT any TLD extensions (.com, .io, .dev, etc).

Requirements:
- SHORT and NICE: Prioritize brevity and pleasantness (6-15 characters preferred)
- Easy to remember, spell, and pronounce
- Professional and brandable
- Mix styles: compound words, creative combinations, action words
- Aim for catchy, punchy names that roll off the tongue
- NO TLDs or extensions - just the name itself

Examples of good names: "google", "stripe", "twitter", "netflix", "spotify" (NOT with .com or .io)
```

**Available Placeholders:**

- `{COUNT}` - Number of domains to generate
- `{DOMAINS}` - Comma-separated list of example domains
- `{KEYWORDS}` - Comma-separated list of keywords

**Custom Prompt Examples:**

**For Premium/Luxury Brands:**

```text
Generate {COUNT} elegant, premium domain names that exude luxury and sophistication.

Focus on:
- Sophisticated and upscale sounding
- Short and memorable (5-10 characters)
- Easy to pronounce in any language
- Timeless, not trendy

Inspired by: {DOMAINS}
Keywords: {KEYWORDS}

Requirements:
- Premium feel
- International appeal
- Easy to spell
- Professional and trustworthy
- No slang or casual language

Return ONLY the domain name without TLD extensions.
```

**For Playful/Fun Brands:**

```text
Generate {COUNT} fun, playful, and energetic domain names.

Focus on:
- Catchy and memorable
- Easy to say out loud
- Friendly and approachable
- Makes people smile

Inspired by: {DOMAINS}
Keywords: {KEYWORDS}

Requirements:
- Playful but professional
- Short and snappy
- Easy to remember
- Can incorporate wordplay
- Modern and fresh

Return ONLY the domain name without TLD extensions.
```

---

## 📊 Understanding the Output

### Console Output

When you run the tool, you'll see a real-time progress update:

```
📋 Loading configuration...
✅ Loaded configuration from: input.json

Configuration:
  Directory: output
  TLDs: com, io, dev
  Domains: 3
  Keywords: 4
  Count: 20
  Model: gpt-4o-mini

🤖 Generating new domain names with AI...

✨ Generated 20 names:
  1. swiftpay
  2. rapidhub
  3. cloudly
  4. fastbase
  5. quickdeploy
  ... (and 15 more)

🔍 Checking availability for .com, .io, .dev domains...

📍 Checking .com domains:

✅ AVAILABLE - swiftpay.com
💰 SALE - rapidhub.com
❌ TAKEN - cloudly.com
✅ AVAILABLE - fastbase.com
❌ TAKEN - quickdeploy.com
...

📍 Checking .io domains:

✅ AVAILABLE - swiftpay.io
❌ TAKEN - rapidhub.io
...

============================================================
📊 SUMMARY
============================================================

✅ AVAILABLE (8):
✅  1. swiftpay.com
✅  2. fastbase.com
✅  3. swiftpay.io
✅  4. rapidcloud.dev
...

💰 SALE (5):
💰  1. rapidhub.com
💰  2. cloudfast.io
...

❌ TAKEN (47):
❌  1. cloudly.com
❌  2. quickdeploy.com
...

============================================================

💾 Saving results to output/ folder...
📄 Saved complete results to: output/output.json

   ✅ Available: 8
   💰 For Sale: 5
   ❌ Taken: 47

============================================================
```

### JSON Output Format

Results are saved to `<directory>/output.json` with complete details:

```json
{
  "timestamp": "2025-11-15T10:30:00.000Z",
  "config": {
    "directory": "output",
    "tlds": ["com", "io"],
    "domains": ["stripe", "vercel"],
    "keywords": ["fast", "modern"],
    "count": 10,
    "model": "gpt-4o-mini"
  },
  "generated": [
    "swiftpay",
    "rapidhub",
    "quickbase",
    "fastcloud",
    "modernpay",
    "swiftbase",
    "rapidcloud",
    "quickpay",
    "fasthub",
    "modernbase"
  ],
  "results": {
    "available": [
      "swiftpay.com",
      "rapidhub.io",
      "quickbase.io",
      "swiftbase.com"
    ],
    "sale": ["modernpay.com", "rapidcloud.com"],
    "taken": [
      "swiftpay.io",
      "rapidhub.com",
      "quickbase.com",
      "fastcloud.com",
      "fastcloud.io",
      "modernpay.io",
      "swiftbase.io",
      "rapidcloud.io",
      "quickpay.com",
      "quickpay.io",
      "fasthub.com",
      "fasthub.io",
      "modernbase.com",
      "modernbase.io"
    ]
  },
  "summary": {
    "total": 20,
    "available": 4,
    "sale": 2,
    "taken": 14
  }
}
```

**Understanding the Status:**

- ✅ **AVAILABLE**: Domain is not registered, you can buy it now!
- 💰 **SALE**: Domain is registered but actively for sale (often at premium prices)
- ❌ **TAKEN**: Domain is registered and not for sale

---

## 🎯 Real-World Use Cases

### 1. Startup Founders

**Scenario**: You're launching a new SaaS product and need a memorable domain.

**Configuration**:

```bash
npm start -- \
  --domains salesforce hubspot pipedrive \
  --keywords sales crm pipeline cloud \
  --tlds com io \
  --count 50 \
  --model gpt-4o
```

**Why this works**:

- Uses successful SaaS companies as inspiration
- Includes relevant industry keywords
- Checks .com (traditional) and .io (tech-friendly)
- Generates enough options (50) to find good ones
- Uses premium model for best quality

**Expected results**: 5-10 available domains with strong brand potential

---

### 2. Brand Agencies

**Scenario**: A client needs a luxury e-commerce brand name.

**Configuration**:

```json
{
  "directory": "luxury-brand",
  "tlds": ["com"],
  "keywords": ["luxury", "premium", "elite", "elegant", "boutique"],
  "count": 100,
  "model": "gpt-4o"
}
```

**Customize `prompt.txt`**:

```text
Generate {COUNT} elegant, premium domain names for a luxury brand.

Focus on sophistication, elegance, and high-end appeal.
Target audience: Affluent customers seeking premium products.

Keywords: {KEYWORDS}

Requirements:
- 5-10 characters only
- Easy to pronounce in English, French, and Spanish
- Sounds expensive and exclusive
- Timeless, not trendy
- Easy to spell from hearing it once

Return ONLY the domain name without extensions.
```

**Why this works**:

- Focused on .com (most trusted TLD for e-commerce)
- Large pool (100) to find premium-sounding names
- Custom prompt ensures luxury brand feel
- Premium model for creative, sophisticated names

**Expected results**: 10-15 high-quality brand names

---

### 3. Domain Investors

**Scenario**: You're looking for valuable domain names to invest in.

**Configuration**:

```bash
npm start -- \
  --domains google amazon facebook microsoft \
  --tlds com net org \
  --count 200 \
  --model gpt-4o
```

**Why this works**:

- Uses mega-brands as inspiration (patterns are proven)
- Checks traditional TLDs (.com, .net, .org)
- Large volume (200) for more opportunities
- Premium model for best naming creativity

**Strategy**:

1. Run multiple searches with different keyword sets
2. Focus on short domains (under 8 characters)
3. Look for dictionary words or portmanteaus
4. Check estimated value using domain appraisal tools

**Expected results**: 10-20 potentially valuable domains

---

### 4. Side Project Developers

**Scenario**: Quick domain for your weekend hack project.

**Configuration**:

```bash
npm start -- \
  --keywords ai tool developer productivity \
  --tlds dev io ai \
  --count 15 \
  --model gpt-4o-mini
```

**Why this works**:

- Modern TLDs (.dev, .io, .ai) for tech projects
- Fast and cheap (gpt-4o-mini)
- Small count (15) for quick decision
- Keywords cover the project scope

**Expected results**: 3-5 available domains in under 2 minutes

---

### 5. Agency Managing Multiple Clients

**Scenario**: Systematically search for domains for different clients.

**Setup multiple config files**:

```bash
# Create configs
cp input.example.json client-saas.json
cp input.example.json client-ecommerce.json
cp input.example.json client-blog.json

# Edit each config file for the specific client

# Run searches
npm start -- --input client-saas.json
npm start -- --input client-ecommerce.json
npm start -- --input client-blog.json
```

**Why this works**:

- Organized by client
- Repeatable process
- Easy to track and compare
- Version control friendly

---

## 🤖 Choosing the Right AI Model

### Recommended Models (Quick Reference)

| Model               | Speed  | Cost per 1M Tokens | Quality    | Best For                                  |
| ------------------- | ------ | ------------------ | ---------- | ----------------------------------------- |
| `gpt-4o-mini`       | ⚡⚡⚡ | ~$0.15             | ⭐⭐⭐     | Quick searches, testing, high volume      |
| `gpt-4o`            | ⚡⚡   | ~$2.50             | ⭐⭐⭐⭐⭐ | Important searches, client work, premium  |
| `gpt-4-turbo`       | ⚡⚡   | ~$10.00            | ⭐⭐⭐⭐⭐ | Maximum creativity, high-stakes decisions |
| `chatgpt-4o-latest` | ⚡⚡   | ~$2.50             | ⭐⭐⭐⭐⭐ | Latest ChatGPT model with improvements    |
| `o1`                | ⚡     | ~$15.00            | ⭐⭐⭐⭐⭐ | Reasoning-focused, complex naming tasks   |
| `o3-mini`           | ⚡⚡   | ~$5.00             | ⭐⭐⭐⭐   | Balanced reasoning and cost               |

### All Available Models

The tool supports all OpenAI models via the `@ai-sdk/openai` package. Here's the complete list organized by family:

#### GPT-4o Family (Recommended for Most Users)

| Model ID                 | Release Date | Description              | Use Case                     |
| ------------------------ | ------------ | ------------------------ | ---------------------------- |
| `gpt-4o`                 | Latest       | Latest GPT-4o model      | Best overall choice          |
| `gpt-4o-mini`            | Latest       | Faster, cheaper variant  | Budget-friendly, high volume |
| `gpt-4o-2024-11-20`      | Nov 2024     | Specific snapshot        | Consistent results           |
| `gpt-4o-2024-08-06`      | Aug 2024     | Specific snapshot        | Stable version               |
| `gpt-4o-2024-05-13`      | May 2024     | Initial release          | Legacy support               |
| `gpt-4o-mini-2024-07-18` | July 2024    | Specific mini snapshot   | Budget + stability           |
| `chatgpt-4o-latest`      | Latest       | ChatGPT production model | Latest improvements          |

#### GPT-4 Family (Classic)

| Model ID                 | Description         | Use Case                  |
| ------------------------ | ------------------- | ------------------------- |
| `gpt-4`                  | Latest GPT-4        | General-purpose, reliable |
| `gpt-4-turbo`            | Faster GPT-4        | High performance          |
| `gpt-4-turbo-2024-04-09` | April 2024 snapshot | Stability                 |
| `gpt-4-0613`             | June 2023 snapshot  | Legacy applications       |

#### GPT-4.1 Family (Next Generation)

| Model ID                  | Description         | Use Case          |
| ------------------------- | ------------------- | ----------------- |
| `gpt-4.1`                 | Latest GPT-4.1      | Next-gen features |
| `gpt-4.1-mini`            | Smaller 4.1 variant | Budget next-gen   |
| `gpt-4.1-nano`            | Tiny 4.1 variant    | Ultra-fast, cheap |
| `gpt-4.1-2025-04-14`      | April 2025 snapshot | Future stability  |
| `gpt-4.1-mini-2025-04-14` | April 2025 mini     | Future budget     |
| `gpt-4.1-nano-2025-04-14` | April 2025 nano     | Future ultra-fast |

#### GPT-5 Family (Future/Experimental)

> ⚠️ **Note**: These models may not be publicly available yet

| Model ID              | Description          |
| --------------------- | -------------------- |
| `gpt-5`               | Next-generation GPT  |
| `gpt-5-mini`          | Smaller GPT-5        |
| `gpt-5-nano`          | Tiny GPT-5           |
| `gpt-5-pro`           | Professional GPT-5   |
| `gpt-5-chat-latest`   | Latest GPT-5 chat    |
| `gpt-5-codex`         | Code-focused GPT-5   |
| `gpt-5.1`             | GPT-5.1 variant      |
| `gpt-5.1-chat-latest` | Latest GPT-5.1 chat  |
| `gpt-5.1-codex`       | Code-focused GPT-5.1 |
| `gpt-5.1-codex-mini`  | Smaller code variant |

#### O-Series (Reasoning Models)

| Model ID             | Description            | Use Case             |
| -------------------- | ---------------------- | -------------------- |
| `o1`                 | Reasoning-focused      | Complex naming logic |
| `o1-2024-12-17`      | December 2024 snapshot | Stable reasoning     |
| `o3`                 | Latest reasoning       | Advanced tasks       |
| `o3-mini`            | Smaller reasoning      | Budget reasoning     |
| `o3-2025-04-16`      | April 2025 snapshot    | Future stability     |
| `o3-mini-2025-01-31` | January 2025 mini      | Future budget        |

#### GPT-3.5 Family (Budget Legacy)

| Model ID             | Description   | Use Case             |
| -------------------- | ------------- | -------------------- |
| `gpt-3.5-turbo`      | Latest 3.5    | Very budget-friendly |
| `gpt-3.5-turbo-1106` | November 2023 | Stability            |
| `gpt-3.5-turbo-0125` | January 2024  | Latest 3.5           |

### Cost Estimates

For a typical search generating 20 domains:

- **gpt-4o-mini**: ~$0.001 (less than a penny!)
- **gpt-4o**: ~$0.01 (1 cent)
- **gpt-4-turbo**: ~$0.03 (3 cents)
- **chatgpt-4o-latest**: ~$0.01 (1 cent)
- **o1**: ~$0.05 (5 cents)
- **o3-mini**: ~$0.02 (2 cents)

**Real talk**: For most users, **gpt-4o-mini is perfect**. It's incredibly cheap and produces great results. Use gpt-4o or chatgpt-4o-latest only when you need the absolute best quality.

### Model Selection Guide

**For Beginners / Testing:**

```json
{
  "model": "gpt-4o-mini"
}
```

- ✅ Cheapest
- ✅ Fast
- ✅ Good results
- ✅ Perfect for learning

**For Production / Client Work:**

```json
{
  "model": "gpt-4o"
}
```

or

```json
{
  "model": "chatgpt-4o-latest"
}
```

- ✅ Best quality
- ✅ Latest features
- ✅ Professional results
- ✅ Worth the extra cost

**For Complex Naming Tasks:**

```json
{
  "model": "o3-mini"
}
```

- ✅ Advanced reasoning
- ✅ Better understanding of context
- ✅ Creative solutions
- ✅ Handles complex prompts

**For High-Volume Domain Research:**

```json
{
  "model": "gpt-4o-mini"
}
```

or

```json
{
  "model": "gpt-3.5-turbo"
}
```

- ✅ Very cheap at scale
- ✅ Fast processing
- ✅ Can generate 1000+ domains affordably

### When to Use Each Model

**Use `gpt-4o-mini` when:**

- ✅ Testing your configuration
- ✅ Generating high volume (100+ domains)
- ✅ Working on a tight budget
- ✅ Domain name isn't mission-critical
- ✅ You have time to run multiple searches

**Use `gpt-4o` or `chatgpt-4o-latest` when:**

- ✅ Searching for your company's main brand
- ✅ Client projects (bill it back!)
- ✅ Need higher quality results immediately
- ✅ Limited search time
- ✅ Want more creative, unique names

**Use `gpt-4-turbo` when:**

- ✅ High-stakes naming (major rebrand, big launch)
- ✅ Premium brand development
- ✅ Need maximum creativity
- ✅ Budget is not a concern

**Use `o1` or `o3-mini` when:**

- ✅ Complex naming requirements
- ✅ Need deep understanding of brand context
- ✅ Balancing multiple constraints
- ✅ Sophisticated wordplay or meanings

**Use `gpt-3.5-turbo` when:**

- ✅ Extremely tight budget
- ✅ Simple naming tasks
- ✅ High-volume testing
- ✅ Don't need cutting-edge quality

### Checking Available Models

You can use any model ID from the `OpenAIResponsesModelId` type in `@ai-sdk/openai`. The tool will validate and use the specified model.

**Example**:

```bash
# Try the latest ChatGPT model
npm start -- --model chatgpt-4o-latest --count 10

# Use reasoning model for complex task
npm start -- --model o3-mini --count 20

# Budget search with GPT-3.5
npm start -- --model gpt-3.5-turbo --count 50
```

---

## 📝 Detailed Examples

### Example 1: Tech Startup (Step-by-Step)

**Goal**: Find a domain for a new developer tool that helps with code deployment.

**Step 1**: Create config

```json
{
  "directory": "devtool-search-2025",
  "tlds": ["dev", "io", "sh"],
  "domains": ["vercel", "netlify", "railway", "render"],
  "keywords": ["deploy", "ship", "launch", "cd", "ci"],
  "count": 30,
  "model": "gpt-4o"
}
```

**Step 2**: Customize prompt for tech audience

```text
Generate {COUNT} modern, developer-friendly domain names.

Target audience: Software developers and DevOps engineers
Focus on: Technical credibility, speed, simplicity

Inspired by: {DOMAINS}
Keywords: {KEYWORDS}

Requirements:
- Short and punchy (5-10 characters)
- Easy to type in terminal
- Memorable for developers
- Sounds fast and efficient
- Modern, not corporate

Return ONLY the domain name.
```

**Step 3**: Run the search

```bash
npm start
```

**Sample Results**:

```
✅ AVAILABLE (8):
  1. shipfast.dev
  2. deployx.io
  3. launchkit.dev
  4. cdship.sh
  5. deployly.dev
  6. shipwave.io
  7. fastcd.dev
  8. launchgo.sh

💰 SALE (3):
  1. quickdeploy.dev
  2. shipit.io
  3. deployai.dev

❌ TAKEN (19):
  (most taken)
```

**Step 4**: Pick the best one

Evaluation criteria:

- ✅ **shipfast.dev** - Perfect! Short, clear, .dev TLD
- ✅ **launchkit.dev** - Good alternative
- ⚠️ **cdship.sh** - Too technical, hard to pronounce

**Decision**: Register `shipfast.dev` 🎉

---

### Example 2: E-commerce Store

**Goal**: Find a domain for a sustainable fashion marketplace.

**Configuration**:

```json
{
  "directory": "sustainable-fashion",
  "tlds": ["com", "shop"],
  "keywords": ["eco", "green", "sustainable", "ethical", "fair", "organic"],
  "count": 40,
  "model": "gpt-4o"
}
```

**Custom Prompt**:

```text
Generate {COUNT} eco-friendly, positive domain names for sustainable fashion.

Target: Conscious consumers who care about sustainability
Tone: Positive, hopeful, clean, honest

Keywords: {KEYWORDS}

Requirements:
- Easy to remember and share
- Positive emotional association
- International appeal (easy for non-native English speakers)
- Suggests sustainability without being preachy
- 6-12 characters
- Sounds trustworthy

Examples of good tone: "grove", "evergreen", "goodlife"

Return ONLY the domain name.
```

**Results**:

```
✅ AVAILABLE (12):
  1. ecothread.shop
  2. greenfair.com
  3. purefabric.shop
  4. ethicwear.com
  5. fairgrove.shop
  6. cleanstyle.com
  ...

💰 SALE (5):
  1. sustainable.shop ($$$)
  2. greenwear.com ($$$$)
  ...
```

**Analysis**:

- `ecothread.shop` - ⭐⭐⭐⭐⭐ Perfect! Clear, memorable, available
- `greenfair.com` - ⭐⭐⭐⭐ Good, but .com more expensive
- `ethicwear.com` - ⭐⭐⭐ Good, slight typo risk ("ethic" vs "ethical")

**Winner**: `ecothread.shop` ✅

---

### Example 3: Personal Blog

**Goal**: Simple domain for a tech blog.

**Quick Command**:

```bash
npm start -- \
  --keywords tech code programming blog tutorials \
  --tlds com blog dev \
  --count 20 \
  --model gpt-4o-mini
```

**Results in 60 seconds**:

```
✅ AVAILABLE:
  1. codewave.blog
  2. techpen.blog
  3. devdaily.blog
  4. codewise.blog

💰 SALE:
  1. techblog.com ($$$$$)

❌ TAKEN: (most others)
```

**Quick decision**: Register `codewave.blog` for $12/year! ✅

---

## 🛠️ Development

### Project Structure Explained

```
find-my-domain/
├── src/
│   ├── index.ts              # Main entry point, orchestrates everything
│   └── utils/
│       ├── ai.ts             # AI domain generation with OpenAI
│       ├── whois.ts          # WHOIS lookup for availability
│       └── wait.ts           # Rate limiting between WHOIS queries
│
├── test/
│   └── index.test.ts         # Unit tests
│
├── output/                   # Generated results (gitignored)
│   └── output.json          # JSON results file
│
├── input.json               # Your configuration (gitignored)
├── input.example.json       # Example configuration
│
├── prompt.txt               # Your AI prompt (gitignored)
├── prompt.example.txt       # Example AI prompt
│
├── .env                     # Your API keys (gitignored)
├── .env.example             # Example environment file
│
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Build configuration
└── README.md                # This file!
```

### Available Scripts

```bash
# Run the application
npm start           # Use input.json configuration
npm run dev         # Same as start
npm run find        # Same as start

# Development tools
npm run typecheck   # Check TypeScript types
npm run lint        # Check code quality
npm run lint:fix    # Auto-fix linting issues
npm run format      # Format code with Prettier
npm run format:check # Check if code is formatted

# Testing
npm test            # Run all tests once
npm run test:watch  # Run tests in watch mode

# Build
npm run build       # Build for production (creates dist/)
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (auto-runs on file changes)
npm run test:watch

# Type checking only
npm run typecheck
```

### Development Workflow

1. **Make changes** to source files
2. **Run type check**: `npm run typecheck`
3. **Run tests**: `npm test`
4. **Format code**: `npm run format`
5. **Test your changes**: `npm start`

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. "OPENAI_API_KEY is required" Error

**Problem**: The tool can't find your API key.

**Solution**:

```bash
# Check if .env file exists
ls -la .env

# If not, create it
echo "OPENAI_API_KEY=sk-your-key-here" > .env

# Verify it's not empty
cat .env
```

**Still not working?**

- Make sure your API key starts with `sk-`
- Check for extra spaces or quotes in the .env file
- Try exporting manually: `export OPENAI_API_KEY=sk-your-key`

---

#### 2. WHOIS Rate Limiting

**Problem**: Getting errors like "Too many requests" or "Connection timeout".

**Why this happens**: WHOIS servers limit how many queries you can make per minute.

**Solutions**:

**Option 1**: Check fewer TLDs at once

```bash
# Instead of this
npm start -- --tlds com net org io dev ai --count 20

# Do this
npm start -- --tlds com io --count 20
```

**Option 2**: Reduce the number of domains

```bash
npm start -- --count 10 --model gpt-4o-mini
```

**Option 3**: Increase the delay in code
Edit `src/utils/wait.ts` and increase from 500ms to 1000ms:

```typescript
await wait(1000); // Wait 1 second between checks
```

---

#### 3. "Failed to load prompt template" Error

**Problem**: Missing `prompt.txt` file.

**Solution**:

```bash
# Copy the example
cp prompt.example.txt prompt.txt

# Verify it exists
cat prompt.txt
```

---

#### 4. WHOIS Lookup Failures

**Problem**: Some domains show errors or incorrect status.

**Why this happens**:

- WHOIS server is down or slow
- Domain has privacy protection
- Rate limiting (see #2)
- Network issues

**What to do**:

1. **Check if it's widespread**: If only 1-2 domains fail, it's normal
2. **Try again later**: WHOIS servers can be temporarily down
3. **Verify manually**: Check the domain on [whois.com](https://www.whois.com/)
4. **Focus on available domains**: The tool is optimized to find available ones

**Pro tip**: If you see "❌ TAKEN" for a domain you think is available, always double-check manually before giving up!

---

#### 5. Model Not Found / API Error

**Problem**: OpenAI API returns an error about the model.

**Valid models**:

- ✅ `gpt-4o-mini` (recommended)
- ✅ `gpt-4o`
- ✅ `gpt-4-turbo`
- ❌ `gpt-4-mini` (doesn't exist)
- ❌ `gpt-3.5-turbo` (too old, not recommended)

**Also check**:

- You have credits in your OpenAI account
- Your API key is valid (not expired)
- You're not hitting rate limits

---

#### 6. "Empty response from AI" Error

**Problem**: AI returns no domain names.

**Common causes**:

1. **Conflicting requirements**: Your prompt might be too restrictive
2. **Invalid placeholders**: Check `{COUNT}`, `{DOMAINS}`, `{KEYWORDS}` in prompt.txt
3. **Rate limiting**: You hit OpenAI's rate limit

**Solutions**:

```bash
# Try with simpler config
npm start -- --count 5 --keywords tech --model gpt-4o-mini

# Reset your prompt to default
cp prompt.example.txt prompt.txt

# Check OpenAI status
# Visit: https://status.openai.com/
```

---

#### 7. High API Costs

**Problem**: OpenAI charges are higher than expected.

**Why**:

- Using `gpt-4o` or `gpt-4-turbo` with high counts
- Running many searches

**Cost optimization**:

```bash
# Use mini model (20x cheaper!)
npm start -- --model gpt-4o-mini

# Generate fewer domains per search
npm start -- --count 10 --model gpt-4o-mini

# Run focused searches (better than broad ones)
npm start -- --domains stripe vercel --count 15 --model gpt-4o-mini
```

**Cost tracking**:

- Check usage: https://platform.openai.com/usage
- Set spending limits in OpenAI dashboard
- Each search with gpt-4o-mini costs ~$0.001 (1/10th of a cent!)

---

## 🔐 Security & Privacy

### What's Kept Private

These files are automatically gitignored to protect your data:

- ✅ `.env` - Your API keys (NEVER commit this!)
- ✅ `input.json` - Your domain strategies and keywords
- ✅ `prompt.txt` - Your custom prompts
- ✅ `output/` - Your search results

### Best Practices

1. **Never share your API key**
   - Don't paste it in chat/email
   - Don't commit it to git
   - Don't take screenshots of it

2. **Rotate keys regularly**
   - Regenerate API keys every few months
   - Revoke old keys in OpenAI dashboard

3. **Keep results private**
   - Don't share `output.json` publicly
   - Your domain ideas are valuable - protect them!

4. **Use environment variables**
   - Always use `.env` file for secrets
   - Never hardcode API keys in source code

### What Data Gets Sent

**To OpenAI**:

- Your example domains (from `domains` config)
- Your keywords (from `keywords` config)
- Your custom prompt text

**To WHOIS Servers**:

- Domain names being checked
- Your IP address (standard for any web request)

**Not sent anywhere**:

- Your API key (only used to authenticate)
- Search results
- Personal information

---

## 💡 Pro Tips & Best Practices

### 1. Start Small, Then Scale

**Why**: Testing your config with 5 domains costs ~$0.001. Finding out your config is wrong after generating 100 domains is frustrating.

```bash
# Step 1: Test (< 10 seconds)
npm start -- --count 5 --model gpt-4o-mini

# Step 2: If results look good, scale up
npm start -- --count 30 --model gpt-4o-mini

# Step 3: If still good, go premium
npm start -- --count 50 --model gpt-4o
```

---

### 2. Use Example Domains for Consistency

**Why**: Keywords alone can produce random styles. Example domains guide the AI.

**❌ Don't do this**:

```json
{
  "keywords": ["fast", "cloud", "deploy"]
  // AI might generate: "fastcloud", "cloudgo", "deployit", "speedy", "rocket" (inconsistent!)
}
```

**✅ Do this**:

```json
{
  "domains": ["vercel", "netlify", "railway"],
  "keywords": ["fast", "cloud", "deploy"]
  // AI generates: "fastcel", "deployway", "cloudlay" (similar patterns!)
}
```

---

### 3. Combine Multiple Approaches

**Best results come from mixing strategies**:

```json
{
  "domains": ["stripe", "square"], // Style guide
  "keywords": ["pay", "money", "wallet"], // Content guide
  "count": 30,
  "model": "gpt-4o"
}
```

This gives the AI both:

- **Style reference** (short, modern, single-word)
- **Content direction** (payment-related)

---

### 4. TLD Strategy Matters

**Universal Strategy** (safest):

```json
{
  "tlds": ["com"]
}
```

- Pro: Most trusted, best for businesses
- Con: Expensive, many taken

**Tech/Startup Strategy** (modern):

```json
{
  "tlds": ["io", "dev", "ai"]
}
```

- Pro: More availability, tech-credible
- Con: Less recognized by non-tech audiences

**Comprehensive Strategy** (thorough):

```json
{
  "tlds": ["com", "io", "dev"]
}
```

- Pro: More options, can compare
- Con: Takes 3x longer, more WHOIS queries

**Budget Strategy**:

```json
{
  "tlds": ["xyz", "online", "site"]
}
```

- Pro: Very cheap ($1-5/year), high availability
- Con: Less credibility, might look spammy

---

### 5. Model Selection Strategy

**Decision Tree**:

```
Are you testing/exploring?
├─ Yes → gpt-4o-mini
└─ No → Is this for a client or main brand?
    ├─ Yes → gpt-4o or gpt-4-turbo
    └─ No → Do you need 50+ domains?
        ├─ Yes → gpt-4o-mini (cost adds up!)
        └─ No → gpt-4o (best quality)
```

**Real examples**:

```bash
# Personal project → mini
npm start -- --count 20 --model gpt-4o-mini

# Client work → premium
npm start -- --count 30 --model gpt-4o

# Your startup's main brand → best
npm start -- --count 50 --model gpt-4-turbo

# Domain investing → mini (high volume)
npm start -- --count 200 --model gpt-4o-mini
```

---

### 6. Prompt Engineering Tips

**Generic Prompt** (produces varied results):

```text
Generate domain names about technology.
```

**Specific Prompt** (produces focused results):

```text
Generate domain names for a B2B SaaS tool that helps
e-commerce stores manage inventory. Target audience is
online store owners. Style should be: professional,
trustworthy, easy to remember, 6-10 characters.
```

**The more specific, the better!**

---

### 7. Batch Process for Different Projects

Create a dedicated config for each project:

```bash
# One-time setup
mkdir configs
cp input.example.json configs/project-a.json
cp input.example.json configs/project-b.json
cp input.example.json configs/client-xyz.json

# Run different searches
npm start -- --input configs/project-a.json
npm start -- --input configs/project-b.json
npm start -- --input configs/client-xyz.json
```

---

### 8. Analyzing Results Efficiently

After a search, quickly find the best domains:

```bash
# Count available domains
cat output/output.json | jq '.results.available | length'

# List only available .com domains
cat output/output.json | jq '.results.available[] | select(endswith(".com"))'

# Show summary
cat output/output.json | jq '.summary'

# Export available domains to a text file
cat output/output.json | jq -r '.results.available[]' > available-domains.txt
```

---

### 9. Verify Before Buying

**Always double-check availability manually!**

WHOIS data can be outdated or incorrect. Before purchasing:

1. **Check on multiple registrars**:
   - [Namecheap](https://www.namecheap.com/)
   - [GoDaddy](https://www.godaddy.com/)
   - [Google Domains](https://domains.google/)

2. **Check if it was previously used**:
   - [Wayback Machine](https://web.archive.org/)
   - Check for SEO spam history

3. **Check social media availability**:
   - [Namechk](https://namechk.com/)
   - Can you get @username on Twitter, Instagram?

4. **Check trademark conflicts**:
   - [USPTO Search](https://www.uspto.gov/trademarks)
   - Google the name to see if anyone else uses it

---

### 10. Negotiating "For Sale" Domains

When you see 💰 **SALE** status:

**Don't**:

- ❌ Contact the owner directly with your budget
- ❌ Show too much interest
- ❌ Make an offer from your main email

**Do**:

- ✅ Use a domain broker or escrow service
- ✅ Start with a lowball offer (50-70% off asking price)
- ✅ Research the domain's history (was it recently registered?)
- ✅ Check if the seller has many domains for sale (likely a domain investor = more negotiable)

**Pro tip**: Domains marked "for sale" often sit unsold for months/years. Sellers are usually willing to negotiate!

---

## 📚 API Documentation

### Using Programmatically

You can import and use the functions directly in your Node.js projects:

```typescript
import { generateDomainNames } from "./src/utils/ai.js";
import { checkDomainStatus } from "./src/utils/whois.js";

// Generate domain names
const names = await generateDomainNames({
  domains: ["stripe", "vercel"],
  keywords: ["fast", "modern"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

console.log("Generated:", names);
// Output: ["swiftpay", "rapidhub", "modernpay", ...]

// Check availability for each
for (const name of names) {
  const status = await checkDomainStatus(`${name}.com`);

  if (status.available) {
    console.log(`✅ ${status.domain} is available!`);
  } else if (status.sale) {
    console.log(`💰 ${status.domain} is for sale`);
  } else {
    console.log(`❌ ${status.domain} is taken`);
  }
}
```

### API Reference

#### `generateDomainNames(options)`

Generates creative domain names using AI.

**Parameters**:

```typescript
interface GenerateDomainNamesOptions {
  domains?: string[]; // Example domains (optional)
  keywords?: string[]; // Keywords (optional)
  count: number; // Number to generate (required)
  apiKey: string; // OpenAI API key (required)
  model: string; // Model name (required)
}
```

**Returns**: `Promise<string[]>`

**Example**:

```typescript
const names = await generateDomainNames({
  domains: ["github", "gitlab"],
  keywords: ["code", "git"],
  count: 20,
  apiKey: "sk-...",
  model: "gpt-4o-mini",
});
```

**Throws**:

- `Error` if API key is invalid
- `Error` if OpenAI API request fails
- `Error` if model is not found

---

#### `checkDomainStatus(domain)`

Checks domain availability via WHOIS lookup.

**Parameters**:

```typescript
domain: string; // Full domain with TLD (e.g., "example.com")
```

**Returns**:

```typescript
interface DomainStatusResult {
  domain: string; // Full domain name
  available: boolean; // Is it available for registration?
  sale: boolean; // Is it for sale?
  registrar?: string; // Who registered it (if taken)
  createdDate?: string; // When it was registered
  expiryDate?: string; // When registration expires
  updatedDate?: string; // Last WHOIS update
}
```

**Example**:

```typescript
const status = await checkDomainStatus("example.com");

if (status.available) {
  console.log("Available! Go register it!");
} else {
  console.log(`Taken. Registered on ${status.createdDate}`);
  console.log(`Expires on ${status.expiryDate}`);
}
```

**Note**: WHOIS lookups can be slow (1-3 seconds each). Use rate limiting!

---

### Building Your Own Tool

Example: Domain searcher with custom filters

```typescript
import { generateDomainNames, checkDomainStatus } from "./src/index.js";

async function findShortAvailableDomains() {
  // Generate 50 domains
  const names = await generateDomainNames({
    keywords: ["tech", "app", "digital"],
    count: 50,
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o-mini",
  });

  // Filter for short names only (< 8 characters)
  const shortNames = names.filter((name) => name.length < 8);

  console.log(
    `Found ${shortNames.length} short names, checking availability...`,
  );

  // Check only .com domains
  const available = [];
  for (const name of shortNames) {
    const domain = `${name}.com`;
    const status = await checkDomainStatus(domain);

    if (status.available) {
      available.push(domain);
      console.log(`✅ ${domain}`);
    }

    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\nFound ${available.length} available short .com domains!`);
  return available;
}

// Run it
findShortAvailableDomains();
```

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new features, or documentation improvements.

### How to Contribute

1. **Fork the repository**

```bash
gh repo fork idimetrix/find-my-domain
```

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/find-my-domain.git
cd find-my-domain
```

3. **Create a branch**

```bash
git checkout -b feature/my-awesome-feature
```

4. **Make your changes**

```bash
# Install dependencies
npm install

# Make your changes
# ... edit files ...

# Test your changes
npm run typecheck
npm test
npm run lint:fix
npm run format
```

5. **Commit and push**

```bash
git add .
git commit -m "feat: add awesome feature"
git push origin feature/my-awesome-feature
```

6. **Create a Pull Request**

Go to GitHub and create a PR from your branch.

### Development Setup

```bash
# Clone and install
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain
npm install

# Setup environment
cp .env.example .env
cp input.example.json input.json
cp prompt.example.txt prompt.txt

# Add your OpenAI API key to .env
echo "OPENAI_API_KEY=sk-your-key" > .env

# Run in development
npm run dev

# Run tests
npm test
npm run test:watch  # Watch mode

# Check code quality
npm run typecheck
npm run lint
npm run format:check
```

### What to Contribute

**Ideas for contributions**:

- 🐛 Bug fixes
- ✨ New features (see Roadmap below)
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 More tests
- 🌐 Internationalization
- ⚡ Performance optimizations

---

## 📄 License

MIT © [Dmitrii Selikhov](https://github.com/idimetrix)

You're free to:

- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Use privately

Just include the license and copyright notice.

---

## 🙏 Acknowledgments

This project wouldn't be possible without:

- **[OpenAI](https://openai.com/)** - For powerful GPT models that generate creative domain names
- **[whoiser](https://github.com/LayeredStudio/whoiser)** - For reliable WHOIS lookup functionality
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - For elegant AI integration with structured outputs
- **[Zod](https://zod.dev/)** - For runtime type validation
- **TypeScript Community** - For excellent tooling and ecosystem

Special thanks to all contributors who help improve this tool!

---

## 📞 Support & Contact

### Need Help?

- 📖 **Documentation**: You're reading it! Use Ctrl+F to search
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/idimetrix/find-my-domain/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/idimetrix/find-my-domain/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/idimetrix/find-my-domain/discussions)

### Connect

- 👨‍💻 **Author**: Dmitrii Selikhov
- 📧 **Email**: selikhov.dmitrey@gmail.com
- 💼 **LinkedIn**: [dimetrix](https://www.linkedin.com/in/dimetrix)
- 🐙 **GitHub**: [@idimetrix](https://github.com/idimetrix)

---

## 🗺️ Roadmap

Planned features and improvements:

### Short Term (Next Release)

- [ ] **Bulk Domain Export** - Export available domains to CSV
- [ ] **Domain Scoring** - Rank domains by brandability, length, etc.
- [ ] **Estimated Pricing** - Show estimated cost for available domains
- [ ] **History Tracking** - Track searches over time

### Medium Term

- [ ] **Web Interface** - Simple web UI for non-technical users
- [ ] **Additional WHOIS Providers** - Fallback providers for better reliability
- [ ] **Domain Watch** - Monitor if domains become available
- [ ] **Batch Mode** - Process multiple config files at once
- [ ] **Smart Filters** - Filter by length, pattern, syllables

### Long Term

- [ ] **Registrar Integration** - Buy domains directly from the tool
- [ ] **Social Media Check** - Verify username availability
- [ ] **Trademark Search** - Automatic trademark conflict checking
- [ ] **Domain Valuation** - AI-powered domain value estimation
- [ ] **Team Collaboration** - Share searches with team members
- [ ] **API Service** - Host as a public API

### Community Requested

Have an idea? [Open an issue](https://github.com/idimetrix/find-my-domain/issues) or start a [discussion](https://github.com/idimetrix/find-my-domain/discussions)!

---

## ⭐ Star History

If this tool helped you find a great domain, consider giving it a star on GitHub! ⭐

It helps others discover the tool and motivates continued development.

```bash
# Quick way to star from command line
gh repo star idimetrix/find-my-domain
```

---

## 📊 Stats

- **Node.js**: 22+
- **TypeScript**: 5.9
- **Dependencies**: 6 runtime, 11 dev
- **License**: MIT
- **Actively Maintained**: Yes ✅

---

**Made with ❤️ by developers, for developers**

Happy domain hunting! 🚀

---

## 🎁 Bonus: Tips for Choosing the Perfect Domain

### The 5-Second Rule

**Test**: Can someone hear your domain once and type it correctly?

✅ **Good Examples**:

- stripe.com (simple word)
- vercel.com (phonetic spelling)
- notion.so (common word)

❌ **Bad Examples**:

- xkcd.com (how do you spell that?)
- flic.kr (confusing abbreviation)
- del.icio.us (can't hear the dots!)

### The Radio Test

Imagine saying your domain on a podcast. Can listeners understand and remember it?

✅ "Visit stripe dot com"
❌ "Visit h-t-t-p-s colon slash slash w-w-w dot my dash site hyphen two dash thousand dash twenty dash three dot i-o"

### The Brandability Score

Rate your domain:

- [ ] Easy to spell? (+2 points)
- [ ] Easy to pronounce? (+2 points)
- [ ] Short (< 10 chars)? (+2 points)
- [ ] Memorable? (+2 points)
- [ ] .com or .io? (+1 point)
- [ ] Available socials? (+1 point)

**7+ points**: Excellent domain!
**5-6 points**: Good domain
**< 5 points**: Keep searching

### Cultural Considerations

Before finalizing:

1. **Google it** - Does it mean something inappropriate in another language?
2. **International spelling** - Can non-native English speakers spell it?
3. **Pronunciation** - Does it sound weird in other accents?

Example: "fart.com" might work in English, but "fart" means "speed" in some languages!

### The Longevity Test

Will this domain name still make sense in 5 years?

✅ **Timeless**:

- stripe.com (payment = always relevant)
- github.com (git = won't change soon)

❌ **Dated**:

- web2startup.com (implies there's a "web3" now)
- covidtracker.com (pandemic-specific)
- crypto2022.com (year in name = ages badly)

---

**Now go find your perfect domain!** 🎯
