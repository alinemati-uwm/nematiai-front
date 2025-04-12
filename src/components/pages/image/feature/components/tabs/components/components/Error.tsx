import React from "react";

import { useGetDictionary } from "@/hooks";

function ImageErrorTabs({ refetch }: { refetch(): void }) {
  const {
    page: {
      chat: { retry_button_label },
      image: { occurred_Please_try_again_later },
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-col gap-y-4 text-center justify-center py-4">
      <div>{occurred_Please_try_again_later}</div>
      <div>
        <button
          onClick={refetch}
          className="border border-gray-300 py-1 px-5 rounded-sm"
        >
          {retry_button_label}
        </button>
      </div>
    </div>
  );
}

export default ImageErrorTabs;
