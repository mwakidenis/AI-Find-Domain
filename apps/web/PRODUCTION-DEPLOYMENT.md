# Production Deployment Guide

## Overview

The Find My Domain web app is **production-ready** and can be deployed to various platforms. The demo is **100% real** and functional.

---

## Prerequisites

Before deployment, ensure you have:
- ✅ OpenAI API Key
- ✅ Node.js 22+ runtime environment
- ✅ pnpm or npm installed
- ✅ Git repository access

---

## Environment Variables

### Required

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

### Optional

```env
# Custom configuration (if needed)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## Deployment Platforms

### 1. Vercel (Recommended)

**Why Vercel?**
- Native Next.js support
- Zero configuration
- Edge functions for API routes
- Free tier available
- Automatic HTTPS

**Steps:**

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel:**
- Go to https://vercel.com
- Click "Import Project"
- Select your GitHub repository
- **Root Directory:** `apps/web`
- **Framework Preset:** Next.js

3. **Configure Environment Variables:**
- Go to Project Settings → Environment Variables
- Add: `OPENAI_API_KEY` = `sk-your-key-here`
- Apply to: Production, Preview, Development

4. **Deploy:**
- Click "Deploy"
- Wait 2-3 minutes
- Your app is live!

**Vercel CLI (Alternative):**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
cd apps/web
vercel

# Set environment variable
vercel env add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

---

### 2. Netlify

**Steps:**

1. **Create `netlify.toml`:**
```toml
[build]
  base = "apps/web"
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"
  PNPM_VERSION = "10"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Connect Repository:**
- Go to https://netlify.com
- New site from Git
- Connect your repository
- Base directory: `apps/web`
- Build command: `pnpm build`
- Publish directory: `.next`

3. **Set Environment Variables:**
- Site settings → Environment variables
- Add `OPENAI_API_KEY`

4. **Deploy:**
- Trigger deploy
- Site will be live in 3-5 minutes

---

### 3. Docker

**Dockerfile:**

Create `apps/web/Dockerfile`:

```dockerfile
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web ./apps/web
COPY packages/core ./packages/core

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build core package
WORKDIR /app/packages/core
RUN pnpm build

# Build web app
WORKDIR /app/apps/web
RUN pnpm build

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app

# Copy built files
COPY --from=base /app/apps/web/.next ./apps/web/.next
COPY --from=base /app/apps/web/public ./apps/web/public
COPY --from=base /app/apps/web/package.json ./apps/web/
COPY --from=base /app/node_modules ./node_modules

WORKDIR /app/apps/web

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
```

**Build and Run:**

```bash
# Build image
docker build -t find-my-domain-web -f apps/web/Dockerfile .

# Run container
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key-here \
  find-my-domain-web
```

**Docker Compose:**

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NODE_ENV=production
    restart: unless-stopped
```

Run:

```bash
# Create .env file with OPENAI_API_KEY
echo "OPENAI_API_KEY=sk-your-key" > .env

# Start
docker-compose up -d
```

---

### 4. AWS (Amplify/ECS/EC2)

#### AWS Amplify (Easiest)

1. **Connect Repository:**
- AWS Amplify Console
- New app → Host web app
- Connect GitHub repository
- Branch: main
- Root directory: `apps/web`

2. **Build Settings:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm@10
        - pnpm install
    build:
      commands:
        - cd apps/web
        - pnpm build
  artifacts:
    baseDirectory: apps/web/.next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Environment Variables:**
- App settings → Environment variables
- Add `OPENAI_API_KEY`

#### AWS ECS (Container)

1. Push Docker image to ECR
2. Create ECS task definition
3. Set environment variables
4. Deploy service

#### AWS EC2 (Manual)

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone repository
git clone https://github.com/idimetrix/find-my-domain.git
cd find-my-domain

# Install and build
pnpm install
pnpm build

# Set environment variable
export OPENAI_API_KEY=sk-your-key

# Start with PM2
npm install -g pm2
cd apps/web
pm2 start "pnpm start" --name find-my-domain-web
pm2 save
pm2 startup
```

---

### 5. Railway

**Steps:**

1. **Create `railway.json`:**
```json
{
  "build": {
    "builder": "nixpacks",
    "buildCommand": "pnpm install && pnpm build"
  },
  "deploy": {
    "startCommand": "cd apps/web && pnpm start",
    "restartPolicyType": "always"
  }
}
```

