// Utilitários e constantes para notícias

export const NEWS_API_KEY = "d5ed40d54b23432db5ad32a4a0feedb9";
export const BASE_URL = "https://newsapi.org/v2/everything";
export const PAGE_SIZE = 9;
export const MAX_PAGES = 5;

export const GAME_KEYWORDS = [
  "game",
  "games",
  "jogo",
  "jogos",
  "videogame",
  "videogames",
  "xbox",
  "playstation",
  "nintendo",
  "switch",
  "ps5",
  "ps4",
  "console",
];

// Filtro: só aceita se a palavra-chave aparecer no TÍTULO
export function isGameNews(article) {
  const title = (article.title || "").toLowerCase();
  return GAME_KEYWORDS.some((keyword) => title.includes(keyword));
}
