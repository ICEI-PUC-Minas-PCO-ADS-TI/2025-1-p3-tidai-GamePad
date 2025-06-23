import React from "react";
import { Pencil } from "lucide-react";
import { getListCovers } from "./profileUtils";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function GameListCardProfile({ list, user }) {
  const covers = getListCovers(list);
  const navigate = useNavigate();
  const { user: loggedUser } = useUser();
  const isOwner = loggedUser && user?.id === loggedUser.id;
  return (
    <div
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
          {isOwner && (
            <button
              className="bg-zinc-700 cursor-pointer hover:bg-zinc-600 text-zinc-200 px-2 py-1 rounded text-xs flex items-center gap-1 w-full justify-center"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/list/${list.id}/edit`);
              }}
            >
              <Pencil size={14} /> Editar Lista
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
