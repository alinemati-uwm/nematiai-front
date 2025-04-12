import React, { memo } from "react";

import AppIcon from "@/components/shared/AppIcon";

interface props {
  pause(): void;
  isPlay: boolean;
}
function PlayerPause({ isPlay, pause }: props) {
  return (
    <AppIcon
      onClick={pause}
      icon={isPlay ? "ic:baseline-pause-circle" : "ic:round-play-circle"}
      className="relative start-[-5px] cursor-pointer"
      fontSize={40}
    />
  );
}

export default memo(PlayerPause);
