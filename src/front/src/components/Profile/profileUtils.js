// Utilitário para gerar array de covers de uma lista
export function getListCovers(list, max = 5) {
  return list.items.slice(0, max).map((item) => {
    if (!item.coverUrl) return "https://placehold.co/120x160?text=No+Cover";
    return item.coverUrl.replace(
      /t_(thumb|cover_big|screenshot_med|720p|1080p)/,
      "t_original"
    );
  });
}
