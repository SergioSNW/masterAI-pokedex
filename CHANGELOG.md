# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-06-26

### Added

- Added the complete Pokedex frontend with Pokemon cards, search, loading states, and detail pages.
- Added reusable presentation components for Pokemon cards, type badges, stat bars, and evolution chains.
- Added remote image configuration for official PokeAPI artwork.

### Changed

- Updated the package version from `0.2.0` to `0.3.0`.
- Replaced the default Next.js starter page and metadata with the Pokedex application experience.

## [0.2.0] - 2026-06-26

### Added

- Added strict Pokemon domain interfaces in `types/pokemon.ts` based on `context/pokeapi-openapi.json`.
- Added the PokeAPI infrastructure client in `lib/pokeapi.ts` with typed data access functions.
- Added technical documentation for the PokeAPI integration in `docs/api-integration.md`.

### Changed

- Updated the package version from `0.1.0` to `0.2.0`.
