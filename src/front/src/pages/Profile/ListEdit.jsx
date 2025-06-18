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
    fetch(`http://localhost:5069/api/GameLists/${listId}`)
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
    const res = await fetch(`http://localhost:5069/api/GameLists/${list.id}`, {
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
    const res = await fetch(`http://localhost:5069/api/GameLists/${list.id}`, {
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
    <div className="max-w-5xl mx-48 w-full bg-zinc-900 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Editar Lista</h2>
      <label className="block text-zinc-300 mb-2">Nome da lista:</label>
      <input
        className="w-xl p-2 rounded mb-4 bg-zinc-800 text-white border border-cyan-400"
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
      <button
        className="bg-cyan-700 cursor-pointer text-white px-4 py-2 rounded mr-2"
        onClick={() => setShowAdd((v) => !v)}
      >
        {showAdd ? "Cancelar" : "Adicionar Jogo"}
      </button>
      <button
        className="bg-green-700 cursor-pointer text-white px-4 py-2 rounded mr-2"
        onClick={handleSave}
      >
        Salvar Alterações
      </button>
      <button
        className="bg-red-700 cursor-pointer text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        Apagar Lista
      </button>
        <h3 className="text-zinc-200 font-semibold mb-4 mt-4">Jogos na lista:</h3>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="games-list" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-4"
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
                          minWidth: 120,
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
                          className="w-48 h-72 object-cover rounded mb-2 border-2 border-cyan-400"
                        />
                        <div className="text-lg text-white text-center font-semibold mb-1 truncate w-full mt-2">
                          {item.gameTitle}
                        </div>
                        <button
                          className="px-2 py-1 text-xs cursor-pointer bg-red-700 text-white rounded mt-2"
                          onClick={() => handleRemoveGame(idx)}
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
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
