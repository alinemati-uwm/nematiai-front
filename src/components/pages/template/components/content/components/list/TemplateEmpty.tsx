import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { useGetDictionary } from "@/hooks";

function TemplateEmpty() {
  const {
    page: {
      template: { you_do_not_have_prompts_this_category },
    },
  } = useGetDictionary(); // Fetches localized text for empty prompt categories

  return (
    <div className="flex flex-col py-16 text-center gap-y-3">
      {/* Displays an icon indicating no content available */}
      <div className="flex justify-center">
        <AppIcon
          width={80}
          className="opacity-10" // Faded appearance to indicate an empty state
          icon="hugeicons:file-not-found"
        />
      </div>

      {/* Displays a message informing the user there are no prompts in this category */}
      <div>{you_do_not_have_prompts_this_category}</div>
    </div>
  );
}

export default TemplateEmpty;
