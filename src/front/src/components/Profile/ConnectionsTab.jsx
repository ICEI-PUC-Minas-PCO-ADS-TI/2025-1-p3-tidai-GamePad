import React from "react";

export default function ConnectionsTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-cyan-200 mb-1">Conexões</h3>
      <hr className="mb-4 border-zinc-700" />
      <div className="flex gap-8">
        <div className="flex-1">
          <h4 className="text-zinc-300 font-semibold mb-2">Seguindo</h4>
          <div className="bg-zinc-800 rounded-lg p-4 text-zinc-500 text-center">
            Usuários que sigo (placeholder)
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-zinc-300 font-semibold mb-2">Seguidores</h4>
          <div className="bg-zinc-800 rounded-lg p-4 text-zinc-500 text-center">
            Usuários que me seguem (placeholder)
          </div>
        </div>
      </div>
    </div>
  );
}
