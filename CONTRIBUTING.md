# Contributing to Gralobe

Thank you for your interest in contributing to Gralobe! This document provides guidelines for maintaining a high-quality, sustainable codebase.

## 🌟 Core Philosophy

As an AI agent or human contributor, your goal is not just to "make it work", but to **leave the codebase cleaner than you found it**.

- **Quality over Quantity**: Do not add features if they degrade architecture.
- **Sustainability**: Write code that is easy to read, test, and maintain.
- **Proactive Refactoring**: If you see messy code, fix it (safely).

### 🤖 For AI Agents & Contributors

If you are an AI agent or a human using AI tools:

1.  **Do NOT hallucinate APIs or syntax.** Verify every change.
2.  **Self-Correction**: If a tool call fails or a build fails, investigate the error log. Do not blindly retry.
3.  **Visual Verification**: If you modify UI code, you MUST inspect the relevant files (view_file) or output to ensure you haven't introduced syntax errors (missing `}`, broken imports).
4.  **Strict Mode**: Treat TypeScript errors as blockers. **Do not suppress them** with `// @ts-ignore` unless absolutely necessary and documented.

## 🧪 Testing Strategy

We use **Vitest** for unit tests and **Playwright** for End-to-End (E2E) testing.

### 1. Unit Tests (Colocated)

- **Location**: Next to the source file (e.g., `src/lib/formatters.ts` -> `src/lib/formatters.spec.ts`).
- **Purpose**: Test individual functions, classes, and logic in isolation.
- **Runner**: Vitest
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
# Run unit tests (Vitest)
npm test

# Run E2E tests (Playwright)
npm run test:e2e

# Run Playwright with UI (good for debugging E2E)
npm run test:ui

# Run texture URL checks (opt-in, hits public CDNs)
RUN_TEXTURE_TESTS=1 npm test

## Texture URL Validation (Opt-In)

Some texture presets are loaded from public CDNs. We include a **gated test** that verifies each URL is reachable and returns an image content-type.

- **Why gated?** Some CI runners block outbound HTTP requests. To avoid flaky CI, the test only runs when explicitly enabled.
- **How to run**: `RUN_TEXTURE_TESTS=1 npm test`
- **When to run**: Anytime texture URLs change or you suspect CDN regressions.
```

## 📝 Code Style & Quality

- **TypeScript**: Strict typing is required. Avoid `any`.
- **Formatting**: Code should be formatted consistently (Biome).
- **Comments**: Explain _why_, not _what_. Add JSDoc to all public interfaces.
- **Components**: Keep components small and focused. Refactor large files (like `GlobeViz.ts`) into smaller sub-modules when possible.

## 🐛 Bug Fixing

When fixing a bug:

1. **Reproduce** it with a failing test case (Unit or E2E).
2. **Fix** the code.
3. **Verify** the test passes.
4. **Refactor** adjacent code if it contributed to the bug.

## Pull Request Process

### 🛑 BEFORE YOU COMMIT: Strict Verification

**You MUST perform the following checks locally.** Failing to do so wastes review time and breaks the build.

1.  **Build the Project**: Run the build command to catch syntax errors (like missing braces or type mismatches).

    ```bash
    npm run build
    ```

    _If this fails, DO NOT COMMIT._

2.  **Linting & Type Checking**: Ensure your IDE shows NO red squigglies.
    - If you see a red underline, it is a compilation error. **Fix it.**
    - Run the linter manually if needed:

    ```bash
    npm run lint  # If available, or rely on IDE feedback
    ```

3.  **Run All Tests**:
    ```bash
    npm test
    ```

### Submission Checklist

1.  [ ] `npm run build` passes with NO errors.
2.  [ ] All tests pass.
3.  [ ] No console errors in the browser developer tools.
4.  [ ] Documentation is updated.

## ❓ Common Issues & Troubleshooting

### "Cannot find name 'process'"

If you encounter this error (e.g., in `playwright.config.ts`), it means TypeScript cannot see Node.js global types.

1. Ensure `@types/node` is installed: `npm i --save-dev @types/node`
2. Ensure `tsconfig.json` includes `"types": ["node"]`.

### "Strict Mode Violation" in Tests

Playwright strict mode fails if a selector matches multiple elements.

- **Fix**: Use more specific selectors (e.g., `#globe-container-id .target-class`) instead of generic ones.
