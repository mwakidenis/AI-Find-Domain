#!/bin/bash

# Pre-Publish Validation Script for Find My Domain
# Comprehensive checks before publishing to npm or deploying

set -e  # Exit on error

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║   📦 FIND MY DOMAIN - PRE-PUBLISH VALIDATION                     ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0
WARN=0

# Helper functions
check_pass() {
    echo -e "${GREEN}✅ PASS${NC} - $1"
    ((PASS++))
}

check_fail() {
    echo -e "${RED}❌ FAIL${NC} - $1"
    ((FAIL++))
}

check_warn() {
    echo -e "${YELLOW}⚠️  WARN${NC} - $1"
    ((WARN++))
}

section() {
    echo ""
    echo "═══════════════════════════════════════════════════════════════════"
    echo "  $1"
    echo "═══════════════════════════════════════════════════════════════════"
    echo ""
}

# 1. Version Consistency
section "📊 1/10: Checking Version Consistency"

ROOT_VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
CLI_VERSION=$(grep '"version"' apps/cli/package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
WEB_VERSION=$(grep '"version"' apps/web/package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
CORE_VERSION=$(grep '"version"' packages/core/package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')

echo "Root:  $ROOT_VERSION"
echo "CLI:   $CLI_VERSION"
echo "Web:   $WEB_VERSION"
echo "Core:  $CORE_VERSION"
echo ""

if [ "$ROOT_VERSION" = "$CLI_VERSION" ] && [ "$ROOT_VERSION" = "$WEB_VERSION" ] && [ "$ROOT_VERSION" = "$CORE_VERSION" ]; then
    check_pass "All versions synchronized at $ROOT_VERSION"
else
    check_fail "Version mismatch detected!"
fi

# 2. Dependencies Check
section "📦 2/10: Checking Dependencies"

if [ -f "pnpm-lock.yaml" ]; then
    check_pass "pnpm-lock.yaml exists"
else
    check_fail "pnpm-lock.yaml missing"
fi

if pnpm list > /dev/null 2>&1; then
    check_pass "All dependencies installed correctly"
else
    check_warn "Some dependencies may have issues"
fi

# 3. Clean Build
section "🔨 3/10: Clean Build Test"

echo "Cleaning old builds..."
pnpm clean > /dev/null 2>&1
check_pass "Clean successful"

echo "Building all packages..."
if pnpm build > /dev/null 2>&1; then
    check_pass "Build successful"
else
    check_fail "Build failed"
fi

# 4. Type Checking
section "🔍 4/10: TypeScript Type Checking"

if pnpm typecheck > /dev/null 2>&1; then
    check_pass "Type checking passed"
else
    check_fail "Type checking failed"
fi

# 5. Linting
section "🧹 5/10: ESLint Validation"

LINT_OUTPUT=$(pnpm lint 2>&1)
if echo "$LINT_OUTPUT" | grep -q "error"; then
    check_fail "Linting errors found"
    echo "$LINT_OUTPUT" | grep "error"
elif echo "$LINT_OUTPUT" | grep -q "warning"; then
    check_warn "Linting warnings found"
    echo "$LINT_OUTPUT" | grep "warning" | head -5
else
    check_pass "Linting passed"
fi

# 6. Build Artifacts
section "📁 6/10: Checking Build Artifacts"

if [ -f "apps/cli/dist/index.js" ]; then
    check_pass "CLI build artifact exists"
else
    check_fail "CLI build artifact missing"
fi

if [ -f "packages/core/dist/index.js" ]; then
    check_pass "Core build artifact exists"
else
    check_fail "Core build artifact missing"
fi

if [ -d "apps/web/.next" ]; then
    check_pass "Web build output exists"
else
    check_fail "Web build output missing"
fi

# 7. CLI Executable Test
section "⚡ 7/10: CLI Functionality Test"

if node apps/cli/bin/cli.js --version > /dev/null 2>&1; then
    VERSION=$(node apps/cli/bin/cli.js --version 2>&1 | grep -o "[0-9]\+\.[0-9]\+\.[0-9]\+")
    if [ "$VERSION" = "$ROOT_VERSION" ]; then
        check_pass "CLI version command works and matches ($VERSION)"
    else
        check_warn "CLI version ($VERSION) doesn't match package ($ROOT_VERSION)"
    fi
else
    check_fail "CLI version command failed"
fi

if node apps/cli/bin/cli.js --help > /dev/null 2>&1; then
    check_pass "CLI help command works"
else
    check_fail "CLI help command failed"
fi

# 8. Package.json Validation
section "📋 8/10: Package.json Validation"

# Check required fields
for pkg in "apps/cli/package.json" "packages/core/package.json"; do
    if grep -q '"name"' $pkg && grep -q '"version"' $pkg && grep -q '"description"' $pkg; then
        check_pass "$pkg has required fields"
    else
        check_fail "$pkg missing required fields"
    fi
done

# Check bin configuration
if grep -q '"find-my-domain": "bin/cli.js"' apps/cli/package.json; then
    check_pass "CLI bin configuration correct"
else
    check_fail "CLI bin configuration missing or incorrect"
fi

# 9. Documentation Check
section "📚 9/10: Documentation Validation"

DOCS=("README.md" "apps/cli/README.md" "apps/web/README.md" "packages/core/README.md" "CHANGELOG.md")

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        LINES=$(wc -l < "$doc")
        if [ "$LINES" -gt 50 ]; then
            check_pass "$doc exists ($LINES lines)"
        else
            check_warn "$doc is short ($LINES lines)"
        fi
    else
        check_fail "$doc missing"
    fi
done

# 10. Git Status
section "📝 10/10: Git Status Check"

if [ -d ".git" ]; then
    UNCOMMITTED=$(git status --short | wc -l)
    if [ "$UNCOMMITTED" -eq 0 ]; then
        check_pass "No uncommitted changes"
    else
        check_warn "$UNCOMMITTED uncommitted files"
        git status --short | head -10
    fi
    
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
        check_pass "On main/master branch"
    else
        check_warn "On branch: $BRANCH (not main/master)"
    fi
else
    check_warn "Not a git repository"
fi

# Final Summary
section "🎯 FINAL SUMMARY"

TOTAL=$((PASS + FAIL + WARN))

echo "Total Checks: $TOTAL"
echo -e "${GREEN}✅ Passed: $PASS${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARN${NC}"
echo -e "${RED}❌ Failed: $FAIL${NC}"
echo ""

if [ "$FAIL" -eq 0 ]; then
    echo "╔══════════════════════════════════════════════════════════════════╗"
    echo "║                                                                  ║"
    echo "║   ✨ ALL CHECKS PASSED! READY TO PUBLISH! ✨                    ║"
    echo "║                                                                  ║"
    echo "╚══════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "📦 Next Steps:"
    echo ""
    echo "  1. Publish CLI to npm:"
    echo "     cd apps/cli && npm publish"
    echo ""
    echo "  2. Deploy Web App:"
    echo "     cd apps/web && vercel --prod"
    echo ""
    echo "  3. Create GitHub Release:"
    echo "     gh release create v$ROOT_VERSION --generate-notes"
    echo ""
    exit 0
elif [ "$FAIL" -le 2 ] && [ "$WARN" -le 5 ]; then
    echo "╔══════════════════════════════════════════════════════════════════╗"
    echo "║                                                                  ║"
    echo "║   ⚠️  MINOR ISSUES - REVIEW BEFORE PUBLISHING                    ║"
    echo "║                                                                  ║"
    echo "╚══════════════════════════════════════════════════════════════════╝"
    echo ""
    exit 1
else
    echo "╔══════════════════════════════════════════════════════════════════╗"
    echo "║                                                                  ║"
    echo "║   ❌ CRITICAL ISSUES - DO NOT PUBLISH YET                        ║"
    echo "║                                                                  ║"
    echo "╚══════════════════════════════════════════════════════════════════╝"
    echo ""
    exit 1
fi

