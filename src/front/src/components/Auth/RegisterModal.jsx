import React, { useRef, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { registerUser } from "../../service/userService";

const RegisterModal = ({ open, onClose, onSwitch }) => {
  const modalRef = useRef();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
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
    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!/^[a-zA-Z0-9 _-]{3,20}$/.test(form.nome))
      newErrors.nome =
        "Nome deve ter 3-20 caracteres e não conter símbolos especiais";
    if (!form.email) newErrors.email = "E-mail é obrigatório";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email))
      newErrors.email = "E-mail inválido";
    if (!form.senha) newErrors.senha = "Senha é obrigatória";
    else if (form.senha.length < 6)
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    if (form.senha !== form.confirmarSenha)
      newErrors.confirmarSenha = "As senhas são diferentes";
    return newErrors;
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    setErrors({});
    setAlert(null);
    try {
      await registerUser({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        tipo: "User",
      });
      setAlert({ type: "success", message: "Cadastro realizado com sucesso!" });
      setTimeout(() => {
        setAlert(null);
        onSwitch();
      }, 1500);
      setForm({ nome: "", email: "", senha: "", confirmarSenha: "" });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm transition-all">
      <div
        ref={modalRef}
        className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md  relative animate-fadeIn"
      >
        <button
          className="absolute cursor-pointer top-4 right-5 text-zinc-400 hover:text-fuchsia-400 text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="flex flex-col items-center px-8 py-10">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r  bg-clip-text text-fuchsia-400 mb-2 tracking-tight drop-shadow-lg text-center font-mono">
            Crie sua conta
          </h2>
          <p className="text-zinc-400 text-center mb-7 text-sm font-mono">
            Junte-se à comunidade e compartilhe seus jogos favoritos!
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
              type="text"
              placeholder="Nome de usuário"
              name="nome"
              className={`bg-zinc-800 text-fuchsia-200 placeholder:text-zinc-500 rounded-lg px-4 py-3 border-2 focus:outline-none focus:ring-2 font-mono transition ${
                errors.nome
                  ? "border-red-500 focus:ring-red-400"
                  : "border-fuchsia-700 focus:ring-fuchsia-400"
              }`}
              value={form.nome}
              onChange={handleChange}
              required
              autoFocus
            />
            {errors.nome && (
              <span className="text-red-400 text-xs font-mono -mt-3">
                {errors.nome}
              </span>
            )}
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              className={`bg-zinc-800 text-fuchsia-200 placeholder:text-zinc-500 rounded-lg px-4 py-3 border-2 focus:outline-none focus:ring-2 font-mono transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-fuchsia-700 focus:ring-fuchsia-400"
              }`}
              value={form.email}
              onChange={handleChange}
              required
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
              className={`bg-zinc-800 text-fuchsia-200 placeholder:text-zinc-500 rounded-lg px-4 py-3 border-2 focus:outline-none focus:ring-2 font-mono transition ${
                errors.senha
                  ? "border-red-500 focus:ring-red-400"
                  : "border-fuchsia-700 focus:ring-fuchsia-400"
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
            <input
              type="password"
              placeholder="Confirmar senha"
              name="confirmarSenha"
              className={`bg-zinc-800 text-fuchsia-200 placeholder:text-zinc-500 rounded-lg px-4 py-3 border-2 focus:outline-none focus:ring-2 font-mono transition ${
                errors.confirmarSenha
                  ? "border-red-500 focus:ring-red-400"
                  : "border-fuchsia-700 focus:ring-fuchsia-400"
              }`}
              value={form.confirmarSenha}
              onChange={handleChange}
              required
            />
            {errors.confirmarSenha && (
              <span className="text-red-400 text-xs font-mono -mt-3">
                {errors.confirmarSenha}
              </span>
            )}
            <Button
              type="submit"
              className="bg-fuchsia-500 border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 text-zinc-900 font-bold rounded-lg py-3 mt-2 transition"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </Button>
          </form>
          <div className="mt-7 text-center text-zinc-400 text-sm font-mono">
            Já tem conta?{" "}
            <button
              className="text-cyan-400 cursor-pointer hover:underline font-semibold transition"
              onClick={onSwitch}
            >
              Entrar
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

export default RegisterModal;
