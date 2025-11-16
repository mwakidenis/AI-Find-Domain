# 100% CLI Usage Guide

`find-my-domain` can now work completely from the command line without requiring any configuration files!

---

## 🚀 Quick Start - Pure CLI

No files needed! Just use command-line arguments:

```bash
ppnpm start -- \
  --api-key sk-your-key-here \
  --keywords tech startup ai \
  --count 10 \
  --model gpt-4o-mini \
  --tlds com io \
  --no-save
```

This will:

- ✅ Use your API key from CLI (no `.env` needed)
- ✅ Generate 10 domain names
- ✅ Check .com and .io TLDs
- ✅ Display results in console
- ✅ Skip saving to file

---

## 📋 All CLI Options

### Core Options

| Option       | Alias | Type   | Description                   | Example                   |
| ------------ | ----- | ------ | ----------------------------- | ------------------------- |
| `--api-key`  | `-a`  | string | OpenAI API key                | `--api-key sk-xxx`        |
| `--count`    | `-c`  | number | Number of domains to generate | `--count 20`              |
| `--model`    | `-m`  | string | AI model to use               | `--model gpt-4o`          |
| `--keywords` | `-k`  | array  | Keywords for generation       | `--keywords tech ai`      |
| `--domains`  |       | array  | Example domains               | `--domains stripe vercel` |
| `--tlds`     | `-t`  | array  | TLDs to check                 | `--tlds com io dev`       |

### Advanced Options

| Option          | Alias | Type    | Description                          | Example                             |
| --------------- | ----- | ------- | ------------------------------------ | ----------------------------------- |
| `--prompt`      | `-p`  | string  | Inline custom prompt                 | `--prompt "Generate {COUNT} names"` |
| `--prompt-file` |       | string  | Path to prompt file                  | `--prompt-file my-prompt.txt`       |
| `--save`        |       | boolean | Save results to file (default: true) | `--no-save` for console only        |
| `--stream`      | `-s`  | boolean | Streaming mode (default: true)       | `--no-stream` for batch mode        |
| `--directory`   | `-d`  | string  | Output directory                     | `--directory results`               |
| `--input`       | `-i`  | string  | Input JSON file (optional)           | `--input config.json`               |

---

## 💡 Usage Examples

### Example 1: Minimal CLI Usage

Generate domains with just keywords (no files required):

```bash
pnpm start -- \
  --api-key $OPENAI_API_KEY \
  --keywords startup tech saas \
  --count 5 \
  --no-save
```

**Output**: Console only, no files created

---

### Example 2: Full CLI Configuration

Everything via command line:

```bash
pnpm start -- \
  --api-key sk-xxx \
  --keywords ai machine learning \
  --domains openai anthropic \
  --count 15 \
  --model gpt-4o-mini \
  --tlds com io ai \
  --directory my-results
```

**Output**: Saved to `my-results/output.json`

---

### Example 3: Custom Inline Prompt

Use a custom prompt without creating a file:

```bash
pnpm start -- \
  --api-key sk-xxx \
  --prompt "Generate {COUNT} short, catchy domain names for a {KEYWORDS} startup. Similar to: {DOMAINS}" \
  --keywords crypto blockchain \
  --domains coinbase binance \
  --count 10 \
  --tlds com \
  --no-save
```

**Output**: Uses your custom prompt template

---

### Example 4: Using Environment Variable for API Key

Set the API key once:

```bash
export OPENAI_API_KEY=sk-your-key-here

# Now you can omit --api-key
pnpm start -- \
  --keywords tech startup \
  --count 10 \
  --tlds com io \
  --no-save
```

---

### Example 5: Quick Search (Minimal)

Absolute minimum command:

```bash
# Requires OPENAI_API_KEY environment variable
pnpm start -- --keywords tech --count 5 --no-save
```

Uses defaults:

- Model: `gpt-4o-mini`
- TLDs: `com`
- Built-in prompt template

---

### Example 6: Custom Prompt File

Use a custom prompt template file:

