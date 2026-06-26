import type { PokemonStat } from "@/types/pokemon";

interface StatBarProps {
  stat: PokemonStat;
}

function formatStatName(name: string): string {
  const aliases: Record<string, string> = {
    attack: "Ataque",
    defense: "Defensa",
    hp: "PS",
    "special-attack": "At. Esp.",
    "special-defense": "Def. Esp.",
    speed: "Velocidad",
  };

  return aliases[name] ?? name.replaceAll("-", " ");
}

export function StatBar({ stat }: StatBarProps) {
  const percentage = Math.min(Math.round((stat.base_stat / 255) * 100), 100);

  return (
    <div className="grid grid-cols-[6rem_3rem_1fr] items-center gap-3 text-sm">
      <span className="font-semibold capitalize text-zinc-700 dark:text-zinc-300">
        {formatStatName(stat.stat.name)}
      </span>
      <span className="text-right font-mono text-zinc-500 dark:text-zinc-400">
        {stat.base_stat}
      </span>
      <div className="h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-red-600 dark:bg-red-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
