import React from "react";
import NewsCardHome from "./NewsCard";

export default function NewsPreviewGrid({ news }) {
  if (!news.length)
    return <div className="text-zinc-400">Nenhuma notícia encontrada.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {news.map((item, idx) => (
        <NewsCardHome key={idx} item={item} />
      ))}
    </div>
  );
}
