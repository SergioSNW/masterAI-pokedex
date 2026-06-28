# 🚀 High-Performance Pokédex | Next.js 16 & Clean Architecture

A production-grade Pokédex application built with cutting-edge web technologies. Architected using **Clean Architecture** principles, this project ensures complete decoupling, high scalability, and optimized Server-Side Rendering (SSR) performance.

This project serves as a software engineering portfolio piece demonstrating advanced proficiency in React Server Components, state management without third-party dependencies, and Core Web Vitals optimization.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Core Library:** React 19 (Native Hooks & Server Components)
- **Styling:** Tailwind CSS v4 (Modern, high-performance native CSS syntax)
- **Language:** TypeScript 5+ (Strict typing & advanced inference)

---

## 📐 Architectural Design (Clean Architecture)

To avoid traditional monolithic coupling, the application is organized into isolated layers with clear responsibilities:

### 1. Domain Layer (`/types`)
- Defines data models and strict TypeScript contracts based on OpenAPI schemas.
- Completely framework-agnostic; contains no dependencies beyond essential data structures.

### 2. Infrastructure & Data Layer (`/lib`)
- Centralized in `lib/pokeapi.ts`. Abstracts external PokeAPI communication via pure asynchronous functions.
- Leverages **Next.js native fetch** to implement automated Data Caching and revalidation strategies within the Node.js server environment.

### 3. Presentation Layer (`/app` & `/components`)
- **Server Components (Default):** Core views (`/` and `/pokemon/[name]`) are resolved server-side. This reduces client-side JavaScript to near-zero for initial rendering, drastically improving FCP (First Contentful Paint) and SEO performance.
- **Atomic Client Components (`"use client"`):** Critical interactivity (real-time filtering and search) is delegated to low-level atomic components. State is synchronized directly via `URLSearchParams`, ensuring 100% shareable and persistent deep-linking.

---

## ⚡ Engineering Highlights

- **Cumulative Layout Shift (CLS) Mitigation:** Implemented precise dimension controls for external high-resolution sprites (`official-artwork`) using optimized `next/image` capabilities.
- **Waterfall Optimization:** Resolved dynamic detail page bottlenecks by executing concurrent asynchronous flows (species data, stats, and evolution chains) in parallel using `Promise.all`.
- **Standardized Versioning:** Adheres to Semantic Versioning and maintains a detailed `CHANGELOG.md` following [Keep a Changelog v1.1.0](https://keepachangelog.com/en/1.1.0/) standards.

---

## ⚙️ Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install