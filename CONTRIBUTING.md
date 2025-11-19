# Contributing to Find My Domain

First off, thank you for considering contributing to Find My Domain! It's people like you that make this tool better for everyone. 🎉

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher ([download](https://nodejs.org/))
- **pnpm** 10 or higher ([install](https://pnpm.io/installation))
- **Git** ([install](https://git-scm.com/downloads))
- **OpenAI API Key** for testing ([get one](https://platform.openai.com/api-keys))

### Fork & Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

```bash
git clone https://github.com/YOUR_USERNAME/find-my-domain.git
cd find-my-domain
```

3. **Add upstream remote**:

```bash
git remote add upstream https://github.com/idimetrix/find-my-domain.git
```

### Install Dependencies

```bash
# Install all dependencies
pnpm install

# Build all packages
pnpm build
```

### Verify Setup

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Run tests
pnpm test

# Start development
pnpm dev        # Web app on http://localhost:3000
pnpm dev:cli    # CLI in watch mode
```

If all commands succeed, you're ready to contribute! 🎉

---

## 🛠️ Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/my-amazing-feature

# Or for bug fixes
git checkout -b fix/issue-123
```

### 2. Make Your Changes

Edit files in your preferred editor. The monorepo structure:

```
find-my-domain/
├── apps/
│   ├── cli/          # CLI application
│   └── web/          # Next.js web app
├── packages/
│   └── core/         # Shared core library
└── scripts/          # Development scripts
```

### 3. Test Your Changes

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Build to ensure it compiles
pnpm build
```

### 4. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Stage changes
git add .

# Commit with conventional format
git commit -m "feat: add amazing new feature"
git commit -m "fix: resolve issue with domain checking"
git commit -m "docs: improve CLI documentation"
```

**Commit Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes

### 5. Push to Your Fork

```bash
git push origin feature/my-amazing-feature
```

### 6. Create Pull Request

Go to GitHub and create a Pull Request from your fork to the main repository.

---

## 💡 How to Contribute

### Reporting Bugs 🐛

Found a bug? Help us fix it!

1. **Check existing issues** - Someone might have reported it already
2. **Create a new issue** using the [Bug Report template](https://github.com/idimetrix/find-my-domain/issues/new?template=bug_report.md)
3. **Include**:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment info (OS, Node version, etc.)

### Requesting Features ✨

Have an idea for improvement?

1. **Check existing issues** - It might be planned already
2. **Create a new issue** using the [Feature Request template](https://github.com/idimetrix/find-my-domain/issues/new?template=feature_request.md)
3. **Describe**:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions considered
   - Why this would be useful

### Contributing Code 💻

#### Good First Issues

Look for issues labeled:
- `good first issue` - Perfect for newcomers
- `help wanted` - We'd love your help
- `bug` - Bug fixes
- `enhancement` - New features

#### Areas We Need Help

- 🐛 **Bug Fixes** - Help squash bugs
- ✨ **Features** - Implement new capabilities
- 📝 **Documentation** - Improve guides and examples
- 🧪 **Tests** - Increase test coverage
- 🎨 **UI/UX** - Enhance web interface
- 🌍 **Internationalization** - Add language support
- ⚡ **Performance** - Optimize speed and memory

---

## 🔄 Pull Request Process

### Before Submitting

✅ **Checklist:**

- [ ] Code follows project style guidelines
- [ ] All tests pass (`pnpm test`)
- [ ] TypeScript compilation succeeds (`pnpm typecheck`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Code is formatted (`pnpm format`)
- [ ] Documentation is updated
- [ ] Commit messages follow Conventional Commits
- [ ] Branch is up to date with `main`

### Submitting

1. **Fill out the PR template** completely
2. **Link related issues** - Use "Fixes #123" or "Closes #456"
3. **Add screenshots** - For UI changes
4. **Update CHANGELOG** - If applicable
5. **Request review** - Tag maintainers if needed

### After Submitting

- ✅ Respond to review comments promptly
- ✅ Make requested changes
- ✅ Keep the PR focused - One feature/fix per PR
- ✅ Squash commits if requested
- ✅ Be patient - Reviews may take a few days

### PR Review Process

1. **Automated Checks** - CI runs tests, linting, type checking
2. **Code Review** - Maintainer reviews code quality
3. **Testing** - Maintainer tests functionality
4. **Merge** - Once approved, PR is merged
5. **Release** - Changes included in next release

---

## 📐 Coding Standards

### TypeScript

- **Strict mode enabled** - No implicit `any`
- **Explicit return types** - On exported functions
- **Descriptive names** - Clear, self-documenting
- **Small functions** - Single responsibility principle

```typescript
// ✅ Good
export function generateDomainNames(options: GenerateOptions): Promise<string[]> {
  // Implementation
}

// ❌ Bad
export function gen(opts: any) {
  // Implementation
}
```

### React/Next.js

- **Functional components** - Use hooks, not classes
- **TypeScript props** - Explicit interfaces
- **Composition** - Small, reusable components
- **Accessibility** - ARIA labels, semantic HTML

```tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={label}>
      {label}
    </button>
  );
}
```

### Naming Conventions

- **Files**: `kebab-case.ts`, `PascalCase.tsx` (for components)
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`
- **Functions**: `camelCase` (verbs: `fetchData`, `handleClick`)

### File Organization

```typescript
// 1. Imports (external, then internal)
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
}

// 3. Constants
const MAX_RETRIES = 3;

// 4. Component/Function
export function MyComponent({ title }: MyComponentProps) {
  // Implementation
}
```

### Comments

- **Use sparingly** - Code should be self-documenting
- **Explain WHY** - Not what (the code shows what)
- **Document complex logic** - Make it clear
- **Update when changing code** - Outdated comments are worse than none

```typescript
// ✅ Good - Explains why
// Use exponential backoff to avoid rate limiting
await wait(Math.pow(2, attempt) * 1000);

// ❌ Bad - States the obvious
// Increment counter
counter++;
```

---

## 🧪 Testing Guidelines

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# Specific package
cd apps/cli && pnpm test
```

### Writing Tests

- **Test behavior** - Not implementation
- **Clear names** - Describe what's being tested
- **Arrange-Act-Assert** - Structure your tests
- **One assertion** - Per test (ideally)

```typescript
import { describe, it, expect } from "vitest";
import { generateDomainNames } from "./ai";

describe("generateDomainNames", () => {
  it("should generate the requested number of domain names", async () => {
    // Arrange
    const options = {
      keywords: ["tech"],
      count: 5,
      apiKey: "test-key",
    };

    // Act
    const names = await generateDomainNames(options);

    // Assert
    expect(names).toHaveLength(5);
  });
});
```

### Test Coverage

Aim for:
- **80%+ overall coverage**
- **100% critical path coverage**
- Test edge cases and error handling

---

## 📚 Documentation

### When to Update Documentation

Update docs whenever you:
- Add a new feature
- Change existing behavior
- Fix a bug that affects user workflow
- Add configuration options
- Update dependencies

### Documentation Files

- `README.md` - Project overview (root and packages)
- `CHANGELOG.md` - Version history
- `apps/cli/CLI-USAGE.md` - CLI documentation
- `apps/cli/DEPLOY.md` - Deployment guide
- Code comments - Complex logic explanation

### Documentation Standards

- **Be clear and concise**
- **Include examples** - Show, don't just tell
- **Test examples** - Ensure they work
- **Use proper markdown** - Headers, lists, code blocks
- **Add screenshots** - For visual features

---

## 🌟 Recognition

Contributors are recognized in:
- GitHub Contributors page
- Release notes
- CHANGELOG.md (for significant contributions)

---

## 💬 Community

### Getting Help

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and ideas
- **Email** - [selikhov.dmitrey@gmail.com](mailto:selikhov.dmitrey@gmail.com)

### Stay Updated

- **Watch the repository** - Get notified of new releases
- **Star the project** - Show your support
- **Share with others** - Help the community grow

---

## 🎯 Development Tips

### Useful Commands

```bash
# Clean everything and rebuild
pnpm clean && pnpm install && pnpm build

# Check for outdated dependencies
pnpm outdated

# Update dependencies
pnpm update

# Run pre-publish checks
./scripts/pre-publish.sh

# Validate documentation
./scripts/validate-docs.sh
```

### IDE Setup

**VS Code Extensions (Recommended):**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense (for web app)

**VS Code Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Debugging

**CLI:**
```bash
# Run CLI with Node debugger
node --inspect-brk apps/cli/bin/cli.js --keywords test
```

**Web App:**
```bash
# Next.js includes debugging support
pnpm dev
# Then attach your debugger to the process
```

---

## ❓ FAQ

**Q: How long do PR reviews take?**  
A: Usually 2-5 days. Complex changes may take longer.

**Q: Can I work on multiple issues?**  
A: Yes, but create separate branches/PRs for each.

**Q: Do I need to update CHANGELOG?**  
A: For significant changes, yes. We use Changesets for releases.

**Q: What if my PR gets conflicts?**  
A: Rebase on latest `main`: `git pull --rebase upstream main`

**Q: Can I contribute documentation only?**  
A: Absolutely! Docs improvements are highly valued.

---

## 🙏 Thank You!

Your contributions make Find My Domain better for everyone. Whether it's:
- 🐛 Fixing a typo
- 📝 Improving documentation  
- ✨ Adding a feature
- 🧪 Writing tests

Every contribution matters! Thank you for being part of our community. 🎉

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Happy Contributing! 🚀**

*Made with ❤️ by the Find My Domain community*

