import React, { useContext } from "react";

import { format, parseISO } from "date-fns";
import Image from "next/image";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

import PodcastSingleContext from "../context";
import podcastPlayerModel from "./player/model";

function PodcastArticle() {
  const {
    data, // Get podcast article data
    states: {
      file: { duration }, // Get the duration from the state
    },
  } = useContext(PodcastSingleContext); // Access context for podcast data

  // Function to convert ISO date to a specific format
  const convertDate = (isoDate: string, fmt: string) =>
    format(parseISO(isoDate), fmt);

  return (
    <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-5 pb-4">
      {/* Image section */}
      <div className="md:w-1/3">
        <Image
          src="https://design4real.de/wp-content/uploads/2024/04/die-besten-10-games.webp"
          unoptimized
          width={300}
          height={300}
          alt=""
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Text section */}
      <div className="md:w-2/3 flex flex-col gap-label-space">
        <AppTypo variant="headingS">{data?.title}</AppTypo>{" "}
        {/* Display title */}
        {/* Podcast duration and date */}
        <div className="flex flex-row items-center gap-x-3">
          <div className="flex flex-row items-center gap-x-1">
            <AppIcon icon="hugeicons:clock-05" width={16} />
            <AppTypo>
              {podcastPlayerModel.secondsToMinutes(duration)}
            </AppTypo>{" "}
            {/* Convert duration to minutes */}
          </div>
          <div className="h-3.5 border border-gray-400 border-r"></div>
          <div className="flex flex-row items-center gap-x-1">
            <AppIcon icon="material-symbols:date-range-outline" width={16} />
            <AppTypo>
              {convertDate(data?.created_at ?? "", "yyyy/MM/dd")}{" "}
              {/* Display created date */}
            </AppTypo>
          </div>
        </div>
        <AppTypo variant="large">{data?.answer_text}</AppTypo>{" "}
        {/* Display answer text */}
      </div>
    </div>
  );
}

export default PodcastArticle;
