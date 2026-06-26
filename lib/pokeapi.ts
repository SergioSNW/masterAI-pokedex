import type {
  EvolutionChain,
  PokemonDetail,
  PokemonListResponse,
  PokemonSpecies,
} from "@/types/pokemon";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const POKEAPI_REVALIDATE_SECONDS = 60 * 60 * 24;

type PokeApiResource = "pokemon" | "pokemon-species" | "evolution-chain";

function normalizeResourceId(nameOrId: string | number): string {
  return encodeURIComponent(String(nameOrId).trim().toLowerCase());
}

function buildPokeApiUrl(resource: PokeApiResource, path = ""): string {
  const normalizedPath = path ? `/${path}` : "";

  return `${POKEAPI_BASE_URL}/${resource}${normalizedPath}`;
}

async function fetchPokeApi<TResponse>(
  url: string,
  cacheTags: string[],
): Promise<TResponse> {
  const response = await fetch(url, {
    cache: "force-cache",
    next: {
      revalidate: POKEAPI_REVALIDATE_SECONDS,
      tags: cacheTags,
    },
  });

  if (!response.ok) {
    throw new Error(
      `PokeAPI request failed with ${response.status} ${response.statusText}: ${url}`,
    );
  }

  return (await response.json()) as TResponse;
}

export async function getPokemonList(
  limit = 151,
  offset = 0,
): Promise<PokemonListResponse> {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  return fetchPokeApi<PokemonListResponse>(
    `${buildPokeApiUrl("pokemon")}?${searchParams.toString()}`,
    ["pokemon-list"],
  );
}

export async function getPokemonByNameOrId(
  nameOrId: string | number,
): Promise<PokemonDetail> {
  const resourceId = normalizeResourceId(nameOrId);

  return fetchPokeApi<PokemonDetail>(
    buildPokeApiUrl("pokemon", resourceId),
    ["pokemon-detail", `pokemon-detail:${resourceId}`],
  );
}

export async function getPokemonSpecies(
  nameOrId: string | number,
): Promise<PokemonSpecies> {
  const resourceId = normalizeResourceId(nameOrId);

  return fetchPokeApi<PokemonSpecies>(
    buildPokeApiUrl("pokemon-species", resourceId),
    ["pokemon-species", `pokemon-species:${resourceId}`],
  );
}

export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  const resourceId = normalizeResourceId(id);

  return fetchPokeApi<EvolutionChain>(
    buildPokeApiUrl("evolution-chain", resourceId),
    ["evolution-chain", `evolution-chain:${resourceId}`],
  );
}
