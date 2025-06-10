import React from "react";
import { Users } from "lucide-react";

export default function ProfileActionButton({ isOwner, onEdit, onFollow }) {
  return isOwner ? (
    <button
      className="cursor-pointer ml-auto bg-cyan-600 border border-cyan-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition"
      onClick={onEdit}
    >
      Editar Perfil
    </button>
  ) : (
    <button
      className="cursor-pointer ml-auto bg-zinc-800 border border-cyan-400 text-cyan-300 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 hover:text-white transition"
      onClick={onFollow}
    >
      Seguir <Users size={16} className="inline ml-1" />
    </button>
  );
}
