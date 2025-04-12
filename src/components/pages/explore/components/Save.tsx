import React from "react";

import { MinimalButton } from "@/components/shared";

function ExploreSaveArticle({
  handleSaveNews,
  isSaved,
}: {
  handleSaveNews: () => void;
  isSaved: boolean;
}) {
  return (
    <MinimalButton
      icon={
        isSaved
          ? "material-symbols:bookmark"
          : "material-symbols:bookmark-outline"
      }
      size="xs"
      selected={isSaved}
      className="z-15"
      onClick={e => {
        e.stopPropagation();
        handleSaveNews();
      }}
    />
  );
}

export default ExploreSaveArticle;
