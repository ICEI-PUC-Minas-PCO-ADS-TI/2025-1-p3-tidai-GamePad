import React, { useEffect, useState } from "react";
import { fetchPlatforms, fetchGenres } from "../../service/igdbService";

function GameFilters({ filters, setFilters }) {
  const [platforms, setPlatforms] = useState([]);
  const [loadingPlatforms, setLoadingPlatforms] = useState(false);
  const [platformsError, setPlatformsError] = useState(null);

  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [genresError, setGenresError] = useState(null);

  useEffect(() => {
    setLoadingPlatforms(true);
    fetchPlatforms()
      .then((data) => {
        setPlatforms(data);
        setLoadingPlatforms(false);
      })
      .catch(() => {
        setPlatformsError("Erro ao buscar plataformas");
        setLoadingPlatforms(false);
      });
  }, []);

  useEffect(() => {
    setLoadingGenres(true);
    fetchGenres()
      .then((data) => {
        setGenres(data);
        setLoadingGenres(false);
      })
      .catch(() => {
        setGenresError("Erro ao buscar gêneros");
        setLoadingGenres(false);
      });
  }, []);

  // debug para ver os generos 
  console.log("Gêneros carregados:", genres);

  // Gera anos de 1980 até o ano atual
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1980; y--) years.push(y);

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* SearchBar controlada pelo filtro de nome */}
      <div className="min-w-[220px] flex-1">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800 text-zinc-200 w-full"
          value={filters.name}
          onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
          onBlur={() => setFilters((f) => ({ ...f, name: f.name.trim() }))}
        />
      </div>
      <select
        className="px-3 py-2 rounded-lg cursor-pointer border border-zinc-600 bg-zinc-800 text-zinc-200"
        value={filters.genre}
        onChange={(e) => setFilters((f) => ({ ...f, genre: e.target.value }))}
      >
        <option value="">Todos os gêneros</option>
        {loadingGenres && <option>Carregando...</option>}
        {genresError && <option>{genresError}</option>}
        {genres.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>
      <select
        className="px-3 py-2 rounded-lg border cursor-pointer border-zinc-600 bg-zinc-800 text-zinc-200"
        value={filters.year}
        onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
      >
        <option value="">Todos os anos</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        className="px-3 py-2 rounded-lg border cursor-pointer border-zinc-600 bg-zinc-800 text-zinc-200"
        value={filters.platform}
        onChange={(e) =>
          setFilters((f) => ({ ...f, platform: e.target.value }))
        }
      >
        <option value="">Todas as plataformas</option>
        {loadingPlatforms && <option>Carregando...</option>}
        {platformsError && <option>{platformsError}</option>}
        {platforms.map((p) => (
          <option key={p.id} value={p.name}>
            {p.abbreviation || p.name}
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
