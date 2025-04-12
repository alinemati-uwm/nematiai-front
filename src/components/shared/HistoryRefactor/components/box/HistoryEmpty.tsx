import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { useGetDictionary } from "@/hooks";

function HistoryEmpty() {
  const {
    common: { no_result_message },
  } = useGetDictionary();
  return (
    <div className="flex flex-col gap-y-4 text-center justify-center mt-9">
      <div className="flex justify-center">
        <AppIcon icon="bi:clock-history" width={50} className="text-gray-300" />
      </div>
      <div className="text-gray-400 font-semibold">{no_result_message}</div>
    </div>
  );
}

export default HistoryEmpty;
