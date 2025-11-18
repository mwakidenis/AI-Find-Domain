# @find-my-domain/web

> **Beautiful Web Showcase for Find My Domain**

Next.js 15 web application featuring a **100% REAL interactive demo** with actual OpenAI generation and WHOIS checking, comprehensive documentation, and stunning UI built with shadcn/ui.

🌐 **[Live Website](https://find-my-domain-web.vercel.app/)** | 🚀 **[Try Demo](https://find-my-domain-web.vercel.app/demo)** | 📖 **[Docs](https://find-my-domain-web.vercel.app/docs)**

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm 10+
- **OpenAI API Key** (for AI domain generation)
- **Clerk Account** (for authentication & rate limiting)

### Setup

1. **Install dependencies** (from monorepo root):

```bash
pnpm install
```

2. **Configure environment variables**:

```bash
cd apps/web
```

3. **Create `.env.local` with required keys**:

```env
# OpenAI API key
OPENAI_API_KEY=sk-your-actual-openai-key-here

# Clerk authentication keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key-here
CLERK_SECRET_KEY=sk_test_your-key-here
```

**Get your keys:**

- OpenAI API: https://platform.openai.com/api-keys
- Clerk Auth: https://dashboard.clerk.com/

### Development

```bash
# From monorepo root
pnpm dev

# Or from this directory
cd apps/web
pnpm dev
```

Visit **http://localhost:3000**

---

## ⚡ Real Interactive Demo

The `/demo` page features a **100% real, fully functional** demo that:

- ✅ **User Authentication** using Clerk (email, Google, GitHub, etc.)
- ✅ **Rate Limiting** - 5 free generations per user (no database!)
- ✅ **Generates actual domain names** using OpenAI API (gpt-4o-mini)
- ✅ **Checks real availability** via WHOIS lookup
- ✅ **Shows live progress** during generation and checking
- ✅ **Returns actual results** - not mock data!
- ✅ **Displays toast notifications** for better UX
- ✅ **Tracks remaining attempts** per user (stored in Clerk metadata)
- ✅ **Handles errors gracefully** with helpful messages

**Without API Key:** The demo will show an error message guiding users to set up the environment variable or use the CLI tool.

**Cost:** Very affordable! Using gpt-4o-mini, generating 10 domains costs ~$0.001

### Building

```bash
# From monorepo root
pnpm build:web

# Or from this directory
cd apps/web
pnpm build
pnpm start  # Start production server
```

---

## 📁 Project Structure

```
apps/web/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Landing page
│   ├── demo/
│   │   └── page.tsx           # Interactive demo
│   ├── docs/
│   │   └── page.tsx           # Documentation
│   └── globals.css            # Global styles
│
├── components/
│   ├── ui/                    # shadcn/ui components (48 total)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   └── ... (44 more)
│   │
│   ├── landing/               # Landing page components
│   │   ├── header.tsx         # Navigation
│   │   ├── hero.tsx           # Hero section
│   │   ├── features.tsx       # Features grid
│   │   ├── cta.tsx            # Call-to-action
│   │   └── footer.tsx         # Footer
│   │
│   └── demo/                  # Demo page components
│       ├── domain-generator-form.tsx
│       ├── domain-results.tsx
│       └── code-block.tsx
│
├── lib/
│   └── utils.ts               # Utility functions
│
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md                  # This file
```

---

## 🎨 Features

### Landing Page (`/`)

- **Hero Section** - Animated gradient text, CTAs
- **Features Grid** - 8 feature cards with icons
- **Statistics** - Quick stats (Lightning Fast, AI-Powered, CLI & API)
- **Call-to-Action** - Install instructions and GitHub link
- **Footer** - Links, social media, copyright

### Demo Page (`/demo`) - 100% REAL & FUNCTIONAL

- **Interactive Form**
  - Keywords input with tags
  - Example domains input
  - TLD selector (25 popular TLDs)
  - Domain count slider (1-25 domains)
  - Form validation
  - Loading states with progress messages

- **Real API Integration**
  - `/api/generate` - OpenAI domain generation
  - `/api/check-domain` - WHOIS availability checking
  - `/api/attempts` - User rate limiting management (GET/POST/DELETE)
  - Error handling and retry logic
  - Rate limiting (200ms between WHOIS checks, 5 generations per user)

- **Results Display**
  - Tabbed interface (Available/Sale/Taken)
  - Status badges with colors
  - Progress bars for statistics
  - Copy to clipboard
  - Open in Namecheap
  - Scroll areas for long lists
  - Real-time status updates
  - Toast notifications

- **Live Progress**
  - "Generating domain names with AI..."
  - "Generated X names! Checking availability..."
  - "Checking availability for X domains..."
  - Success/error toasts with icons

- **Info Tab**
  - Highlights that demo is 100% real
  - Installation instructions with copy buttons
  - Feature list
  - CLI usage examples

### Documentation Page (`/docs`)

- **Tabbed Navigation**
  - Installation guide
  - CLI usage examples
  - API documentation
  - Real-world examples

- **Interactive Elements**
  - Code blocks with copy button
  - Accordion for examples
  - Badge-based option tags
  - Syntax highlighting

---

## 🎯 Tech Stack

### Framework & Libraries

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.9** - Type safety

### Styling & UI

- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library (55 components)
- **Lucide React** - Icons
- **Framer Motion** - Animations

### Components (shadcn/ui)

**Installed: 55 components**

- **Forms**: Button, Input, Label, Select, Textarea, Switch, Slider, Checkbox, Radio Group
- **Feedback**: Alert, Toast, Sonner, Progress, Skeleton, Badge
- **Navigation**: Tabs, Navigation Menu, Sheet, Breadcrumb, Pagination
- **Layout**: Card, Separator, Scroll Area, Aspect Ratio, Resizable
- **Overlays**: Dialog, Drawer, Popover, Tooltip, Hover Card, Alert Dialog
- **Data**: Table, Accordion, Collapsible, Avatar, Calendar, Carousel
- **Advanced**: Command, Context Menu, Dropdown Menu, Menubar, Form, Chart

---

## 🎨 Design System

### Colors

```css
/* Light mode */
--background: white --foreground: slate-900 --primary: slate-900
  --secondary: slate-100 --accent: slate-100 --muted: slate-100 /* Dark mode */
  --background: slate-900 --foreground: slate-50 --primary: slate-50
  --secondary: slate-800 --accent: slate-800 --muted: slate-800;
```

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, leading-normal
- **Code**: Mono, text-sm

### Spacing

Using Tailwind's spacing scale:

- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

---

## 🔧 Development

### Scripts

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Quality
pnpm lint             # Lint with Next.js ESLint
pnpm typecheck        # Type check with TypeScript

# Cleaning
pnpm clean            # Remove .next/
```

### Adding shadcn/ui Components

```bash
# Add a new component
pnpm dlx shadcn@latest add [component-name]

# Example: Add dialog component
pnpm dlx shadcn@latest add dialog

# List available components
pnpm dlx shadcn@latest add
```

### Environment Variables

Create `.env.local` for local development:

```bash
# Not needed for the web app (uses mock data)
# But useful if you add API routes

# Example:
OPENAI_API_KEY=sk-your-key-here
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
cd apps/web
vercel

# Or connect to Vercel dashboard
# Import: idimetrix/find-my-domain
# Root Directory: apps/web
# Framework: Next.js
```

### Other Platforms

**Netlify:**

```bash
# Build command
cd apps/web && pnpm build

# Publish directory
apps/web/.next
```

**Docker:**

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install && pnpm build:web
WORKDIR /app/apps/web
CMD ["pnpm", "start"]
```

---

## 📊 Performance

### Bundle Sizes

```
Route (app)              Size       First Load JS
┌ ○ /                   3.91 kB    138 kB
├ ○ /demo              15.4 kB     173 kB
└ ○ /docs               3.53 kB    161 kB

+ First Load JS shared  102 kB
```

### Optimizations

- ✅ Static page generation (all pages)
- ✅ Image optimization (Next.js)
- ✅ Font optimization (next/font)
- ✅ Tree shaking (unused code removed)
- ✅ CSS optimization (Tailwind purge)
- ✅ Code splitting (automatic)
- ✅ Lazy loading (shadcn components)

---

## 🎨 Customization

### Adding New Pages

```tsx
// app/pricing/page.tsx
export default function PricingPage() {
  return (
    <div>
      <Header />
      <main>{/* Your content */}</main>
      <Footer />
    </div>
  );
}
```

### Adding New Components

```tsx
// components/ui/custom-component.tsx
import { cn } from "@/lib/utils";

export function CustomComponent({ className, ...props }) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  );
}
```

### Customizing Theme

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add custom colors
    },
  },
}
```

---

## 🧪 Testing

### Component Testing

```bash
# Install testing library
pnpm add -D @testing-library/react @testing-library/jest-dom

# Run tests
pnpm test
```

### E2E Testing

```bash
# Install Playwright
pnpm add -D @playwright/test

# Run E2E tests
pnpm playwright test
```

---

## 📚 Resources

### Documentation

- **Next.js**: https://nextjs.org/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev

### Learning

- **Next.js Learn**: https://nextjs.org/learn
- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 🐛 Troubleshooting

### Common Issues

**"Module not found" errors:**

```bash
# Rebuild from root
cd ../..
pnpm install
pnpm build
```

**Port already in use:**

```bash
# Use different port
pnpm dev -- -p 3001
```

**shadcn components not found:**

```bash
# Reinstall components
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add [component]
```

---

## 📄 License

MIT © [Dmitrii Selikhov](https://github.com/idimetrix)

---

## 🔗 Links

- **Main Repo**: https://github.com/idimetrix/find-my-domain
- **Live Demo**: https://find-my-domain.vercel.app
- **Author**: [Dmitrii Selikhov](https://www.linkedin.com/in/dimetrix)

---

**Built with ❤️ using Next.js and shadcn/ui** 🚀
