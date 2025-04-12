import React from "react";

import useHookExploreSearch from "@/components/pages/explore/index/component/main/search/useHookExploreSearch";
import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";

function ExploreSearchFix() {
  // Destructuring values and functions from the `useHookExploreSearch` hook
  const { keyword, searchFn, setKeyword } = useHookExploreSearch();

  return (
    // Wrapper for the search input box with styles for positioning and appearance
    <div className="flex flex-row items-center justify-between bg-primary-lighter border rounded h-12 px-4 border-primary w-[95%] max-w-full sm:max-w-[300px] lg:max-w-[500px] fixed bottom-4 left-1/2 -translate-x-1/2">
      {/* Search input field */}
      <input
        type="text"
        onChange={e => setKeyword(e.target.value)} // Updates keyword state as the user types
        value={keyword} // Controlled input value, synced with the keyword state
        className="w-full bg-transparent border-none outline-none" // Styling to make input full-width and transparent
        placeholder="Ask follow-up ..." // Placeholder text for the input field
      />

      {/* Search button with an icon */}
      <Button className="w-8 h-8 rounded-full" onClick={searchFn}>
        <AppIcon icon="ion:arrow-up-sharp" width={14} />{" "}
        {/* Icon for the button */}
      </Button>
    </div>
  );
}

export default ExploreSearchFix;
