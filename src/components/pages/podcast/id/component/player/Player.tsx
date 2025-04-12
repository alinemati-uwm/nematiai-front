import React, { useContext, useEffect, useRef, useState } from "react";

import { useDebounceCallback } from "usehooks-ts";
import type WaveSurfer from "wavesurfer.js";

import AppIcon from "@/components/shared/AppIcon";
import { useTheme } from "@/hooks/useTheme";
import { useGetDictionary } from "@/hooks";

import PodcastSingleContext from "../../context";
import PlayerPodcastLoading from "./Loading";
import podcastPlayerModel from "./model";
import PodcastShare from "./Share";
import WavePlayer from "./WavePlayer";

export interface IPodcastPlayerStates {
  play: boolean;
  progressLoading: number;
  player: WaveSurfer | null;
}

const PodcastPlayer = () => {
  // State for managing playback and loading progress
  const [states, setStates] = useState<IPodcastPlayerStates>({
    play: false,
    progressLoading: 0,
    player: null,
  });

  // Destructuring the podcast data and file from the context
  const {
    data: { podcast },
    states: { file },
    methods: { updateState },
  } = useContext(PodcastSingleContext);

  const {
    page: {
      podcast: { forward, backward },
    },
    components: {
      generateAudio: { play, stop, download },
    },
  } = useGetDictionary();

  const playSecendsRef = useRef<HTMLDivElement>(null); // Ref to display current time in seconds
  const { activeTheme } = useTheme(); // Getting active theme to adjust UI colors

  // Debounced method for handling the loading progress
  const loadingMethod = useDebounceCallback((progress: number) => {
    setStates(prev => ({ ...prev, progressLoading: progress }));
  }, 100);

  const player = states.player; // Accessing the player instance from state

  // Effect hook for setting up the podcast player and its event listeners
  useEffect(() => {
    if (player && podcast) {
      player.load(podcast); // Loading the podcast into the player

      // Event listeners for different player events
      player.on("loading", loadingMethod); // Progress loading
      player.on(
        "decode",
        duration => updateState("file", { ...file, duration }), // Updating file duration
      );
      player.on("timeupdate", time => {
        // Updating the current time on the UI
        if (playSecendsRef.current)
          playSecendsRef.current.innerHTML = podcastPlayerModel
            .secondsToMinutes(time)
            .toString();
      });
      player.on("play", () => {
        setStates(prev => ({ ...prev, play: true })); // Setting play state when podcast starts
      });
      player.on("pause", () => {
        setStates(prev => ({ ...prev, play: false })); // Setting pause state when podcast pauses
      });
    }
  }, [player, podcast]); // Dependencies: when player or podcast changes

  // Effect hook to adjust WaveSurfer color based on theme (dark or light mode)
  useEffect(() => {
    if (player)
      player.setOptions({
        waveColor: activeTheme.includes("-dark") ? "#777" : "#ddd",
      });
  }, [activeTheme, player]); // Dependencies: active theme and player instance

  // Method for changing the playback time (forward or backward)
  const changeTime = (backward: boolean) => {
    if (!player) return;
    const getCurrentTime = player.getCurrentTime(); // Get current playback time
    if (getCurrentTime)
      player.setTime(backward ? getCurrentTime - 5 : getCurrentTime + 5); // Adjust time by 5 seconds
  };

  return (
    <>
      <div className="flex flex-col">
        {podcast && (
          // Display waveform player while podcast is loading
          <div
            style={{ display: states.progressLoading < 100 ? "none" : "block" }}
            className="relative top-2"
          >
            <WavePlayer
              url={podcast} // Passing the podcast URL to the WavePlayer
              setWave={(player: any) =>
                setStates(prev => ({ ...prev, player }))
              }
            />
          </div>
        )}
        {states.progressLoading < 100 ? (
          // Show loading component while podcast is loading
          <PlayerPodcastLoading progress={states.progressLoading} />
        ) : player ? (
          <>
            {/* Display the player controls after loading is complete */}
            <div className="flex flex-row justify-between text-sm ">
              <span ref={playSecendsRef}></span> {/* Current time */}
              <span>
                {podcastPlayerModel.secondsToMinutes(
                  states.player?.getDuration() ?? 0,
                )}
              </span>{" "}
              {/* Total duration */}
            </div>
            <div className="flex justify-center items-center gap-x-8 -mt-2">
              {/* Controls for sharing, skipping, and play/pause */}
              <PodcastShare />
              <AppIcon
                onClick={() => changeTime(true)} // Go backward 5 seconds
                icon="cuida:rotate-left-outline"
                tooltip={backward}
                className="cursor-pointer"
                width={20}
              />
              <AppIcon
                onClick={() => player.playPause()} // Toggle play/pause
                icon={
                  states.play
                    ? "ant-design:pause-circle-filled"
                    : "ant-design:play-circle-filled"
                }
                tooltip={states.play ? stop : play}
                className="cursor-pointer text-primary"
                width={49}
              />
              <AppIcon
                onClick={() => changeTime(false)} // Go forward 5 seconds
                icon="cuida:rotate-right-outline"
                className="cursor-pointer"
                tooltip={forward}
                width={20}
              />
              <AppIcon
                onClick={() => podcast && window.open(podcast, "_blank")} // Open podcast in a new tab for download
                icon="material-symbols:download-rounded"
                className="cursor-pointer"
                tooltip={download}
                width={20}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default PodcastPlayer;
