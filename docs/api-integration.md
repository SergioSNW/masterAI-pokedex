# PokeAPI Integration

## Purpose

This document describes the Phase 1 integration boundary between the Next.js
application and PokeAPI. The implementation follows the Clean Architecture
rules defined in `AGENTS.md`: domain types are framework-agnostic, API access is
centralized in infrastructure, and presentation code must consume data through
that boundary instead of calling external URLs directly.

## Layer Separation

### Domain Layer

The domain layer lives in `types/pokemon.ts`.

It contains TypeScript interfaces mapped from `context/pokeapi-openapi.json`:

- `NamedAPIResource`
- `PokemonListResponse`
- `PokemonDetail`
- `PokemonSpecies`
- `EvolutionChain`

These interfaces do not import Next.js, React, UI components, or browser APIs.
They describe the shape of the external data contract only. `PokemonDetail`
includes the nested sprite path required by the UI:
`sprites.other["official-artwork"].front_default`.

### Infrastructure Layer

The infrastructure layer lives in `lib/pokeapi.ts`.

It exposes the typed data access functions used by Server Components, route
metadata, and future application services:

- `getPokemonList(limit?: number, offset?: number)`
- `getPokemonByNameOrId(nameOrId: string | number)`
- `getPokemonSpecies(nameOrId: string | number)`
- `getEvolutionChain(id: number)`

The module owns the PokeAPI base URL, resource path construction, identifier
normalization, response validation at the HTTP boundary, and cache policy. This
keeps presentation components free from transport details.

## Native Next.js Cache Strategy

Next.js 16 extends server-side `fetch` with persistent cache and revalidation
options. The PokeAPI data used in Phase 1 is stable enough to cache on the
server, so every request in `lib/pokeapi.ts` uses:

```ts
{
  cache: "force-cache",
  next: {
    revalidate: 86400,
    tags: [...]
  }
}
```

The `force-cache` option allows Next.js to reuse a cached response when it is
fresh. The `revalidate` value limits the cache lifetime to 24 hours, so the app
can refresh remote data periodically without forcing every user request to hit
PokeAPI. Cache tags are assigned by resource family and resource identity, which
keeps the integration ready for future on-demand invalidation with
`revalidateTag`.

## OpenAPI Schema Consumption

The source contract is `context/pokeapi-openapi.json`. The Phase 1 interfaces
were manually mapped from the OpenAPI schemas rather than generated at runtime.
That keeps the runtime bundle small and the domain layer explicit while still
making the contract traceable.

When the OpenAPI contract changes, update the affected interfaces in
`types/pokemon.ts` first, then update `lib/pokeapi.ts` only if endpoint paths,
nullability, or payload shapes change. Presentation components should not need
to change unless the domain model itself changes.

## Presentation Consumption

The frontend consumes PokeAPI only through `lib/pokeapi.ts`.

The home route at `app/page.tsx` remains a Server Component. It loads the first
151 Pokemon, resolves their details in parallel with `Promise.all`, and renders
the reusable `PokemonCard` component for each result. Search is driven by the
`q` URL parameter, so filtered views can be linked and refreshed without a
global state library.

The detail route at `app/pokemon/[name]/page.tsx` is also a Server Component.
It fetches Pokemon detail and species data in parallel, extracts the evolution
chain identifier from the species payload, and then loads the typed evolution
chain model. Loading UI is handled through route-level `loading.tsx` files.

External artwork is rendered with `next/image`. The allowed remote source is
configured in `next.config.ts` for the official PokeAPI sprite repository on
`raw.githubusercontent.com`.
