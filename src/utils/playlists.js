export function getPlaylists() {
  return JSON.parse(localStorage.getItem("playlists")) || {};
}
export const savePlaylists = (playlists) => {
  localStorage.setItem("playlists", JSON.stringify(playlists));
};

export function createPlaylist(name) {
  const playlists = getPlaylists();
  if (!playlists[name]) {
    playlists[name] = [];
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }
}

export function addSongToPlaylist(name, song) {
  const playlists = getPlaylists();
  if (!playlists[name]) playlists[name] = [];

  const exists = playlists[name].some(
    (s) => s.id === song.id
  );

  if (!exists) {
    playlists[name].push(song);
    localStorage.setItem(
      "playlists",
      JSON.stringify(playlists)
    );
  }
}
