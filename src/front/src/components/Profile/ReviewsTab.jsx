import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

async function fetchGameById(gameId) {
  const res = await fetch(`http://localhost:5069/api/igdb/games?id=${gameId}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data && data.length > 0 ? data[0] : null;
}

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

export default function ReviewsTab({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5069/api/AvaliacoesApi");
        const data = await res.json();
        // Filtra avaliações do usuário e ordena por data decrescente
        const userReviews = data
          .filter((a) => a.usuarioId === userId)
          .sort((a, b) => new Date(b.data) - new Date(a.data));
        setReviews(userReviews);
        // Busca dados dos jogos
        const uniqueGameIds = [
          ...new Set(userReviews.map((r) => r.igdbGameId)),
        ];
        const gamesObj = {};
        await Promise.all(
          uniqueGameIds.map(async (gid) => {
            const game = await fetchGameById(gid);
            if (game) gamesObj[gid] = game;
          })
        );
        setGames(gamesObj);
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setReviews([]);
        setGames({});
      }
      setLoading(false);
    }
    if (userId) fetchReviews();
  }, [userId]);

  return (
    <div>
      <h3 className="text-xs font-semibold text-cyan-200 mb-1 tracking-widest uppercase">
        Reviews recentes
      </h3>
      <hr className="mb-4 border-zinc-700" />
      {loading ? (
        <div className="text-zinc-400 text-center">Carregando...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-zinc-800 rounded-lg p-8 text-zinc-500 text-center">
          Nenhuma avaliação encontrada.
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
                className="flex gap-4 border-b border-zinc-800 pb-6 cursor-pointer hover:bg-zinc-800 transition"
                onClick={() => navigate(`/games/${review.igdbGameId}`)}
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
