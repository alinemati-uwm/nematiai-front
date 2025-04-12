import React from "react";

import Lottie from "react-lottie";

import animationData from "@/assets/animations/empty-write.json";

function WritePageEmpty() {
  return (
    <div className="flex justify-center col-span-full">
      <div className="w-[60%] max-w-[400px]">
        <Lottie
          isPaused={false}
          isStopped={false}
          width="100%"
          height="100%"
          options={{ animationData, autoplay: true, loop: true }}
        />
      </div>
    </div>
  );
}

export default WritePageEmpty;
