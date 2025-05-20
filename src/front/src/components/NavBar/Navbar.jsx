import { useState } from "react";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Menu } from "lucide-react";
import logo from "../../assets/gamepadHeader.png";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
      </ul>

      <div className="relative hidden md:flex items-center justify-center gap-3 ">
        <SearchBar />
        <Button className="">Entrar</Button>
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
        

      </div>
    </nav>
  );
};

export default Navbar;
