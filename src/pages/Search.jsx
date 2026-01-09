import { useState } from "react";
import { searchMusic } from "../services/musicApi";
import { usePlayer } from "../context/PlayerContext";
import { toggleFavorite, getFavorites } from "../utils/favorites";
import { addSongToPlaylist } from "../utils/playlists";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites());
  const [loading, setLoading] = useState(false);

  const { playQueue } = usePlayer();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const data = await searchMusic(query);
    setResults(data);
    setLoading(false);
  };

  const handleFavorite = (song, e) => {
    e.stopPropagation(); // 🔑 IMPORTANT
    const updated = toggleFavorite(song);
    setFavorites(updated);
  };

  const isFavorite = (id) =>
    favorites.some((s) => s.id === id);

  return (
    <div className="p-8 pb-28 text-white">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && handleSearch()
        }
        placeholder="Search artists or songs..."
        className="w-full max-w-xl px-6 py-3 rounded-full bg-[#242424]"
      />

      {loading && (
        <p className="mt-6 text-gray-400">
          Searching...
        </p>
      )}

      <div className="mt-6 bg-[#181818] rounded-lg">
        {results.map((song, i) => (
          <div
            key={song.id}
            onClick={() => playQueue(results, i)}
            className="flex items-center justify-between px-6 py-4 hover:bg-white/10 cursor-pointer"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <img
                src={song.artwork}
                className="w-12 h-12 rounded"
              />
              <div>
                <p>
                  {i + 1}. {song.title}
                </p>
                <p className="text-sm text-gray-400">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Right */}
            <button
              onClick={(e) =>
                handleFavorite(song, e)
              }
              className={`text-xl ${
                isFavorite(song.id)
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              ❤️
              <button
  onClick={(e) => {
    e.stopPropagation();
    const name = prompt("Enter playlist name:");
    if (name) addSongToPlaylist(name, song);
  }}
  className="text-sm text-gray-300 hover:text-white"
>
  ➕ Add
</button>

            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
