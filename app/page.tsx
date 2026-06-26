import { PokemonCard } from "@/components/PokemonCard";
import { PokemonSearch } from "@/components/PokemonSearch";
import { getPokemonByNameOrId, getPokemonList } from "@/lib/pokeapi";

interface HomeProps {
  searchParams?: Promise<{
    q?: string;
  }>;
}

function normalizeQuery(query: string | undefined): string {
  return query?.trim().toLowerCase() ?? "";
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const query = normalizeQuery(resolvedSearchParams?.q);
  const pokemonList = await getPokemonList(151, 0);
  const pokemonDetails = await Promise.all(
    pokemonList.results.map(({ name }) => getPokemonByNameOrId(name)),
  );
  const filteredPokemon = query
    ? pokemonDetails.filter((pokemon) => {
        const matchesName = pokemon.name.includes(query);
        const matchesType = pokemon.types.some(({ type }) =>
          type.name.includes(query),
        );

        return matchesName || matchesType;
      })
    : pokemonDetails;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8">
      <section className="grid gap-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] md:items-end">
        <div>
          <p className="text-sm font-bold uppercase text-red-600 dark:text-red-400">
            MasterAI Pokedex
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-6xl">
            Explora la primera generacion Pokemon
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Consulta tarjetas, tipos, estadisticas y evoluciones usando datos
            vivos de PokeAPI servidos desde Server Components.
          </p>
        </div>
        <PokemonSearch defaultValue={query} />
      </section>

      <section className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
          {query ? `Resultados para "${query}"` : "Pokemon"}
        </h2>
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {filteredPokemon.length} de {pokemonDetails.length}
        </p>
      </section>

      {filteredPokemon.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-950">
          <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
            Sin resultados
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Prueba con otro nombre o tipo de Pokemon.
          </p>
        </section>
      )}
    </main>
  );
}
