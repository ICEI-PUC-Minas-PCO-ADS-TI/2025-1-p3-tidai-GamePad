import { fetchGamesByIds } from "./igdbService";

/**
 * Monta um array de jogos do usuário com todos os status marcados (played, playing, wishlist, liked).
 * @param {number} userId
 * @returns {Promise<Array>} Array de jogos com campo statuses (ex: ["played", "liked"])
 */
export async function fetchUserGamesWithStatuses(userId) {
  // Busca todos os status do usuário
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/UserGameStatus/user/${userId}`
  );
  const data = await res.json();
  // Mapeia os status para cada jogo
  const gamesMap = {};
  data.forEach((item) => {
    const key = item.igdbGameId;
    if (!gamesMap[key]) {
      gamesMap[key] = { id: key, statuses: [] };
    }
    // status: 0 = jogando, 1 = zerado, 2 = wishlist, 3 = curtido
    if (item.status === 1) gamesMap[key].statuses.push("played");
    if (item.status === 0) gamesMap[key].statuses.push("playing");
    if (item.status === 2) gamesMap[key].statuses.push("wishlist");
    if (item.status === 3) gamesMap[key].statuses.push("liked");
  });
  const gameIds = Object.keys(gamesMap);
  if (!gameIds.length) return [];
  // Busca dados dos jogos na IGDB
  const gamesData = await fetchGamesByIds(gameIds);
  // Junta os dados
  return gamesData.map((g) => ({
    id: g.id,
    name: g.name,
    coverUrl: g.cover?.url
      ? (g.cover.url.startsWith("http")
          ? g.cover.url
          : `https:${g.cover.url}`
        ).replace("t_thumb", "t_cover_big")
      : "https://via.placeholder.com/90x120?text=No+Image",
    statuses: gamesMap[g.id]?.statuses || [],
  }));
}
