import React from "react";
import { Link } from "react-router-dom";

const slugifyUser = (nome) => nome.toLowerCase().replace(/\s+/g, "-");

const UserDropdownMenu = ({
  user,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}) => {
  if (!user) return null;
  return (
    <div className="relative user-avatar-dropdown">
      <img
        src={
          user.imgUser && user.imgUser.startsWith("/profile-images/")
            ? `http://localhost:5069${user.imgUser}`
            : user.imgUser
        }
        alt="Perfil"
        className="w-12 h-12 rounded-full  object-cover cursor-pointer"
        onClick={() => setDropdownOpen((v) => !v)}
      />
      {dropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl z-50 flex flex-col animate-fadeIn"
          style={{ minWidth: "220px", padding: "0.5rem 0" }}
        >
          <div className="flex items-center gap-3 px-5 py-3 border-b border-zinc-700">
            <img
              src={
                user.imgUser && user.imgUser.startsWith("/profile-images/")
                  ? `http://localhost:5069${user.imgUser}`
                  : user.imgUser
              }
              alt="Avatar"
              className="w-10 h-10 rounded-full border border-zinc-600"
            />
            <div>
              <span className="block font-bold text-white text-base uppercase tracking-wide">
                {user.nome}
              </span>
              <span className="block text-xs text-zinc-400 truncate">
                {user.email}
              </span>
            </div>
          </div>

          <Link
            to={`/${slugifyUser(user.nome)}?tab=profile`}
            className="px-5 py-2 text-zinc-200 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
            onClick={() => setDropdownOpen(false)}
          >
            Meu Perfil
          </Link>
          <Link
            to={`/${slugifyUser(user.nome)}?tab=liked`}
            className="px-5 py-2 text-zinc-200 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
            onClick={() => setDropdownOpen(false)}
          >
            Jogos Curtidos
          </Link>
          <Link
            to={`/${slugifyUser(user.nome)}?tab=reviews`}
            className="px-5 py-2 text-zinc-200 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
            onClick={() => setDropdownOpen(false)}
          >
            Reviews
          </Link>
          <Link
            to={`/${slugifyUser(user.nome)}?tab=lists`}
            className="px-5 py-2 text-zinc-200 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
            onClick={() => setDropdownOpen(false)}
          >
            Listas
          </Link>
          <hr className="my-2 border-zinc-700" />
          <Link
            to="/settings"
            className="px-5 py-2 text-zinc-400 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
            onClick={() => setDropdownOpen(false)}
          >
            Configurações
          </Link>
          <button
            className="cursor-pointer w-full text-left px-5 py-2 text-red-400 hover:bg-zinc-700 hover:text-red-300 rounded-b-xl transition"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdownMenu;
