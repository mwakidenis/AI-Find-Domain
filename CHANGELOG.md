# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

