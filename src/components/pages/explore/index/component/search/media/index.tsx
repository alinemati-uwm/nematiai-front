import React from "react";

import ExploreTools from "@/components/pages/explore/components/tools";

import ExploreMediaBox from "./Box";
import ExploreMediaCard from "./Card";

function ExploreMedia() {
  return (
    <ExploreMediaBox className="w-full flex flex-col lg:w-1/3 gap-4">
      <div className="flex flex-col w-full gap-4 sm:flex-row lg:flex-col">
        <ExploreMediaCard
          items={[
            {
              src: "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
            },
            {
              src: "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
            },
            {
              src: "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
            },
          ]}
          title="Image"
        />

        <ExploreMediaCard
          items={[
            {
              src: "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
            },
            {
              src: "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
            },
            {
              src: "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
            },
          ]}
          title="Video"
        />
      </div>
      <ExploreTools
        tools={["volume", "like", "dislike", "share", "report", "save"]}
      />
    </ExploreMediaBox>
  );
}

export default ExploreMedia;
