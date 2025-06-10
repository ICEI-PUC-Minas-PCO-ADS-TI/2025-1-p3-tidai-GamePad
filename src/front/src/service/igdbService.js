const PLATFORMS_URL = "http://localhost:5069/api/igdb/platforms";

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
// Serviço para buscar jogos do backend (que consulta a IGDB)

const API_URL = "http://localhost:5069/api/igdb/games";

/**
 * Busca jogos do backend com filtros e paginação.
 * @param {Object} params
 * @param {string} params.search
 * @param {string} params.genre
 * @param {string} params.year
 * @param {string} params.platform
 * @param {boolean} params.recent
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
  limit = 48,
  offset = 0,
} = {}) {
  let url = API_URL + `?limit=${limit}&offset=${offset}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (genre) url += `&genre=${encodeURIComponent(genre)}`;
  if (year) url += `&year=${encodeURIComponent(year)}`;
  if (platform) url += `&platform=${encodeURIComponent(platform)}`;
  if (recent) url += `&recent=true`;
  if (typeof arguments[0] === "object" && arguments[0].popular) {
    url += `&popular=true`;
  }
  if (typeof arguments[0] === "object" && arguments[0].best) {
    url += `&best=true`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar jogos da IGDB");
  }
  return await response.json();
}

const GENRES_URL = "http://localhost:5069/api/igdb/genres";

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
