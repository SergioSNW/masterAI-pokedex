import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvolutionChainView } from "@/components/EvolutionChainView";
import { StatBar } from "@/components/StatBar";
import { TypeBadge } from "@/components/TypeBadge";
import {
  getEvolutionChain,
  getPokemonByNameOrId,
  getPokemonSpecies,
} from "@/lib/pokeapi";
import type { PokemonSpecies } from "@/types/pokemon";

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

function formatPokemonName(name: string): string {
  return name.replaceAll("-", " ");
}

function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

function getEvolutionChainId(url: string): number {
  const segments = url.split("/").filter(Boolean);
  const id = Number(segments.at(-1));

  if (!Number.isInteger(id)) {
    throw new Error(`Invalid evolution chain URL: ${url}`);
  }

  return id;
}

function getEnglishFlavorText(
  entries: PokemonSpecies["flavor_text_entries"],
): string {
  const entry =
    entries.find(({ language }) => language.name === "en") ?? entries.at(0);

  return entry
    ? entry.flavor_text.replaceAll("\n", " ").replaceAll("\f", " ")
    : "No description available.";
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${formatPokemonName(name)} | MasterAI Pokedex`,
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;

  try {
    const [pokemon, species] = await Promise.all([
      getPokemonByNameOrId(name),
      getPokemonSpecies(name),
    ]);
    const evolutionChain = await getEvolutionChain(
      getEvolutionChainId(species.evolution_chain.url),
    );
    const artwork = pokemon.sprites.other["official-artwork"].front_default;
    const description = getEnglishFlavorText(species.flavor_text_entries);

    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8">
        <Link
          href="/"
          className="inline-flex min-h-10 w-fit items-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-700 transition hover:border-red-300 hover:text-red-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-red-800 dark:hover:text-red-300"
        >
          Volver
        </Link>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex aspect-square items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={artwork}
              alt={formatPokemonName(pokemon.name)}
              width={420}
              height={420}
              priority
              className="h-full max-h-[26rem] w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-7">
            <div>
              <p className="font-mono text-sm font-bold text-red-600 dark:text-red-400">
                {formatPokemonId(pokemon.id)}
              </p>
              <h1 className="mt-2 text-5xl font-black capitalize tracking-normal text-zinc-950 dark:text-zinc-50">
                {formatPokemonName(pokemon.name)}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {pokemon.types.map(({ type }) => (
                  <TypeBadge key={type.name} type={type.name} />
                ))}
              </div>
            </div>

            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              {description}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-bold uppercase text-zinc-500">
                  Altura
                </p>
                <p className="mt-1 text-2xl font-black text-zinc-950 dark:text-zinc-50">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-bold uppercase text-zinc-500">Peso</p>
                <p className="mt-1 text-2xl font-black text-zinc-950 dark:text-zinc-50">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-bold uppercase text-zinc-500">
                  Experiencia
                </p>
                <p className="mt-1 text-2xl font-black text-zinc-950 dark:text-zinc-50">
                  {pokemon.base_experience}
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
                Estadisticas
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {pokemon.stats.map((stat) => (
                  <StatBar key={stat.stat.name} stat={stat} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
                Habilidades
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <li
                    key={ability.name}
                    className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-bold capitalize text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  >
                    {formatPokemonName(ability.name)}
                    {is_hidden ? " oculta" : ""}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
                Evolucion
              </h2>
              <div className="mt-4">
                <EvolutionChainView chain={evolutionChain.chain} />
              </div>
            </section>
          </div>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
