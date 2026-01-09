export async function searchMusic(query) {
  if (!query) return [];

  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&entity=song&limit=20`
  );

  const data = await res.json();

  return data.results.map((song) => ({
    id: song.trackId,
    title: song.trackName,
    artist: song.artistName,
    artwork: song.artworkUrl100,
    previewUrl: song.previewUrl,
  }));
}
