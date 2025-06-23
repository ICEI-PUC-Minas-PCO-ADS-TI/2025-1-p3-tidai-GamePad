import { useState } from "react";
import React from "react";
import { useUser } from "../../context/UserContext";
import SearchBar from "../SearchBar/SearchBar";
import { Menu } from "lucide-react";
import logo from "../../assets/gamepadHeader.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";
import GamesDropdownMenu from "./GamesDropdownMenu";
import UserDropdownMenu from "./UserDropdownMenu";
import MobileMenu from "./MobileMenu";
import AuthButtons from "../Auth/AuthButtons";

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
      <nav className="relative z-[999] flex justify-between items-center bg-zinc-900 py-3 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48  w-full">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="Logo do site"
            className="w-24 sm:w-28 md:w-32 hover:scale-110 hover:-skew-y-3 transition-all"
          />
        </Link>
        {/* Menus principais - escondido em telas menores */}
        <ul className="hidden xl:flex items-center gap-4 lg:gap-8 font-semibold text-base ml-2 lg:ml-8">
          <li className="p-2 lg:p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <GamesDropdownMenu
            open={gamesDropdownOpen}
            setOpen={setGamesDropdownOpen}
            navigate={navigate}
          />
          <li className="p-2 lg:p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/news">Notícias</Link>
          </li>
          <li className="p-2 lg:p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
            <Link to="/guia">Guia</Link>
          </li>
        </ul>

        {/* Search e Auth - escondido em telas menores */}
        <div className="relative hidden xl:flex items-center justify-center gap-2 lg:gap-3">
          <div className="mx-2 lg:mx-6 w-full max-w-[120px] sm:max-w-xs flex items-center">
            <SearchBar
              value={navbarSearch}
              onChange={(e) => setNavbarSearch(e.target.value)}
              onSearch={handleNavbarSearch}
            />
          </div>
          {user && user.imgUser ? (
            <UserDropdownMenu
              user={user}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              handleLogout={handleLogout}
            />
          ) : (
            <AuthButtons
              setShowLogin={setShowLogin}
              setShowRegister={setShowRegister}
            />
          )}
        </div>

        {/* Botão do menu mobile - aparece só em telas menores que xl */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex xl:hidden cursor-pointer items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Abrir menu"
        >
          <Menu size={28} color="#fff" />
        </button>

        {/* Menu mobile sobreposto */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setShowLogin={(v) => {
            setShowLogin(v);
            setIsMenuOpen(false);
          }}
          setShowRegister={(v) => {
            setShowRegister(v);
            setIsMenuOpen(false);
          }}
          user={user}
          onLogout={() => {
            setUser(null);
            setIsMenuOpen(false);
            navigate("/");
          }}
        />
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
