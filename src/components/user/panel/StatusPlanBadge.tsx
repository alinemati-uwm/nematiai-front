import React from "react";

import { useTheme } from "@/hooks/useTheme";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";

function StatusPlanBadge({ icon = false }: { icon?: boolean }) {
  const { data: userData } = useGetMe();

  const { activeTheme } = useTheme();

  return (
    <div className="flex flex-row gap-x-1 py-0.5 px-2 text-small relative top-2 bg-success-lighter text-success  rounded-md ">
      {userData?.plan.title}
    </div>
  );
}

export default StatusPlanBadge;
