import React, { useState } from "react";

const FILTERS = [
  { key: "played", label: "Zerado" },
  { key: "playing", label: "Jogando" },
  { key: "wishlist", label: "Desejo" },
];

export default function GamesTab() {
  const [activeFilter, setActiveFilter] = useState("played");

  return (
    <div>
      <h3 className="text-lg font-semibold text-cyan-200 mb-1">Jogos</h3>
      <hr className="mb-4 border-zinc-700" />
      {/* Filtros de jogos */}
      <div className="flex gap-2 mb-4">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            className={`cursor-pointer px-4 py-1 rounded font-semibold text-sm border transition
              ${activeFilter === filter.key
                ? "bg-zinc-700 border-cyan-400 text-cyan-200"
                : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-cyan-300"}
            `}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="bg-zinc-800 rounded-lg p-8 text-zinc-500 text-center">
        {/*renderiza os jogos de acordo com o filtro */}
        Lista de jogos do usuário ({FILTERS.find(f => f.key === activeFilter).label})
      </div>
    </div>
  );
}
