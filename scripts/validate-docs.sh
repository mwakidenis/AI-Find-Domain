#!/bin/bash

# Documentation Validation Script
# Checks markdown files for broken links, formatting issues, and consistency

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║   📚 DOCUMENTATION VALIDATION                                    ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

ISSUES=0

section() {
    echo ""
    echo "═══════════════════════════════════════════════════════════════════"
    echo "  $1"
    echo "═══════════════════════════════════════════════════════════════════"
    echo ""
}

# 1. Find all markdown files
section "📄 Finding Markdown Files"

MD_FILES=$(find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*" -not -path "*/node_modules/*")
COUNT=$(echo "$MD_FILES" | wc -l)

echo "Found $COUNT markdown files:"
echo "$MD_FILES" | sed 's/^/  • /'
echo ""

# 2. Check for broken internal links
section "🔗 Checking Internal Links"

for file in $MD_FILES; do
    # Extract all markdown links
    LINKS=$(grep -o '\[.*\](.*\.md)' "$file" 2>/dev/null || true)
    
    if [ -n "$LINKS" ]; then
        echo "Checking links in $file..."
        
        while IFS= read -r link; do
            # Extract the file path from [text](path)
            PATH_ONLY=$(echo "$link" | sed 's/.*](\(.*\))/\1/' | sed 's/#.*//')
            
            if [ -n "$PATH_ONLY" ] && [ "$PATH_ONLY" != "$link" ]; then
                # Resolve relative path
                DIR=$(dirname "$file")
                FULL_PATH="$DIR/$PATH_ONLY"
                
                if [ ! -f "$FULL_PATH" ]; then
                    echo -e "  ${RED}✗${NC} Broken link in $file: $PATH_ONLY"
                    ((ISSUES++))
                fi
            fi
        done <<< "$LINKS"
    fi
done

if [ "$ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No broken internal links found"
fi

# 3. Check version consistency in docs
section "🔢 Checking Version References"

ROOT_VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
echo "Package version: $ROOT_VERSION"
echo ""

for file in $MD_FILES; do
    # Look for version numbers in format X.Y.Z
    VERSIONS=$(grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+' "$file" 2>/dev/null || true)
    
    if [ -n "$VERSIONS" ]; then
        while IFS= read -r ver; do
            if [ "$ver" != "$ROOT_VERSION" ] && [ "$ver" != "1.0.0" ]; then
                echo -e "  ${YELLOW}!${NC} Different version in $file: $ver (current: $ROOT_VERSION)"
            fi
        done <<< "$(echo "$VERSIONS" | sort -u)"
    fi
done

# 4. Check for TODO/FIXME comments
section "📝 Checking for TODOs"

TODO_COUNT=0
for file in $MD_FILES; do
    TODOS=$(grep -i "TODO\|FIXME\|XXX" "$file" 2>/dev/null || true)
    if [ -n "$TODOS" ]; then
        echo "Found in $file:"
        echo "$TODOS" | sed 's/^/  /'
        echo ""
        ((TODO_COUNT++))
    fi
done

if [ "$TODO_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No TODOs found"
else
    echo -e "${YELLOW}!${NC} Found TODOs in $TODO_COUNT files"
fi

# 5. Check documentation sizes
section "📊 Documentation Statistics"

echo "File sizes and word counts:"
echo ""
printf "%-40s %10s %10s\n" "File" "Lines" "Words"
echo "───────────────────────────────────────────────────────────────────"

for file in $MD_FILES; do
    LINES=$(wc -l < "$file")
    WORDS=$(wc -w < "$file")
    printf "%-40s %10s %10s\n" "$file" "$LINES" "$WORDS"
done

# 6. Check for common markdown issues
section "🔍 Checking Markdown Formatting"

FORMATTING_ISSUES=0

for file in $MD_FILES; do
    # Check for missing blank lines before headers
    BAD_HEADERS=$(grep -n '^[^#].*\n^#' "$file" 2>/dev/null | wc -l || echo 0)
    
    # Check for multiple blank lines
    MULTI_BLANK=$(grep -c '^$' "$file" 2>/dev/null || echo 0)
    
    if [ "$BAD_HEADERS" -gt 0 ]; then
        echo -e "  ${YELLOW}!${NC} $file: $BAD_HEADERS potential header formatting issues"
        ((FORMATTING_ISSUES++))
    fi
done

if [ "$FORMATTING_ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No major formatting issues found"
fi

# Summary
echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║   📊 SUMMARY                                                     ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "Total files checked: $COUNT"
echo "Issues found: $ISSUES"
echo "TODOs found: $TODO_COUNT"
echo "Formatting issues: $FORMATTING_ISSUES"
echo ""

if [ "$ISSUES" -eq 0 ] && [ "$FORMATTING_ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✅ Documentation validation passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some issues found. Review above.${NC}"
    exit 0  # Don't fail, just warn
fi

