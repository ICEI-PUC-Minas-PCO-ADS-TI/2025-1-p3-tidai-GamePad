import React, { useEffect, useState } from "react";
import GameListCardProfile from "./GameListCardProfile";
import ListCreate from "./ListCreate";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function ListsTab({ user }) {
  const { user: loggedUser } = useUser();
  const [lists, setLists] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    fetch(`http://localhost:5069/api/GameLists/user/${user.id}`)
      .then((res) => res.json())
      .then(setLists)
      .catch(() => setError("Erro ao carregar listas."))
      .finally(() => setLoading(false));
  }, [user]);

  // eslint-disable-next-line no-unused-vars
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
        {loggedUser && user?.id === loggedUser.id && (
          <button
            className="flex items-center gap-2 cursor-pointer bg-cyan-900 hover:bg-cyan-800 text-cyan-200 font-semibold px-5 py-2 rounded-lg text-sm shadow transition-colors border border-cyan-700"
            onClick={() => setShowModal(true)}
          >
            <span className="text-lg">+</span> Nova Lista
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-8 mt-4">
        {lists.map((list) => (
          <GameListCardProfile
            key={list.id}
            list={list}
            user={user}
            onEdit={() =>
              navigate(
                `/${user?.nome?.toLowerCase().replace(/\s+/g, "-")}/list/${
                  list.id
                }/edit`
              )
            }
          />
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl shadow-2xl p-0 w-full max-w-2xl relative animate-fadeIn">
            <button
              className="absolute cursor-pointer top-4 right-5 text-zinc-400 hover:text-fuchsia-400 text-2xl font-bold transition"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <div className="p-8">
              <ListCreate onClose={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
