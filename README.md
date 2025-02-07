# Disclaimer

This repository is a personal project created for practicing the process of building and publishing an open-source library.

---

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![NPM](https://img.shields.io/npm/v/@jovulic/lazy-promise)](https://www.npmjs.com/package/@jovulic/lazy-promise)
[![Build Status](https://img.shields.io/github/actions/workflow/status/jovulic/lazy-promise/build.yml?branch=main)](https://github.com/jovulic/lazy/actions)

# **LazyPromise**

_A lazy promise that waits until you ask it to get to work._

## **📌 Description**

`LazyPromise` is a lightweight utility for lazily initializing values in JavaScript and TypeScript. Specifically, it will not perform any computation until the value is accessed (e.g., awaited). Additionally, `LazyPromise` supports lazy chaining, allowing you to chain operations that also won’t execute until the result is needed.

## **✨ Features**

✅ **Lazy evaluation** – Compute values only when first accessed.  
✅ **Lazy Chaining** – Define transformations to values lazily.  
✅ **Minimal** – No dependencies.  
✅ **TypeScript support** – Fully typed.

## **📦 Installation**

Using npm:

```sh
npm install lazy-promise
```

Using yarn:

```sh
yarn add lazy-promise
```

Using pnpm:

```sh
pnpm add lazy-promise
```

## **🚀 Usage**

### **Basic Example**

```ts
import { LazyPromise } from "lazy-promise";

const lazyValue = new LazyPromise(async () => {
  return "My Lazy Value";
});

(async () => {
  console.log(await lazyValue); // "My Lazy Value"
  console.log(await lazyValue); // "My Lazy Value" (no recomputation)
})();
```

### **Lazy Chaining**

```ts
import { LazyPromise } from "lazy-promise";

const lazyValue = new LazyPromise(async () => {
  return "My Lazy Value";
});

const transformedValue = lazyValue.later((value) => value.toUpperCase());

console.log(await transformedValue); // "MY LAZY VALUE"
```

## 🛠️ Build

This project uses [Nix](https://nixos.org) for development to ensuring a consistent and reproducible environment. It is easy enough to build without it, but the following guide will be using Nix.

Follow these steps to build and work on the project locally:

1. **Install Nix:** If you don't have Nix installed, follow the instructions for your platform at [https://nixos.org/download.html](https://nixos.org/download.html).

2. **Clone the Repository:** Clone the `lazy-promise` repository to your local machine.

   ```bash
   git clone https://github.com/jovulic/lazy-promise.git
   cd lazy-promise
   ```

3. **Enter the Development Shell:** Use the following command to enter the Nix development shell. This will automatically install all the necessary dependencies defined in the `flake.nix` file.

   ```bash
   nix develop
   ```

   This command might take a while the first time as it downloads and installs the dependencies. Subsequent entries into the shell will be much faster.

4. **Install NPM Dependencies:** Once inside the Nix shell, you'll need to install the project's npm dependencies. Even though Nix provides Node.js and npm, the project dependencies are managed by npm. We do this via the `ctl` command that is added into the development shell.

   ```bash
   ctl setup
   ```

5. **Build the Library:** You can now build the library.

   ```bash
   ctl build
   ```

   This will create a `dist` directory containing the compiled library files.