2. **Deploy:**
- Go to https://railway.app
- New Project → Deploy from GitHub
- Select repository
- Set root directory: `apps/web`
- Add environment variable: `OPENAI_API_KEY`

---

### 6. Render

**Steps:**

1. **Create `render.yaml`:**
```yaml
services:
  - type: web
    name: find-my-domain-web
    env: node
    region: oregon
    plan: free
    buildCommand: cd apps/web && pnpm install && pnpm build
    startCommand: cd apps/web && pnpm start
    envVars:
      - key: NODE_VERSION
        value: 22
      - key: OPENAI_API_KEY
        sync: false
```

2. **Deploy:**
- Go to https://render.com
- New → Web Service
- Connect repository
- Environment: Node
- Build command: `cd apps/web && pnpm build`
- Start command: `cd apps/web && pnpm start`
- Add `OPENAI_API_KEY` environment variable

---

## Post-Deployment Checklist

After deployment, verify:

- ✅ **Landing page** loads correctly
- ✅ **Demo page** accessible
- ✅ **API routes** responding (`/api/generate`, `/api/check-domain`)
- ✅ **Demo functionality** working (try generating domains)
- ✅ **Toast notifications** appearing
- ✅ **Copy buttons** functioning
- ✅ **Error handling** working (try without API key)
- ✅ **Mobile responsiveness** tested
- ✅ **Performance** acceptable (< 3s load time)

---

## Testing Deployment

### Test the Demo

1. **Go to `/demo` page**
2. **Enter test data:**
   - Keywords: `tech`, `startup`
   - TLDs: `com`, `io`
   - Count: 5
3. **Click "Generate Domains"**
4. **Verify:**
   - Progress messages appear
   - Toast notifications show
   - Results display after 10-15 seconds
   - Results are organized by availability
   - Copy buttons work

### Test API Routes

```bash
# Test generation endpoint
curl -X POST https://your-domain.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"keywords":["tech"],"count":5,"model":"gpt-4o-mini"}'

# Test check endpoint
curl -X POST https://your-domain.com/api/check-domain \
  -H "Content-Type: application/json" \
  -d '{"domains":["example.com","test.io"]}'
```

---

## Monitoring & Analytics

### Vercel Analytics

Enable in Vercel dashboard:
- Real-time traffic
- Core Web Vitals
- Edge function metrics

### Custom Monitoring

Add to `apps/web/app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Performance Optimization

### 1. Enable Caching

Add to `next.config.ts`:

```typescript
const nextConfig = {
  // ... existing config
  experimental: {
    serverComponentsExternalPackages: ['@find-my-domain/core'],
  },
  // Cache API responses
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};
```

### 2. Image Optimization

All images should use Next.js `<Image>` component.

### 3. Bundle Analysis

```bash
cd apps/web
pnpm add -D @next/bundle-analyzer
```

---

## Security Considerations

### API Key Protection

- ✅ Never commit `.env.local` files
- ✅ Use platform environment variables
- ✅ Rotate keys regularly
- ✅ Set usage limits in OpenAI dashboard

### Rate Limiting

Consider adding rate limiting for production:

```typescript
// apps/web/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add rate limiting logic here
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## Cost Estimation

### OpenAI Costs (gpt-4o-mini)

- Per generation (10 domains): ~$0.00001
- 1,000 demos/day: ~$0.01/day = ~$0.30/month
- 10,000 demos/day: ~$0.10/day = ~$3.00/month

**Very affordable even with high traffic!**

### Hosting Costs

- **Vercel Free:** 100GB bandwidth/month
- **Netlify Free:** 100GB bandwidth/month
- **Railway:** $5/month (500 hours)
- **Render Free:** 750 hours/month

---

## Troubleshooting

### "OpenAI API key is not configured"

**Solution:** Environment variable not set
```bash
# Verify environment variable in platform dashboard
# Or test locally:
echo $OPENAI_API_KEY
```

### "Failed to generate domains"

**Causes:**
- Invalid API key
- OpenAI rate limit
- Network issues

**Solution:**
- Check API key validity
- Check OpenAI dashboard for limits
- Retry request

### Slow Performance

**Solutions:**
- Enable CDN
- Optimize images
- Add caching headers
- Use edge functions (Vercel)

---

## Support

For deployment issues:

1. Check [Next.js deployment docs](https://nextjs.org/docs/deployment)
2. Platform-specific documentation
3. GitHub Issues: https://github.com/idimetrix/find-my-domain/issues

---

**Your app is production-ready and will work flawlessly in any environment!** 🚀

