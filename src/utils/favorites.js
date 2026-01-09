export const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorites")) || [];

export const toggleFavorite = (song) => {
  const favs = getFavorites();
  const exists = favs.find((s) => s.id === song.id);

  const updated = exists
    ? favs.filter((s) => s.id !== song.id)
    : [...favs, song];

  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
};
