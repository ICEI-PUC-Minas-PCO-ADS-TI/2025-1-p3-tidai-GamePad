import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const slugifyUser = (nome) => nome.toLowerCase().replace(/\s+/g, "-");

const MobileMenu = ({
  isMenuOpen,
  setShowLogin,
  setShowRegister,
  user,
  onLogout,
}) => {
  const navigate = useNavigate();
  const userSlug = user ? slugifyUser(user.nome) : "";
  const [search, setSearch] = useState("");

  // Função para navegação (não precisa fechar menu, pois a navegação já faz isso)
  const handleNav = (path) => {
    navigate(path);
  };

  const handleMobileSearch = () => {
    if (search.trim()) {
      navigate(`/games/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <div
      className={`absolute xl:hidden top-24 left-0 w-full bg-zinc-900 flex flex-col items-center gap-0 font-semibold text-lg shadow-md transform transition-transform z-[998] ${
        isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
    >
      <ul className="w-full flex flex-col items-center">
        <li className="text-white w-full text-center p-4 hover:text-pink-500 active:text-pink-500 transition-all">
          <button className="w-full" onClick={() => handleNav("/")}>
            Home
          </button>
        </li>
        <li className="text-white w-full text-center p-4 hover:text-pink-500 active:text-pink-500 transition-all">
          <button className="w-full" onClick={() => handleNav("/games")}>
            Jogos
          </button>
        </li>
        <li className="text-white w-full text-center p-4 hover:text-pink-500 active:text-pink-500 transition-all">
          <button className="w-full" onClick={() => handleNav("/news")}>
            Notícias
          </button>
        </li>
        <li className="text-white w-full text-center p-4 hover:text-pink-500 active:text-pink-500 transition-all">
          <button className="w-full" onClick={() => handleNav("/guia")}>
            Guia
          </button>
        </li>
        <hr className="border-zinc-700 my-2 w-3/4" />
        <li className="w-full flex justify-center px-4 pb-2">
          <div className="w-full max-w-xs p-3 flex items-center mt-2 mb-2 ">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={handleMobileSearch}
            />
          </div>
        </li>
        <li className="w-full flex justify-center px-4">
          <hr className="border-zinc-700 my-2 w-3/4" />
        </li>
        {user && user.imgUser ? (
          <>
            <li className="flex flex-row items-center justify-center w-full p-2 gap-3">
              <img
                src={
                  user.imgUser && user.imgUser.startsWith("/profile-images/")
                    ? `${import.meta.env.VITE_API_URL}${user.imgUser}`
                    : user.imgUser || "/default-avatar.png"
                }
                alt={user.nome || "Avatar"}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
              />
              <div className="flex flex-col justify-center">
                <span className="text-white font-semibold text-base">
                  {user.nome}
                </span>
                <span className="text-zinc-400 text-xs">{user.email}</span>
              </div>
            </li>
            <li className="w-full text-center p-3 text-white hover:text-cyan-400 transition-all">
              <button
                className="w-full"
                onClick={() => handleNav(`/${userSlug}?tab=profile`)}
              >
                Meu Perfil
              </button>
            </li>
            <li className="w-full text-center p-3 text-white hover:text-cyan-400 transition-all">
              <button
                className="w-full"
                onClick={() => handleNav(`/${userSlug}?tab=liked`)}
              >
                Jogos Curtidos
              </button>
            </li>
            <li className="w-full text-center p-3 text-white hover:text-cyan-400 transition-all">
              <button
                className="w-full"
                onClick={() => handleNav(`/${userSlug}?tab=reviews`)}
              >
                Reviews
              </button>
            </li>
            <li className="w-full text-center p-3 text-white hover:text-cyan-400 transition-all">
              <button
                className="w-full"
                onClick={() => handleNav(`/${userSlug}?tab=lists`)}
              >
                Listas
              </button>
            </li>
            <li className="w-full flex justify-center px-4">
              <hr className="border-zinc-700 my-2 w-3/4" />
            </li>
            <li className="w-full text-center p-3 text-zinc-400 hover:text-cyan-400 transition-all">
              <button className="w-full" onClick={() => handleNav("/settings")}>
                Configurações
              </button>
            </li>{" "}
            <li className="w-full text-center p-3">
              <button
                className="text-red-500 font-bold hover:text-red-700 transition-all"
                onClick={() => {
                  onLogout();
                }}
              >
                Sair
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="w-full text-center p-4">
              <button
                className="text-fuchsia-600 font-bold hover:text-fuchsia-800 transition-all cursor-pointer w-full"
                onClick={() => {
                  setShowRegister(true);
                }}
              >
                Cadastre-se
              </button>
            </li>
            <li className="w-full text-center p-4">
              <button
                className="text-cyan-600 font-bold hover:text-cyan-800 transition-all cursor-pointer w-full"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Entrar
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
