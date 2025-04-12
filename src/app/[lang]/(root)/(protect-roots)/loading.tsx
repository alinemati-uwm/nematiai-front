import React from "react";

import Loading from "@/components/shared/Loading";

export default function HomeLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <Loading rootClass="-ms-1 me-1 " svgClass="w-8 h-8" />
    </div>
  );
}
