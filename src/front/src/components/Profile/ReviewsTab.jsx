import React from "react";
import { useNavigate } from "react-router-dom";
import useUserReviews from "./useUserReviews";
import ReviewCard from "./ReviewCard";

export default function ReviewsTab({ userId, userName }) {
  const { reviews, games, loading } = useUserReviews(userId);
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-xs font-semibold text-cyan-200 mb-1 tracking-widest uppercase">
        Reviews recentes
      </h3>
      <hr className="mb-4 border-zinc-700" />
      {loading ? (
        <div className="text-zinc-400 text-center">Carregando...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-zinc-800 rounded-lg p-8 text-zinc-500 text-center">
          Nenhuma avaliação encontrada.
        </div>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              game={games[review.igdbGameId]}
              onClickUser={() =>
                userName &&
                navigate(`/${userName.toLowerCase().replace(/\s+/g, "-")}`)
              }
              onClick={() =>
                games[review.igdbGameId] &&
                navigate(`/games/${games[review.igdbGameId].id}`)
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
