import { useState } from "react";
import React from "react";
import { useUser } from "../../context/UserContext";
import SearchBar from "../SearchBar/SearchBar";
import { Menu } from "lucide-react";
import logo from "../../assets/gamepadHeader.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import { ChevronDown, Flame, Star, List, Gamepad2 } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [gamesDropdownOpen, setGamesDropdownOpen] = useState(false);
  const [navbarSearch, setNavbarSearch] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Função de logout
  function handleLogout() {
    setUser(null);
    setDropdownOpen(false);
    navigate("/"); // redireciona para home ao deslogar
  }

  const handleNavbarSearch = () => {
    if (navbarSearch.trim()) {
      navigate(`/games/search/${encodeURIComponent(navbarSearch.trim())}`);
      setNavbarSearch("");
    }
  };

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
      <nav className="relative z-[999] flex justify-between items-center text-black py-5 px-8 md:px-48 bg-zinc-900 pdrop-shadow-md hover:">
        <Link to="/">
          <img
            src={logo}
            alt="Logo do site"
            className="w-32 hover:scale-130  hover:-skew-y-3 transition-all"
          />
        </Link>
        {/* Menus principais */}
        <ul className="hidden xl:flex items-center gap-8 font-semibold text-base ml-8">
          {/* gap-8 e ml-8 para espaçamento mais equilibrado */}
          <li className="p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li
            className="relative p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer"
            onMouseEnter={() => setGamesDropdownOpen(true)}
            onMouseLeave={() => setGamesDropdownOpen(false)}
          >
            <div className="flex items-center gap-1">
              <Link to="/games">Jogos</Link>
              <ChevronDown size={16} />
            </div>
            {gamesDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-[9999] flex flex-col animate-fadeIn">
                <Link
                  to="/games"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-cyan-400"
                >
                  <Flame size={16} /> Novos Lançamentos
                </Link>
                <Link
                  to="/games"
                  state={{ menu: "best" }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-fuchsia-400"
                >
                  <Star size={16} /> Melhores
                </Link>
                <Link
                  to="/games"
                  state={{ menu: "all" }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-zinc-300"
                >
                  <List size={16} /> Todos
                </Link>
              </div>
            )}
          </li>
          <li className="p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/news">Notícias</Link>
          </li>
        </ul>

        {/* Resto da navbar: login/avatar/menu mobile */}

        <div className="relative hidden md:flex items-center justify-center gap-3 ">
          {/* SearchBar */}
          <div className="mx-6 w-full max-w-xs flex items-center">
            <SearchBar
              value={navbarSearch}
              onChange={(e) => setNavbarSearch(e.target.value)}
              onSearch={handleNavbarSearch}
            />
          </div>
          {user && user.imgUser ? (
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
                  style={{
                    minWidth: "220px",
                    padding: "0.5rem 0",
                  }}
                >
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-zinc-700">
                    <img
                      src={
                        user.imgUser &&
                        user.imgUser.startsWith("/profile-images/")
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
                  {/* itens de Navegacao */}

                  {/* ao clicar na opção vai mudar a query string para ?tab=liked por exemplo e ira para a aba de menu seguindo a query string */}
                  <Link
                    to={`/${user.nome
                      .toLowerCase()
                      .replace(/\s+/g, "-")}?tab=profile`}
                    className="px-5 py-2 text-zinc-200 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  <Link
                    to={`/${user.nome
                      .toLowerCase()
                      .replace(/\s+/g, "-")}?tab=liked`}
                    className="px-5 py-2 text-zinc-200 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Jogos Curtidos
                  </Link>
                  <Link
                    to={`/${user.nome
                      .toLowerCase()
                      .replace(/\s+/g, "-")}?tab=reviews`}
                    className="px-5 py-2 text-zinc-200 hover:bg-zinc-700 hover:text-cyan-300 transition text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Reviews
                  </Link>
                  <Link
                    to={`/${user.nome
                      .toLowerCase()
                      .replace(/\s+/g, "-")}?tab=lists`}
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
