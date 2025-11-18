# Web App Setup Guide

## Environment Variables

The web app requires **OpenAI API key** for AI-powered domain generation and **Clerk authentication keys** for user authentication and rate limiting.

### Step 1: Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-`)

### Step 2: Get Clerk Authentication Keys

1. Go to https://clerk.com/
2. Sign up or log in
3. Create a new application
4. Navigate to **API Keys** section in your dashboard
5. Copy your **Publishable Key** (starts with `pk_`)
6. Copy your **Secret Key** (starts with `sk_`)

### Step 3: Configure Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```bash
cd apps/web
```

Create `.env.local` with the following:

```env
# OpenAI API key for domain generation
OPENAI_API_KEY=sk-your-actual-openai-key-here

# Clerk authentication keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key-here
CLERK_SECRET_KEY=sk_test_your-secret-key-here
```

### Step 4: Restart Development Server

```bash
# From monorepo root
pnpm dev

# Or from apps/web
pnpm dev
```

## Features

With the environment variables configured, the demo page will:

- ✅ **User Authentication** using Clerk (sign in/sign up)
- ✅ **Rate Limiting** - 5 free generations per user
- ✅ **Generate real domain names** using OpenAI API
- ✅ **Check real availability** using WHOIS lookup
- ✅ **Show live progress** during generation and checking
- ✅ **Display actual results** with available/taken/sale status
- ✅ **Track remaining attempts** per user (stored in Clerk metadata)

## Authentication & Rate Limiting

The demo requires users to sign in to prevent abuse. Each user gets **5 free domain generations**. The attempt counter is stored in Clerk's user metadata (no database required).

### How It Works

1. User signs in with Clerk (email, Google, GitHub, etc.)
2. User metadata tracks remaining attempts (starts at 5)
3. Each generation decrements the counter
4. When attempts reach 0, user cannot generate more domains
5. Progress bar shows remaining attempts

### Without API Keys

If the `OPENAI_API_KEY` is not set, the demo will show an error message. If Clerk keys are not set, users will see authentication errors.

## Security Notes

### OpenAI API Key

- **Never commit** `.env.local` to version control (it's in `.gitignore`)
- **Keep your API key secret** - it's like a password
- **Monitor usage** at https://platform.openai.com/usage
- **Set spending limits** in your OpenAI account settings

### Clerk Keys

- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** - Safe to expose in browser (public)
- **CLERK_SECRET_KEY** - Must be kept secret (server-side only)
- **Monitor authentication** at https://dashboard.clerk.com/
- **Configure sign-in methods** in Clerk dashboard (email, social logins, etc.)

## Cost

Using gpt-4o-mini (default model):
- **Input**: $0.15 per 1M tokens
- **Output**: $0.60 per 1M tokens
- **Typical demo**: 10 domains = ~$0.001

Very affordable for demo purposes!

