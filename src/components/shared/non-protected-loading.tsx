import React from "react";

import Loading from "@/components/shared/Loading";

/**
 * Component for a loading spinner that is displayed when the user is not authenticated.
 *
 * @component
 * @returns JSX.Element The rendered NonProtectedLoading component.
 */
export default function NonProtectedLoading() {
  return (
    <div className="flex w-full h-screen items-center bg-[#07081C] justify-center">
      <Loading rootClass="-ms-1 me-1 " svgClass="w-8 h-8" />
    </div>
  );
}
