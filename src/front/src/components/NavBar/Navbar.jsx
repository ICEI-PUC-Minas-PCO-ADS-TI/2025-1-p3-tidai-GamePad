import { useState } from "react";
import React from "react";
import { useUser } from "../../context/UserContext";
import SearchBar from "../SearchBar/SearchBar";
import { Menu } from "lucide-react";
import logo from "../../assets/gamepadHeader.png";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useUser();

  // Função de logout
  function handleLogout() {
    setUser(null);
    setDropdownOpen(false);
  }

  // Fecha dropdown ao clicar fora
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".user-avatar-dropdown")) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <>
      <nav className="flex justify-between items-center text-black py-5 px-8 md:px-48 bg-zinc-900 pdrop-shadow-md hover:">
        <a href="">
          <img
            src={logo}
            alt="Logo do site"
            className="w-32 hover:scale-130  hover:-skew-y-3 transition-all"
          />
        </a>

        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li className="p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/games">Jogos</Link>
          </li>
          <li className="p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/news">Notícias</Link>
          </li>
          <li className="p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/Comunidade">Comunidade</Link>
          </li>
        </ul>

        <div className="relative hidden md:flex items-center justify-center gap-3 ">
          <SearchBar />
          {user && user.imgUser ? (
            <div className="relative user-avatar-dropdown">
              <img
                src={user.imgUser}
                alt="Perfil"
                className="w-12 h-12 rounded-full border-2 border-fuchsia-500 object-cover cursor-pointer"
                onClick={() => setDropdownOpen((v) => !v)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50 flex flex-col animate-fadeIn">
                  <div className="px-4 py-3 text-zinc-200 border-b border-zinc-800">
                    <span className="block font-semibold">{user.nome}</span>
                    <span className="block text-xs text-zinc-400 truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    className="w-full cursor-pointer text-left px-4 py-2 text-red-400 hover:bg-zinc-800 hover:text-red-300 rounded-b-xl transition"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button className="" onClick={() => setShowLogin(true)}>
                Entrar
              </Button>
              <Button
                className="bg-fuchsia-600 border-fuchsia-500 hover:text-fuchsia-500  ml-2"
                onClick={() => setShowRegister(true)}
              >
                Registrar
              </Button>
            </>
          )}
        </div>

        <Menu
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          size={20}
          color="#000000"
          className="xl:hidden block text-5x1 cursor-pointer"
        />

        <div
          className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col item-center -gap-6 font-semibold -text-lg transform transition-transform ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transtion: "transform 0.3s ease, opacity 0.3 ease" }}
        >
          <li className="list-none w-full text-center p-4 hover:text-pink-500 active:text-pink-500 transition-all">
            <Link to="/">Home</Link>
          </li>
          <li className="list-none w-full text-center p-4 hover:text-pink-500 active:text-pink-500 transition-all">
            <Link to="/games">Jogos</Link>
          </li>
          <li className="list-none w-full text-center p-4 hover:text-pink-500 active:text-pink-500 transition-all">
            <Link to="/news">Notícias</Link>
          </li>
          <li className="list-none w-full text-center p-4">
            <span
              className="text-fuchsia-600 font-bold hover:text-fuchsia-800 transition-all cursor-pointer"
              onClick={() => setShowRegister(true)}
            >
              Cadastre-se
            </span>
          </li>
          <li className="list-none w-full text-center p-4">
            <span
              className="text-cyan-600 font-bold hover:text-cyan-800 transition-all cursor-pointer"
              onClick={() => setShowLogin(true)}
            >
              Entrar
            </span>
          </li>
        </div>
      </nav>
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitch={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitch={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};

export default Navbar;
