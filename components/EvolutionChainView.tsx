import Link from "next/link";
import type { ChainLink } from "@/types/pokemon";

interface EvolutionChainViewProps {
  chain: ChainLink;
}

function flattenEvolutionChain(chain: ChainLink): ChainLink[] {
  return [chain, ...chain.evolves_to.flatMap(flattenEvolutionChain)];
}

function formatPokemonName(name: string): string {
  return name.replaceAll("-", " ");
}

export function EvolutionChainView({ chain }: EvolutionChainViewProps) {
  const links = flattenEvolutionChain(chain);

  return (
    <ol className="flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={link.species.name}>
          <Link
            href={`/pokemon/${link.species.name}`}
            className="inline-flex min-h-10 items-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-bold capitalize text-zinc-800 transition hover:border-red-300 hover:text-red-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-red-800 dark:hover:text-red-300"
          >
            {formatPokemonName(link.species.name)}
          </Link>
        </li>
      ))}
    </ol>
  );
}
