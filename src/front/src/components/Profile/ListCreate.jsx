import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function ListCreate() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [games, setGames] = useState([]); // [{id, name, coverUrl}]
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Adiciona jogo à lista
  const addGame = (game) => {
    if (!games.some((g) => g.id === game.id)) {
      setGames([...games, game]);
    }
    setSearch("");
  };

  // Remove jogo da lista
  const removeGame = (id) => {
    setGames(games.filter((g) => g.id !== id));
  };

  // Salva a lista
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Informe um nome para a lista.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      Title: title,
      UsuarioId: user.id,
      Items: games.map((g) => ({
        IgdbGameId: g.id,
        GameTitle: g.name,
        CoverUrl:
          g.cover && g.cover.url
            ? g.cover.url.startsWith("http")
              ? g.cover.url.replace(/t_thumb|t_cover_small/g, "t_cover_big")
              : `https:${g.cover.url.replace(
                  /t_thumb|t_cover_small/g,
                  "t_cover_big"
                )}`
            : g.coverUrl || "https://placehold.co/96x128?text=No+Cover",
      })),
    };
    console.log("[DEBUG] Enviando para API:", payload);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/GameLists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      navigate(
        `/${user.nome.toLowerCase().replace(/\s+/g, "-")}/list/${data.id}`
      );
    } else {
      setError("Erro ao salvar lista.");
    }
    setSaving(false);
  };
  return (
    <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto bg-zinc-900 p-4 sm:p-6 md:p-8 mt-6 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6">
        Criar nova lista
      </h2>
      <div className="mb-4">
        <label className="block text-zinc-200 font-semibold mb-1">
          Nome da lista
        </label>
        <input
          className="w-full rounded-lg px-3 py-2 bg-zinc-800 text-white border border-zinc-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Meus favoritos"
        />
      </div>
      <div className="mb-4">
        <div className="text-zinc-300 mb-2 text-sm">Adicionar um jogo:</div>
        <SearchBar
          placeholder="Buscar e adicionar jogo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSelect={addGame}
          className="mb-2"
        />
      </div>
      <div className="mb-4">
        <div className="text-zinc-300 mb-2 text-sm">Jogos na lista:</div>
        <div className="flex flex-wrap gap-2">
          {games.map((game) => {
            let cover = "";
            if (game.cover && game.cover.url) {
              cover = game.cover.url.startsWith("http")
                ? game.cover.url.replace(
                    /t_thumb|t_cover_small/g,
                    "t_cover_big"
                  )
                : `https:${game.cover.url.replace(
                    /t_thumb|t_cover_small/g,
                    "t_cover_big"
                  )}`;
            } else if (game.coverUrl) {
              cover = game.coverUrl;
            } else {
              cover = "https://placehold.co/96x128?text=No+Cover";
            }
            return (
              <div
                key={game.id}
                className="flex flex-col items-center bg-zinc-800 rounded-lg p-0 w-24 h-32 relative overflow-hidden"
              >
                <img
                  src={cover}
                  alt={game.name}
                  className="w-full h-full object-cover rounded mb-0"
                />
                <span className="text-xs text-center line-clamp-2 absolute bottom-1 left-0 w-full bg-black/60 text-white px-1 py-0.5">
                  {game.name}
                </span>
                <button
                  className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-xs bg-black/60 rounded-full px-1"
                  onClick={() => removeGame(game.id)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            );
          })}
          {games.length === 0 && (
            <span className="text-zinc-500 text-xs">
              Nenhum jogo adicionado.
            </span>
          )}
        </div>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-2 justify-end mt-6">
        <button
          className="bg-cyan-600 cursor-pointer text-white px-6 py-2 rounded-lg font-bold hover:bg-cyan-700 transition"
          onClick={handleSave}
          disabled={saving}
        >
          Salvar Lista
        </button>
      </div>
    </div>
  );
}
