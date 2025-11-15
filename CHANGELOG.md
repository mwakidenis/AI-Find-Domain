# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.7] - 2025-11-15

### Fixed - Complete GitHub Workflows Overhaul 🚀

#### Critical Issues Fixed
1. **❌ Wrong workflow purpose** - Was set up for GitHub Packages, needed npm
2. **❌ Wrong Node version** - Used Node 18, package requires Node 22+
3. **❌ Wrong package manager** - Used pnpm, project uses npm
4. **❌ Wrong trigger** - Ran on every push, even feature branches
5. **❌ Wrong registry** - Configured for GitHub Packages instead of npm
6. **❌ Wrong scope** - Had incorrect @dalenguyen scope
7. **❌ Missing quality checks** - No typecheck or lint before publish
8. **❌ Publishing on every push** - Should only publish on releases

### Added - New GitHub Workflows

#### 1. CI Workflow (`.github/workflows/ci.yml`)
- ✅ Runs on push to main/develop branches and PRs
- ✅ Uses Node.js 22 (correct version)
- ✅ Uses npm (correct package manager)
- ✅ Runs comprehensive quality checks:
  - TypeScript type checking
  - ESLint linting
  - Prettier format checking
  - Unit tests
  - Build verification
- ✅ Uploads build artifacts
- ✅ Proper caching for faster builds

#### 2. Publish Workflow (`.github/workflows/publish.yml`)
- ✅ Only runs on GitHub releases (correct trigger)
- ✅ Uses Node.js 22
- ✅ Publishes to npm registry (not GitHub Packages)
- ✅ Includes npm provenance for security
- ✅ Runs all quality checks before publishing
- ✅ Uses correct npm token authentication
- ✅ Public access for npm package

#### 3. CodeQL Security Analysis (`.github/workflows/codeql.yml`)
- ✅ Automatic security scanning
- ✅ Runs on push to main and PRs
- ✅ Weekly scheduled scans
- ✅ JavaScript/TypeScript analysis
- ✅ Security alerts for vulnerabilities

### Added - GitHub Configuration Files

#### Dependabot Configuration (`.github/dependabot.yml`)
- ✅ Automatic dependency updates
- ✅ Weekly npm dependency checks
- ✅ Weekly GitHub Actions updates
- ✅ Automatic PR creation
- ✅ Proper labels and reviewers

#### Pull Request Template (`.github/pull_request_template.md`)
- ✅ Structured PR description format
- ✅ Type of change checkboxes
- ✅ Testing verification
- ✅ Quality checklist
- ✅ Better PR documentation

#### Issue Templates
- ✅ **Bug Report** (`bug_report.md`)
  - Detailed bug reproduction steps
  - Environment information
  - Expected vs actual behavior
  - Configuration examples
  
- ✅ **Feature Request** (`feature_request.md`)
  - Problem description
  - Proposed solution
  - Use cases
  - Priority levels

- ✅ **Template Config** (`config.yml`)
  - Links to documentation
  - Links to discussions
  - Links to npm package

### Improved
- **CI/CD Pipeline**: Now production-ready with proper checks
- **Security**: CodeQL scanning for vulnerabilities
- **Maintenance**: Automated dependency updates
- **Contribution**: Clear templates for PRs and issues
- **Release Process**: Proper release-triggered publishing
- **Build Performance**: npm caching for faster workflows

### Technical Details
- All workflows use actions/checkout@v4 (latest)
- All workflows use actions/setup-node@v4 (latest)
- Proper use of `npm ci` for reproducible builds
- Artifact retention policy (7 days)
- Proper permissions for npm provenance
- Weekly security and dependency scans

## [1.2.6] - 2025-11-15

### Fixed
- **Help text now shows correct command name** (`find-my-domain` instead of `index.ts`)
  - Added `.scriptName("find-my-domain")` to yargs configuration
  - All example commands in help output now show: `find-my-domain --count 20 ...`
  - Better user experience when reading help documentation
  - Consistent with published package name

### Verified
- ✅ All npm scripts working correctly (`test`, `typecheck`, `lint`, `build`, `dev`, etc.)
- ✅ All commands in README.md verified and accurate
- ✅ All commands in CLI-USAGE.md verified and accurate
- ✅ All markdown files checked for consistency
- ✅ All links verified in documentation
- ✅ Package metadata correct (GitHub URLs, npm links)
- ✅ Quality checks passing (TypeScript, ESLint, Tests)

