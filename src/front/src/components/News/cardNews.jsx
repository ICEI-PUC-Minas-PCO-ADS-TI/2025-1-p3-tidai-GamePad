import React, { useEffect, useState } from "react";
import NewsFilter from "./NewsFilter"; // ajuste o caminho conforme seu projeto

const NEWS_API_KEY = "d5ed40d54b23432db5ad32a4a0feedb9";
const BASE_URL = "https://newsapi.org/v2/everything";

const GAME_KEYWORDS = [
  "game", "games", "jogo", "jogos", "videogame", "videogames",
  "xbox", "playstation", "nintendo", "switch", "ps5", "ps4", "console"
];

function isGameNews(article) {
  const text = `${article.title} ${article.description}`.toLowerCase();
  return GAME_KEYWORDS.some(keyword => text.includes(keyword));
}

export default function CardNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    date: "today",
    platform: "",
    search: "",
  });

  useEffect(() => {
    setLoading(true);
    setError("");

    let query = filters.search ? filters.search : "games";
    if (filters.platform) {
      query += ` ${filters.platform}`;
    }

    fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&pageSize=12&apiKey=${NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          // Filtra apenas notícias realmente de games
          let filtered = data.articles.filter(isGameNews);
          setNews(filtered);
        } else {
          setError("Nenhuma notícia encontrada.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar notícias.");
        setLoading(false);
      });
  }, [filters]);

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
        {news.map((item, idx) => (
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
    </section>
  );
}