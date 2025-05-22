import React, { useRef, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { loginUser, getUserByEmail } from "../../service/userService";
import { useUser } from "../../context/UserContext";

const LoginModal = ({ open, onClose, onSwitch }) => {
  const modalRef = useRef();
  const { setUser } = useUser();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function validate() {
    const newErrors = {};
    if (!form.email) newErrors.email = "E-mail é obrigatório";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email))
      newErrors.email = "E-mail inválido";
    if (!form.senha) newErrors.senha = "Senha é obrigatória";
    return newErrors;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Tentando login com:", form);
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      console.log("Erros de validação:", validation);
      setErrors(validation);
      return;
    }
    setLoading(true);
    setErrors({});
    setAlert(null);
    try {
      const data = await loginUser(form);
      console.log("Login bem-sucedido, resposta:", data);
      // Buscar dados completos do usuário
      const user = await getUserByEmail(form.email);
      setUser({ ...user, jwt: data.jwt });
      setAlert({ type: "success", message: "Bem-vindo!" });
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setAlert({ type: "error", message: err.message });
    } finally {
      setLoading(false);
      console.log("Finalizou tentativa de login");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm transition-all">
      <div
        ref={modalRef}
        className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-cyan-500 relative animate-fadeIn"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg tracking-widest uppercase border-2 border-zinc-900 select-none">
            Bem-vindo de volta
          </span>
        </div>
        <button
          className="absolute cursor-pointer top-4 right-5 text-zinc-400 hover:text-cyan-400 text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="flex flex-col items-center px-8 py-10">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-lg text-center font-mono">
            Entrar na conta
          </h2>
          <p className="text-zinc-400 text-center mb-7 text-sm font-mono">
            Acesse sua conta e continue sua jornada gamer!
          </p>
          {alert && (
            <div
              className={`w-full mb-4 py-2 px-4 rounded-lg text-center font-bold ${
                alert.type === "success"
                  ? "bg-green-600 text-white border-2 border-green-400"
                  : "bg-red-600 text-white border-2 border-red-400"
              } animate-fadeIn`}
            >
              {alert.message}
            </div>
          )}
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              className={`bg-zinc-800 text-cyan-200 placeholder:text-zinc-500 rounded-lg px-4 py-3 border-2 focus:outline-none focus:ring-2 font-mono transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-cyan-700 focus:ring-cyan-400"
              }`}
              value={form.email}
              onChange={handleChange}
              required
              autoFocus
            />
            {errors.email && (
              <span className="text-red-400 text-xs font-mono -mt-3">
                {errors.email}
              </span>
            )}
            <input
              type="password"
              placeholder="Senha"
              name="senha"
              className={`bg-zinc-800 text-cyan-200 placeholder:text-zinc-500 rounded-lg px-4 py-3 border-2 focus:outline-none focus:ring-2 font-mono transition ${
                errors.senha
                  ? "border-red-500 focus:ring-red-400"
                  : "border-cyan-700 focus:ring-cyan-400"
              }`}
              value={form.senha}
              onChange={handleChange}
              required
            />
            {errors.senha && (
              <span className="text-red-400 text-xs font-mono -mt-3">
                {errors.senha}
              </span>
            )}
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-transparent cursor-pointer text-zinc-900 font-bold rounded-lg py-3 mt-2 transition"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="mt-7 text-center text-zinc-400 text-sm font-mono">
            Não tem conta?{" "}
            <button
              className="text-fuchsia-400 cursor-pointer hover:underline font-semibold transition"
              onClick={onSwitch}
            >
              Cadastre-se
            </button>
          </div>
        </div>
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

export default LoginModal;
