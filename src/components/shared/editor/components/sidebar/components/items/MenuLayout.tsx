import React, { useRef, type ReactNode } from "react";

import AppIcon from "@/components/shared/AppIcon";
import useOutsideClick from "@/hooks/useOutSideClick";

import MenuLayoutContext from "./context";

interface props {
  children: ReactNode;
  title: string;
  icon: ReactNode;
  closeModal(): void;
  separate: boolean;
}

function ImageEditorMenuLayout({
  children,
  icon,
  title,
  closeModal,
  separate,
}: props) {
  const elementRef = useRef(null);
  useOutsideClick(elementRef, true, closeModal);

  return (
    <MenuLayoutContext value={{ closeModal }}>
      <div
        {...(separate && { ref: elementRef })}
        className={
          separate
            ? "fixed transform bottom-0 left-0 right-0 flex items-center h-[69px] sm:h-auto sm:left-auto sm:right-1/2 sm:bottom-7 sm:translate-x-1/2 bg-muted-lighter z-10 border border-muted-darker rounded"
            : "flex flex-col gap-y-5 fixed left-0 bottom-[68px] max-h-[80%] sm:max-h-max sm:absolute sm:top-0 sm:left-[65px] right-0 rounded-t sm:rounded sm:bottom-0 sm:h-full sm:w-[400px] z-20 bg-muted-lighter border border-muted-dark p-5"
        }
      >
        {!separate ? (
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-2">
              {icon}
              <span className="relative top-[1px]">{title}</span>
            </div>
            <AppIcon
              icon="carbon:close-outline"
              width={18}
              className="cursor-pointer"
              onClick={closeModal}
            />
          </div>
        ) : null}
        <div
          className={`${separate ? "overflow-visible w-full" : "overflow-auto h-[95%]"}`}
        >
          {children}
        </div>
      </div>
    </MenuLayoutContext>
  );
}

export default ImageEditorMenuLayout;
