import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function FavoriteGamesInput({ value, onChange, max = 5 }) {
  // value: array de objetos {id, name}
  const [searchValues, setSearchValues] = useState(
    value && Array.isArray(value) ? value : Array(max).fill(null)
  );
  // Estado para texto digitado em cada input
  const [inputTexts, setInputTexts] = useState(
    value && Array.isArray(value)
      ? value.map((g) => (g && g.name ? g.name : ""))
      : Array(max).fill("")
  );

  const handleSelect = (idx, game) => {
    const updated = [...searchValues];
    updated[idx] = game;
    setSearchValues(updated);
    // Atualiza o texto do input para o nome selecionado
    const texts = [...inputTexts];
    texts[idx] = game.name;
    setInputTexts(texts);
    onChange(updated);
  };

  const handleRemove = (idx) => {
    const updated = [...searchValues];
    updated[idx] = null;
    setSearchValues(updated);
    const texts = [...inputTexts];
    texts[idx] = "";
    setInputTexts(texts);
    onChange(updated);
  };

  const handleInputChange = (idx, e) => {
    const texts = [...inputTexts];
    texts[idx] = e.target.value;
    setInputTexts(texts);
    // Não altera o valor salvo até selecionar do autocomplete
  };

  return (
    <div className="flex flex-col gap-3">
      {searchValues.map((game, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <div className="flex-1">
            <SearchBar
              placeholder={`Jogo favorito #${idx + 1}`}
              value={inputTexts[idx]}
              onChange={(e) => handleInputChange(idx, e)}
              onSearch={() => {}}
              onSelect={(selected) => handleSelect(idx, selected)}
            />
          </div>
          {game && (
            <button
              type="button"
              className="ml-2 px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={() => handleRemove(idx)}
            >
              Remover
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
