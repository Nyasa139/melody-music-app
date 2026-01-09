import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
} from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { useFavorites } from "../context/FavoritesContext";

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

export default function BottomPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    currentTime,
    duration,
    seek,
    volume,
    changeVolume,
  } = usePlayer();

  const { toggleFavorite, isFavorite } = useFavorites();

  if (!currentSong) return null;

  const albumImage =
    currentSong.image?.url ||
    currentSong.image ||
    currentSong.album?.images?.[0]?.url ||
    "/placeholder.png";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 px-6 py-3 z-50">

      {/* PROGRESS */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="w-full accent-green-500"
      />

      {/* TIME */}
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* MAIN */}
      <div className="flex items-center justify-between mt-3">

        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0">
          <img
            src={albumImage}
            alt="album"
            className="w-12 h-12 rounded object-cover bg-gray-800"
          />

          <div className="min-w-0">
            <p className="font-medium truncate">{currentSong.title}</p>
            <p className="text-sm text-gray-400 truncate">
              {currentSong.artist}
            </p>
          </div>

          <Heart
            size={18}
            onClick={() => toggleFavorite(currentSong)}
            className={`cursor-pointer transition ${
              isFavorite(currentSong)
                ? "text-green-500 fill-green-500"
                : "text-gray-400"
            }`}
          />
        </div>

        {/* CENTER */}
        <div className="flex items-center gap-6">
          <button onClick={playPrev}>
            <SkipBack />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <button onClick={playNext}>
            <SkipForward />
          </button>
        </div>

        {/* RIGHT — VOLUME */}
        <div className="flex items-center gap-2 w-32">
          <Volume2 size={18} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="accent-green-500 w-full"
          />
        </div>
      </div>
    </div>
  );
}
