# Find My Domain - Quick Start Guide

Get started with Find My Domain in under 5 minutes! 🚀

---

## ⚡ Fastest Way (npx - No Installation)

```bash
# 1. Set your API key
export OPENAI_API_KEY=sk-your-key-here

# 2. Run it!
npx find-my-domain --keywords tech startup --count 10

# Done! ✨
```

That's it! Results will be displayed in your terminal and saved to `output/output.json`.

---

## 🎯 Common Use Cases

### Startup Launch

```bash
npx find-my-domain \
  --keywords saas cloud platform \
  --domains stripe vercel \
  --tlds com io \
  --count 30
```

### Side Project

```bash
npx find-my-domain \
  --keywords your project idea \
  --tlds com dev \
  --count 20
```

### E-commerce

```bash
npx find-my-domain \
  --keywords shop store marketplace \
  --tlds com shop store \
  --count 25
```

### AI/Tech Startup

```bash
npx find-my-domain \
  --keywords ai machine learning \
  --tlds ai io dev \
  --count 40 \
  --model gpt-4o
```

---

## 📦 Installation (Optional)

### Global Installation

```bash
# Using npm
npm install -g find-my-domain

# Using pnpm (faster)
pnpm add -g find-my-domain

# Using yarn
yarn global add find-my-domain

# Verify
find-my-domain --version
```

### Once Installed

```bash
# Use directly
find-my-domain --keywords your ideas --count 10
```

---

## ⚙️ Configuration Methods

### Method 1: CLI Arguments (Quick & Easy)

```bash
find-my-domain \
  --api-key sk-xxx \
  --keywords tech startup \
  --count 20 \
  --tlds com io
```

### Method 2: Environment Variables (Secure)

```bash
# Create .env file
cat > .env << EOF
OPENAI_API_KEY=sk-your-key-here
FMD_KEYWORDS=tech,startup,innovation
FMD_COUNT=20
FMD_TLDS=com,io,dev
EOF

# Run
find-my-domain
```

### Method 3: JSON Config (Team-Friendly)

```bash
# Create input.json
cat > input.json << 'EOF'
{
  "apiKey": "sk-your-key-here",
  "keywords": ["tech", "startup"],
  "count": 20,
  "tlds": ["com", "io", "dev"]
}
EOF

# Run
find-my-domain --input input.json
```

---

## 🎨 Customization

### Custom Prompt

```bash
find-my-domain \
  --prompt "Generate {COUNT} short, memorable domain names for {KEYWORDS}" \
  --keywords fintech banking \
  --count 15
```

### Prompt File

```bash
# Create prompt.txt
cat > prompt.txt << 'EOF'
Generate {COUNT} creative domain names for a {KEYWORDS} business.
Focus on:
- Short (5-10 characters)
- Memorable
- Easy to spell
- Brandable
EOF

# Use it
find-my-domain --prompt-file prompt.txt --keywords saas --count 25
```

### Different AI Models

```bash
# Fast & cheap (default)
find-my-domain --model gpt-4o-mini --keywords tech --count 20

# Best quality
find-my-domain --model gpt-4o --keywords premium brand --count 10

# Premium
find-my-domain --model gpt-4-turbo --keywords enterprise --count 15
```

---

## 📊 Understanding Output

### Console Output

```
🔍 FIND MY DOMAIN - AI-Powered Domain Generator

✅ Generated 10 domain names
🔍 Checking availability...

📍 .com domains:
✅ AVAILABLE - techflow.com
💰 SALE - rapidhub.com
❌ TAKEN - cloudly.com

📊 SUMMARY
✅ AVAILABLE: 3
💰 SALE: 1
❌ TAKEN: 6

💾 Saved to: output/output.json
```

### JSON Output (`output/output.json`)

```json
{
  "timestamp": "2025-11-19T10:30:00.000Z",
  "config": {
    "keywords": ["tech", "startup"],
    "count": 10,
    "tlds": ["com", "io"]
  },
  "generated": ["techflow", "rapidhub", "cloudly"],
  "results": {
    "available": ["techflow.com", "rapidhub.io"],
    "sale": ["cloudly.com"],
    "taken": ["techflow.io"]
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

## 🎓 Tips & Tricks

### Tip 1: Use Multiple Keywords

```bash
# More keywords = better results
find-my-domain --keywords ai ml data science automation --count 30
```

### Tip 2: Provide Example Domains

```bash
# AI learns from successful brands
find-my-domain --domains stripe vercel linear notion --count 25
```

### Tip 3: Check Premium TLDs

```bash
# .io, .ai, .dev often have more availability
find-my-domain --tlds io ai dev app --count 30
```

### Tip 4: Increase Count for Better Results

```bash
# Generate more, pick the best
find-my-domain --keywords your niche --count 50
```

### Tip 5: Save Cost with gpt-4o-mini

```bash
# Default model is already cost-effective
# ~$0.0001 per 10 domains
find-my-domain --model gpt-4o-mini --keywords tech --count 100
```

---

## 🐛 Troubleshooting

### "OPENAI_API_KEY is required"

```bash
# Solution: Set API key
export OPENAI_API_KEY=sk-your-key-here

