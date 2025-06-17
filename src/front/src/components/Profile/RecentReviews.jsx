import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { fetchGamesByIds } from "../../service/igdbService";
import { useNavigate } from "react-router-dom";

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

export default function RecentReviews({ user }) {
  const [reviews, setReviews] = useState([]);
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecentReviews() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5069/api/AvaliacoesApi");
        const data = await res.json();
        const userReviews = data
          .filter((a) => a.usuarioId === user.id)
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, 5);
        setReviews(userReviews);
        // Busca dados dos jogos
        const uniqueGameIds = [
          ...new Set(userReviews.map((r) => r.igdbGameId)),
        ];
        const gamesObj = {};
        if (uniqueGameIds.length) {
          const gamesArr = await fetchGamesByIds(uniqueGameIds);
          gamesArr.forEach((g) => {
            if (g) gamesObj[g.id] = g;
          });
        }
        setGames(gamesObj);
      } catch {
        setReviews([]);
        setGames({});
      }
      setLoading(false);
    }
    if (user && user.id) fetchRecentReviews();
  }, [user]);

  return (
    <div className="mt-8">
      <h3 className="text-xs font-semibold text-cyan-200 mb-1 tracking-widest uppercase">
        Avaliações recentes
      </h3>
      <hr className="mb-4 border-zinc-700" />
      {loading ? (
        <div className="text-zinc-400 text-center">Carregando...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-zinc-800 rounded-lg p-8 text-zinc-500 text-center">
          Nenhuma avaliação recente.
        </div>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => {
            const game = games[review.igdbGameId];
            const year = game?.first_release_date
              ? new Date(game.first_release_date * 1000).getFullYear()
              : "";
            return (
              <li
                key={review.id}
                className="flex gap-4 border-b border-zinc-800 pb-6 cursor-pointer hover:scale-105 transition"
                onClick={() => game && navigate(`/games/${game.id}`)}
              >
                <img
                  src={
                    game?.cover?.url
                      ? game.cover.url.startsWith("http")
                        ? game.cover.url.replace("t_thumb", "t_cover_big")
                        : `https:${game.cover.url.replace(
                            "t_thumb",
                            "t_cover_big"
                          )}`
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
                  <div className="text-zinc-200 text-sm mb-2 mt-1">
                    {review.comentario}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
