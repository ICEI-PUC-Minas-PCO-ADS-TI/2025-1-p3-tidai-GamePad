import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchGamesByIds } from "../../service/igdbService";

export default function FavoriteGames() {
  const { user } = useUser();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // IDs dos jogos favoritos (array de números ou strings)
  let favoriteIds = [];
  if (user && user.favoriteGames) {
    if (Array.isArray(user.favoriteGames)) {
      favoriteIds = user.favoriteGames.filter(Boolean);
    } else if (typeof user.favoriteGames === "string") {
      try {
        favoriteIds = JSON.parse(user.favoriteGames);
      } catch {
        favoriteIds = [];
      }
    }
  }

  useEffect(() => {
    async function fetchFavoriteGames() {
      if (!favoriteIds.length) {
        setGames([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const results = await fetchGamesByIds(favoriteIds);
        setGames(results.filter(Boolean));
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Erro ao buscar jogos favoritos.");
      } finally {
        setLoading(false);
      }
    }
    fetchFavoriteGames();
    // eslint-disable-next-line
  }, [user && user.favoriteGames]);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-cyan-200 mb-1">
        Jogos Favoritos
      </h3>
      <hr className="mb-4 border-zinc-700" />
      {loading ? (
        <div className="text-zinc-400">Carregando jogos favoritos...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : !games.length ? (
        <div className="text-zinc-500">Nenhum jogo favorito cadastrado.</div>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {games.map((game, i) => (
            <div
              key={game.id || i}
              className="w-40 h-64 bg-zinc-800 rounded-xl overflow-hidden flex flex-col items-center justify-between shadow-lg"
            >
              <img
                src={
                  game.cover && game.cover.url
                    ? (() => {
                        const url = game.cover.url.replace(
                          /t_thumb|t_cover_small/g,
                          "t_cover_big"
                        );
                        return url.startsWith("http") ? url : `https:${url}`;
                      })()
                    : "https://via.placeholder.com/90x120?text=No+Image"
                }
                alt={game.name}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="flex-1 flex flex-col justify-between p-2 w-full">
                <span className="block text-white text-center font-semibold truncate">
                  {game.name}
                </span>
                {game.first_release_date && (
                  <span className="text-xs text-zinc-400 text-center">
                    {new Date(game.first_release_date * 1000).getFullYear()}
                  </span>
                )}
                {game.genres && game.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center mt-1">
                    {game.genres.map((g, idx) => (
                      <span
                        key={idx}
                        className="bg-fuchsia-700/60 text-white px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                      >
                        {typeof g === "object" && g !== null ? g.name : g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
