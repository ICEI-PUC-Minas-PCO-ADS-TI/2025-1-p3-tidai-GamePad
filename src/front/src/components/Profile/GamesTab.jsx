import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <hr className="mb-4 border-zinc-700" />
      {/* Filtros de jogos */}
      <div className="flex gap-2 mb-4">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            className={`cursor-pointer px-4 py-1 rounded font-semibold text-sm border transition
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
      <div className="rounded-lg p-8 text-zinc-500">
        {/* Renderiza os jogos de acordo com o filtro */}
        {filteredGames.length === 0 ? (
          <span>Nenhum jogo neste filtro.</span>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 justify-center">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="relative flex flex-col items-center group transition-transform hover:-translate-y-2 cursor-pointer"
                style={{ minWidth: 120 }}
                onClick={() => navigate(`/games/${game.id}`)}
              >
                <img
                  src={game.coverUrl}
                  alt={game.name}
                  className="w-32 h-48 object-cover rounded-lg shadow-lg border-2 border-zinc-700 group-hover:border-cyan-400 transition"
                  style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.45)" }}
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900/80 px-2 py-1 rounded text-xs text-cyan-200 font-semibold opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                  {game.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
