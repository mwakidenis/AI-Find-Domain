# @find-my-domain/cli

> **AI-Powered Domain Name Generator CLI Tool**

Command-line tool for generating creative domain names using OpenAI and checking their availability with real-time WHOIS lookup.

🌐 **[Try Web Demo](https://find-my-domain-web.vercel.app/demo)** | 📖 **[Full Documentation](https://find-my-domain-web.vercel.app/docs)** | 🏠 **[Website](https://find-my-domain-web.vercel.app/)**

---

## 🚀 Quick Start

### Global Installation

```bash
# Install globally with pnpm
pnpm install -g find-my-domain

# Or with npm
npm install -g find-my-domain

# Or with yarn
yarn global add find-my-domain
```

### Instant Use (No Installation)

```bash
# Use npx - no installation required!
npx find-my-domain --keywords tech startup --count 10
```

### Set Up API Key

```bash
# Option 1: Environment variable
export OPENAI_API_KEY=sk-your-key-here

# Option 2: .env file
echo "OPENAI_API_KEY=sk-your-key-here" > .env

# Option 3: Pass as argument
find-my-domain --api-key sk-your-key-here --keywords tech --count 10
```

---

## 📖 Usage

### Basic Examples

```bash
# Simple keyword search
find-my-domain --keywords tech startup --count 10

# Check multiple TLDs
find-my-domain --keywords ai ml --tlds com io dev --count 15

# Use example domains for inspiration
find-my-domain --domains stripe vercel --count 20

# Combined approach (recommended)
find-my-domain \
  --domains github gitlab \
  --keywords code dev tools \
  --tlds com io dev \
  --count 30 \
  --model gpt-4o
```

### CLI Options

#### Core Options

| Option       | Alias | Type   | Description        | Example                   |
| ------------ | ----- | ------ | ------------------ | ------------------------- |
| `--api-key`  | `-a`  | string | OpenAI API key     | `--api-key sk-xxx`        |
| `--keywords` | `-k`  | array  | Keywords to use    | `--keywords tech startup` |
| `--domains`  |       | array  | Example domains    | `--domains stripe vercel` |
| `--count`    | `-c`  | number | Number to generate | `--count 25`              |
| `--model`    | `-m`  | string | OpenAI model       | `--model gpt-4o`          |
| `--tlds`     | `-t`  | array  | TLDs to check      | `--tlds com io dev`       |

#### Advanced Options

| Option          | Type    | Description           | Default  |
| --------------- | ------- | --------------------- | -------- |
| `--stream`      | boolean | Enable streaming mode | `true`   |
| `--no-stream`   | flag    | Disable streaming     | -        |
| `--save`        | boolean | Save results to file  | `true`   |
| `--no-save`     | flag    | Don't save results    | -        |
| `--directory`   | string  | Output directory      | `output` |
| `--prompt`      | string  | Custom prompt inline  | -        |
| `--prompt-file` | string  | Custom prompt file    | -        |
| `--help`        | `-h`    | Show help             | -        |

---

## 🎯 Advanced Usage

### Custom Prompts

**Inline prompt:**

```bash
find-my-domain \
  --prompt "Generate {COUNT} short domain names for {KEYWORDS}" \
  --keywords ai robotics \
  --count 15
```

**Prompt file:**

```bash
# Create custom prompt
cat > my-prompt.txt << 'EOF'
Generate {COUNT} creative domain names for a {KEYWORDS} business.
Focus on short, memorable names under 8 characters.
EOF

# Use custom prompt
find-my-domain \
  --prompt-file my-prompt.txt \
  --keywords fintech blockchain \
  --count 20
```

### Configuration File

**Create `input.json`:**

```json
{
  "directory": "output",
  "tlds": ["com", "io", "dev"],
  "domains": ["stripe", "vercel"],
  "keywords": ["fast", "modern", "cloud"],
  "count": 30,
  "model": "gpt-4o-mini"
}
```

**Run with config:**

```bash
find-my-domain --input input.json
```

### Streaming vs Batch Mode

**Streaming (default) - Get results as they're generated:**

```bash
find-my-domain --keywords tech --count 10 --tlds com io
# See results in 2-3 seconds per domain
```

**Batch mode - Generate all first, then check:**

```bash
find-my-domain --keywords tech --count 10 --tlds com io --no-stream
# Wait for all names, then check sequentially
```

---

## 📊 Output

### Console Output

```
🔍 FIND MY DOMAIN - AI-Powered Domain Generator

📋 Loading configuration...
✅ Configuration loaded

🤖 Generating 10 domain names with AI...
✅ Generated 10 domain names

🔍 Checking availability for .com, .io domains...

📍 Checking .com domains:
✅ AVAILABLE - techflow.com
💰 SALE - rapidhub.com
❌ TAKEN - cloudly.com

📊 SUMMARY
✅ AVAILABLE (3)
💰 SALE (2)
❌ TAKEN (15)

💾 Saved results to: output/output.json
```

### JSON Output

Results are saved to `output/output.json`:

```json
{
  "timestamp": "2025-11-18T10:30:00.000Z",
  "config": {
    "directory": "output",
    "tlds": ["com", "io"],
    "keywords": ["tech", "startup"],
    "count": 10,
    "model": "gpt-4o-mini"
  },
  "generated": ["techflow", "rapidhub", "cloudly"],
  "results": {
    "available": ["techflow.com", "rapidhub.io"],
    "sale": ["cloudly.com"],
    "taken": ["techflow.io", "rapidhub.com"]
  },
  "summary": {
    "total": 20,
    "available": 2,
    "sale": 1,
    "taken": 17
  }
}
```

---

## 🤖 Available Models

### Recommended Models

| Model         | Speed  | Cost | Quality    | Best For              |
| ------------- | ------ | ---- | ---------- | --------------------- |
| `gpt-4o-mini` | ⚡⚡⚡ | $    | ⭐⭐⭐     | Testing, high volume  |
| `gpt-4o`      | ⚡⚡   | $$   | ⭐⭐⭐⭐⭐ | Production, quality   |
| `gpt-4-turbo` | ⚡⚡   | $$$  | ⭐⭐⭐⭐⭐ | Premium, best quality |

### All Available Models

**GPT-4o Family:**

- `gpt-4o`, `gpt-4o-mini`
- `gpt-4o-2024-11-20`, `gpt-4o-2024-08-06`
- `chatgpt-4o-latest`

**GPT-4 Family:**

- `gpt-4`, `gpt-4-turbo`
- `gpt-4-turbo-2024-04-09`

**O-Series (Reasoning):**

- `o1`, `o3`, `o3-mini`

**GPT-3.5 (Budget):**

- `gpt-3.5-turbo`

---

## 💻 Programmatic API

Use as a library in your Node.js projects:

```typescript
import { generateDomainNames, checkDomainStatus, wait } from "find-my-domain";

// Generate domains
const names = await generateDomainNames({
  keywords: ["tech", "startup"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

// Check availability
for (const name of names) {
  const result = await checkDomainStatus(`${name}.com`);
  if (result.available) {
    console.log(`✅ ${name}.com is available!`);
  }
  await wait(500); // Rate limiting
}
```

### Streaming API

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
  const result = await checkDomainStatus(`${name}.com`);
  console.log(`Status: ${result.available ? "Available" : "Taken"}`);
}
```

---

## 🔧 Development

### Setup

```bash
# Clone the monorepo
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain/apps/cli

