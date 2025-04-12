import React from "react";

import { useGetTime } from "@/hooks/useGetTime";
import { useGetDictionary } from "@/hooks";

function HistoryTime({ date }: { date: string }) {
  const {
    common: { ago },
  } = useGetDictionary();

  const { getTime } = useGetTime();

  return (
    <div>
      {getTime(date)} {ago}
    </div>
  );
}

export default HistoryTime;
