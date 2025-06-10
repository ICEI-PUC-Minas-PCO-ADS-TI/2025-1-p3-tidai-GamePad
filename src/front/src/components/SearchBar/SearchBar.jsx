import { Search } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { fetchGames } from "../../service/igdbService";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  placeholder = "Busque um jogo...",
  value = "",
  onChange,
  onSearch,
  className = "",
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoading(true);
    fetchGames({ search: value.trim(), limit: 7 })
      .then((data) => {
        setSuggestions(data || []);
        setShowSuggestions(true);
        setLoading(false);
      })
      .catch(() => {
        setSuggestions([]);
        setShowSuggestions(false);
        setLoading(false);
      });
  }, [value]);

  useEffect(() => {
    function handleClick(e) {
      if (!inputRef.current?.contains(e.target)) setShowSuggestions(false);
    }
    if (showSuggestions) {
      window.addEventListener("mousedown", handleClick);
    }
    return () => window.removeEventListener("mousedown", handleClick);
  }, [showSuggestions]);

  const handleSelect = (game) => {
    setShowSuggestions(false);
    onChange({ target: { value: game.name } });
    navigate(`/games/${game.id}`);
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setShowSuggestions(false);
    if (highlighted >= 0 && suggestions[highlighted]) {
      handleSelect(suggestions[highlighted]);
    } else if (value.trim()) {
      if (onSearch) onSearch();
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlighted >= 0 && suggestions[highlighted]) {
        handleSelect(suggestions[highlighted]);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div
      className={`relative flex items-center w-full ${className}`}
      ref={inputRef}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          setHighlighted(-1);
        }}
        onFocus={() => value && setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        className="py-2 pl-4 pr-10 rounded-xl border-2 text-white placeholder:text-zinc-400 border-zinc-500 focus:bg-zinc-900 focus:outline-blue-300 w-full"
      />
      <button
        type="button"
        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-zinc-800 transition"
        onClick={handleSubmit}
        tabIndex={0}
        aria-label="Buscar"
      >
        <Search size={20} color="#9c9c9c" />
      </button>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50 mt-1 max-h-72 overflow-y-auto">
          {suggestions.map((s, idx) => (
            <li
              key={s.id || s.name || idx}
              className={`px-4 py-2 cursor-pointer flex flex-col hover:bg-cyan-700 hover:text-white text-zinc-200 ${
                highlighted === idx ? "bg-cyan-700 text-white" : ""
              }`}
              onMouseDown={() => handleSelect(s)}
              onMouseEnter={() => setHighlighted(idx)}
            >
              <span className="font-semibold">{s.name}</span>
              {s.first_release_date && (
                <span className="text-xs text-zinc-400">
                  {new Date(s.first_release_date * 1000).getFullYear()}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && !loading && suggestions.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50 mt-1 px-4 py-2 text-zinc-400">
          Nenhum jogo encontrado.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
