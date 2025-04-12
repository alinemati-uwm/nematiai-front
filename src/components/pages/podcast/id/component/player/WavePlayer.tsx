import React, { useEffect, useRef } from "react";

import WaveSurfer from "wavesurfer.js";

import useBreakpoint from "@/hooks/useBreakpoint";

interface props {
  url: string;
  setWave(wave: any): void;
}

const WavePlayer = ({ url, setWave }: props) => {
  const waveRef = useRef(null);
  const { breakpoint } = useBreakpoint();

  useEffect(() => {
    const wave = WaveSurfer.create({
      container: waveRef.current ?? "",
      waveColor: "#ddd",
      url: url,
      progressColor: "#9373EE",
      height: breakpoint === "xs" ? 50 : 70,
      barWidth: breakpoint === "xs" ? 3 : 5,
      barGap: breakpoint === "xs" ? 4 : 9,
      barRadius: 30,
      dragToSeek: true,
    });
    setWave(wave);

    return () => {
      wave.unAll();
      wave.destroy();
    };
  }, []);

  return <div ref={waveRef}></div>;
};

export default WavePlayer;
