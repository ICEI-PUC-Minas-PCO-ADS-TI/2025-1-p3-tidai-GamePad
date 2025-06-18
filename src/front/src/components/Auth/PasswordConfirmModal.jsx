import React, { useState } from "react";
import { Button } from "../Button/Button";

const PasswordConfirmModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  error = null,
  title = "Confirme sua senha",
  description = "Por favor, digite sua senha para continuar.",
}) => {
  const [senha, setSenha] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!senha) {
      setLocalError("Digite sua senha.");
      return;
    }
    await onConfirm(senha);
  };

  React.useEffect(() => {
    if (!open) {
      setSenha("");
      setLocalError(null);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm transition-all">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-cyan-500 relative animate-fadeIn">
        <button
          className="absolute cursor-pointer top-4 right-5 text-zinc-400 hover:text-cyan-400 text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2 text-center">
          {title}
        </h2>
        <p className="text-zinc-400 text-center mb-4 text-sm">{description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Senha"
            className="bg-zinc-800 text-cyan-200 placeholder:text-zinc-500 rounded-lg px-4 py-3 border-2 focus:outline-none focus:ring-2 font-mono transition border-cyan-700 focus:ring-cyan-400"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoFocus
            disabled={loading}
          />
          {(localError || error) && (
            <span className="text-red-400 text-xs font-mono">
              {localError || error}
            </span>
          )}
          <Button
            type="submit"
            className="bg-cyan-500 hover:bg-transparent cursor-pointer text-zinc-900 font-bold rounded-lg py-3 mt-2 transition"
            disabled={loading}
          >
            {loading ? "Verificando..." : "Confirmar"}
          </Button>
        </form>
      </div>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn .22s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(.97);}
          to { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
};

export default PasswordConfirmModal;
