import React from "react";

import { useGetDictionary } from "@/hooks";

function PodcastEmpty() {
  const {
    page: {
      podcast: { not_found },
    },
  } = useGetDictionary();
  return (
    <div className="w-full h-full flex justify-center items-center text-large text-label-light">
      {not_found}
    </div>
  );
}

export default PodcastEmpty;
