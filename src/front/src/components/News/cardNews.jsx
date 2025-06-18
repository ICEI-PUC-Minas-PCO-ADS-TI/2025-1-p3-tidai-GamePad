import React from "react";
import NewsFilter from "./NewsFilter";
import NewsCard from "./NewsCard";
import NewsPagination from "./NewsPagination";
import useNews from "./useNews";

export default function CardNews() {
  const {
    news,
    loading,
    error,
    setFilters,
    page,
    setPage,
    totalPages,
    MAX_PAGES,
  } = useNews();

  return (
    <section className="w-full max-w-[1440px] mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
        Notícias Gamer
      </h2>
      <NewsFilter onFilter={setFilters} />
      {loading && (
        <div className="text-center text-white">Carregando notícias...</div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {news.map((item, idx) => (
          <NewsCard key={idx} item={item} />
        ))}
      </div>
      <NewsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        maxPages={MAX_PAGES}
      />
    </section>
  );
}
