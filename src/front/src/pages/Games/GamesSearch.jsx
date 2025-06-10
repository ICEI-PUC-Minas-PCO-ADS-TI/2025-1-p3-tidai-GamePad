import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGames } from "../../service/igdbService";

const pageSize = 48;

export default function GamesSearch() {
  const { searchTerm } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchGames({
      search: searchTerm,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setGames([]);
        setLoading(false);
      });
  }, [searchTerm, page]);

  return (
    <div className="min-h-screen py-10 px-4 md:px-48">
      <h2 className="text-2xl font-bold text-cyan-400 mb-8">
        Resultados para <span className="text-white">"{searchTerm}"</span>
      </h2>
      {loading && (
        <div className="text-white text-center mt-10">Carregando jogos...</div>
      )}
      {error && <div className="text-red-500 text-center mt-10">{error}</div>}
      {!loading && !error && (
        <>
          {games.length === 0 ? (
            <div className="text-zinc-400 text-center mt-10">
              Nenhum jogo encontrado.
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-zinc-800 rounded-2xl shadow-xl overflow-hidden">
              {games.map((game, ) => (
                <button
                  key={game.id}
                  className={`group flex cursor-pointer items-center gap-6 px-4 py-4 transition-all text-left hover:bg-zinc-800/40 focus:bg-zinc-800/60 outline-none`}
                  onClick={() => navigate(`/games/${game.id}`)}
                  tabIndex={0}
                  aria-label={`Ver detalhes de ${game.name}`}
                  style={{
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                >
                  <img
                    src={
                      game.cover && game.cover.url
                        ? (() => {
                            const url = game.cover.url.replace(
                              /t_thumb|t_cover_small/g,
                              "t_cover_big"
                            );
                            return url.startsWith("http")
                              ? url
                              : `https:${url}`;
                          })()
                        : "https://via.placeholder.com/90x120?text=No+Image"
                    }
                    alt={game.name}
                    className="w-16 h-20 object-cover rounded-lg shadow-md flex-shrink-0 opacity-90 group-hover:opacity-100 transition"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex flex-row items-baseline gap-3">
                      <span className="text-lg md:text-xl font-bold text-white truncate">
                        {game.name}
                      </span>
                      {game.first_release_date && (
                        <span className="text-base text-zinc-400">
                          {new Date(
                            game.first_release_date * 1000
                          ).getFullYear()}
                        </span>
                      )}
                    </div>
                    {game.genres && game.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
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
                    {game.summary && (
                      <div className="mt-1 text-zinc-300 text-xs md:text-sm line-clamp-2">
                        {game.summary}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          {/* Paginação */}
          {games.length > 0 && (
            <div className="flex justify-center gap-4 mt-10">
              <button
                className="px-4 py-2 cursor-pointer rounded bg-cyan-700 text-white font-bold disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span className="text-white mt-2 font-semibold">
                Página {page}
              </span>
              <button
                className="px-4 py-2 cursor-pointer rounded bg-cyan-700 text-white font-bold disabled:opacity-50"
                onClick={() => setPage((p) => p + 1)}
                disabled={games.length < pageSize}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
