import React from "react";
import { Star } from "lucide-react";

export default function GameMiniCard({ game, onClick }) {
  return (
    <div
      className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-lg p-2 cursor-pointer hover:bg-zinc-800 transition"
      onClick={onClick}
      style={{ minWidth: 0 }}
    >
      <img
        src={
          game.cover && game.cover.url
            ? (() => {
                const url = game.cover.url.replace(
                  /t_thumb|t_cover_small/g,
                  "t_cover_small"
                );
                return url.startsWith("http") ? url : `https:${url}`;
              })()
            : "URL_DA_IMAGEM_PADRAO"
        }
        alt={game.name}
        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-cyan-300 truncate">{game.name}</div>
        {game.rating && (
          <div className="flex items-center gap-1 text-yellow-300 text-xs">
            <Star size={13} fill="#facc15" color="#facc15" />
            {game.rating}
          </div>
        )}
        {game.genre && (
          <div className="text-xs text-fuchsia-400 truncate">{game.genre}</div>
        )}
      </div>
    </div>
  );
}
