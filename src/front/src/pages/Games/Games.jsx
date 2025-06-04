import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GamesMenu from "../../components/GamesMenu/GamesMenu";
import GameSection from "../../components/GameSection/GameSection";
import GameCard from "../../components/Cards/GameCard";
import GameFilters from "../../components/GameFilters/GameFilters";
import { fetchGames } from "../../service/igdbService";

const pageSize = 48;

const Games = () => {
  // Filtros
  const [filters, setFilters] = useState({
    name: "",
    genre: "",
    year: "",
    rating: "",
  });
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();



  // Busca jogos do backend sempre que filtros, menu, plataforma ou página mudam
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const backendFilters = {
      search: filters.name,
      genre: filters.genre,
      year: filters.year,
      platform: selectedPlatform || "",
      recent: selectedMenu === "new",
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };
    (async () => {
      try {
        const data = await fetchGames(backendFilters);
        if (!cancelled) {
          setGames(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setGames([]);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [filters, selectedMenu, selectedPlatform, page]);

  // Troca de menu ou plataforma reseta a página
  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
    setSelectedPlatform(null);
    setPage(1);
  };
  const handlePlatformSelect = (platform) => {
    setSelectedMenu("platform");
    setPage(1);
    setSelectedPlatform(platform);
  };
  // Troca de filtros reseta a página
  const handleFiltersChange = (f) => {
    setFilters(f);
    setPage(1);
  };
  // Paginação
  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => p + 1);

  // Título da seção
  let sectionTitle = "";
  if (selectedMenu === "new") {
    sectionTitle = "Novos Lançamentos";
  } else if (selectedMenu === "best") {
    sectionTitle = "Melhores Jogos";
  } else if (selectedMenu === "all") {
    sectionTitle = "Todos os Jogos";
  } else if (selectedMenu === "platform" && selectedPlatform) {
    sectionTitle = `Jogos para ${
      selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
    }`;
  }

  return (
    console.log(selectedPlatform),
    (
      <div className="min-h-screen bg-zinc-900 py-10  px-48">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          Explore os <span className="text-cyan-500">jogos</span>
        </h1>
        <GamesMenu
          selected={selectedMenu}
          onSelect={handleMenuSelect}
          selectedPlatform={selectedPlatform}
          onPlatformSelect={handlePlatformSelect}
        />
        <GameFilters filters={filters} setFilters={handleFiltersChange} />
        {loading && (
          <div className="text-white text-center mt-10">
            Carregando jogos...
          </div>
        )}
        {error && <div className="text-red-500 text-center mt-10">{error}</div>}
        {!loading && !error && (
          <>
            <GameSection
              title={sectionTitle}
              games={games}
              renderCard={(game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => navigate(`/games/${game.id}`)}
                  showOverlay={true}
                  showButton={true}
                  buttonText="Ver reviews"
                />
              )}
            />
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="px-4 py-2 cursor-pointer rounded bg-cyan-700 text-white font-bold disabled:opacity-50"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span className="text-white mt-2 font-semibold">
                Página {page}
              </span>
              <button
                className="px-4 py-2 cursor-pointer rounded bg-cyan-700 text-white font-bold disabled:opacity-50"
                onClick={handleNextPage}
                disabled={games.length < pageSize}
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default Games;
