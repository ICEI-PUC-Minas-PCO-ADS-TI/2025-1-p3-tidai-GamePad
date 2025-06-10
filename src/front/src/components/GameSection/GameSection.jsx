import React from "react";

export default function GameSection({ title, games, renderCard }) {
  if (!games.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {games.map((game) => renderCard(game))}
      </div>
    </section>
  );
}
