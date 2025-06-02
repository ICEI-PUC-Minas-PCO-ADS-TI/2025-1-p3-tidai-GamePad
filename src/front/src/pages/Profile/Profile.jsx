import React from "react";
import { useUser } from "../../context/UserContext";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-200">
        <h2 className="text-2xl font-bold mb-4">
          Você precisa estar logado para ver o perfil.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-200">
      <img
        src={user.imgUser}
        alt="Avatar"
        className="w-32 h-32 rounded-full border-4 border-fuchsia-500 mb-4 object-cover"
      />
      <h2 className="text-3xl font-bold mb-2">{user.nome}</h2>
      <p className="text-lg text-zinc-400 mb-2">{user.email}</p>
      <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
        {user.tipo}
      </span>
    </div>
  );
}
