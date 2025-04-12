import React from "react";

import MainListExlporeSources from "@/components/pages/explore/index/component/main/list/Sources";

import ExploreContentText from "./Text";

function ExploreContentSearch() {
  return (
    <div className="flex flex-col gap-y-6">
      <ExploreContentText />
      <MainListExlporeSources merge={false} />
    </div>
  );
}

export default ExploreContentSearch;
