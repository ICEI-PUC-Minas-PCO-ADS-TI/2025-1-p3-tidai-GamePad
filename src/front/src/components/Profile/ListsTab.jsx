import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Pencil } from "lucide-react";

export default function ListsTab() {
  const { user } = useUser();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    fetch(`http://localhost:5069/api/GameLists/user/${user.id}`)
      .then((res) => res.json())
      .then(setLists)
      .catch(() => setError("Erro ao carregar listas."))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (listId, itemId) => {
    await fetch(
      `http://localhost:5069/api/GameLists/${listId}/remove/${itemId}`,
      { method: "DELETE" }
    );
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.filter((i) => i.id !== itemId) }
          : l
      )
    );
  };

  return (
    <div>
      <h3 className="text-xs font-semibold text-cyan-200 mb-1 tracking-widest uppercase">
        Listas
      </h3>
      <hr className="mb-4 border-zinc-700" />
      <div className="flex mb-4">
        <button className="flex items-center gap-2 cursor-pointer bg-cyan-900 hover:bg-cyan-800 text-cyan-200 font-semibold px-5 py-2 rounded-lg text-sm shadow transition-colors border border-cyan-700">
          <span className="text-lg">+</span> Nova Lista
        </button>
      </div>
      <div className="flex flex-wrap gap-8 mt-4">
        {lists.map((list) => {
          const covers = list.items.slice(0, 5).map((item) => {
            if (!item.coverUrl)
              return "https://placehold.co/120x160?text=No+Cover";
            // Substitui t_thumb, t_cover_big, etc por t_original para maior qualidade
            return item.coverUrl.replace(
              /t_(thumb|cover_big|screenshot_med|720p|1080p)/,
              "t_original"
            );
          });
          return (
            <div
              key={list.id}
              className="rounded-xl p-4 w-64 flex flex-col cursor-pointer hover:bg-zinc-800 transition"
              onClick={() =>
                (window.location.href = `/${user?.nome
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}/list/${list.id}`)
              }
            >
              <div className="flex -space-x-8 mb-3 h-32">
                {covers.length === 0 && (
                  <div className="w-24 h-32 bg-zinc-900 rounded-lg border-2 border-zinc-700" />
                )}
                {covers.map((cover, idx) => (
                  <img
                    key={idx}
                    src={cover}
                    alt="Capa"
                    className={`w-24 h-32 object-cover rounded-lg border-2 border-zinc-700 shadow ${
                      idx > 0 ? "-ml-8" : ""
                    }`}
                    style={{ zIndex: 10 - idx }}
                  />
                ))}
                {[...Array(5 - covers.length)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-24 h-32 bg-zinc-900 rounded-lg border-2 border-zinc-700 -ml-8"
                    style={{ zIndex: 10 - covers.length - idx }}
                  />
                ))}
              </div>
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-lg font-bold text-white truncate mb-1">
                    {list.title || "Untitled"}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-zinc-400 text-xs">
                      {list.items.length} Jogos
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-2 py-1 rounded text-xs flex items-center gap-1 w-full justify-center">
                    <Pencil size={14} /> Editar Lista
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
