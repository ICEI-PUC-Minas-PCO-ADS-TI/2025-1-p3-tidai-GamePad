import React, { useState } from "react";

export default function ProfileBio({ user }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_CHARS = 180;
  const bio = user.bio || "";
  const isLong = bio.length > MAX_CHARS;
  const displayBio =
    !isLong || expanded ? bio : bio.slice(0, MAX_CHARS) + "...";

  return (
    <div>
      <h4 className="text-zinc-300 font-semibold mb-2">Bio</h4>
      <div className="bg-zinc-800 rounded-lg p-4 min-h-[60px] text-zinc-300 text-sm">
        {bio ? (
          <span>{displayBio}</span>
        ) : (
          <>
            Olá, meu nome é <b>{user.nome}</b>. <br />
            <span className="text-zinc-500">Nenhuma biografia cadastrada.</span>
          </>
        )}
      </div>
      {isLong && (
        <button
          className="cursor-pointer text-cyan-400 text-xs mt-1"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Mostrar menos" : "Expandir"}
        </button>
      )}
    </div>
  );
}
