# Contributing to Gralobe

Thank you for your interest in contributing to Gralobe! This document provides guidelines for maintaining a high-quality, sustainable codebase.

## 🌟 Core Philosophy

As an AI agent or human contributor, your goal is not just to "make it work", but to **leave the codebase cleaner than you found it**.

- **Quality over Quantity**: Do not add features if they degrade architecture.
- **Sustainability**: Write code that is easy to read, test, and maintain.
- **Proactive Refactoring**: If you see messy code, fix it (safely).

## 🧪 Testing Strategy

We use **Playwright** for both Unit and End-to-End (E2E) testing.

### 1. Unit Tests (Colocated)

- **Location**: Next to the source file (e.g., `src/lib/formatters.ts` -> `src/lib/formatters.spec.ts`).
- **Purpose**: Test individual functions, classes, and logic in isolation.
- **Naming**: `*.spec.ts`
- **Goal**: High coverage of business logic and edge cases.

### 2. E2E / Integration Tests

- **Location**: `tests/` directory.
- **Purpose**: Test the application as a whole (browser interaction, rendering, data flow).
- **Naming**: `*.test.ts`
- **Goal**: Ensure the user experience remains broken-free.

## 🚀 Development Workflow

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/gralobe.git
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run only unit tests (fast)
npx playwright test --grep "Unit"

# Run with UI (good for debugging E2E)
npm run test:ui
```

## 📝 Code Style & Quality

- **TypeScript**: Strict typing is required. Avoid `any`.
- **Formatting**: Code should be formatted consistently (Prettier/ESLint).
- **Comments**: Explain _why_, not _what_. Add JSDoc to all public interfaces.
- **Components**: Keep components small and focused. Refactor large files (like `GlobeViz.ts`) into smaller sub-modules when possible.

## 🐛 Bug Fixing

When fixing a bug:

1. **Reproduce** it with a failing test case (Unit or E2E).
2. **Fix** the code.
3. **Verify** the test passes.
4. **Refactor** adjacent code if it contributed to the bug.

## Pull Request Process

1. Ensure all tests pass.
2. Update documentation if behavior changes.

## ❓ Common Issues & Troubleshooting

### "Cannot find name 'process'"

If you encounter this error (e.g., in `playwright.config.ts`), it means TypeScript cannot see Node.js global types.

1. Ensure `@types/node` is installed: `npm i --save-dev @types/node`
2. Ensure `tsconfig.json` includes `"types": ["node"]`.

### "Strict Mode Violation" in Tests

Playwright strict mode fails if a selector matches multiple elements.

- **Fix**: Use more specific selectors (e.g., `#globe-container-id .target-class`) instead of generic ones.
