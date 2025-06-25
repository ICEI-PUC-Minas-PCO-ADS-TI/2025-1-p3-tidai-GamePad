import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function ListEdit() {
  const { listId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/GameLists/${listId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setList(data);
        setTitle(data.title);
        setGames(data.items || []);
      })
      .catch(() => setError("Erro ao carregar lista."))
      .finally(() => setLoading(false));
  }, [listId]);

  // Função para reordenar array ao arrastar
  function handleDragEnd(result) {
    if (!result.destination) return;
    const reordered = Array.from(games);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setGames(reordered);
  }

  // Remover jogo
  function handleRemoveGame(idx) {
    setGames(games.filter((_, i) => i !== idx));
  }

  // Adicionar jogo
  function handleAddGame(game) {
    if (!games.some((g) => g.igdbGameId === game.id)) {
      setGames([
        ...games,
        {
          igdbGameId: game.id,
          gameTitle: game.name,
          coverUrl:
            game.cover && game.cover.url
              ? game.cover.url.startsWith("http")
                ? game.cover.url
                : `https:${game.cover.url}`
              : game.coverUrl || "",
        },
      ]);
    }
    setShowAdd(false);
    setSearch("");
  }

  // Salvar alterações
  async function handleSave() {
    setError("");
    const payload = {
      id: list.id,
      title,
      usuarioId: list.usuarioId,
      items: games.map((g) => ({
        id: g.id, // pode ser undefined para novos
        igdbGameId: g.igdbGameId,
        gameTitle: g.gameTitle,
        coverUrl: g.coverUrl,
      })),
    };
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/GameLists/${list.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      navigate(
        `/${user.nome.toLowerCase().replace(/\s+/g, "-")}/list/${list.id}`
      );
    } else {
      setError("Erro ao salvar alterações.");
    }
  }

  // Apagar lista
  async function handleDelete() {
    if (!window.confirm("Tem certeza que deseja apagar esta lista?")) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/GameLists/${list.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      navigate(`/${user.nome.toLowerCase().replace(/\s+/g, "-")}`);
    } else {
      setError("Erro ao apagar lista.");
    }
  }

  if (loading) return <div className="text-zinc-400">Carregando...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!list) return <div className="text-red-400">Lista não encontrada.</div>;
  return (
    <div className="w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-8 bg-zinc-900 py-4 sm:py-6">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
        Editar Lista
      </h2>
      <label className="block text-zinc-300 text-sm sm:text-base mb-2">
        Nome da lista:
      </label>
      <input
        className="w-full sm:w-3/4 md:w-1/2 p-2 sm:p-3 rounded mb-4 bg-zinc-800 text-white border border-cyan-400 text-sm sm:text-base"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mb-4">
        {showAdd && (
          <div className="mb-4">
            <SearchBar
              placeholder="Buscar jogo para adicionar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSelect={handleAddGame}
              className="mb-2"
            />
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            className="bg-cyan-700 cursor-pointer text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded font-semibold transition hover:bg-cyan-600"
            onClick={() => setShowAdd((v) => !v)}
          >
            {showAdd ? "Cancelar" : "Adicionar Jogo"}
          </button>
          <button
            className="bg-green-700 cursor-pointer text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded font-semibold transition hover:bg-green-600"
            onClick={handleSave}
          >
            Salvar Alterações
          </button>
          <button
            className="bg-red-700 cursor-pointer text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded font-semibold transition hover:bg-red-600"
            onClick={handleDelete}
          >
            Apagar Lista
          </button>
        </div>
        <h3 className="text-zinc-200 font-semibold text-sm sm:text-base mb-4 mt-6">
          Jogos na lista:
        </h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="games-list" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mt-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {games.map((item, idx) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex flex-col items-center group cursor-move ${
                          snapshot.isDragging ? "z-10" : ""
                        }`}
                        style={{
                          minWidth: "auto",
                          ...provided.draggableProps.style,
                        }}
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
                          className="w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36 lg:w-32 lg:h-44 xl:w-36 xl:h-52 object-cover rounded-lg shadow-lg border-2 border-cyan-400 transition"
                        />
                        <div className="text-xs sm:text-sm md:text-base text-white text-center font-semibold truncate w-full mt-2 mb-2">
                          {item.gameTitle}
                        </div>{" "}
                        <button
                          className="px-2 py-1 text-xs cursor-pointer bg-red-700 text-white rounded font-semibold transition hover:bg-red-600"
                          onClick={() => handleRemoveGame(idx)}
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {games.length === 0 && (
                  <div className="text-zinc-400 col-span-full text-center py-8 text-sm sm:text-base">
                    Nenhum jogo adicionado à lista ainda.
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
