import React from "react";

import ExploreSearchFix from "../../../components/Search";
import useHookExplore from "../../useHookExplore";
import ExploreContentSearch from "./content";
import ExploreMedia from "./media";

{
  /* <ExploreSearchLoading /> */
}

function ExploreSearch() {
  const { search } = useHookExplore();

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row items-start gap-4">
        <>
          <div className="w-full lg:w-2/3">
            <ExploreContentSearch />
          </div>
          <ExploreMedia />
        </>
      </div>
      <ExploreSearchFix />
    </>
  );
}

export default ExploreSearch;
