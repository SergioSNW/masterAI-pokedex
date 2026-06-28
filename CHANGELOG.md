# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.8] - 2026-06-28

### Changed

- Sincronizadas y fijadas las firmas de dependencias del core de React 19 para neutralizar advertencias de paridad en el resolutor ERESOLVE de entornos remotos.

## [0.5.7] - 2026-06-28

### Added

- Implementado soporte de internacionalización nativa Multi-5 (Inglés, Español, Francés, Alemán e Italiano) gestionado desde el servidor.
- Añadido un conmutador de vistas interactivo para alternar dinámicamente entre el modo cuadrícula (`grid`) y el modo lista compacto (`list`).
- Sincronización de estado avanzada persistiendo los parámetros de configuración (`view` y `lang`) en la URL a través de `URLSearchParams`.

### Changed

- Refactorizada la maquetación y jerarquía visual de la cabecera en `app/page.tsx` para clonar con fidelidad la tipografía de la producción en vivo, integrando la marca corporativa `"MasterAI Pokedex"` en un tono rojizo destacado.

### Fixed

- Corregidos errores de resolución tipográfica y de sintaxis en el diccionario estático de traducciones del Home.
- Asegurada la resiliencia del formulario original de búsqueda activa y el filtrado por tipo elemental de Pokémon en combinación con los selectores rápidos de interfaz.

## [0.4.0] - 2026-06-26

### Added

- Creado el componente interactivo de cliente `PokemonSearch.tsx` para filtrado en tiempo real.
- Creado el componente visual modular `StatBar.tsx` para la representación gráfica de estadísticas base.
- Creado el componente recursivo asíncrono `EvolutionChainView.tsx` para procesar la línea genética de cada especie.
- Implementado el componente atómico `TypeBadge.tsx` para el estilado cromático automatizado según el tipo elemental.
- Diseñados los contenedores asíncronos y esqueletos de carga (`loading.tsx`).
- Añadido el documento de especificación técnica `/docs/api-integration.md`.

### Changed

- Refactorizada la página principal (`app/page.tsx`) y la ruta dinámica (`app/pokemon/[name]/page.tsx`) para operar estrictamente como Server Components bajo React 19.
- Reescrito el archivo `README.md` con enfoque avanzado de portafolio técnico para reclutadores.

### Fixed

- **Bypass de Vercel:** Reemplazado `next.config.ts` por un archivo estandarizado CommonJS `next.config.js` para evadir el error silencioso del script remoto de Vercel (`modifyConfig`).
- **Limpieza de Tipos:** Eliminados los archivos redundantes y conflictivos `types/validator.ts` y `types/routes.d.ts` que hacían colapsar al compilador estricto de TypeScript (`tsc`) durante el despliegue.

## [0.1.0] - 2026-06-26

### Added

- Inicialización del proyecto base con Next.js 16 (App Router), React 19 y Tailwind CSS v4.
- Configuración inicial de las directrices de Clean Architecture en `AGENTS.md` y el contrato simplificado `pokeapi-openapi.json`.
