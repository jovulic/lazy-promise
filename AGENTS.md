# Project: Lazy Promise

This file provides a comprehensive overview of the `lazy-promise` project, its structure, and development conventions to be used as instructional context for future interactions.

## Project Overview

`lazy-promise` is a lightweight TypeScript library that provides a `LazyPromise` class. This utility allows for the lazy initialization of values, meaning that the computation of a value is deferred until it is explicitly accessed (e.g., when it is `await`ed).

The core features include:

- **Lazy Evaluation:** The wrapped function is not executed until the promise is awaited.
- **Caching:** The result of the computation is cached, and subsequent accesses will return the cached value without re-computation.
- **Lazy Chaining:** The `.later()` method allows for chaining transformations that are also evaluated lazily.
- **Reset:** The `.reset()` method allows for clearing the cached value to force re-computation on the next access.

The project is written in TypeScript and has no production dependencies.

## Building and Running

The project uses `npm` for dependency management and running scripts. The primary commands are defined in the `scripts` section of `package.json`.

### Key Commands

- **Install Dependencies:**

  ```bash
  npm install
  ```

- **Build the library:**

  ```bash
  npm run build
  ```

  This command cleans the `dist` directory and compiles the TypeScript code using the `tsconfig.build.json` configuration.

- **Run tests:**

  ```bash
  npm run test
  ```

  This command executes the test suite using `vitest`.

- **Lint the code:**

  ```bash
  npm run lint
  ```

  This command runs `eslint` to check for code quality and style issues.

- **Format the code:**
  ```bash
  npm run format
  ```
  This command uses `prettier` to format the codebase.

### Development Environment

The project also includes a `justfile` which provides convenience wrappers around the `npm` scripts. The `README.md` mentions a Nix-based development environment, but the project can be developed using a standard Node.js and npm setup.

## Development Conventions

### Code Style

The project enforces a consistent code style through Prettier and ESLint.

- **Prettier:** The configuration is in `prettier.config.mjs`. Code should be formatted before committing.
- **ESLint:** The configuration is in `eslint.config.mjs`. All linting errors should be addressed.

### Testing

The project uses `vitest` for unit testing.

- Test files are located in the `src` directory, with the `.test.ts` extension (e.g., `src/index.test.ts`).
- Tests should be written to cover all new functionality and bug fixes.

### Continuous Integration

The project uses GitHub Actions for continuous integration. The workflow is defined in `.github/workflows/check.yml`. On every push to the `main` branch, the following steps are executed:

1.  Install dependencies (`npm ci`)
2.  Lint the code (`npm run lint`)
3.  Run tests (`npm run test`)
4.  Build the project (`npm run build`)

All checks must pass for a pull request to be merged.
