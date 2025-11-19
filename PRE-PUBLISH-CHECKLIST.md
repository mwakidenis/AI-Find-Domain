# Pre-Publish Checklist

Complete checklist before publishing to npm or deploying to production.

---

## 📋 Quick Reference

Run the automated validation script:

```bash
./scripts/pre-publish.sh
```

If all checks pass, you're ready to publish!

---

## 🔍 Manual Checklist

### 1. Code Quality ✅

- [ ] All packages build successfully (`pnpm build`)
- [ ] TypeScript type checking passes (`pnpm typecheck`)
- [ ] Linting passes with no errors (`pnpm lint`)
- [ ] All tests pass (`pnpm test`)
- [ ] No console errors or warnings
- [ ] Code is formatted (`pnpm format`)

### 2. Version Management 📊

- [ ] Version numbers synchronized across all packages
- [ ] CHANGELOG.md updated with latest changes
- [ ] Version follows semantic versioning (MAJOR.MINOR.PATCH)
- [ ] Git tag created for version (if applicable)

**Current Version Check:**

```bash
# Should all show the same version
grep '"version"' package.json apps/cli/package.json apps/web/package.json packages/core/package.json
```

### 3. Dependencies 📦

- [ ] All dependencies installed (`pnpm install`)
- [ ] No security vulnerabilities (`pnpm audit`)
- [ ] pnpm-lock.yaml is up to date
- [ ] No unused dependencies
- [ ] Workspace dependencies use correct versions

**Dependency Check:**

```bash
pnpm list
pnpm audit
```

### 4. Documentation 📚

- [ ] README.md files updated for all packages
- [ ] CHANGELOG.md reflects latest changes
- [ ] API documentation is current
- [ ] Code examples work and are tested
- [ ] Links in documentation are not broken
- [ ] Screenshots/GIFs are up to date (if any)

**Documentation Files:**

- `README.md` (root)
- `apps/cli/README.md`
- `apps/cli/CLI-USAGE.md`
- `apps/cli/DEPLOY.md`
- `apps/web/README.md`
- `packages/core/README.md`
- `CHANGELOG.md`
- `PUBLISHING.md`

### 5. CLI Package (find-my-domain) 🎯

- [ ] Package builds correctly (`cd apps/cli && pnpm build`)
- [ ] Binary file is executable (`apps/cli/bin/cli.js`)
- [ ] `--version` command works
- [ ] `--help` command works
- [ ] All CLI commands function as expected
- [ ] Configuration methods work (CLI args, .env, JSON)
- [ ] Example files are up to date

**CLI Testing:**

```bash
cd apps/cli

# Test version
node bin/cli.js --version

# Test help
node bin/cli.js --help

# Test with example (dry run, no API key needed)
node bin/cli.js --keywords test --count 1 --no-save --help
```

### 6. Web App (@find-my-domain/web) 🌐

- [ ] Build succeeds (`cd apps/web && pnpm build`)
- [ ] No build errors or warnings
- [ ] All pages render correctly
- [ ] Demo page works (if API keys configured)
- [ ] API routes function properly
- [ ] Environment variables documented
- [ ] SEO metadata is correct
- [ ] Responsive design works on mobile

**Web Testing:**

```bash
cd apps/web

# Build
pnpm build

# Start production server
pnpm start

# Test pages
# Visit: http://localhost:3000
# Visit: http://localhost:3000/demo
# Visit: http://localhost:3000/docs
```

### 7. Core Package (@find-my-domain/core) 📦

- [ ] Package builds correctly (`cd packages/core && pnpm build`)
- [ ] All exports are accessible
- [ ] Types are generated correctly
- [ ] No TypeScript errors
- [ ] Functions work as expected

**Core Testing:**

```bash
cd packages/core
pnpm build

# Check exports
ls -la dist/

# Verify types
cat dist/index.d.ts | head -20
```

### 8. Build Artifacts 🔨

- [ ] CLI: `apps/cli/dist/` contains build files
- [ ] CLI: `apps/cli/dist/index.js` exists
- [ ] CLI: `apps/cli/dist/index.d.ts` exists
- [ ] Core: `packages/core/dist/` contains build files
- [ ] Web: `apps/web/.next/` contains build files
- [ ] All artifacts are up to date

**Artifact Check:**

```bash
ls -lh apps/cli/dist/
ls -lh packages/core/dist/
ls -d apps/web/.next/
```

### 9. npm Package Preparation 📦

- [ ] `package.json` has correct metadata
- [ ] `name` field is correct
- [ ] `version` field is updated
- [ ] `description` is accurate
- [ ] `keywords` are relevant
- [ ] `author` information is correct
- [ ] `license` is specified (MIT)
- [ ] `repository` URL is correct
- [ ] `bugs` URL is correct
- [ ] `homepage` URL is correct
- [ ] `bin` configuration is correct (for CLI)
- [ ] `main`, `module`, `types` fields are correct
- [ ] `files` field includes all necessary files
- [ ] `engines` specifies Node.js version

**Package.json Check (CLI):**

```bash
cat apps/cli/package.json | jq '{name, version, description, bin, main, types, keywords}'
```

### 10. Git Status 📝

- [ ] All changes committed
- [ ] No uncommitted files
- [ ] On correct branch (main/master)
- [ ] Pushed to remote
- [ ] No merge conflicts
- [ ] Clean git status

**Git Check:**

```bash
git status
git log --oneline -5
git remote -v
```

