import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

import { type typeInfo } from "../../../typs";
import { LazyLoading } from "../../LazyLoading";
import PlayerPause from "./Pause";

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60].map(v => `${Math.floor(v)}`.slice(-2)).join(":");

export default function Player({
  audioSrc,
  setInfo,
  reset,
}: {
  audioSrc: string;
  setInfo: (params: typeInfo) => void;
  reset: () => void;
}) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState<boolean>(false);
  const [totalTime, setTotaltime] = useState<string>("");

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 60,
    waveColor: "#dad7f8",
    progressColor: "#9373EE",
    dragToSeek: true,
    url: audioSrc,
    barWidth: 4,
    plugins: useMemo(() => [Timeline.create()], []),
  });

  useEffect(() => {
    setInfo({
      isPlaying: isPlaying,
      isReady: ready,
      timer: ready ? formatTime(currentTime) + " / " + totalTime : "",
    });
  }, [currentTime, totalTime, ready, isPlaying]);

  useEffect(() => {
    if (wavesurfer) {
      const onReady = () => {
        setReady(true);
        setTotaltime(formatTime(wavesurfer.getDuration()));
      };
      wavesurfer.on("ready", onReady);

      const onError = () => {
        reset();
      };
      wavesurfer.on("error", onError);

      return () => {
        wavesurfer.un("ready", onReady);
        wavesurfer.un("error", onError);
      };
    }
  }, [wavesurfer]);

  const onPlayPause = useCallback(
    () => wavesurfer && wavesurfer.playPause(),
    [wavesurfer],
  );

  return (
    <div className="flex flex-row justify-center items-center">
      <PlayerPause pause={onPlayPause} isPlay={isPlaying} />
      <div className="flex-1  relative flex w-full justify-center px-2">
        {!ready && (
          <div className="h-16 w-full flex items-center justify-center ">
            <LazyLoading />
          </div>
        )}
        <div
          className={` ${ready ? "  " : " hidden"} w-full h-16 overflow-hidden`}
          ref={containerRef}
        ></div>
      </div>
    </div>
  );
}
