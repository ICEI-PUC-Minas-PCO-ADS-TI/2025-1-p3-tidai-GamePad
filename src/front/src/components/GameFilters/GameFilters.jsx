import React, { useEffect, useState } from "react";
import { fetchPlatforms, fetchGenres } from "../../service/igdbService";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

// Função para buscar jogos por média mínima de avaliação
async function fetchGameIdsByMinRating(minRating) {
  const res = await fetch(
    `http://localhost:5069/api/AvaliacoesApi/medias?minMedia=${minRating}`
  );
  if (!res.ok) return [];
  return res.json(); // [{ igdbGameId, media }]
}

function GameFilters({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  onFilterByRating,
}) {
  const [platforms, setPlatforms] = useState([]);
  const [loadingPlatforms, setLoadingPlatforms] = useState(false);
  const [platformsError, setPlatformsError] = useState(null);

  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [genresError, setGenresError] = useState(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    console.log("Filtros atuais:", filters);
  }, [filters]);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1980; y--) years.push(y);

  const handleSearch = () => {
    if (searchTerm && searchTerm.trim()) {
      navigate(`/games/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex flex-row items-center gap-6 mb-8 w-full">
      {/* Filtros à esquerda */}
      <div className="flex flex-wrap gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0 w-full max-w-xs">
          <SearchBar
            placeholder="Buscar por nome de jogo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            className="w-full"
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
          {/* Opções fixas */}
          <option value="">Todas as plataformas</option>
          <option value="Xbox">Xbox Original</option>
          <option value="Xbox 360">Xbox 360</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Xbox Series X|S">Xbox S|X</option>
          <option value="Super Nintendo Entertainment System">Super Nintendo</option>
          <option value="Nintendo GameCube">GameCube</option>
          <option value="Nintendo 64">Nintendo 64</option>
          <option value="Wii">Nintendo Wii</option>
          <option value="Wii U">Nintendo Wii U</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="PlayStation">PlayStation 1</option>
          <option value="PlayStation 2">PlayStation 2</option>
          <option value="PlayStation 3">PlayStation 3</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="PlayStation 5">PlayStation 5</option>
        </select>
        <select
          className="px-3 py-2 rounded-lg border cursor-pointer border-zinc-600 bg-zinc-800 text-zinc-200"
          value={filters.rating}
          onChange={async (e) => {
            const value = e.target.value;
            setFilters((f) => ({ ...f, rating: value }));
            if (value) {
              // Busca jogos por média mínima
              const gamesWithMedia = await fetchGameIdsByMinRating(value);
              if (onFilterByRating) {
                onFilterByRating(gamesWithMedia.map((g) => g.igdbGameId));
              }
            } else if (onFilterByRating) {
              onFilterByRating(null); // Limpa filtro
            }
          }}
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
            setFilters({
              genre: "",
              year: "",
              rating: "",
              platform: "",
            })
          }
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

export default GameFilters;
