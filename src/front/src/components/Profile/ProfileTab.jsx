import React from "react";
import LikedGames from "./LikedGames";
import RecentReviews from "./RecentReviews";
import { mockRecentReviews } from "./mockRecentReviews";

export default function ProfileTab() {
  return (
    <div>
      {/* Exibe os jogos favoritos do usuário (máx 5) */}
      <LikedGames />
      {/* Avaliações recentes do usuário */}
      <RecentReviews reviews={mockRecentReviews} />
    </div>
  );
}
