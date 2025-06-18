import React from "react";
import { Star } from "lucide-react";

function renderStars(nota) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        color={nota >= i ? "#facc15" : "#334155"}
        fill={nota >= i ? "#facc15" : "none"}
      />
    );
  }
  return stars;
}

export default function ReviewCard({ review, game, onClick, onClickUser }) {
  const year = game?.first_release_date
    ? new Date(game.first_release_date * 1000).getFullYear()
    : "";
  return (
    <li
      className="flex gap-4 border-b border-zinc-800 pb-6 cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <img
        src={
          game?.cover?.url
            ? game.cover.url.startsWith("http")
              ? game.cover.url.replace("t_thumb", "t_cover_big")
              : `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
            : "/profile-images/default-profile.png"
        }
        alt={game?.name}
        className="w-20 h-28 rounded-md object-cover shadow-md flex-shrink-0"
      />
      <div className="flex-1 flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-cyan-300 leading-tight">
            {game?.name}
          </span>
          {year && (
            <span className="text-zinc-400 text-base font-normal ml-1">
              {year}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex gap-0.5">
            {renderStars(Number(review.nota))}
          </span>
          <span className="text-zinc-400 text-xs ml-2">
            {review.data
              ? new Date(review.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2 mt-1">
          <span
            className="text-cyan-400 text-xs font-semibold cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onClickUser && onClickUser();
            }}
          >
            {review.usuarioNome}
          </span>
        </div>
        <div className="text-zinc-200 text-sm mb-2 mt-1">
          {review.comentario}
        </div>
      </div>
    </li>
  );
}
