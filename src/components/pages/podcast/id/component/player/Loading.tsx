import React from "react";

function PlayerPodcastLoading({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col gap-y-2 mt-5">
      <div className="flex justify-center">
        <div className="w-[95%] max-w-[400px] bg-muted-dark rounded-sm">
          <div
            className="h-2 bg-primary rounded-sm transform transition-all"
            style={{ width: progress + "%" }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center font-semibold">{progress}%</div>
    </div>
  );
}

export default PlayerPodcastLoading;
