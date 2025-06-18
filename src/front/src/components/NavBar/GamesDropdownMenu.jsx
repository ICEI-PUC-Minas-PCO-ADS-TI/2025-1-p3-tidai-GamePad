import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Flame, Star, List } from "lucide-react";

const GamesDropdownMenu = ({ open, setOpen, navigate }) => {
  return (
    <li
      className="relative p-3 hover:-skew-y-3 text-cyan-500 hover:bg-cyan-500 hover:text-zinc-900 rounded-md transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-1">
        <Link to="/games">Jogos</Link>
        <ChevronDown size={16} />
      </div>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-[9999] flex flex-col animate-fadeIn">
          <button
            className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-cyan-400 text-left"
            onClick={() => {
              navigate("/games");
              setOpen(false);
            }}
          >
            <Flame size={16} /> Populares
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-fuchsia-400 text-left"
            onClick={() => {
              navigate("/games", { state: { menu: "best" } });
              setOpen(false);
            }}
          >
            <Star size={16} /> Melhores
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-zinc-300 text-left"
            onClick={() => {
              navigate("/games", { state: { menu: "new" } });
              setOpen(false);
            }}
          >
            <List size={16} /> Lançamentos
          </button>
        </div>
      )}
    </li>
  );
};

export default GamesDropdownMenu;
