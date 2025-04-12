import React, { useContext } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import AppModelSelectorContext from "../context";

function AppModelSelectorLoading() {
  const {
    props: { formMode },
  } = useContext(AppModelSelectorContext);

  return (
    <Skeleton className={`${formMode ? "w-full" : "w-[130px]"} h-8 rounded`} />
  );
}

export default AppModelSelectorLoading;
