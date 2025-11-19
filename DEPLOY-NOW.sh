#!/bin/bash

# Quick Deployment Script for Find My Domain
# Run this to deploy everything in one go

set -e

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║   🚀 FIND MY DOMAIN - QUICK DEPLOYMENT                          ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}This script will help you deploy Find My Domain${NC}"
echo ""

# Step 1: npm Publishing
echo "═══════════════════════════════════════════════════════════════════"
echo "  Step 1: Publish CLI to npm"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "Commands to run:"
echo ""
echo "  cd apps/cli"
echo "  pnpm build"
echo "  npm login"
echo "  npm publish"
echo "  cd ../.."
echo ""
read -p "Press Enter when you've published to npm..."
echo ""

# Step 2: Vercel Deployment
echo "═══════════════════════════════════════════════════════════════════"
echo "  Step 2: Deploy Web App to Vercel"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "Commands to run:"
echo ""
echo "  cd apps/web"
echo "  vercel --prod"
echo "  cd ../.."
echo ""
read -p "Press Enter when you've deployed to Vercel..."
echo ""

# Step 3: GitHub Release
echo "═══════════════════════════════════════════════════════════════════"
echo "  Step 3: Create GitHub Release"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "Commands to run:"
echo ""
echo "  gh release create v2.0.6 --title 'v2.0.6' --generate-notes"
echo ""
read -p "Press Enter when you've created the release..."
echo ""

# Done!
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║   ✅ DEPLOYMENT COMPLETE!                                        ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Congratulations! Your project is now live! 🎉${NC}"
echo ""
echo "Next steps:"
echo "  • Test: npx find-my-domain@2.0.6 --version"
echo "  • Visit: https://find-my-domain-web.vercel.app/"
echo "  • Check: https://www.npmjs.com/package/find-my-domain"
echo "  • View: https://github.com/idimetrix/find-my-domain/releases"
echo ""
echo "Share your success:"
echo "  • Twitter/X"
echo "  • LinkedIn"
echo "  • Reddit (r/javascript, r/typescript)"
echo "  • Hacker News"
echo ""
