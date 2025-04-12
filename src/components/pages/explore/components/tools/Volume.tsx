import React from "react";

import * as Slider from "@radix-ui/react-slider";

import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import { useTextToSpeech } from "@/hooks";

function ExploreToolsVolume({ text }: { text?: string }) {
  const {
    handlePlaySpeak,
    handleStopSpeak,
    isSpeaking,
    isPaused,
    handlePauseSpeak,
    handleResumeSpeak,
    totalTime,
    currentTime,
  } = useTextToSpeech(text as string);

  return (
    <div className="flex flex-row items-center gap-x-2">
      <AppIcon
        icon={
          isPaused
            ? "lsicon:play-filled"
            : "material-symbols:pause-outline-rounded"
        }
        width={16}
        height={16}
        className="text-muted-darker cursor-pointer"
        onClick={
          isPaused
            ? isSpeaking
              ? handleResumeSpeak
              : handlePlaySpeak
            : handlePauseSpeak
        }
      />
      <RenderIf isTrue={isSpeaking}>
        <AppIcon
          icon="tabler:player-stop-filled"
          width={16}
          height={16}
          className="text-muted-darker cursor-pointer"
          onClick={handleStopSpeak}
        />
      </RenderIf>
      <Slider.Root
        className="relative flex w-36 select-none items-center"
        min={0}
        max={totalTime}
        step={1}
        value={[currentTime]}
      >
        <Slider.Track className="h-1 w-full bg-muted-darker/40 rounded-full">
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb className="w-3 h-3 rounded-full bg-black block" />
      </Slider.Root>
    </div>
  );
}

export default ExploreToolsVolume;
