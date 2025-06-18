import React from "react";
import { Button } from "../Button/Button";

export default function AccessDeniedModal({ open, onLogin }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Atenção</h2>
        <p className="text-white mb-6">
          Você precisa estar logado para acessar esta página.
        </p>
        <Button onClick={onLogin}>Fazer login</Button>
      </div>
    </div>
  );
}
