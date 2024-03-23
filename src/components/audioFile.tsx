import React, { useState, useRef  } from 'react';
import sound from "../assets/sound.mp3"

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = 'your-audio-file.mp3'; // Replace with the actual path to your audio file
  const audioRef = useRef(new Audio(sound));

  const togglePlay = () => {
    const audio =  audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio id="audio" src={audioUrl} loop />
      <button className="audio" onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;
