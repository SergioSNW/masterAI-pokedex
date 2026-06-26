# 🚀 High-Performance Pokédex | Next.js 16 & Clean Architecture

Una Pokédex de nivel de producción construida con las tecnologías web más vanguardistas, diseñada bajo principios de **Clean Architecture** para garantizar desacoplamiento total, escalabilidad y un rendimiento óptimo de renderizado del lado del servidor.

Este proyecto sirve como una pieza de portafolio de ingeniería de software que demuestra el manejo avanzado de Server Components, tipado estricto sin dependencias de estado de terceros y optimizaciones de Core Web Vitals.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Librería Core:** React 19 (Hooks nativos y Server Components por defecto)
- **Estilos:** Tailwind CSS v4 (Sintaxis moderna de CSS nativo de alta velocidad)
- **Lenguaje:** TypeScript 5+ (Tipado estricto e inferencia avanzada)

---

## 📐 Decisiones de Arquitectura (Clean Architecture)

Para evitar el acoplamiento monolítico tradicional, la aplicación se divide en capas bien delimitadas con responsabilidades aisladas:

### 1. Capa de Dominio (`/types`)

- Define modelos de datos y contratos puros de TypeScript basados estrictamente en esquemas OpenAPI.
- Completamente agnóstica a frameworks o UI; no importa nada ajeno a tipos de datos esenciales.

### 2. Capa de Infraestructura y Datos (`/lib`)

- Centralizada en `lib/pokeapi.ts`. Abstrae la comunicación externa de la PokeAPI mediante funciones puras asíncronas.
- Saca partido del **fetch nativo de Next.js** para inyectar estrategias automáticas de almacenamiento en caché (_Data Caching_) y revalidación de datos en el servidor Node.js.

### 3. Capa de Presentación (`/app` y `/components`)

- **Server Components (Por Defecto):** Las vistas principales (`/` y `/pokemon/[name]`) se resuelven en el servidor. Esto reduce a cero el JavaScript enviado al cliente para el renderizado inicial, mejorando drásticamente el FCP (First Contentful Paint) y el SEO.
- **Client Components Aislados (`"use client"`):** La interactividad crítica (filtros y barras de búsqueda en tiempo real) se delega a hojas de componente atómicas de baja jerarquía. El estado se sincroniza directamente mediante `URLSearchParams`, permitiendo enlaces 100% compartibles y persistentes.

---

## ⚡ Optimizaciones Destacadas

- **Cero Cumulative Layout Shift (CLS):** Control de renderizado de sprites externos de alta resolución (`sprites.other['official-artwork']`) utilizando dimensiones explícitas a través de las capacidades del componente optimizado `next/image`.
- **Eliminación de Cuellos de Botella (Waterfalls):** En la pantalla de detalle dinámico, los flujos asíncronos concurrentes (especies, estadísticas y cadenas evolutivas) se resuelven de forma paralela mediante `Promise.all`.
- **Automatización de Procesos:** Cumplimiento estricto de control de versiones semánticas y bitácora de cambios detallada bajo los estándares internacionales de _Keep a Changelog v1.1.0_.

---

## ⚙️ Configuración Local

1. Clona el repositorio e instala sus dependencias:
   ```bash
   npm install
   ```
