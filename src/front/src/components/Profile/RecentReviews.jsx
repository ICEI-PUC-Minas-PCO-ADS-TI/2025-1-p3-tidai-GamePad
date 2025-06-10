import React from "react";

export default function RecentReviews({ reviews = [] }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-cyan-200 mb-1">
        Avaliações Recentes
      </h3>
      <hr className="mb-4 border-zinc-700" />
      {reviews.length === 0 ? (
        <div className="bg-zinc-800 rounded-lg p-8 text-zinc-500 text-center">
          Nenhuma avaliação recente.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviews.slice(0, 5).map((review, i) => (
            <li key={i} className="bg-zinc-800 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <span className="font-bold text-cyan-300">
                  {review.gameTitle}
                </span>
                <span className="text-yellow-400 font-mono ml-2">
                  Nota: {review.nota}
                </span>
                <span className="text-zinc-400 ml-2 text-xs">
                  {new Date(review.data).toLocaleDateString()}
                </span>
              </div>
              <div className="text-zinc-200 mt-2">{review.comentario}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
