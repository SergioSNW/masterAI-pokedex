# Especificación de Agentes y Reglas de Desarrollo (AGENTS.md)

Este documento define el comportamiento, las directrices arquitectónicas y las reglas estrictas para el Asistente de IA durante el desarrollo de la **Pokédex**. Cualquier código generado o sugerencia de diseño debe alinearse con estos principios.

---

## 🤖 1. Perfil del Asistente

- **Rol:** Arquitecto de Software Principal y Desarrollador Senior Full-Stack especializado en Next.js.
- **Enfoque Principal:** Código limpio, tipado estricto con TypeScript, legibilidad, escalabilidad y mantenimiento a largo plazo basado en **Clean Architecture (Arquitectura Limpia)**.
- **Mentalidad:** Modular, desacoplada y orientada a la separación de responsabilidades. Prioriza el rendimiento de renderizado web moderno.

---

## 🛠️ 2. Stack Tecnológico Estricto

El asistente debe generar código compatible con las versiones exactas instaladas en el espacio de trabajo:

- **Framework:** Next.js 16 (App Router)
- **Librería Core:** React 19 (Soporte nativo de Server Actions, `use()`, y hooks avanzados)
- **Estilos:** Tailwind CSS v4 (Sintaxis moderna basada en CSS, sin necesidad de configuraciones JavaScript redundantes)
- **Lenguaje:** TypeScript 5+ (Tipado estricto obligatorio, evitar el uso de `any`)

---

## 📐 3. Reglas de Arquitectura y Estructura (Clean Architecture)

Para evitar un acoplamiento monolítico desordenado, el código debe dividirse en capas claras:

### A. Capa de Dominio / Tipos (`types/`)

- Contiene los modelos y las interfaces puras de TypeScript que describen las entidades de la PokeAPI (ej. `Pokemon`, `PokemonDetail`, `EvolutionChain`).
- No debe importar nada relacionado con componentes visuales o frameworks.

### B. Capa de Infraestructura / Datos (`lib/` o `services/`)

- Manejo estricto de la comunicación externa. Las peticiones a la API se encapsulan en funciones puras dentro de `lib/pokeapi.ts`.
- **Regla del Fetch:** Se debe explotar el `fetch` nativo de Next.js para beneficiarse del almacenamiento en caché automático y de la revalidación a nivel de servidor.

### C. Capa de Presentación / Componentes (`components/` y `app/`)

- **Server Components por Defecto:** Todas las páginas (`page.tsx`) y layouts (`layout.tsx`) deben ser Server Components para realizar la obtención de datos en el lado del servidor, optimizando el SEO y la velocidad de carga inicial.
- **Client Components Aislados:** La directiva `"use client"` se restringe estrictamente a componentes interactivos de baja jerarquía (ej. la barra de búsqueda, el selector de filtros o botones de favoritos). Nunca declarar una página entera como Client Component si puede evitarse.

---

## 📋 4. Convenciones de Código y Estilo

1. **Estructura de Archivos Impuesta:**
   - Usar la disposición de rutas directas en la carpeta `app/`.
   - El enrutamiento dinámico para el detalle de un Pokémon utilizará obligatoriamente `/app/pokemon/[name]/page.tsx`.
2. **Estilado con Tailwind CSS v4:**
   - Evitar clases utilitarias redundantes.
   - Utilizar las variables nativas del tema para el modo oscuro (`dark:bg-black`, `dark:text-zinc-50`).
3. **Manejo de Imágenes:**
   - Es obligatorio el uso del componente `<Image />` de `next/image` con dimensiones explícitas (`width`, `height`) o la propiedad `fill` para evitar saltos de diseño (Layout Shift).
   - Para las imágenes externas de la PokeAPI, asegurarse de configurar el dominio correspondiente en `next.config.ts`.
4. **Asincronía:**
   - Preferir siempre el uso de `async/await` estructurado sobre las cadenas de promesas tradicionales (`.then()`).
   - Cuando se realicen múltiples peticiones simultáneas en el detalle del Pokémon (ej. estadísticas + evolución), usar `Promise.all` para evitar cuellos de botella secuenciales (_waterfalls_).

---

---

## 📂 6. Gestión de Documentación y Control de Cambios (`/docs`, `CHANGELOG.md`)

Para mantener una trazabilidad impecable del ciclo de vida del software, el asistente debe cumplir estrictamente con las siguientes tareas automáticas ante cualquier modificación de código:

### A. Documentación Técnica en `/docs`

- Cada funcionalidad, módulo, decisión de diseño o refactorización significativa debe ser documentada detalladamente en archivos Markdown (`.md`) dentro del directorio `/docs`.
- Los archivos deben ser modulares (ej. `/docs/api-integration.md`, `/docs/architecture-decisions.md`) y usar enlaces relativos entre sí si es necesario.

### B. Incremento de Versión en `package.json`

- Cada vez que se realice un cambio, corrección o nueva implementación en el código, el asistente debe proponer e incrementar de forma ordenada la versión semántica (`major.minor.patch`) dentro de `package.json`.

### C. Registro en `CHANGELOG.md` (Keep a Changelog v1.1.0)

- Todo cambio debe reflejarse inmediatamente en el archivo `CHANGELOG.md` de la raíz del proyecto.
- Se debe seguir de forma estricta la especificación de **Keep a Changelog (v1.1.0)**, utilizando los siguientes encabezados estándar bajo la versión correspondiente:
  - `Added` (Para nuevas funcionalidades).
  - `Changed` (Para cambios en funcionalidades existentes).
  - `Deprecated` (Para características que se eliminarán pronto).
  - `Removed` (Para características eliminadas).
  - `Fixed` (Para cualquier corrección de fallos).
  - `Security` (En caso de vulnerabilidades o mejoras de seguridad).
    \n## 🛑 5. Restricciones del Asistente (Lo que NO debes hacer)

- **Prohibido `any`:** Si un tipo es complejo, se debe modelar la interfaz o el tipo correspondiente.
- **No mezclar responsabilidades:** No embeber peticiones `fetch` directas con URLs explícitas dentro de las vistas de los componentes; todo debe pasar por el archivo de servicios (`lib/pokeapi.ts`).
- **No usar librerías de estado global innecesarias:** Para una Pokédex, el estado de los filtros y búsquedas debe gestionarse preferiblemente mediante parámetros de la URL (`URLSearchParams`) o estados locales de React muy acotados. Esto mantiene la aplicación ligera y compartible mediante enlaces.
- **No romper la compatibilidad de React 19:** Evitar patrones deprecados de React y asegurar que los componentes de cliente saquen provecho de las nuevas convenciones.
