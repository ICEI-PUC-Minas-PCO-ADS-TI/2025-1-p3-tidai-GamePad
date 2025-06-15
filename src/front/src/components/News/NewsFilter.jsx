import React, { useState, useEffect } from "react";
import NewsFilter from "./NewsFilter";

export default function CardNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
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
      `${BASE_URL}?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&pageSize=6&apiKey=${NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          let filtered = data.articles;
          if (filters.platform) {
            filtered = filtered.filter((article) =>
              article.title.toLowerCase().includes(filters.platform)
            );
          }
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

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4">
      <NewsFilter onFilter={handleFilter} />
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article) => (
          <div
            key={article.url}
            className="bg-zinc-800 rounded-lg p-4 flex flex-col"
          >
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="flex-1">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg text-center"
            >
              Ler mais
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}