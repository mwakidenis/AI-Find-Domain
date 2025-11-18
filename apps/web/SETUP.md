# Web App Setup Guide

## Environment Variables

The web app requires an OpenAI API key to enable the **real AI-powered demo**.

### Step 1: Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-`)

### Step 2: Configure Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```bash
cd apps/web
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

### Step 3: Restart Development Server

```bash
# From monorepo root
pnpm dev

# Or from apps/web
pnpm dev
```

## Features

With the environment variable configured, the demo page will:

- ✅ **Generate real domain names** using OpenAI API
- ✅ **Check real availability** using WHOIS lookup
- ✅ **Show live progress** during generation and checking
- ✅ **Display actual results** with available/taken/sale status

## Without API Key

If the `OPENAI_API_KEY` is not set, the demo will show an error message asking users to configure it or use the CLI tool instead.

## Security Notes

- **Never commit** `.env.local` to version control (it's in `.gitignore`)
- **Keep your API key secret** - it's like a password
- **Monitor usage** at https://platform.openai.com/usage
- **Set spending limits** in your OpenAI account settings

## Cost

Using gpt-4o-mini (default model):
- **Input**: $0.15 per 1M tokens
- **Output**: $0.60 per 1M tokens
- **Typical demo**: 10 domains = ~$0.001

Very affordable for demo purposes!

