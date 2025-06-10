import React from "react";

export default function LikedGames() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-cyan-200 mb-1">
        Jogos Curtidos
      </h3>
      <hr className="mb-4 border-zinc-700" />
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-56 h-72 bg-zinc-700 rounded-xl overflow-hidden flex items-center justify-center"
          >
            <span className="text-zinc-500 text-xs">capa</span>
          </div>
        ))}
      </div>
    </div>
  );
}
