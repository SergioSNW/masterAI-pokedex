import Image from 'next/image';
import Link from 'next/link';
import type { PokemonDetail } from '@/types/pokemon';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

function formatPokemonName(name: string): string {
  return name.replaceAll('-', ' ');
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const artwork = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="group flex min-h-80 flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      <div className="relative flex aspect-square items-center justify-center bg-zinc-100 p-6 dark:bg-zinc-900">
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-500 ring-1 ring-zinc-200 dark:bg-black dark:text-zinc-400 dark:ring-zinc-800">
          {formatPokemonId(pokemon.id)}
        </span>
        <Image
          src={artwork}
          alt={formatPokemonName(pokemon.name)}
          width={220}
          height={220}
          className="h-48 w-48 object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h2 className="text-xl font-black capitalize text-zinc-950 dark:text-zinc-50">
          {formatPokemonName(pokemon.name)}
        </h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map(({ type }) => (
            <TypeBadge key={type.name} type={type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
}
