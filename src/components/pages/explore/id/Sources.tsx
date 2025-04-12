import React from "react";

import AppTypo from "@/components/ui/AppTypo";

function ExploreArticleSources() {
  return (
    <div className="flex flex-col gap-y-3">
      {Array.from({ length: 4 }).map((_, key) => (
        <div
          key={key}
          className={`border-l-[2px] cursor-pointer hover:border-muted-darker transition ${key === 0 ? "border-primary-dark" : ""} py-1 px-2`}
        >
          <AppTypo>Name of the author</AppTypo>
        </div>
      ))}
    </div>
  );
}

export default ExploreArticleSources;