# Install dependencies (from root)
cd ../..
pnpm install

# Build the CLI
pnpm build:cli
```

### Scripts

```bash
# Development
pnpm dev            # Run with tsx (hot reload)
pnpm start          # Run with tsx

# Building
pnpm build          # Build for production
pnpm typecheck      # Type check
pnpm lint           # Lint code
pnpm test           # Run tests

# Cleaning
pnpm clean          # Remove dist/
```

### Project Structure

```
apps/cli/
├── src/
│   └── index.ts           # Main CLI logic
├── bin/
│   └── cli.js             # Binary entry point
├── test/
│   └── index.test.ts      # Tests
├── dist/                  # Built files
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md              # This file
```

---

## 📚 Additional Documentation

- **[CLI Usage Guide](CLI-USAGE.md)** - Comprehensive CLI documentation
- **[Deployment Guide](DEPLOY.md)** - How to publish to npm
- **[Main README](../../README.md)** - Monorepo overview
- **[Core Package](../../packages/core/README.md)** - Core library docs

---

## 🐛 Troubleshooting

### Common Issues

**"OPENAI_API_KEY is required"**

```bash
# Make sure API key is set
export OPENAI_API_KEY=sk-your-key
# Or create .env file
echo "OPENAI_API_KEY=sk-your-key" > .env
```

**"WHOIS rate limiting"**

```bash
# Check fewer TLDs
find-my-domain --tlds com --count 10

# Or increase delay (edit source)
```

**"Module not found" errors**

```bash
# Rebuild from root
cd ../..
pnpm build
```

---

## 📄 License

MIT © [Dmitrii Selikhov](https://github.com/idimetrix)

---

## 🔗 Links

- **Main Repo**: https://github.com/idimetrix/find-my-domain
- **npm Package**: https://www.npmjs.com/package/find-my-domain
- **Issues**: https://github.com/idimetrix/find-my-domain/issues
- **Author**: [Dmitrii Selikhov](https://www.linkedin.com/in/dimetrix)

---

**Happy domain hunting!** 🚀
