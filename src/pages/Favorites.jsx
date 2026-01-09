import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function Favorites() {
  const [songs, setSongs] = useState([]);
  const { playQueue } = usePlayer();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setSongs(stored);
  }, []);

  const dislikeSong = (id) => {
    const updated = songs.filter((s) => s.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setSongs(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Liked Songs</h1>

      {songs.length === 0 && (
        <p className="text-gray-400">No liked songs yet</p>
      )}

      {songs.map((song, i) => (
        <div
          key={song.id}
          className="flex items-center justify-between py-3 px-3 rounded hover:bg-white/10"
        >
          <div
            onClick={() => playQueue(songs, i)}
            className="cursor-pointer"
          >
            <p>{song.title}</p>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </div>

          {/* 👇 DISLIKE BUTTON */}
          <button
            onClick={() => dislikeSong(song.id)}
            className="text-red-500 text-sm font-semibold"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
