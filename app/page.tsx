import { getPokemonList, getPokemonByNameOrId } from '@/lib/pokeapi';
import { PokemonCard } from '@/components/PokemonCard';
import PokemonSearch from '@/components/PokemonSearch';
import Link from 'next/link';
import Image from 'next/image';
import { TypeBadge } from '@/components/TypeBadge';

// Tipado estricto para los searchParams asíncronos exigidos en Next.js 16
interface PageProps {
  searchParams: Promise<{
    query?: string;
    type?: string;
    view?: string;
    lang?: string;
  }>;
}

// Diccionario multi-idioma alineado rigurosamente con tus 3 textos reales de Vercel
const localTitles: Record<
  string,
  { brand: string; title: string; subtitle: string; empty: string }
> = {
  en: {
    brand: 'MasterAI Pokedex',
    title: 'Explore the first generation Pokémon',
    subtitle:
      'Check cards, types, stats and evolutions using live PokeAPI data served from Server Components.',
    empty: 'No Pokémon found matching your search.',
  },
  es: {
    brand: 'MasterAI Pokedex',
    title: 'Explora la primera generación Pokémon',
    subtitle:
      'Consulta tarjetas, tipos, estadísticas y evoluciones usando datos vivos de PokeAPI servidos desde Server Components.',
    empty: 'No se encontraron Pokémon que coincidan con la búsqueda.',
  },
  fr: {
    brand: 'MasterAI Pokédex',
    title: 'Explorez la première génération de Pokémon',
    subtitle:
      "Consultez les cartes, les types, les statistiques et les évolutions à l'aide de données PokeAPI en direct servies par les Server Components.",
    empty: 'Aucun Pokémon ne correspond à votre recherche.',
  },
  de: {
    brand: 'MasterAI Pokédex',
    title: 'Erkunde die erste Generation Pokémon',
    subtitle:
      'Überprüfen Sie Karten, Typen, Statistiken und Entwicklungen mithilfe von Live-PokeAPI-Daten, die von Server-Komponenten bereitgestellt werden.',
    empty: 'Keine Pokémon passend zu Ihrer Suche gefunden.',
  },
  it: {
    brand: 'MasterAI Pokédex',
    title: 'Esplora la prima generazione di Pokémon',
    subtitle:
      'Controlla carte, tipi, statistiche ed evoluzioni utilizzando i dati PokeAPI in tempo reale serviti dai Server Components.',
    empty: 'Nessun Pokémon trovato corrispondente alla ricerca.',
  },
};

export default async function Home({ searchParams }: PageProps) {
  // Resolución asíncrona de las propiedades de búsqueda de la URL
  const params = await searchParams;
  const query = params.query?.toLowerCase().trim() || '';
  const selectedType = params.type?.toLowerCase().trim() || '';
  const view = params.view || 'grid';
  const lang = params.lang || 'en';

  // Selección de los textos del idioma activo
  const text = localTitles[lang] || localTitles.en;

  // Obtención de datos del lado del servidor (Infraestructura)
  const listResponse = await getPokemonList(151, 0);

  // Consultas concurrentes en paralelo sin cuellos de botella (Waterfalls)
  const pokemonDetails = await Promise.all(
    listResponse.results.map((p) => getPokemonByNameOrId(p.name)),
  );

  // Filtrado de datos por el buscador de texto y el menú por tipo elemental
  const filteredPokemon = pokemonDetails.filter((pokemon) => {
    const matchesQuery =
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.id.toString() === query;
    const matchesType = selectedType
      ? pokemon.types.some((t) => t.type.name.toLowerCase() === selectedType)
      : true;
    return matchesQuery && matchesType;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* CABECERA COPIADA AL 100% DE TU ESTILO EN VERCEL */}
      <header className="mb-8 text-center space-y-3">
        {/* Texto de Marca en tonalidad rojiza */}
        <p className="text-red-500 dark:text-red-400 font-bold tracking-wide text-sm md:text-base">
          {text.brand}
        </p>

        {/* Título Principal */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight transition-colors">
          {text.title}
        </h1>

        {/* Subtítulo Descriptivo */}
        <p className="max-w-3xl mx-auto text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
          {text.subtitle}
        </p>
      </header>

      {/* Inputs de búsqueda interactivos del cliente */}
      <PokemonSearch />

      {/* Listado condicional regulado */}
      {filteredPokemon.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500 dark:text-zinc-400 font-medium">
          {text.empty}
        </div>
      ) : view === 'grid' ? (
        /* VISTA DE TARJETAS (GRID) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        /* VISTA DE LISTA (FILAS) */
        <div className="space-y-3 max-w-4xl mx-auto">
          {filteredPokemon.map((pokemon) => (
            <Link
              href={`/pokemon/${pokemon.name}?lang=${lang}`}
              key={pokemon.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:shadow-xs hover:border-red-500 dark:hover:border-red-500 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono font-bold text-zinc-400 dark:text-zinc-600 group-hover:text-red-500 transition-colors">
                  #{String(pokemon.id).padStart(3, '0')}
                </span>

                <div className="relative w-12 h-12 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-1 group-hover:scale-105 transition-transform">
                  <Image
                    src={
                      pokemon.sprites.other['official-artwork'].front_default ||
                      pokemon.sprites.front_default ||
                      '/file.svg'
                    }
                    alt={pokemon.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                    priority={pokemon.id <= 12}
                  />
                </div>

                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 capitalize group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  {pokemon.name}
                </span>
              </div>

              <div className="flex gap-1.5 items-center">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.slot} type={t.type.name} />
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
