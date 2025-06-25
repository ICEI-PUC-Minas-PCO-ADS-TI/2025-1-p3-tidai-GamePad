import { useEffect, useState } from "react";
import { fetchGamesByIds } from "../../service/igdbService";

export default function useUserReviews(userId, limit = 5) {
  const [reviews, setReviews] = useState([]);
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentReviews() {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/AvaliacoesApi`);
        const data = await res.json();
        const userReviews = data
          .filter((a) => a.usuarioId === userId)
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, limit);
        setReviews(userReviews);
        // Busca dados dos jogos
        const uniqueGameIds = [
          ...new Set(userReviews.map((r) => r.igdbGameId)),
        ];
        const gamesObj = {};
        if (uniqueGameIds.length) {
          const gamesArr = await fetchGamesByIds(uniqueGameIds);
          gamesArr.forEach((g) => {
            if (g) gamesObj[g.id] = g;
          });
        }
        setGames(gamesObj);
      } catch {
        setReviews([]);
        setGames({});
      }
      setLoading(false);
    }
    if (userId) fetchRecentReviews();
  }, [userId, limit]);

  return { reviews, games, loading };
}
