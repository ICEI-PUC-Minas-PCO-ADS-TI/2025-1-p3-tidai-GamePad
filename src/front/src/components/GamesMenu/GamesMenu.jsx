import { Flame, Star } from "lucide-react";

function GamesMenu({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 items-center justify-center">
      <button
        className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full font-semibold transition ${
          selected === "popular"
            ? "bg-cyan-700 text-white"
            : "bg-zinc-800 text-cyan-400 hover:bg-cyan-700"
        }`}
        onClick={() => onSelect("popular")}
      >
        <Flame size={18} /> Populares
      </button>
      <button
        className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
          selected === "best"
            ? "bg-fuchsia-600 text-white"
            : "bg-zinc-800 text-fuchsia-400 hover:bg-fuchsia-900"
        }`}
        onClick={() => onSelect("best")}
      >
        <Star size={18} /> Melhores
      </button>
      <button
        className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full font-semibold transition ${
          selected === "new"
            ? "bg-cyan-600 text-white"
            : "bg-zinc-800 text-cyan-400 hover:bg-cyan-900"
        }`}
        onClick={() => onSelect("new")}
      >
        <Flame size={18} /> Lançamentos
      </button>
    </div>
  );
}

export default GamesMenu;
