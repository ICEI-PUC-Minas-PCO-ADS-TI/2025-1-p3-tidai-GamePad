import React, { useEffect, useState } from "react";
import NewsFilter from "./NewsFilter";

const NEWS_API_KEY = "d5ed40d54b23432db5ad32a4a0feedb9";
const BASE_URL = "https://newsapi.org/v2/everything";
const PAGE_SIZE = 9;
const MAX_PAGES = 5;

const GAME_KEYWORDS = [
  "game", "games", "jogo", "jogos", "videogame", "videogames",
  "xbox", "playstation", "nintendo", "switch", "ps5", "ps4", "console"
];

// Filtro: só aceita se a palavra-chave aparecer no TÍTULO
function isGameNews(article) {
  const title = (article.title || "").toLowerCase();
  return GAME_KEYWORDS.some(keyword => title.includes(keyword));
}

export default function CardNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ platform: "", search: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    setPage(1);

    let query = filters.search ? filters.search : "games";
    if (filters.platform) {
      query += ` ${filters.platform}`;
    }

    fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&pageSize=${PAGE_SIZE * MAX_PAGES}&apiKey=${NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          // Filtra apenas notícias de games pelo TÍTULO
          let filtered = data.articles.filter(isGameNews);
          filtered = filtered.slice(0, PAGE_SIZE * MAX_PAGES);
          setNews(filtered);
          setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
        } else {
          setError("Nenhuma notícia encontrada.");
          setNews([]);
          setTotalPages(1);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar notícias.");
        setNews([]);
        setTotalPages(1);
        setLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const paginatedNews = news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="w-full max-w-[1440px] mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Notícias Gamer</h2>
      <NewsFilter onFilter={setFilters} />
      {loading && (
        <div className="text-center text-white">Carregando notícias...</div>
      )}
      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {paginatedNews.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col overflow-hidden border border-zinc-700 hover:border-cyan-400"
          >
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-300 text-sm mb-4 flex-1">
                {item.description ? item.description : "Sem descrição disponível."}
              </p>
              <div className="text-xs text-zinc-400 mt-auto">
                {item.source?.name} &middot;{" "}
                {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </a>
        ))}
      </div>
      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(Math.min(totalPages, MAX_PAGES)).keys()].map((i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg font-bold ${
                page === i + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-zinc-700 text-cyan-300 hover:bg-cyan-700"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}