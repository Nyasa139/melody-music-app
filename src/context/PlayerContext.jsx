import { createContext, useContext, useEffect, useRef, useState } from "react";
import { addRecentlyPlayed } from "../services/recentlyPlayed";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const currentSong = currentIndex !== null ? queue[currentIndex] : null;

  const playQueue = (songs, index) => {
    setQueue(songs);
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const seek = (value) => {
    const audio = audioRef.current;
    if (!audio.duration) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  /* LOAD SONG */
  useEffect(() => {
    if (!currentSong) return;

    const audio = audioRef.current;
    audio.src = currentSong.previewUrl;
    audio.load();
    audio.volume = volume;

    audio.onloadedmetadata = async () => {
      setDuration(audio.duration);
      audio.play();
      setIsPlaying(true);
      await addRecentlyPlayed(currentSong);
    };
  }, [currentSong]);

  /* TIME UPDATE */
  useEffect(() => {
    const audio = audioRef.current;

    const update = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.currentTime);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", playNext);
    };
  }, [currentIndex]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        progress,
        volume,
        playQueue,
        togglePlay,
        playNext,
        playPrev,
        seek,
        changeVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