```bash
pnpm start -- \
  --prompt-file my-custom-prompt.txt \
  --keywords ai tools \
  --count 15 \
  --tlds dev io
```

---

### Example 7: Hybrid Approach

Use input.json for base config, override with CLI:

```bash
# input.json has your base settings
pnpm start -- --count 50 --model gpt-4o
```

---

### Example 8: Streaming Mode (Default)

Real-time domain checking as AI generates names:

```bash
# Streaming mode (default) - see results in 2-3 seconds!
pnpm start -- \
  --keywords tech startup \
  --count 10 \
  --tlds com io
```

**Benefits:**

- ⚡ Instant feedback as each domain is generated
- 🔍 Check availability immediately
- ✨ Better user experience for interactive use

---

### Example 9: Batch Mode

Generate all names first, then check them:

```bash
# Batch mode - generate all, then check
pnpm start -- \
  --keywords tech startup \
  --count 10 \
  --tlds com io \
  --no-stream
```

**Benefits:**

- 📋 See all generated names before checking
- 📊 Progress counter shows completion [X/Y]
- 🤖 Good for automation and batch processing

---

## 🔄 Fallback Hierarchy

The tool uses this priority order:

1. **CLI arguments** (highest priority)
2. **Input JSON file** (if specified with `--input`)
3. **Default input.json** (if exists)
4. **Built-in defaults** (lowest priority)

---

## 📝 Prompt Template Placeholders

When using `--prompt` or `--prompt-file`, use these placeholders:

| Placeholder  | Replaced With            | Example          |
| ------------ | ------------------------ | ---------------- |
| `{COUNT}`    | Number of domains        | `10`             |
| `{DOMAINS}`  | Comma-separated domains  | `stripe, vercel` |
| `{KEYWORDS}` | Comma-separated keywords | `tech, startup`  |

**Example Template**:

```text
Generate {COUNT} creative domain names.

Inspired by: {DOMAINS}
Focus on: {KEYWORDS}

Requirements:
- Short and memorable
- Easy to spell
- Professional

Return only domain names without TLDs.
```

---

## 🎯 Pure CLI Workflows

### Workflow 1: Quick Exploration (No Files)

```bash
# Set API key once
export OPENAI_API_KEY=sk-xxx

# Quick searches without creating files
pnpm start -- -k tech -c 5 --no-save
pnpm start -- -k finance -c 5 --no-save
pnpm start -- -k health -c 5 --no-save
```

---

### Workflow 2: Batch Testing Different Models

```bash
export OPENAI_API_KEY=sk-xxx

# Test different models
pnpm start -- -k ai -c 5 -m gpt-4o-mini --no-save
pnpm start -- -k ai -c 5 -m gpt-4o --no-save
pnpm start -- -k ai -c 5 -m chatgpt-4o-latest --no-save
```

---

### Workflow 3: Complete Standalone Usage

No configuration files, no environment setup:

```bash
npx find-my-domain \
  --api-key sk-xxx \
  --keywords "your keywords here" \
  --count 10 \
  --tlds com \
  --no-save
```

Perfect for:

- CI/CD pipelines
- Docker containers
- Serverless functions
- One-off searches

---

## 🔐 API Key Options

### Option 1: Environment Variable (Recommended)

```bash
export OPENAI_API_KEY=sk-xxx
pnpm start -- --keywords tech --count 5
```

### Option 2: .env File

Create `.env`:

```
OPENAI_API_KEY=sk-xxx
```

Then:

```bash
pnpm start -- --keywords tech --count 5
```

### Option 3: CLI Argument

```bash
pnpm start -- --api-key sk-xxx --keywords tech --count 5
```

### Option 4: input.json File

```json
{
  "apiKey": "sk-xxx",
  "keywords": ["tech"],
  "count": 5
}
```

Then:

```bash
pnpm start
```

---

## 🚫 No Files Required!

These files are now **completely optional**:

- ❌ `input.json` - Not required
- ❌ `prompt.txt` - Not required
- ❌ `.env` - Not required (can use `--api-key`)

