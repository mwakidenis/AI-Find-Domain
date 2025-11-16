# 🚀 Deployment Guide

## Quick Deploy

Deploy a new version to npm in 7 simple steps:

### 1. Update Version

Edit `package.json` and bump the version:

```json
"version": "1.2.9"
```

**Version Rules:**
- **Patch** (1.2.8 → 1.2.9): Bug fixes
- **Minor** (1.2.0 → 1.3.0): New features
- **Major** (1.0.0 → 2.0.0): Breaking changes

### 2. Run Quality Checks

```bash
pnpm run typecheck && pnpm run lint && pnpm test && pnpm run build
```

All must pass! ✅

### 3. Commit Changes

```bash
git add package.json
git commit -m "chore: bump version to 1.2.9"
git push origin main
```

### 4. Create Git Tag

```bash
git tag -a v1.2.9 -m "Release v1.2.9"
git push origin v1.2.9
```

> **Note:** Tag must match package.json version (with or without `v` prefix)

### 5. Create GitHub Release

**Using CLI (recommended):**

```bash
gh release create v1.2.9 \
  --title "v1.2.9 - Your Release Title" \
  --notes "## What's New

- Feature 1
- Feature 2
- Bug fix 3"
```

**Using Web Interface:**

1. Go to https://github.com/idimetrix/find-my-domain/releases
2. Click "Draft a new release"
3. Choose tag: `v1.2.9`
4. Add title and release notes
5. Click "Publish release"

⚡ **Publishing the release triggers automatic deployment to npm!**

### 6. Monitor Deployment

```bash
gh run watch
```

Or visit: https://github.com/idimetrix/find-my-domain/actions

### 7. Verify Publication

```bash
npm view find-my-domain version
```

Visit: https://www.npmjs.com/package/find-my-domain

---

## Deployment Pipeline

The automated workflow runs these steps:

1. ✅ Checkout code
2. ✅ Verify version matches tag
3. ✅ Install dependencies
4. ✅ Run typecheck
5. ✅ Run linter
6. ✅ Run tests
7. ✅ Build project
8. ✅ Verify build artifacts
9. ✅ Publish to npm with provenance
10. ✅ Create release summary

If any step fails, deployment stops automatically.

---

## Security

- ✅ Only releases from `main` branch are deployed
- ✅ Version must match tag exactly
- ✅ All quality checks must pass
- ✅ Published with npm provenance signature

---

## Troubleshooting

**Version mismatch error:**
- Ensure `package.json` version matches the git tag

**ENEEDAUTH error:**
- Check `NPM_TOKEN` secret is set in GitHub repository settings

**Cannot publish over existing version:**
- This is correct! Bump the version number first

**Workflow doesn't trigger:**
- Ensure you created a GitHub **Release**, not just a tag

