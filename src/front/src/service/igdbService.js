const API_URL = "http://localhost:5069/api/igdb/games";
const PLATFORMS_URL = "http://localhost:5069/api/igdb/platforms";
const GENRES_URL = "http://localhost:5069/api/igdb/genres";

/**
 * Busca jogos por um array de IDs (via backend)
 * @param {Array} ids
 * @returns {Promise<Array>}
 */
export async function fetchGamesByIds(ids) {
  if (!ids || !ids.length) return [];
  // Envia múltiplos parâmetros id=...&id=...
  const idsParam = ids.map((id) => `id=${id}`).join("&");
  const url = `${API_URL}?${idsParam}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar jogos por ID");
  }
  return await response.json();
}

/**
 * Busca plataformas disponíveis na IGDB via backend.
 * @returns {Promise<Array>} Lista de plataformas
 */
export async function fetchPlatforms() {
  const response = await fetch(PLATFORMS_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar plataformas da IGDB");
  }
  return await response.json();
}

/**
 * Busca jogos do backend com filtros e paginação.
 * @param {Object} params
 * @param {string} params.search
 * @param {string} params.genre
 * @param {string} params.year
 * @param {string} params.platform
 * @param {boolean} params.recent
 * @param {boolean} params.popular
 * @param {boolean} params.best
 * @param {number} params.limit
 * @param {number} params.offset
 * @returns {Promise<Array>}
 */
export async function fetchGames({
  search = "",
  genre = "",
  year = "",
  platform = "",
  recent = false,
  popular = false,
  best = false,
  limit = 48,
  offset = 0,
} = {}) {
  let url = API_URL + `?limit=${limit}&offset=${offset}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (genre) url += `&genre=${encodeURIComponent(genre)}`;
  if (year) url += `&year=${encodeURIComponent(year)}`;
  if (platform) url += `&platform=${encodeURIComponent(platform)}`;
  if (recent) url += `&recent=true`;
  if (popular) url += `&popular=true`;
  if (best) url += `&best=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar jogos da IGDB");
  }
  return await response.json();
}

/**
 * Busca gêneros disponíveis na IGDB via backend.
 * @returns {Promise<Array>}
 */
export async function fetchGenres() {
  const response = await fetch(GENRES_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar gêneros da IGDB");
  }
  return await response.json();
}
