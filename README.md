# Disclaimer

This repository is a personal project created for practicing the process of building and publishing an open-source library.

# **Lazy Promise**

_A lazy promise that waits until you ask it to get to work._

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## **📌 Description**

`Lazy Promise` is a lightweight utility for **lazily initializing** values in JavaScript and TypeScript. Its main feature is lazy evaluation, ensuring that no computation occurs until the value is explicitly awaited. Additionally, `Lazy Promise` supports lazy chaining.

## **✨ Features**

✅ **Lazy evaluation** – Compute values only when first accessed.  
✅ **Lazy Chaining** – Define transformations to values lazily.  
✅ **Minimal** – No dependencies.  
✅ **TypeScript support** – Fully typed with excellent autocompletion.

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

### **Chaining**

```ts
import { LazyPromise } from "lazy-promise";

const lazyValue = new LazyPromise(async () => {
  return "My Lazy Value";
});

const transformedValue = lazyValue.then((value) => value.toUpperCase());

console.log(await transformedValue); // "MY LAZY VALUE"
```
