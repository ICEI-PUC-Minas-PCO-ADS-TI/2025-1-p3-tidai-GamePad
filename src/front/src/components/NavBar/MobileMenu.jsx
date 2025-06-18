import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ isMenuOpen, setShowLogin, setShowRegister }) => (
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
    <li className="p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer">
      <Link to="/guia">Guia</Link>
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
);

export default MobileMenu;
