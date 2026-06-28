"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, FormEvent } from "react";

const LANGUAGES = [
  { code: "en", label: "🇬🇧 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "it", label: "🇮🇹 Italiano" }
];

const POKEMON_TYPES = [
  "normal", "fire", "water", "grass", "electric", "ice", 
  "fighting", "poison", "ground", "flying", "psychic", "bug", 
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

// Diccionario atómico interno para los textos fijos de la UI según el idioma seleccionado
const uiText: Record<string, { search: string; selectType: string; allTypes: string; button: string; grid: string; list: string }> = {
  en: { search: "Search Pokémon...", selectType: "All Types", allTypes: "All Types", button: "Search", grid: "Grid", list: "List" },
  es: { search: "Buscar Pokémon...", selectType: "Todos los tipos", allTypes: "Todos los tipos", button: "Buscar", grid: "Tarjetas", list: "Lista" },
  fr: { search: "Rechercher...", selectType: "Tous les types", allTypes: "Tous les types", button: "Chercher", grid: "Grille", list: "Liste" },
  de: { search: "Suchen...", selectType: "Alle Typen", allTypes: "Alle Typen", button: "Suchen", grid: "Gitter", list: "Liste" },
  it: { search: "Cerca...", selectType: "Tutti i tipi", allTypes: "Tutti i tipi", button: "Cerca", grid: "Griglia", list: "Lista" }
};

export default function PokemonSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const query = searchParams.get("query") || "";
  const selectedType = searchParams.get("type") || "";
  const currentView = searchParams.get("view") || "grid";
  const currentLang = searchParams.get("lang") || "en";

  const t = uiText[currentLang] || uiText.en;

  // Manejador del envío del Formulario nativo para mantener tu lógica exacta de búsqueda
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchVal = formData.get("query")?.toString().trim() || "";
    const typeVal = formData.get("type")?.toString() || "";

    const params = new URLSearchParams(searchParams.toString());
    
    if (searchVal) params.set("query", searchVal);
    else params.delete("query");

    if (typeVal) params.set("type", typeVal);
    else params.delete("type");

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  // Actualizador atómico para los parámetros rápidos (Idioma y Tipo de Vista)
  const updateQuickParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div 
      className="mb-8 space-y-4 bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-opacity duration-200"
      style={{ opacity: isPending ? 0.7 : 1 }}
    >
      {/* FORMULARIO PRINCIPAL RECUPERADO */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            name="query"
            placeholder={t.search}
            defaultValue={query}
            className="w-full px-4 py-2.5 border rounded-xl bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-zinc-900 dark:text-zinc-50 transition-all"
          />
        </div>

        {/* Selector de Tipo Elemental Original */}
        <div className="w-full sm:w-48">
          <select
            name="type"
            defaultValue={selectedType}
            className="w-full px-3 py-2.5 border rounded-xl bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-2 focus:ring-red-500 capitalize"
          >
            <option value="">{t.allTypes}</option>
            {POKEMON_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de Envío del Formulario */}
        <button
          type="submit"
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer active:scale-98"
        >
          {t.button}
        </button>
      </form>

      {/* PANEL INFERIOR: CONFIGURACIÓN DE INTERFAZ (VISTA E IDIOMA) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        {/* Selector Multi-5 de Idioma */}
        <div className="flex items-center gap-2">
          <select
            value={currentLang}
            onChange={(e) => updateQuickParam("lang", e.target.value)}
            className="px-3 py-1.5 border rounded-lg bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-2 focus:ring-red-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Switch de Modo Tarjeta / Modo Lista */}
        <div className="inline-flex rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-1 text-sm">
          <button
            type="button"
            onClick={() => updateQuickParam("view", "grid")}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              currentView === "grid"
                ? "bg-red-500 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {t.grid}
          </button>
          <button
            type="button"
            onClick={() => updateQuickParam("view", "list")}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              currentView === "list"
                ? "bg-red-500 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {t.list}
          </button>
        </div>
      </div>
    </div>
  );
}