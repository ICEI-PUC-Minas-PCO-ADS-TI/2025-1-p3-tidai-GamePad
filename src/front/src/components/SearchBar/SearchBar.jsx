import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Busque um jogo..." }) => (
  <div className="relative flex items-center justify-center gap-3">
    <Search
      size={20}
      color="#9c9c9c"
      className="absolute left-3 text-2x1"
    />
    <input
      type="text"
      placeholder={placeholder}
      className="py-2 pl-10 rounded-xl border-2 placeholder:text-zinc-400 border-zinc-500 focus:bg-zinc-900 focus:outline-blue-300"
    />
  </div>
);

export default SearchBar;