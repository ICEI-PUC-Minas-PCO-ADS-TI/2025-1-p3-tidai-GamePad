import React, { useState, useRef, useEffect } from "react";
import { Flame, Star, List, Gamepad2 } from "lucide-react";
import { fetchPlatforms } from "../../service/igdbService";

export default function GamesMenu({
  selected,
  onSelect,
  selectedPlatform = null,
  onPlatformSelect,
}) {
  // Estado para plataformas vindo da igdb
  const [platforms, setPlatforms] = useState([]);
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const [loadingPlatforms, setLoadingPlatforms] = useState(false);
  const [platformsError, setPlatformsError] = useState(null);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Buscar plataformas ao build
  useEffect(() => {
    setLoadingPlatforms(true);
    fetchPlatforms()
      .then((data) => {
        setPlatforms(data);
        setLoadingPlatforms(false);
      })
      .catch(() => {
        setPlatformsError("Erro ao buscar plataformas");
        setLoadingPlatforms(false);
      });
  }, []);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    if (!isPlatformDropdownOpen) return;
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsPlatformDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPlatformDropdownOpen]);

  const handlePlatformButtonClick = () => {
    onSelect("platform");
    setIsPlatformDropdownOpen((open) => !open);
  };

  const handlePlatformSelect = (key) => {
    onPlatformSelect(key);
  };

  // Filtra plataformas pelo termo de busca
  const filteredPlatforms = platforms.filter((p) =>
    (p.abbreviation || p.name).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-3 mb-8 items-center justify-center">
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
          <div
            ref={dropdownRef}
            className="absolute left-0 top-full mt-1 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-[9999] flex flex-col min-w-[220px] p-2"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-zinc-300 font-semibold text-sm pl-1">
                Filtrar por plataforma
              </span>
              <button
                className="text-zinc-400 hover:text-fuchsia-400 text-xl font-bold px-2"
                onClick={() => setIsPlatformDropdownOpen(false)}
                aria-label="Fechar cursor-pointer"
              >
                ×
              </button>
            </div>
            <input
              type="text"
              placeholder="Buscar plataforma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-2 px-3 py-1 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
              <label
                className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-zinc-800 transition ${
                  !selectedPlatform ? "bg-cyan-700 text-white" : "text-zinc-200"
                }`}
              >
                <input
                  type="radio"
                  name="platform-radio"
                  checked={!selectedPlatform}
                  onChange={() => handlePlatformSelect(null)}
                  className="accent-cyan-500"
                />
                <List size={18} /> Todas Plataformas
              </label>
              {loadingPlatforms && (
                <div className="text-zinc-400 text-xs px-3 py-2">
                  Carregando plataformas...
                </div>
              )}
              {platformsError && (
                <div className="text-red-400 text-xs px-3 py-2">
                  {platformsError}
                </div>
              )}
              {filteredPlatforms.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-zinc-800 transition ${
                    selectedPlatform === p.name
                      ? "bg-cyan-700 text-white"
                      : "text-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="platform-radio"
                    checked={selectedPlatform === p.name}
                    onChange={() => handlePlatformSelect(p.name)}
                    className="accent-cyan-500"
                  />
                  <Gamepad2 size={16} /> {p.abbreviation || p.name}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
