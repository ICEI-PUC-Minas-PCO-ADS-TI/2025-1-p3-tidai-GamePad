import React from "react";

export default function NewsCard({ item }) {
  return (
    <a
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
  );
}