## [1.2.5] - 2025-11-15

### Added

#### Comprehensive Input Validation

- **Count validation** - Ensures count is greater than 0
  - Error message for count <= 0
  - Warning for count > 100 (API cost consideration)
- **TLD validation** - Ensures at least one TLD is provided
  - Error message with example if TLDs are missing
  - Automatic TLD normalization (removes leading dots: `.com` → `com`)
- **Empty results validation** - Checks if AI returns any domain names
  - Clear error message if no names generated
  - Helpful troubleshooting hints (rate limits, model name, network)
- **Input warning** - Warns if both domains and keywords are empty
  - Helps users understand they'll get generic results

#### Package.json Improvements

- **Added `funding` field** - Links to GitHub Sponsors
- **Added `preferGlobal: true`** - Better CLI tool experience with global install
- **Better metadata** - Improved discoverability

### Improved

- **Error messages** - More user-friendly with actionable guidance
- **TLD handling** - Automatically normalizes TLDs (removes dots, lowercases)
- **User experience** - Better feedback for configuration issues
- **Validation logic** - Comprehensive checks before processing

### Technical

- New `validateConfig()` function with thorough input validation
- TLD normalization using regex (`/^\.+/`)
- Better process.exit codes with clear error messages
- Package size: 14.79 kB (was 13.45 kB) - slight increase due to validation logic

## [1.2.4] - 2025-11-15

### Changed

#### README.md - Major Documentation Improvements

- **Updated Quick Start section** to prioritize `npx` usage (no installation needed!)
  - Option A: Instant use with `npx find-my-domain` (recommended for new users)
  - Option B: Install locally with `npm install -g find-my-domain`
  - Option C: File-based configuration for repeated use
- **Removed confusing "clone repository" instructions** from Quick Start
  - Previous version incorrectly suggested cloning the repo for regular usage
  - Now clearly shows how to use the published npm package
- **Better organized setup options**
  - Three clear paths for different use cases
  - Each option shows complete, working examples
  - Development setup moved to Contributing section (where it belongs)

### Fixed

- Fixed Quick Start documentation that was showing development setup instead of usage
- Clarified that npx works without any installation
- Updated all code examples to use published package, not local clone

## [1.2.3] - 2025-11-15

### Fixed

- **Fixed `--no-save` flag not working** - Changed option from `"no-save"` to `"save"` with default `true`
  - Yargs treats options starting with "no-" as negation flags, causing the original implementation to fail
  - `--no-save` now correctly prevents saving results to file
  - `--save` is now the default behavior (can be explicitly set if needed)
  - Updated configuration logic to check `cliArgs.save === false`

### Changed

- Help text now shows `--save` option with description "use --no-save to disable"
- More intuitive option naming that aligns with yargs conventions

## [1.2.2] - 2025-11-15

### Fixed

- Fixed bin path format in package.json (removed leading `./`)
- npm requires bin paths in format `bin/cli.js` not `./bin/cli.js`
- **npx find-my-domain now works correctly!** ✅

## [1.2.1] - 2025-11-15

### Added

- Added `bin/cli.js` executable entry point for npx support
- Added `bin` field to package.json
- Included `bin/` directory in published package files

### Fixed

- Fixed "could not determine executable to run" error when using npx
- Updated ESLint config to ignore bin/ directory

### Note

- This version had incorrect bin path format and was superseded by v1.2.2

## [1.2.0] - 2025-11-15

### Added - Super Flexible CLI Support 🎉

#### Pure CLI Mode (No Files Required!)

- ✨ `--api-key` (`-a`) flag to pass OpenAI API key directly via CLI
- ✨ `--prompt` (`-p`) flag for inline custom prompt templates
- ✨ `--prompt-file` flag to load custom prompt from file
- ✨ `--no-save` flag to skip file output (console-only mode)
- ✨ Built-in fallback prompt template when no prompt file exists
- ✨ Three distinct usage modes:
  - 📁 **File-Based** - Traditional with config files
  - 💻 **Pure CLI** - Zero files required
  - 🔀 **Hybrid** - Mix both approaches

#### Enhanced Flexibility