# Or create .env file
echo "OPENAI_API_KEY=sk-your-key" > .env
```

### "Command not found: find-my-domain"

```bash
# Solution 1: Use npx (no installation)
npx find-my-domain --keywords test

# Solution 2: Install globally
npm install -g find-my-domain
```

### "No available domains found"

```bash
# Solution 1: Increase count
find-my-domain --keywords your niche --count 50

# Solution 2: Try different TLDs
find-my-domain --tlds io dev ai app --count 30

# Solution 3: Be more specific
find-my-domain --keywords very specific niche keywords --count 40
```

### "Rate limiting errors"

```bash
# Solution: Check fewer TLDs at once
find-my-domain --tlds com --count 20

# WHOIS has rate limits (~50 queries/minute)
```

---

## 📚 Next Steps

### Learn More

- **Full Documentation**: [apps/cli/README.md](apps/cli/README.md)
- **CLI Usage Guide**: [apps/cli/CLI-USAGE.md](apps/cli/CLI-USAGE.md)
- **Web Demo**: https://find-my-domain-web.vercel.app/demo
- **API Documentation**: [packages/core/README.md](packages/core/README.md)

### Use as Library

```typescript
import { generateDomainNames, checkDomainStatus } from "find-my-domain";

const names = await generateDomainNames({
  keywords: ["tech", "startup"],
  count: 10,
  apiKey: process.env.OPENAI_API_KEY!,
});

for (const name of names) {
  const status = await checkDomainStatus(`${name}.com`);
  if (status.available) {
    console.log(`✅ ${name}.com is available!`);
  }
}
```

### Try the Web App

```bash
# Clone and run locally
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain
pnpm install
pnpm dev

# Visit http://localhost:3000/demo
```

---

## 🌟 Examples Gallery

### Minimal

```bash
find-my-domain --keywords tech
```

### Standard

```bash
find-my-domain --keywords tech startup --tlds com io --count 20
```

### Advanced

```bash
find-my-domain \
  --keywords cloud developer platform \
  --domains github gitlab vercel \
  --tlds com io dev \
  --count 50 \
  --model gpt-4o \
  --directory my-domains
```

### Pro

```bash
# Custom prompt + multiple sources
find-my-domain \
  --prompt-file custom-prompt.txt \
  --keywords fintech blockchain defi \
  --domains coinbase binance \
  --tlds com io ai \
  --count 100 \
  --model gpt-4o \
  --directory fintech-domains
```

---

## 💡 Pro Tips

1. **Start Small**: Test with 10 domains first
2. **Use Examples**: Provide competitor domains for better results
3. **Multiple TLDs**: Check .io, .dev, .ai for more availability
4. **Save Costs**: Use gpt-4o-mini (default) for volume
5. **Custom Prompts**: Fine-tune for your specific needs
6. **JSON Output**: Process results programmatically
7. **Environment Vars**: Keep API keys secure
8. **Batch Jobs**: Generate 100+ domains for comprehensive search

---

## 🎯 Cost Estimate

| Model        | 10 domains | 100 domains | 1000 domains |
|--------------|------------|-------------|--------------|
| gpt-4o-mini  | ~$0.0001   | ~$0.001     | ~$0.01       |
| gpt-4o       | ~$0.001    | ~$0.01      | ~$0.10       |
| gpt-4-turbo  | ~$0.002    | ~$0.02      | ~$0.20       |

*WHOIS lookups are free but rate-limited*

---

## ❓ FAQ

**Q: Do I need an API key?**  
A: Yes, get one free at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

**Q: How much does it cost?**  
A: ~$0.0001 per 10 domains with gpt-4o-mini (default)

**Q: Can I use without installing?**  
A: Yes! Use `npx find-my-domain`

**Q: Does it check actual availability?**  
A: Yes, real-time WHOIS lookups

**Q: Can I check multiple TLDs?**  
A: Yes, use `--tlds com io dev ai`

---

## 📞 Need Help?

- **Issues**: [GitHub Issues](https://github.com/idimetrix/find-my-domain/issues)
- **Questions**: [GitHub Discussions](https://github.com/idimetrix/find-my-domain/discussions)
- **Email**: [selikhov.dmitrey@gmail.com](mailto:selikhov.dmitrey@gmail.com)

---

**Happy Domain Hunting! 🚀**

*Find your perfect domain in minutes, not hours!*

