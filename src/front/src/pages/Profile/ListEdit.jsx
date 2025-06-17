import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function ListEdit() {
  const { listId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

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

  // Funções para remover, adicionar, editar nome e apagar lista serão implementadas

  if (loading) return <div className="text-zinc-400">Carregando...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!list) return <div className="text-red-400">Lista não encontrada.</div>;

  return (
    <div className="max-w-5xl mx-auto w-full bg-zinc-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Editar Lista</h2>
      <label className="block text-zinc-300 mb-2">Nome da lista:</label>
      <input
        className="w-full p-2 rounded mb-4 bg-zinc-800 text-white border border-cyan-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mb-4">
        <h3 className="text-zinc-200 font-semibold mb-2">Jogos na lista:</h3>
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
                        <button className="px-2 py-1 text-xs bg-red-700 text-white rounded mt-2">
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
      <button className="bg-cyan-700 text-white px-4 py-2 rounded mr-2">
        Adicionar Jogo
      </button>
      <button className="bg-green-700 text-white px-4 py-2 rounded mr-2">
        Salvar Alterações
      </button>
      <button className="bg-red-700 text-white px-4 py-2 rounded">
        Apagar Lista
      </button>
    </div>
  );
}
