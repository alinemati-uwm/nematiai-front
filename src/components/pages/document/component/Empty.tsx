import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { useGetDictionary } from "@/hooks";

/**
 * A functional component that displays a message when there are no results to show.
 * It uses the `useGetDictionary` hook to retrieve the `no_result_message` from the common dictionary.
 * The component includes an icon and a message, both centered on the page.
 *
 * @component
 * @example
 * // Usage example:
 * <Empty />
 *
 * @returns {JSX.Element} A JSX element containing the no results message and an icon.
 */
function Empty() {
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

export default Empty;
