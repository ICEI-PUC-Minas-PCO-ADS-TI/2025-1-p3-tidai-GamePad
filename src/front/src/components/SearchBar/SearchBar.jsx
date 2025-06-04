import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({
  placeholder = "Busque um jogo...",
  value = "",
  onChange,
  suggestions = [],
  onSelectSuggestion,
  showSuggestions = false,
  inputProps = {},
}) => {
  return (
    <div className="relative flex items-center justify-center gap-3 w-full">
      <Search size={20} color="#9c9c9c" className="absolute left-3 text-2x1" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="py-2 pl-10 rounded-xl border-2 placeholder:text-zinc-400 border-zinc-500 focus:bg-zinc-900 focus:outline-blue-300 w-full"
        {...inputProps}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((s, idx) => (
            <li
              key={s.id || s.name || idx}
              className="px-4 py-2 cursor-pointer hover:bg-cyan-700 hover:text-white text-zinc-200"
              onMouseDown={() => onSelectSuggestion && onSelectSuggestion(s)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