### Built-in Defaults

If you don't provide a prompt, the tool uses a built-in template:

```text
Generate {COUNT} creative, memorable domain names.

Focus on:
- Short and catchy
- Easy to remember
- Professional

Similar to: {DOMAINS}
Keywords: {KEYWORDS}

Return ONLY the domain name without TLD extensions.
```

---

## 📊 Output Control

### Save to File (Default)

```bash
pnpm start -- --keywords tech --count 5
# Creates: output/output.json
```

### Console Only (No Files)

```bash
pnpm start -- --keywords tech --count 5 --no-save
# No files created
```

### Custom Directory

```bash
pnpm start -- --keywords tech --count 5 --directory my-results
# Creates: my-results/output.json
```

---

## 🎪 Real-World CLI Examples

### Startup Founder

```bash
pnpm start -- \
  --api-key $OPENAI_API_KEY \
  --keywords "productivity saas automation" \
  --domains "asana notion monday" \
  --count 30 \
  --tlds com io \
  --model gpt-4o
```

### Developer Testing

```bash
pnpm start -- \
  --api-key $OPENAI_API_KEY \
  --keywords dev tools ci cd \
  --count 10 \
  --tlds dev sh io \
  --no-save
```

### Domain Investor

```bash
pnpm start -- \
  --api-key $OPENAI_API_KEY \
  --keywords tech ai blockchain \
  --count 100 \
  --tlds com net org \
  --model gpt-4o-mini \
  --directory investments-$(date +%Y%m%d)
```

### Agency Client Work

```bash
pnpm start -- \
  --prompt-file client-brief.txt \
  --domains "competitor1 competitor2" \
  --keywords "luxury premium boutique" \
  --count 50 \
  --tlds com \
  --directory client-proposals \
  --model gpt-4o
```

---

## 🐳 Docker Usage

Run entirely from command line in Docker:

```bash
docker run --rm -e OPENAI_API_KEY=sk-xxx node:22-alpine \
  npx find-my-domain \
  --keywords tech startup \
  --count 5 \
  --tlds com \
  --no-save
```

---

## 🔧 CI/CD Integration

### GitHub Actions Example

```yaml
- name: Generate Domain Names
  run: |
    npx find-my-domain \
      --api-key ${{ secrets.OPENAI_API_KEY }} \
      --keywords ${{ inputs.keywords }} \
      --count 10 \
      --tlds com io \
      --directory results
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

---

## 💡 Tips

1. **Use streaming mode for interactive searches** - Get real-time results (default behavior)
2. **Use batch mode for automation** - Add `--no-stream` for predictable output
3. **Use `--no-save` for exploration** - Faster, no cleanup needed
4. **Set `OPENAI_API_KEY` env var** - Avoid repeating `--api-key`
5. **Use short aliases** - `-k` for keywords, `-c` for count, `-t` for TLDs, `-s` for stream
6. **Combine with shell scripts** - Loop through different configurations
7. **Pipe output** - Use with `grep`, `awk`, etc. for filtering

---

## 🔗 Combining with Other Tools

### Filter Available Domains

```bash
pnpm start -- -k tech -c 20 --no-save | grep "✅ AVAILABLE"
```

### Save Only Available Domains

```bash
pnpm start -- -k tech -c 20 --no-save | grep "✅ AVAILABLE" > available.txt
```

### Count Available

```bash
pnpm start -- -k tech -c 50 --no-save | grep -c "✅ AVAILABLE"
```

---

## 🎯 Summary

**find-my-domain** is now a **100% CLI-ready tool**:

- ✅ No configuration files required
- ✅ Everything passable via CLI arguments
- ✅ Works in containers, CI/CD, serverless
- ✅ Flexible output control
- ✅ Custom prompts inline or from files
- ✅ API key from env var or CLI

**Try it now**:

```bash
pnpm start -- \
  --api-key sk-xxx \
  --keywords "your idea here" \
  --count 10 \
  --no-save
```

Happy domain hunting! 🚀