- All configuration files are now optional (`input.json`, `prompt.txt`, `.env`)
- Configuration priority system: CLI > Input File > Default File > Env Vars > Built-in
- Support for custom prompt templates with `{COUNT}`, `{DOMAINS}`, `{KEYWORDS}` placeholders
- API key can be provided via CLI, environment variable, or `.env` file
- Optional output saving for quick exploration and CI/CD workflows

#### Documentation

- ✨ NEW: `CLI-USAGE.md` with 500+ lines of comprehensive CLI documentation
- Updated `README.md` with three clear usage modes
- Added 12 comprehensive CLI examples (was 8)
- Added configuration priority explanation
- Added flexibility features section
- Docker and CI/CD integration examples

### Changed

- Enhanced help text with more examples
- Updated CLI options table with new flags
- Improved error messages for missing API key
- Version bumped from 1.1.0 to 1.2.0

### Improved

- Better configuration loading logic with fallback hierarchy
- More flexible `generateDomainNames` function with custom prompt support
- Enhanced TypeScript interfaces for new configuration options
- Build size: 13.46 kB (was 11.01 kB) - reasonable increase for added functionality

### Technical

- Added `customPrompt` parameter to `GenerateDomainNamesOptions` interface
- Added `apiKey`, `prompt`, and `saveOutput` to `InputConfig` interface
- Enhanced `loadConfig` function with prompt file loading
- Updated help examples in yargs configuration

## [1.1.0] - 2025-11-15

### Changed

- Updated Node.js requirement from >=18 to >=22
- Updated build target from node18 to node22
- Updated all documentation to reflect Node.js 22+ requirement

### Fixed

- Fixed linting errors in `src/utils/whois.ts` (replaced `any` with `unknown`)
- Fixed build configuration for Node.js libraries

## [1.0.0] - 2025-11-15

### Added

- 🤖 AI-powered domain name generation using OpenAI GPT models
- 🔍 Real-time WHOIS availability checking
- 💰 Domain sale status detection
- 🌐 Multiple TLD support (.com, .io, .dev, .ai, etc.)
- 📝 Smart input options (example domains, keywords, or both)
- ⚙️ Flexible configuration via JSON files
- 📊 Structured JSON output with detailed statistics
- 🎯 Custom prompt templates
- 🚀 Rate limiting and optimization for bulk searches
- 💻 CLI and programmatic API
- 📖 Comprehensive documentation (2000+ lines)
- 🤖 Support for 40+ OpenAI models

### Features

- `generateDomainNames` function for AI-powered name generation
- `checkDomainStatus` function for WHOIS lookup
- Configuration via `input.json`
- Custom prompts via `prompt.txt`
- Environment variable support via `.env`
- Grouped results (Available, For Sale, Taken)
- Summary statistics
- Multiple TLD checking in single run
- Example-based and keyword-based generation

### Documentation

- Comprehensive README.md with quick start guide
- Model comparison and recommendations
- Real-world use cases and examples
- Troubleshooting guide
- API documentation
- Configuration reference

---

## Version History Summary

- **v1.2.0** - Super flexible CLI support (Pure CLI, File-based, Hybrid modes)
- **v1.1.0** - Node.js 22+ requirement
- **v1.0.0** - Initial release with AI-powered domain generation

---

## Migration Guides

### Migrating from 1.1.0 to 1.2.0

**Good news!** This is a **fully backward-compatible** release. No changes required!

Your existing code will continue to work exactly as before. The new CLI features are additional options.

**Optional: Try the new CLI mode:**

```bash
# Old way (still works)
npm start

# New way - Pure CLI
npm start -- --api-key sk-xxx --keywords tech --count 10 --no-save

# Hybrid approach
npm start -- --count 50 --model gpt-4o
```

### Migrating from 1.0.0 to 1.1.0

**Breaking Change:** Node.js 22+ is now required.

**Action required:**

1. Upgrade to Node.js 22 or higher
2. Reinstall dependencies: `npm install`
3. Rebuild: `npm run build`

Everything else remains the same!

---

## Upcoming Features

See the [Roadmap](README.md#-roadmap) section in README.md for planned features.

---

## Links

- [npm Package](https://www.npmjs.com/package/find-my-domain)
- [GitHub Repository](https://github.com/idimetrix/find-my-domain)
- [Issue Tracker](https://github.com/idimetrix/find-my-domain/issues)
- [CLI Usage Guide](CLI-USAGE.md)
