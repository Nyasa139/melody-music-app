import { useEffect, useState } from "react";
import { getPlaylists, savePlaylists } from "../utils/playlists";
import { usePlayer } from "../context/PlayerContext";

export default function Playlists() {
  const [playlists, setPlaylists] = useState({});
  const [newPlaylist, setNewPlaylist] = useState("");
  const { playQueue } = usePlayer();

  useEffect(() => {
    setPlaylists(getPlaylists());
  }, []);

  const handleCreatePlaylist = () => {
    if (!newPlaylist.trim()) return;

    if (playlists[newPlaylist]) {
      alert("Playlist already exists");
      return;
    }

    const updatedPlaylists = {
      ...playlists,
      [newPlaylist]: [],
    };

    savePlaylists(updatedPlaylists);
    setPlaylists(updatedPlaylists);
    setNewPlaylist("");
  };

  const deletePlaylist = (name) => {
    const updated = { ...playlists };
    delete updated[name];
    savePlaylists(updated);
    setPlaylists(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Your Playlists
      </h1>

      {/* CREATE PLAYLIST */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
          placeholder="New playlist name"
          className="px-4 py-2 rounded bg-white/10 text-white outline-none"
        />
        <button
          onClick={handleCreatePlaylist}
          className="px-4 py-2 bg-green-500 rounded font-semibold hover:bg-green-600"
        >
          Create
        </button>
      </div>

      {Object.keys(playlists).length === 0 && (
        <p className="text-gray-400">
          No playlists yet
        </p>
      )}

      {Object.entries(playlists).map(([name, songs]) => (
        <div key={name} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">
              {name}
            </h2>
            <button
              onClick={() => deletePlaylist(name)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>

          {songs.length === 0 && (
            <p className="text-gray-400 text-sm">
              No songs in this playlist
            </p>
          )}

          {songs.map((song, i) => (
            <div
              key={song.id}
              onClick={() => playQueue(songs, i)}
              className="py-2 px-2 rounded hover:bg-white/10 cursor-pointer"
            >
              {song.title} –{" "}
              <span className="text-gray-400">
                {song.artist}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
