# Publishing Guide

This monorepo uses **Changesets** for version management and publishing - the industry standard used by projects like React, Turborepo, Radix UI, and many others.

## Architecture

The monorepo consists of:

- `packages/core` - Core utilities (private, bundled into CLI)
- `apps/cli` - CLI package (published to npm)
- `apps/web` - Web application (not published)

The `@find-my-domain/core` package is **bundled** into the CLI during build (via Vite), so it doesn't need to be published separately.

## Key Configuration

### 1. Core Package as DevDependency

Since the core is bundled, it's listed as a `devDependency` in the CLI's `package.json`:

```json
{
  "devDependencies": {
    "@find-my-domain/core": "workspace:^"
  }
}
```

This ensures:

- Core is available during development and build time
- Core is NOT listed in the published package's dependencies
- The `workspace:^` protocol is only used internally

### 2. Vite Configuration

The Vite build is configured to bundle the core package:

```typescript
{
  rollupOptions: {
    external: [
      // @find-my-domain/core is NOT in this list
      // so it will be bundled
      "ai",
      "@ai-sdk/openai",
      // ... other runtime dependencies
    ];
  }
}
```

### 3. Changesets Configuration

`.changeset/config.json`:

```json
{
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

## Publishing Workflow

### Option 1: Using Changesets (Recommended)

1. **Create a changeset** after making changes:

   ```bash
   pnpm changeset
   ```

   Select the packages to version and describe the changes.

2. **Version packages**:

   ```bash
   pnpm version
   ```

   This updates package.json versions and generates changelogs.

3. **Publish**:
   ```bash
   pnpm release
   ```
   This builds and publishes to npm.

### Option 2: Manual Publishing

1. **Build packages**:

   ```bash
   pnpm build:core
   pnpm build:cli
   ```

2. **Bump version**:

   ```bash
   cd apps/cli
   npm version patch  # or minor, major
   ```

3. **Publish**:
   ```bash
   npm publish
   ```

## What Makes This Solution Professional

✅ **No hacky scripts** - Uses industry-standard tools  
✅ **Clean dependencies** - Published package has no `workspace:` references  
✅ **Proper bundling** - Core code is bundled, not duplicated  
✅ **Monorepo best practices** - Follows patterns from major open-source projects  
✅ **Automated workflows** - Changesets handles version bumps and changelogs

## Verification

After publishing, verify the package:

```bash
# Check dependencies don't include workspace: references
npm view find-my-domain@latest dependencies

# Test installation
npx find-my-domain@latest --version
```

## References

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Turborepo Publishing Guide](https://turborepo.com/docs/guides/publishing-libraries)
- [pnpm Workspace Documentation](https://pnpm.io/workspaces)
