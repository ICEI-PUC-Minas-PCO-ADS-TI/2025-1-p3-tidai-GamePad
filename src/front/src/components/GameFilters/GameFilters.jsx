import React from "react";
import { GAMES, GENRES } from "../../db/dbmock";

function GameFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar por nome..."
        className="px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-200"
        value={filters.name}
        onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
      />
      <select
        className="px-3 py-2 rounded-lg cursor-pointer border border-zinc-600 bg-zinc-800 text-zinc-200"
        value={filters.genre}
        onChange={(e) => setFilters((f) => ({ ...f, genre: e.target.value }))}
      >
        <option value="">Todos os gêneros</option>
        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <select
        className="px-3 py-2  rounded-lg border cursor-pointer border-zinc-600 bg-zinc-800 text-zinc-200"
        value={filters.year}
        onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
      >
        <option value="">Todos os anos</option>
        {[...new Set(GAMES.map((g) => g.year))]
          .sort((a, b) => b - a)
          .map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
      </select>
      <select
        className="px-3 py-2 rounded-lg border cursor-pointer border-zinc-600 bg-zinc-800 text-zinc-200"
        value={filters.rating}
        onChange={(e) => setFilters((f) => ({ ...f, rating: e.target.value }))}
      >
        <option value="">Todas as notas</option>
        {[5, 4.5, 4, 3.5, 3].map((r) => (
          <option key={r} value={r}>
            {r}+
          </option>
        ))}
      </select>
      <button
        type="button"
        className="px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-700 text-zinc-200 hover:bg-zinc-600 cursor-pointer"
        onClick={() =>
          setFilters({ name: "", genre: "", year: "", rating: "" })
        }
      >
        Limpar filtros
      </button>
    </div>
  );
}

export default GameFilters;
