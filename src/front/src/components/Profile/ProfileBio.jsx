import React from "react";

export default function ProfileBio({ user, onExpand }) {
  return (
    <div>
      <h4 className="text-zinc-300 font-semibold mb-2">Bio</h4>
      <div className="bg-zinc-800 rounded-lg p-4 min-h-[60px] text-zinc-300 text-sm">
        {user.bio || (
          <>
            Olá, meu nome é <b>{user.nome}</b>. <br />
            <span className="text-zinc-500">Nenhuma biografia cadastrada.</span>
          </>
        )}
      </div>
      <button
        className=" cursor-pointer text-cyan-400 text-xs mt-1"
        onClick={onExpand}
      >
        Expandir
      </button>
    </div>
  );
}
