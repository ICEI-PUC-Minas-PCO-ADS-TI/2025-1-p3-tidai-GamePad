import React from "react";

export default function GameCardProfile({ game, onClick }) {
  return (
    <div
      className="relative flex flex-col items-center group transition-transform hover:-translate-y-2 cursor-pointer"
      style={{ minWidth: 0 }}
      onClick={onClick}
    >
      <img
        src={game.coverUrl}
        alt={game.name}
        className="w-24 h-36 sm:w-24 sm:h-36 md:w-28 md:h-40 lg:w-32 lg:h-48 xl:w-36 xl:h-52 object-cover rounded-lg shadow-lg border-2 border-zinc-700 group-hover:border-cyan-400 transition"
        style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.45)" }}
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900/80 px-2 py-1 rounded text-xs text-cyan-200 font-semibold opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
        {game.name}
      </div>
    </div>
  );
}
