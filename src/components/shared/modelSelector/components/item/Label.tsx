import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

function ModelSelectorlabel({
  label,
  isOpen,
}: {
  label: string;
  isOpen?: boolean;
}) {
  return (
    <div className="flex flex-row w-full items-center justify-between overflow-hidden">
      <AppTypo className="first-letter:capitalize">{label}</AppTypo>
      <AppIcon
        icon="teenyicons:down-solid"
        width={10}
        className={`${isOpen && "rotate-180"}  duration-300 `}
      />
    </div>
  );
}

export default ModelSelectorlabel;
