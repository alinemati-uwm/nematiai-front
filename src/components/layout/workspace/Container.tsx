import React from "react";

import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

type props = {
  icon?: string;
  caption: string;
  route?: string;
  onClick?(): void;
  active?: false;
};

function WorkspaceContainer({ caption, icon, route, onClick }: props) {
  return (
    <Link
      href={route ?? ""}
      onClick={e => {
        if (onClick || !route) e.preventDefault();
        if (onClick) onClick();
      }}
      className="w-full hover:bg-primary-lighter rounded-none py-2 cursor-pointer px-4 border-l-4 border-transparent flex flex-row gap-x-1 items-center"
    >
      {icon && <AppIcon icon={icon} width={16} />}
      <AppTypo>{caption}</AppTypo>
    </Link>
  );
}

export default WorkspaceContainer;
