# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-06-26

### Added

- Creado el componente interactivo de cliente `PokemonSearch.tsx` para filtrado en tiempo real utilizando `URLSearchParams`.
- Creado el componente visual modular `StatBar.tsx` para la representación gráfica de las estadísticas base de los Pokémon.
- Creado el componente recursivo asíncrono `EvolutionChainView.tsx` para procesar y renderizar la línea genética completa de cada especie.
- Implementado el componente atómico `TypeBadge.tsx` para el estilado cromático automatizado según el tipo elemental del Pokémon.
- Diseñados los contenedores asíncronos y esqueletos de carga (`loading.tsx`) optimizados para la experiencia de carga en baja conectividad.
- Añadido el documento de especificación técnica `/docs/api-integration.md`.

### Changed

- Refactorizada la página principal (`app/page.tsx`) y la ruta dinámica (`app/pokemon/[name]/page.tsx`) para operar estrictamente como Server Components de alto rendimiento bajo React 19.
- Reescripto por completo el archivo `README.md` con un enfoque técnico avanzado orientado a portafolio y visualización de reclutadores.

### Fixed

- **Bypass de Vercel:** Reemplazado `next.config.ts` por un archivo estandarizado CommonJS `next.config.js` para evadir el error silencioso del script remoto de Vercel (`modifyConfig`).
- **Limpieza de Tipos:** Eliminados de forma definitiva los archivos redundantes y conflictivos `types/validator.ts` y `types/routes.d.ts` que hacían colapsar al compilador estricto de TypeScript (`tsc`) durante la fase final de despliegue en la nube.

## [0.1.0] - 2026-06-26

### Added

- Inicialización del proyecto base con Next.js 16 (App Router), React 19 y Tailwind CSS v4.
- Configuración inicial de las directrices estrictas en `AGENTS.md` y el contrato simplificado `pokeapi-openapi.json`.
