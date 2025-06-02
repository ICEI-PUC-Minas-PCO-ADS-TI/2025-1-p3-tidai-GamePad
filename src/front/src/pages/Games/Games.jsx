import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import GamesMenu from "../../components/GamesMenu/GamesMenu";
import GameSection from "../../components/GameSection/GameSection";
import GameCard from "../../components/Cards/GameCard";
import GameFilters from "../../components/GameFilters/GameFilters";
import { GAMES, GENRES } from "../../db/dbmock";

const Games = () => {
  // Estado para os filtros
  const [filters, setFilters] = useState({
    name: "",
    genre: "",
    year: "",
    rating: "",
  });
  // Estado para o menu selecionado e plataforma
  const [selectedMenu, setSelectedMenu] = useState("new");
  // Estado para a plataforma selecionada
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const navigate = useNavigate();

  // Filtro base
  let filteredGames = GAMES.filter((g) => {
    return (
      (!filters.name ||
        g.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.genre || g.genre === filters.genre) &&
      (!filters.year || g.year === Number(filters.year)) &&
      (!filters.rating || g.rating >= Number(filters.rating))
    );
  });

  // Filtro por menu
  let sectionTitle = "";
  if (selectedMenu === "new") {
    filteredGames = filteredGames.filter((g) => g.isNew);
    sectionTitle = "Novos Lançamentos";
  } else if (selectedMenu === "best") {
    filteredGames = filteredGames
      .filter((g) => g.rating >= 4.7)
      .sort((a, b) => b.rating - a.rating);
    sectionTitle = "Melhores Jogos";
  } else if (selectedMenu === "all") {
    sectionTitle = "Todos os Jogos";
  } else if (selectedMenu === "platform" && selectedPlatform) {
    filteredGames = filteredGames.filter((g) =>
      g.platforms.includes(selectedPlatform)
    );
    sectionTitle = `Jogos para ${
      selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
    }`;
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-10  px-48">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
        Explore os <span className="text-cyan-500">jogos</span>
      </h1>
      <GamesMenu
        selected={selectedMenu}
        onSelect={(menu) => {
          setSelectedMenu(menu);
          setSelectedPlatform(null);
        }}
        selectedPlatform={selectedPlatform}
        onPlatformSelect={setSelectedPlatform}
      />
      <GameFilters filters={filters} setFilters={setFilters} />{" "}
      <GameSection
        title={sectionTitle}
        games={filteredGames}
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
    </div>
  );
};

export default Games;
