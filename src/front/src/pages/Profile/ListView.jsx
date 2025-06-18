import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function ListView() {
  const { username, listId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  // Ordenação
  const [sort, setSort] = useState(null); // null = ordem salva

  useEffect(() => {
    fetch(`http://localhost:5069/api/GameLists/${listId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        console.log("Dados recebidos da API:", data);
        setList(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar lista:", err);
        setList(null);
      })
      .finally(() => setLoading(false));
  }, [listId]);

  const getSortedGames = () => {
    if (!list || !list.items) return [];
    let games = [...list.items];
    if (sort === "title-asc")
      games.sort((a, b) => {
        if (!a.gameTitle && !b.gameTitle) return 0;
        if (!a.gameTitle) return 1;
        if (!b.gameTitle) return -1;
        return a.gameTitle.localeCompare(b.gameTitle);
      });
    else if (sort === "title-desc")
      games.sort((a, b) => {
        if (!a.gameTitle && !b.gameTitle) return 0;
        if (!a.gameTitle) return 1;
        if (!b.gameTitle) return -1;
        return b.gameTitle.localeCompare(a.gameTitle);
      });
    // Se sort for null, mantém a ordem original (do banco)
    return games;
  };
  const sortedGames = getSortedGames();

  if (loading) return <div className="text-zinc-400">Carregando...</div>;
  if (!list || !list.items)
    return (
      <div className="text-red-400">Lista não encontrada ou inválida.</div>
    );

  const isOwner =
    user &&
    user.nome &&
    username &&
    user.nome.toLowerCase().replace(/\s+/g, "-") === username;

  return (
    <div className="w-full mx-auto px-48 mt-8">
      <div className="flex items-center  gap-4 mb-2">
        <img
          src={
            list.ownerImg && list.ownerImg.startsWith("/profile-images/")
              ? `http://localhost:5069${list.ownerImg}`
              : list.ownerImg || "/profile-images/default-profile.png"
          }
          alt="Owner"
          className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-lg"
        />
        <div>
          <span className="text-zinc-400 text-xs">Play List feita por </span>
          <span className="font-semibold text-cyan-200">
            {list.OwnerName || username}
          </span>
        </div>
        {isOwner && (
          <button
            className="ml-auto bg-cyan-700 cursor-pointer hover:bg-cyan-600 text-white px-6 py-2 rounded-lg text-base font-bold shadow transition-all border-2 border-cyan-400"
            onClick={() => navigate(`/list/${listId}/edit`)}
          >
            Editar Lista
          </button>
        )}
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">{list.title}</h1>
      <div className="flex gap-2 mb-4">
        <span className="text-zinc-400 text-sm mr-2">Ordenar por:</span>
        <button
          className={`px-4 py-1 rounded font-semibold text-sm border transition ${
            sort === null
              ? "bg-zinc-700 border-cyan-400 text-cyan-200"
              : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-cyan-300"
          }`}
          onClick={() => setSort(null)}
        >
          Ordem da Lista
        </button>
        <button
          className={`px-4 py-1 rounded font-semibold text-sm border transition ${
            sort === "title-asc"
              ? "bg-zinc-700 border-cyan-400 text-cyan-200"
              : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-cyan-300"
          }`}
          onClick={() => setSort("title-asc")}
        >
          A-Z
        </button>
        <button
          className={`px-4 py-1 rounded font-semibold text-sm border transition ${
            sort === "title-desc"
              ? "bg-zinc-700 border-cyan-400 text-cyan-200"
              : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-cyan-300"
          }`}
          onClick={() => setSort("title-desc")}
        >
          Z-A
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-4">
        {sortedGames.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center group transition-transform hover:-translate-y-2 cursor-pointer"
            style={{ minWidth: 120 }}
            onClick={() => navigate(`/games/${item.igdbGameId}`)}
          >
            <img
              src={
                item.coverUrl
                  ? item.coverUrl.replace(
                      /t_(thumb|cover_big|screenshot_med|720p|1080p)/,
                      "t_original"
                    )
                  : "https://placehold.co/200x280?text=No+Cover"
              }
              alt={item.gameTitle}
              className="w-36 h-52 object-cover rounded-lg shadow-lg border-2 border-cyan-400 group-hover:border-cyan-300 transition"
            />
            <div className="text-base text-white text-center font-semibold mb-1 truncate w-full mt-2">
              {item.gameTitle}
            </div>
          </div>
        ))}
        {sortedGames.length === 0 && (
          <div className="text-zinc-400 col-span-full">
            Nenhum jogo nesta lista.
          </div>
        )}
      </div>
    </div>
  );
}
