import { useState, useEffect } from "react";
import {
  NEWS_API_KEY,
  BASE_URL,
  PAGE_SIZE,
  MAX_PAGES,
  isGameNews,
} from "./newsUtils";

export default function useNews() {
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
      `${BASE_URL}?q=${encodeURIComponent(
        query
      )}&language=pt&sortBy=publishedAt&pageSize=${
        PAGE_SIZE * MAX_PAGES
      }&apiKey=${NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
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

  return {
    news: paginatedNews,
    loading,
    error,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    PAGE_SIZE,
    MAX_PAGES,
  };
}
