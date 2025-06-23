import React, { useState } from "react";
import { Star } from "lucide-react";

export default function GameCard({
  game,
  onClick,
  showOverlay = true,
  showButton = true,
  buttonText = "Ver reviews",
  onButtonClick,
  className = "",
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-zinc-900 hover:scale-105 transition-transform  ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ minHeight: 260 }}
    >
      <img
        src={
          game.cover && game.cover.url
            ? (() => {
                const url = game.cover.url.replace(
                  /t_thumb|t_cover_small/g,
                  "t_original"
                );
                return url.startsWith("http") ? url : `https:${url}`;
              })()
            : "URL_DA_IMAGEM_PADRAO"
        }
        alt={game.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      {showOverlay && hover && (
        <div className="absolute inset-0 bg-zinc-900/90 flex flex-col justify-center items-center p-4 transition-all">
          <h3 className="text-xl font-bold text-cyan-400 mb-1 text-center">
            {game.name}
          </h3>
          {game.rating && (
            <div className="flex items-center gap-2 mb-1">
              <Star size={15} color="#facc15" fill="#facc15" />
              <span className="text-yellow-300 text-xs  font-semibold">
                {game.rating}
              </span>
              {game.year && (
                <span className="text-zinc-400 text-xs ml-2">{game.year}</span>
              )}
            </div>
          )}
          {game.genre && (
            <p className="text-xs text-cyan-400 mb-2">
              Gênero: <span className="text-fuchsia-400">{game.genre}</span>
            </p>
          )}
          {showButton && (
            <button
              className="mt-3 px-4 py-1 bg-cyan-600 text-white rounded-full text-xs cursor-pointer font-bold hover:bg-cyan-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick && onButtonClick(game);
              }}
            >
              {buttonText}
            </button>
          )}
        </div>
      )}
      {/* Exibe apenas a capa e nome se não mostrar overlay */}
      {!showOverlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/80 px-2 py-2">
          <span className="block text-white text-center font-semibold truncate">
            {game.name}
          </span>
        </div>
      )}
    </div>
  );
}
