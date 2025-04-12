import React, { useContext } from "react";

import ListTone from "@/components/shared/generateAudio/component/LevelStartGenerateAudio/ListTone";

import PodcastCreateContext from "../context";

function PodcastVoices() {
  const {
    methods: { updateState },
    states: { params },
  } = useContext(PodcastCreateContext); // Access podcast context to manage voice selection state

  return (
    <div className="w-full">
      <ListTone
        classnames={{
          box: "grid grid-cols-3 md:grid-cols-6 items-center w-full",
          item: {
            box: "h-auto py-1 md:py-3 px-5 gap-y-2 flex flex-col",
            image: "w-10 h-10 md:w-12 md:h-12 p-0",
            playerBox: {
              box: "gap-x-1 py-1.5 px-2",
            },
          },
        }}
        selectedTone={params.voice}
        addToSelected={e => {
          // Handle tone selection (add or remove)
          if (e.type === "add") {
            if (params.voice.length === 2) return;
            updateState("params", {
              ...params,
              voice: [...params.voice, e.value], // Add selected voice
            });
          } else
            updateState("params", {
              ...params,
              voice: params.voice.filter(el => el !== e.value), // Remove deselected voice
            });
        }}
      />
    </div>
  );
}

export default PodcastVoices;
