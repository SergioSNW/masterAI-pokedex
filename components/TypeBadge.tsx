const typeClassNames: Record<string, string> = {
  bug: "bg-lime-100 text-lime-800 ring-lime-200 dark:bg-lime-950 dark:text-lime-200 dark:ring-lime-800",
  dark: "bg-zinc-200 text-zinc-900 ring-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700",
  dragon:
    "bg-indigo-100 text-indigo-800 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:ring-indigo-800",
  electric:
    "bg-yellow-100 text-yellow-900 ring-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:ring-yellow-800",
  fairy:
    "bg-pink-100 text-pink-800 ring-pink-200 dark:bg-pink-950 dark:text-pink-200 dark:ring-pink-800",
  fighting:
    "bg-red-100 text-red-800 ring-red-200 dark:bg-red-950 dark:text-red-200 dark:ring-red-800",
  fire: "bg-orange-100 text-orange-900 ring-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:ring-orange-800",
  flying:
    "bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:ring-sky-800",
  ghost:
    "bg-violet-100 text-violet-800 ring-violet-200 dark:bg-violet-950 dark:text-violet-200 dark:ring-violet-800",
  grass:
    "bg-green-100 text-green-800 ring-green-200 dark:bg-green-950 dark:text-green-200 dark:ring-green-800",
  ground:
    "bg-amber-100 text-amber-900 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-800",
  ice: "bg-cyan-100 text-cyan-800 ring-cyan-200 dark:bg-cyan-950 dark:text-cyan-200 dark:ring-cyan-800",
  normal:
    "bg-stone-100 text-stone-800 ring-stone-200 dark:bg-stone-900 dark:text-stone-200 dark:ring-stone-700",
  poison:
    "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-200 dark:ring-fuchsia-800",
  psychic:
    "bg-rose-100 text-rose-800 ring-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:ring-rose-800",
  rock: "bg-yellow-100 text-yellow-950 ring-yellow-300 dark:bg-yellow-950 dark:text-yellow-200 dark:ring-yellow-800",
  steel:
    "bg-slate-100 text-slate-800 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700",
  water:
    "bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:ring-blue-800",
};

interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const normalizedType = type.toLowerCase();
  const className =
    typeClassNames[normalizedType] ??
    "bg-zinc-100 text-zinc-800 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-700";

  return (
    <span
      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-bold uppercase ring-1 ${className}`}
    >
      {normalizedType}
    </span>
  );
}
