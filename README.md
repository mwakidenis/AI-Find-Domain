# Find My Domain 🔍

**AI-Powered Domain Name Discovery Tool**

Find My Domain is an intelligent command-line tool that generates creative domain name suggestions using OpenAI's GPT models and checks their real-time availability across multiple TLDs. Perfect for startups, developers, and entrepreneurs looking for the perfect domain name.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

---

## ✨ Features

- 🤖 **AI-Powered Generation** - Uses OpenAI GPT models to generate creative, brandable domain names
- 🔍 **Real-Time Availability Check** - Instantly verifies domain availability via WHOIS lookup
- 💰 **Sale Detection** - Identifies domains that are available for purchase
- 🌐 **Multiple TLD Support** - Check .com, .io, .dev, .ai, and more simultaneously
- 📝 **Smart Input Options** - Generate domains from example names, keywords, or both
- ⚙️ **Flexible Configuration** - Use JSON config files or command-line arguments
- 📊 **Structured Output** - Export results to JSON with detailed statistics
- 🎯 **Custom Prompts** - Fully customizable AI prompt templates
- 🚀 **Fast & Efficient** - Optimized for bulk domain searches
- 💻 **CLI & Programmatic API** - Use as a command-line tool or integrate into your Node.js projects

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **OpenAI API Key** - Get one at [platform.openai.com](https://platform.openai.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/find-my-domain.git
cd find-my-domain

# Install dependencies
npm install
# or
pnpm install
```

### Setup

1. **Create your environment file**

```bash
# Copy the example env file
cp .env.example .env
```

2. **Add your OpenAI API key to `.env`**

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

3. **Create your configuration file**

```bash
# Copy the example config
cp input.example.json input.json
```

4. **Edit `input.json` with your preferences**

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

5. **Run the tool**

```bash
npm start
```

That's it! 🎉 Results will be saved in the `output/` directory.

---

## 📖 Usage

### Command Line Interface

#### Basic Usage

```bash
# Use default configuration from input.json
npm start

# Or use the explicit commands
npm run find
npm run dev
```

#### With CLI Arguments

Override `input.json` settings with command-line arguments:

```bash
# Generate 10 domains with specific model
npm start -- --count 10 --model gpt-4o-mini

# Check specific TLDs
npm start -- --tlds com io dev --count 15 --model gpt-4o-mini

# Use keywords to inspire generation
npm start -- --keywords startup tech saas --count 20 --model gpt-4o-mini

# Use example domains for inspiration
npm start -- --domains stripe vercel --count 15 --model gpt-4o-mini

# Combine keywords and domains
npm start -- --domains google netflix --keywords social media --count 25 --model gpt-4o

# Custom output directory
npm start -- --directory my-results --count 10 --model gpt-4o-mini

# Use custom input file
npm start -- --input custom-config.json
```

#### Full CLI Options

| Option        | Alias | Type   | Description                     | Example                   |
| ------------- | ----- | ------ | ------------------------------- | ------------------------- |
| `--count`     | `-c`  | number | Number of domains to generate   | `--count 25`              |
| `--model`     | `-m`  | string | OpenAI model to use             | `--model gpt-4o`          |
| `--tlds`      | `-t`  | array  | TLDs to check                   | `--tlds com io dev`       |
| `--domains`   |       | array  | Example domains for inspiration | `--domains stripe vercel` |
| `--keywords`  | `-k`  | array  | Keywords to incorporate         | `--keywords fast modern`  |
| `--directory` | `-d`  | string | Output directory                | `--directory results`     |
| `--input`     | `-i`  | string | Input JSON config file          | `--input config.json`     |
| `--help`      | `-h`  |        | Show help message               | `--help`                  |

---

## ⚙️ Configuration

### Input Configuration File

Create an `input.json` file to define your preferences:

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

#### Configuration Options

| Field       | Type     | Required | Default    | Description                                  |
| ----------- | -------- | -------- | ---------- | -------------------------------------------- |
| `directory` | string   | No       | `"output"` | Output directory for results                 |
| `tlds`      | string[] | No       | `["com"]`  | Top-level domains to check                   |
| `domains`   | string[] | No       | `[]`       | Example domains to inspire variations        |
| `keywords`  | string[] | No       | `[]`       | Keywords to incorporate into names           |
| `count`     | number   | Yes      | -          | Number of domain names to generate           |
| `model`     | string   | Yes      | -          | OpenAI model (e.g., `gpt-4o-mini`, `gpt-4o`) |

### Prompt Template

Customize how the AI generates domains by editing `prompt.txt`:

```text
Generate {COUNT} creative, memorable, SHORT and NICE domain names.

Focus on creating names that are:
- Short (ideally under 10 characters)
- Pleasant sounding and catchy
- Easy to remember and type

Create variations SIMILAR to these domain names: {DOMAINS}

Based on these keywords: {KEYWORDS}

IMPORTANT: Return ONLY the name part WITHOUT any TLD extensions.
```

**Placeholders:**

- `{COUNT}` - Number of domains to generate
- `{DOMAINS}` - Comma-separated list of example domains
- `{KEYWORDS}` - Comma-separated list of keywords

---

## 📊 Output Format

Results are saved to `<directory>/output.json`:

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
  "generated": ["swiftpay", "rapidhub", "quickbase"],
  "results": {
    "available": ["swiftpay.com", "rapidhub.io"],
    "sale": ["quickbase.com"],
    "taken": ["swiftpay.io"]
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

## 🎯 Use Cases

### 1. **Startup Founders**

Find a unique, memorable domain for your new venture:

```bash
npm start -- --keywords saas productivity automation \
  --tlds com io --count 30 --model gpt-4o-mini
```

### 2. **Brand Agencies**

Generate brandable names for clients:

```bash
npm start -- --keywords luxury premium boutique \
  --tlds com --count 50 --model gpt-4o
```

### 3. **Domain Investors**

Discover available premium domains:

```bash
npm start -- --domains google stripe amazon \
  --tlds com net org --count 100 --model gpt-4o
```

### 4. **Side Project Ideas**

Quick domain check for your next project:

```bash
npm start -- --keywords ai tool developer \
  --tlds dev ai --count 15 --model gpt-4o-mini
```

---

## 🤖 Supported AI Models

| Model         | Speed  | Cost   | Quality    | Best For                            |
| ------------- | ------ | ------ | ---------- | ----------------------------------- |
| `gpt-4o-mini` | ⚡⚡⚡ | 💰     | ⭐⭐⭐     | Quick searches, testing             |
| `gpt-4o`      | ⚡⚡   | 💰💰   | ⭐⭐⭐⭐⭐ | Premium results, important searches |
| `gpt-4-turbo` | ⚡⚡   | 💰💰💰 | ⭐⭐⭐⭐⭐ | High-quality, creative names        |

---

## 📝 Examples

### Example 1: Tech Startup

**Input:**

```json
{
  "keywords": ["tech", "startup", "innovation", "platform"],
  "tlds": ["io", "dev", "ai"],
  "count": 20,
  "model": "gpt-4o-mini"
}
```

**Sample Output:**

- ✅ `techvault.io`
- ✅ `innovhub.dev`
- 💰 `platforma.ai`
- ❌ `startup.io`

### Example 2: E-commerce Brand

**Input:**

```json
{
  "domains": ["shopify", "etsy", "amazon"],
  "keywords": ["shop", "store", "market"],
  "tlds": ["com"],
  "count": 25,
  "model": "gpt-4o"
}
```

**Sample Output:**

- ✅ `shopwise.com`
- ✅ `marketly.com`
- 💰 `storehub.com`

### Example 3: Developer Tools

**Input:**

```bash
npm start -- --domains github vercel netlify \
  --keywords code deploy fast \
  --tlds dev io --count 15 --model gpt-4o-mini
```

**Sample Output:**

- ✅ `codefast.dev`
- ✅ `deployly.io`
- ❌ `github.dev`

---

## 🛠️ Development

### Project Structure

```
find-my-domain/
├── src/
│   ├── index.ts          # Main application entry point
│   └── utils/
│       ├── ai.ts         # AI domain generation logic
│       ├── whois.ts      # Domain availability checker
│       └── wait.ts       # Rate limiting utility
├── test/
│   └── index.test.ts     # Unit tests
├── input.json            # Your configuration (gitignored)
├── input.example.json    # Example configuration
├── prompt.txt            # Your AI prompt template (gitignored)
├── prompt.example.txt    # Example prompt template
├── output/               # Results directory (gitignored)
├── .env                  # Environment variables (gitignored)
└── package.json
```

### Available Scripts

```bash
# Run the application
npm start
npm run dev
npm run find

# Development
npm run typecheck      # Type checking
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting

# Testing
npm test              # Run tests
npm run test:watch    # Watch mode

# Build
npm run build         # Build for production
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Type checking
npm run typecheck
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "OPENAI_API_KEY is required" Error

**Solution:** Make sure you've created a `.env` file with your API key:

```bash
echo "OPENAI_API_KEY=sk-your-key-here" > .env
```

#### 2. WHOIS Rate Limiting

If you're checking many domains, you might hit rate limits. The tool includes automatic delays, but you can:

- Reduce the number of TLDs
- Check fewer domains at once
- Increase the delay in `src/utils/wait.ts`

#### 3. "Failed to load prompt template" Error

**Solution:** Create a `prompt.txt` file:

```bash
cp prompt.example.txt prompt.txt
```

#### 4. WHOIS Lookup Failures

Some domains may fail WHOIS lookups due to:

- Server timeouts
- Rate limiting
- Privacy protection

The tool will continue and mark these appropriately.

#### 5. Model Not Found

Make sure you're using a valid OpenAI model name:

- ✅ `gpt-4o-mini`
- ✅ `gpt-4o`
- ✅ `gpt-4-turbo`
- ❌ `gpt-4-mini` (incorrect)

---

## 🔐 Security & Privacy

- **API Keys**: Never commit your `.env` file or `OPENAI_API_KEY` to version control
- **Domain Ideas**: Your `input.json` and `prompt.txt` are gitignored to keep your domain strategies private
- **Results**: Output files are gitignored by default
- **WHOIS Data**: Only checks availability; no personal data is collected

---

## 💡 Tips & Best Practices

### 1. **Start Small**

Begin with a small count (5-10) to test your configuration:

```bash
npm start -- --count 5 --model gpt-4o-mini
```

### 2. **Use Example Domains for Consistency**

If you want variations of a specific style:

```json
{
  "domains": ["stripe", "vercel", "linear"],
  "keywords": [],
  "count": 20
}
```

### 3. **Combine Keywords and Domains**

Get the best of both worlds:

```json
{
  "domains": ["stripe", "square"],
  "keywords": ["pay", "finance", "money"],
  "count": 30
}
```

### 4. **Check Multiple TLDs Strategically**

Popular TLDs to consider:

- **Universal**: `com`, `net`, `org`
- **Tech/Startup**: `io`, `dev`, `ai`, `app`
- **Regional**: `co`, `us`, `uk`
- **New**: `xyz`, `tech`, `online`

### 5. **Use Different Models for Different Needs**

- **Quick Searches**: `gpt-4o-mini` (fast, cheap)
- **Important Searches**: `gpt-4o` (better quality)
- **Creative Naming**: `gpt-4-turbo` (most creative)

### 6. **Customize Your Prompt**

Edit `prompt.txt` to match your brand voice:

```text
Generate {COUNT} professional, enterprise-ready domain names.

Focus on:
- Corporate and trustworthy
- Easy to spell in meetings
- Memorable and authoritative
- Professional tone

Based on: {DOMAINS}
Keywords: {KEYWORDS}
```

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

// Check availability
for (const name of names) {
  const status = await checkDomainStatus(`${name}.com`);
  console.log(`${status.domain}: ${status.available ? "Available" : "Taken"}`);
}
```

### API Reference

#### `generateDomainNames(options)`

Generates domain names using AI.

**Parameters:**

```typescript
interface GenerateDomainNamesOptions {
  domains?: string[]; // Example domains (optional)
  keywords?: string[]; // Keywords (optional)
  count: number; // Number to generate (required)
  apiKey: string; // OpenAI API key (required)
  model: string; // Model name (required)
}
```

**Returns:** `Promise<string[]>`

---

#### `checkDomainStatus(domain)`

Checks domain availability via WHOIS.

**Parameters:**

```typescript
domain: string; // Full domain with TLD (e.g., "example.com")
```

**Returns:**

```typescript
interface DomainStatusResult {
  domain: string;
  available: boolean;
  sale: boolean;
  registrar?: string;
  createdDate?: string;
  expiryDate?: string;
  updatedDate?: string;
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone and install
git clone https://github.com/yourusername/find-my-domain.git
cd find-my-domain
npm install

# Create your config
cp .env.example .env
cp input.example.json input.json
cp prompt.example.txt prompt.txt

# Add your API key to .env
# Edit input.json with your preferences

# Run in development mode
npm run dev

# Run tests
npm test

# Lint and format
npm run lint:fix
npm run format
```

---

## 📄 License

MIT © [Dmitrii Selikhov](https://github.com/idimetrix)

---

## 🙏 Acknowledgments

- **OpenAI** - For powerful GPT models
- **whoiser** - For WHOIS lookup functionality
- **Vercel AI SDK** - For structured AI outputs

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/find-my-domain/issues)
- **Email**: selikhov.dmitrey@gmail.com
- **LinkedIn**: [dimetrix](https://www.linkedin.com/in/dimetrix)

---

## 🗺️ Roadmap

- [ ] Add support for additional WHOIS providers
- [ ] Implement domain scoring/ranking system
- [ ] Add web interface
- [ ] Support for bulk CSV import/export
- [ ] Domain price estimation
- [ ] Integration with domain registrars
- [ ] Historical availability tracking
- [ ] Social media handle availability check

---

**Made with ❤️ by developers, for developers**
