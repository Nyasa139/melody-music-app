import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { usePlayer } from "../context/PlayerContext";
import { getPlaylists } from "../utils/playlists";

export default function Home() {
  const { playQueue } = usePlayer();
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    loadHome();
  }, []);

  const loadHome = async () => {
    /* ✅ PLAYLISTS — localStorage */
    const storedPlaylists = getPlaylists();

    const formattedPlaylists = Object.entries(storedPlaylists).map(
      ([name], index) => ({
        id: name,
        name,
        image: `https://picsum.photos/300?random=${index + 2}`,
      })
    );

    /* ✅ ADD FAVORITES AS PLAYLIST */
    const playlistsWithFavorites = [
      {
        id: "favorites",
        name: "My Favorites",
        image: "https://picsum.photos/300?random=1",
      },
      ...formattedPlaylists,
    ];

    setPlaylists(playlistsWithFavorites);

    /* ✅ RECENTLY PLAYED — Supabase */
    const { data: recentData, error } = await supabase
      .from("recently_played")
      .select("*")
      .order("played_at", { ascending: false })
      .limit(8);

    if (error) {
      console.error("Recently played error:", error);
    }

    setRecent(
      recentData?.map((s) => ({
        ...s,
        previewUrl: s.preview_url,
      })) || []
    );
  };

  return (
    <div className="p-8 space-y-12">

      {/* PLAYLISTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Your Playlists
        </h2>

        {playlists.length === 0 ? (
          <p className="text-gray-400">
            No playlists found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {playlists.map((p) => (
              <div
                key={p.id}
                onClick={() =>
                  p.id === "favorites"
                    ? navigate("/favorites")
                    : navigate("/playlists")
                }
                className="bg-[#181818] p-4 rounded-lg hover:bg-[#222] cursor-pointer"
              >
                <img
                  src={p.image}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <p className="font-semibold truncate">
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RECENTLY PLAYED */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Recently Played
        </h2>

        {recent.length === 0 && (
          <p className="text-gray-400">
            No recently played songs
          </p>
        )}

        {recent.map((song) => (
          <div
            key={song.id}
            onClick={() => playQueue([song], 0)}
            className="flex items-center gap-4 p-3 bg-[#181818] rounded hover:bg-[#222] cursor-pointer"
          >
            <img
              src={song.image}
              className="w-14 h-14 rounded"
            />
            <div>
              <p>{song.title}</p>
              <p className="text-sm text-gray-400">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
