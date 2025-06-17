import React from "react";
import FavoriteGames from "./FavoriteGames";
import RecentReviews from "./RecentReviews";

export default function ProfileTab({ user }) {
  return (
    <div>
      {/* Exibe os jogos favoritos do usuário (máx 5) */}
      <FavoriteGames user={user} />
      {/* Avaliações recentes do usuário */}
      <RecentReviews user={user} />
    </div>
  );
}
