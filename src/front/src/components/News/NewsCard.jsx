import React from "react";

export default function NewsCard({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-zinc-900 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden border border-zinc-800 hover:border-cyan-500 group min-h-[180px]"
    >
      {item.urlToImage && (
        <img
          src={item.urlToImage}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        />
      )}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-cyan-300 mb-1 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-zinc-400 text-xs mb-2 flex-1 line-clamp-2">
          {item.description ? item.description : "Sem descrição disponível."}
        </p>
        <div className="text-[10px] text-zinc-500 mt-auto flex items-center gap-2">
          <span className="truncate max-w-[80px]">{item.source?.name}</span>
          <span className="opacity-60">•</span>
          <span>{new Date(item.publishedAt).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </a>
  );
}