### 11. Environment & Secrets 🔐

- [ ] `.env` files are in `.gitignore`
- [ ] No secrets in git history
- [ ] Example environment files are up to date
- [ ] `.env.example` files provided
- [ ] Secrets properly documented

**Files to Check:**

- `.gitignore` (includes `.env`, `input.json`)
- `.env.example`
- `apps/cli/.env.example`
- `apps/web/.env.example`

### 12. Testing ✅

- [ ] Unit tests pass
- [ ] Integration tests pass (if any)
- [ ] Manual testing completed
- [ ] CLI tested with various options
- [ ] Web app tested in browser
- [ ] API endpoints tested
- [ ] Error scenarios tested

**Run Tests:**

```bash
pnpm test
```

### 13. Performance ⚡

- [ ] Bundle sizes are acceptable
- [ ] No performance regressions
- [ ] Web app loads quickly
- [ ] CLI responds promptly
- [ ] Memory usage is reasonable

**Check Bundle Sizes:**

```bash
cd apps/web
pnpm build
# Check output for bundle sizes
```

### 14. Compatibility 🔄

- [ ] Works on Node.js 18+
- [ ] Works on Node.js 22+ (recommended)
- [ ] pnpm 10+ works correctly
- [ ] npm works for global install
- [ ] `npx` works without installation

**Compatibility Testing:**

```bash
# Test npx (simulated)
cd apps/cli
npm link
find-my-domain --version
npm unlink -g find-my-domain
```

### 15. Documentation Links 🔗

- [ ] All internal links work
- [ ] External links are valid
- [ ] Badge URLs are correct
- [ ] npm package links work
- [ ] GitHub links work
- [ ] Live demo link works
- [ ] API documentation links work

**Link Validation:**

```bash
./scripts/validate-docs.sh
```

---

## 🚀 Publishing Steps

### CLI to npm

1. **Final build:**

```bash
cd apps/cli
pnpm build
```

2. **Test locally:**

```bash
npm link
find-my-domain --version
find-my-domain --help
```

3. **Login to npm:**

```bash
npm login
```

4. **Publish:**

```bash
npm publish
```

5. **Verify:**

```bash
npx find-my-domain@latest --version
```

### Web App to Vercel

1. **Install Vercel CLI:**

```bash
npm install -g vercel
```

2. **Deploy:**

```bash
cd apps/web
vercel --prod
```

3. **Verify:**

- Visit deployed URL
- Test demo page
- Check API routes
- Verify authentication

### GitHub Release

1. **Create release:**

```bash
# Using GitHub CLI
gh release create v2.0.6 \
  --title "v2.0.6" \
  --notes "See CHANGELOG.md for details" \
  --generate-notes
```

2. **Attach artifacts (if any):**

- CLI binary
- Documentation PDF
- Screenshots

---

## ✅ Post-Publish Verification

### CLI Package

- [ ] Package appears on npm
- [ ] `npx find-my-domain` works without installation
- [ ] Download stats appear on npm
- [ ] README displays correctly on npm
- [ ] Installation works globally: `npm install -g find-my-domain`

**Verification:**

```bash
# Wait 2-3 minutes after publishing
npx find-my-domain@latest --version

# Check npm page
open https://www.npmjs.com/package/find-my-domain
```

### Web App

- [ ] Deployment successful
- [ ] All pages load
- [ ] Demo works
- [ ] No console errors
- [ ] Authentication works
- [ ] API routes work
- [ ] Links work

**Verification:**

- Visit https://find-my-domain-web.vercel.app/
- Test demo
- Check browser console
- Test on mobile

### GitHub

- [ ] Release appears on GitHub
- [ ] Release notes are correct
- [ ] Tag is created
- [ ] Assets are attached (if any)

**Verification:**

```bash
gh release view v2.0.6
```

---

## 🐛 Rollback Plan

If issues are discovered after publishing:

### npm

```bash
# Deprecate version
npm deprecate find-my-domain@2.0.6 "This version has issues, please upgrade"

# Or unpublish (within 72 hours)
npm unpublish find-my-domain@2.0.6
```

### Vercel

```bash
# Rollback to previous deployment
vercel rollback
```

### GitHub

```bash
# Delete release
gh release delete v2.0.6

# Delete tag
git tag -d v2.0.6
git push origin :refs/tags/v2.0.6
```

---

## 📞 Support

If you encounter issues:

1. Check [GitHub Issues](https://github.com/idimetrix/find-my-domain/issues)
2. Review [CHANGELOG.md](CHANGELOG.md)
3. Consult package READMEs
4. Contact maintainer: [selikhov.dmitrey@gmail.com](mailto:selikhov.dmitrey@gmail.com)

---

## 📝 Checklist Template

Copy and paste this into your PR or issue:

```markdown
## Pre-Publish Checklist

### Code Quality
- [ ] Build passes
- [ ] TypeScript passes
- [ ] Linting passes
- [ ] Tests pass

### Versioning
- [ ] Versions synchronized
- [ ] CHANGELOG updated
- [ ] Semantic versioning followed

### Documentation
- [ ] READMEs updated
- [ ] Examples tested
- [ ] Links validated

### Testing
- [ ] CLI tested
- [ ] Web app tested
- [ ] Core package tested

### Ready to Publish
- [ ] All checks passed
- [ ] Git status clean
- [ ] On main branch
```

---

**Last Updated:** 2025-11-19  
**Version:** 2.0.6

**Happy Publishing! 🚀**

