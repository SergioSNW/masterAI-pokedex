interface PokemonSearchProps {
  defaultValue?: string;
}

export function PokemonSearch({ defaultValue = "" }: PokemonSearchProps) {
  return (
    <form action="/" className="flex w-full flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="pokemon-search">
        Buscar Pokemon
      </label>
      <input
        id="pokemon-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Buscar por nombre o tipo"
        className="min-h-12 flex-1 rounded-lg border border-zinc-300 bg-white px-4 text-base text-zinc-950 outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-red-400 dark:focus:ring-red-950"
      />
      <button
        type="submit"
        className="min-h-12 rounded-lg bg-red-600 px-6 text-sm font-bold uppercase text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-black"
      >
        Buscar
      </button>
    </form>
  );
}
