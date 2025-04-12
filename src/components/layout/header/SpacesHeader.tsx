import React from "react";

import { ToggleSidePanelButton } from "@/components/layout/header/ToggleSidePanelButton";
import { Workspace } from "@/components/layout/workspace";
import { cn } from "@/lib/utils";
import { type ChildrenProps } from "@/services/types";

interface IProps {
  rootClassName?: string;
  childrenWrapperClassName?: string;
}

/**
 * header component used in workspace, app store and dashboard
 * @param rootClassName extra classNames for root div element
 * @param childrenWrapperClassName extra classNames for children wrapper div element
 * @param children
 * @constructor
 */
function SpacesHeader({
  rootClassName,
  childrenWrapperClassName,
  children,
}: ChildrenProps<IProps>) {
  return (
    <header className={cn("h-header row  w-full border-b ", rootClassName)}>
      <div className="flex  items-center  p-4  ">
        {/*for open and close side panel*/}
        {/* workspace select rendered when side panel closed*/}

        <ToggleSidePanelButton />
        <div
          className={cn(
            "flex flex-col-reverse md:flex-row-reverse h-full w-full pr-2 ",
            childrenWrapperClassName,
          )}
        >
          {children}
          <Workspace />
        </div>
      </div>
    </header>
  );
}

export default SpacesHeader;
