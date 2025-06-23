import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCardProfile from "./GameCardProfile";

const FILTERS = [
  { key: "played", label: "Zerado" },
  { key: "playing", label: "Jogando" },
  { key: "wishlist", label: "Desejo" },
  { key: "liked", label: "Curtido" },
];

export default function GamesTab({ userGames = [] }) {
  const [activeFilter, setActiveFilter] = useState("played");
  const navigate = useNavigate();

  const filteredGames = userGames.filter((game) => {
    if (activeFilter === "played") return game.statuses?.includes("played");
    if (activeFilter === "playing") return game.statuses?.includes("playing");
    if (activeFilter === "wishlist") return game.statuses?.includes("wishlist");
    if (activeFilter === "liked") return game.statuses?.includes("liked");
    return false;
  });

  return (
    <div>
      <h3 className="text-xs font-semibold text-cyan-200 mb-1 tracking-widest uppercase">
        Jogos
      </h3>
      <hr className="mb-4 border-zinc-700 b" />
      {/* Filtros de jogos */}
      <div className="grid grid-cols-2 gap-2 mb-4 sm:flex sm:gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            className={`cursor-pointer px-4 py-1  rounded font-semibold text-sm border transition
              ${
                activeFilter === filter.key
                  ? "bg-zinc-700 border-cyan-400 text-cyan-200"
                  : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-cyan-300"
              }
            `}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg p-4 sm:p-6 md:p-8 text-zinc-500">
        {/* Renderiza os jogos de acordo com o filtro */}
        {filteredGames.length === 0 ? (
          <span>Nenhum jogo neste filtro.</span>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full">
            {filteredGames.map((game) => (
              <GameCardProfile
                key={game.id}
                game={game}
                onClick={() => navigate(`/games/${game.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
