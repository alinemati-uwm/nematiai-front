import React, { useEffect, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import { useGetDictionary } from "@/hooks";

import { type typeAudioPlayer } from "../../typs";

const AudioPlayer = ({ name }: typeAudioPlayer) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(`/audios/${name}.wav`));
  const { generateAudio: lang } = useGetDictionary().components;

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Set up the event listener for the 'ended' event
    const handleAudioEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleAudioEnded);

    // Cleanup the event listener on component unmount
    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [audio]);

  return (
    <div onClick={togglePlayPause} className="flex items-center justify-center">
      {isPlaying ? (
        <AppIcon tooltip={lang.stop} fontSize={15} icon="mdi:stop" />
      ) : (
        <AppIcon tooltip={lang.play} fontSize={15} icon="mdi:play" />
      )}
    </div>
  );
};

export default AudioPlayer;
