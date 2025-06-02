import React, { useState } from "react";
import { Flame, Star, List, Monitor, Gamepad2, Smartphone } from "lucide-react";

const PLATFORMS = [
  { key: "pc", label: "PC", icon: <Monitor size={18} /> },
  { key: "xbox", label: "Xbox", icon: <Gamepad2 size={18} /> },
  { key: "playstation", label: "PlayStation", icon: <Gamepad2 size={18} /> },
  { key: "switch", label: "Switch", icon: <Gamepad2 size={18} /> },
  { key: "mobile", label: "Mobile", icon: <Smartphone size={18} /> },
];

export default function GamesMenu({
  selected,
  onSelect,
  selectedPlatform,
  onPlatformSelect,
}) {
  // Estado para controlar a abertura do dropdown de plataformas
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);

  // Função para lidar com o clique no botão de plataforma
  const handlePlatformButtonClick = () => {
    onSelect("platform");
    setIsPlatformDropdownOpen((open) => !open);
  };

// Função para lidar com a seleção de uma plataforma
  const handlePlatformSelect = (key) => {
    onPlatformSelect(key);
    // console.log("Plataforma selecionada:", key);
    setIsPlatformDropdownOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8 items-center justify-center">
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
        <Flame size={18} /> Novos Lançamentos
      </button>
      <button
        className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full font-semibold transition ${
          selected === "all"
            ? "bg-zinc-700 text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        }`}
        onClick={() => onSelect("all")}
      >
        <List size={18} /> Todos
      </button>
      <div className="relative">
        <button
          className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full font-semibold transition ${
            selected === "platform" && isPlatformDropdownOpen
              ? "bg-yellow-600 text-white"
              : "bg-zinc-800 text-yellow-400"
          }`}
          onClick={handlePlatformButtonClick}
        >
          <Gamepad2 size={18} /> Por Plataforma
        </button>
        {isPlatformDropdownOpen && (
          <div className="absolute left-0 top-full mt-1 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-[9999] flex flex-col min-w-[180px]">
            <button
              className={`flex items-center cursor-pointer gap-2 px-4 py-2 text-left hover:bg-zinc-800 transition ${
                !selectedPlatform ? "bg-cyan-700 text-white" : "text-zinc-200"
              }`}
              onClick={() => handlePlatformSelect(null)}
            >
              {/* Ícone de lista para todas plataformas */}
              <List size={18} /> Todas Plataformas
            </button>
            {PLATFORMS.map((p) => (
              <button
                key={p.key}
                className={`flex items-center cursor-pointer gap-2 px-4 py-2 text-left hover:bg-zinc-800 transition ${
                  selectedPlatform === p.key
                    ? "bg-cyan-700 text-white"
                    : "text-zinc-200"
                }`}
                onClick={() => handlePlatformSelect(p.key)}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
