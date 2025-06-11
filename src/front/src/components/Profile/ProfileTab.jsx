import React from "react";
import FavoriteGames from "./FavoriteGames";
import RecentReviews from "./RecentReviews";
import { mockRecentReviews } from "./mockRecentReviews";

export default function ProfileTab() {
  return (
    <div>
      {/* Exibe os jogos favoritos do usuário (máx 5) */}
      <FavoriteGames />
      {/* Avaliações recentes do usuário */}
      <RecentReviews reviews={mockRecentReviews} />
    </div>
  );
}
