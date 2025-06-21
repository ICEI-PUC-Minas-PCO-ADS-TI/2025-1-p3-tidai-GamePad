import React from "react";
import { useNavigate } from "react-router-dom";
import useUserReviews from "./useUserReviews";
import ReviewCard from "./ReviewCard";

export default function RecentReviews({ user }) {
  const { reviews, games, loading } = useUserReviews(user.id, 5);
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      <h3 className="text-xs font-semibold text-cyan-200 mb-1 tracking-widest uppercase">
        Avaliações recentes
      </h3>
      <hr className="mb-4 border-zinc-700" />
      {loading ? (
        <div className="text-zinc-400 text-center">Carregando...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-zinc-800 rounded-lg p-8 text-zinc-500 text-center">
          Nenhuma avaliação recente.
        </div>
      ) : (
        <ul className="space-y-4 sm:space-y-5 md:space-y-6 ">
          {reviews.map((review) => (
            <li key={review.id} className="">
              <ReviewCard
                review={review}
                game={games[review.igdbGameId]}
                onClick={() =>
                  games[review.igdbGameId] &&
                  navigate(`/games/${games[review.igdbGameId].id}`)
                }
                className="text-xs sm:text-sm md:text-base px-2 py-2 sm:px-4 sm:py-3"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
