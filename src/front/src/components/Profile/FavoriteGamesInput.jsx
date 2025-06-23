import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Plus, Trash2, X } from "lucide-react";
import { fetchGamesByIds } from "../../service/igdbService"; // Use o serviço global

export default function FavoriteGamesInput({ value, onChange, max = 5 }) {
  const [searchValues, setSearchValues] = useState(
    value && Array.isArray(value)
      ? value.map((g) =>
          g && typeof g === "object" ? g : g ? { id: g } : null
        )
      : Array(max).fill(null)
  );
  const [inputTexts, setInputTexts] = useState(
    value && Array.isArray(value)
      ? value.map((g) => (g && typeof g === "object" && g.name ? g.name : ""))
      : Array(max).fill("")
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    let isMounted = true;

    async function fetchMissingGames() {
      const normalized =
        value && Array.isArray(value)
          ? value.map((g) =>
              g && typeof g === "object" ? g : g ? { id: g } : null
            )
          : Array(max).fill(null);

      const idsToFetch = normalized
        .filter((g) => g && (!g.cover || !g.name))
        .map((g) => g.id);

      if (idsToFetch.length === 0) {
        if (isMounted) {
          setSearchValues(normalized);
          setInputTexts(normalized.map((g) => (g && g.name ? g.name : "")));
        }
        return;
      }

      try {
        const data = await fetchGamesByIds(idsToFetch);

        const updated = normalized.map((g) => {
          if (!g) return null;
          if (g.cover && g.name) return g;
          return data.find((d) => d.id === g.id) || g;
        });

        const shouldUpdate =
          JSON.stringify(normalized) !== JSON.stringify(updated);

        if (isMounted) {
          setSearchValues(updated);
          setInputTexts(updated.map((g) => (g && g.name ? g.name : "")));
          if (shouldUpdate) {
            onChange(updated);
          }
        }
      } catch (err) {
        err;
      }
    }
    fetchMissingGames();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [value, max]);

  // Fecha modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setModalOpen(false);
        setModalIdx(null);
      }
    }
    if (modalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [modalOpen]);

  const handleSelect = (idx, game) => {
    const updated = [...searchValues];
    updated[idx] = game;
    setSearchValues(updated);
    const texts = [...inputTexts];
    texts[idx] = game.name;
    setInputTexts(texts);
    setModalOpen(false);
    setModalIdx(null);
    onChange(updated);
  };

  const handleRemove = (idx) => {
    const updated = [...searchValues];
    updated[idx] = null;
    setSearchValues(updated);
    const texts = [...inputTexts];
    texts[idx] = "";
    setInputTexts(texts);
    setModalOpen(false);
    setModalIdx(null);
    onChange(updated);
  };

  return (
    <>
      {" "}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {Array.from({ length: max }).map((_, idx) => {
          const game = searchValues[idx];
          return (
            <div
              key={idx}
              className="relative group w-16 h-24 xs:w-20 xs:h-28 sm:w-24 sm:h-32 md:w-32 md:h-44 lg:w-36 lg:h-48 bg-zinc-800 rounded-xl flex flex-col items-center justify-center overflow-hidden shadow-lg border-2 border-zinc-700"
              onClick={() => {
                if (!game) {
                  setModalOpen(true);
                  setModalIdx(idx);
                }
              }}
              tabIndex={0}
              aria-label="Adicionar jogo favorito"
            >
              {!game && (
                <div className="flex cursor-pointer flex-col items-center justify-center w-full h-full text-zinc-400 hover:text-cyan-400 transition select-none">
                  <Plus size={36} />
                  <span className="text-xs mt-2">Adicionar</span>
                </div>
              )}
              {/* Card preenchido*/}
              {game && (
                <>
                  {game.cover && (
                    <img
                      src={
                        game.cover.url
                          ? game.cover.url.startsWith("http")
                            ? game.cover.url.replace(
                                /t_thumb|t_cover_small/g,
                                "t_cover_big"
                              )
                            : `https:${game.cover.url.replace(
                                /t_thumb|t_cover_small/g,
                                "t_cover_big"
                              )}`
                          : "https://via.placeholder.com/90x120?text=No+Image"
                      }
                      className="w-full h-full object-cover"
                    />
                  )}{" "}
                  {/* Ícone de lixeira sempre visível */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-red-500 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    aria-label="Remover jogo"
                  >
                    <Trash2 size={22} className="cursor-pointer" />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Modal de busca de jogo */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm transition-all">
          <div
            ref={modalRef}
            className="bg-zinc-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn"
          >
            <button
              className="absolute cursor-pointer top-4 right-5 text-zinc-400 hover:text-fuchsia-400 text-2xl font-bold transition"
              onClick={() => {
                setModalOpen(false);
                setModalIdx(null);
              }}
              aria-label="Fechar"
            >
              <X size={28} />
            </button>
            <h2 className="text-xl font-bold text-cyan-300 mb-4 text-center">
              Escolha um jogo favorito
            </h2>
            <SearchBar
              placeholder="Buscar jogo..."
              value={inputTexts[modalIdx]}
              onChange={(e) => {
                const texts = [...inputTexts];
                texts[modalIdx] = e.target.value;
                setInputTexts(texts);
              }}
              onSearch={() => {}}
              onSelect={(selected) => handleSelect(modalIdx, selected)}
              className="w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
