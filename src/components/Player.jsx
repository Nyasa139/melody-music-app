import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
} from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

const formatTime = (time) => {
  if (!time) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function Player() {
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

  if (!currentSong) return null;

  const image =
    currentSong.image?.url ||
    currentSong.image ||
    "/placeholder.png";

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-black border-t border-white/10 flex items-center px-6 text-white z-50">

      {/* LEFT */}
      <div className="flex items-center gap-4 w-1/4">
        <img
          src={image}
          alt="album"
          className="w-14 h-14 rounded object-cover"
        />
        <div>
          <p className="text-sm font-semibold">
            {currentSong.title}
          </p>
          <p className="text-xs text-gray-400">
            {currentSong.artist}
          </p>
        </div>
        <Heart size={18} className="text-gray-400 cursor-pointer" />
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-1/2">
        <div className="flex items-center gap-6 mb-2">
          <SkipBack onClick={playPrev} className="cursor-pointer" />
          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SkipForward onClick={playNext} className="cursor-pointer" />
        </div>

        <div className="w-full flex items-center gap-2 text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 h-1"
          />

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-4 w-1/4">
        <Volume2 size={18} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
          className="w-24"
        />
      </div>
    </div>
  );
}
