export async function searchPodcasts(query) {
  const res = await fetch(
    `https://listen-api.listennotes.com/api/v2/search?q=${query}`,
    {
      headers: {
        "X-ListenAPI-Key": import.meta.env.VITE_LISTEN_NOTES_KEY,
      },
    }
  );

  const data = await res.json();

  return (data.results || []).slice(0, 6);
}
