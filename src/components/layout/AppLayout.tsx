"use client";

import React, { Suspense, useEffect, type HTMLProps } from "react";

import { DM_Sans } from "next/font/google";

import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";
import { useGetDictionary } from "@/hooks";

import { useDrawerInfo } from "../pages/chat/hooks/useDrawerInfo";
import { MinimalButton } from "../shared";
import AppTypo from "../ui/AppTypo";
import { Header } from "./header";
import useAppLayout from "./hook/useAppLayout";
import SidePanelContent from "./siedebar/content";
import { SidePanelMenues } from "./siedebar/menues";
import { type typeHeaderOfFirstLevel } from "./types";

const dmSansFont = DM_Sans({
  subsets: ["latin", "latin-ext"],
  preload: true,
  weight: ["400"],
});

function AppLayout(props: HTMLProps<HTMLDivElement>) {
  const { isLessThan, breakpoint } = useBreakpoint();
  const { setIsSidePanelOpen, infoBottomSheet } = useAppLayout();
  const { drawerInfo } = useDrawerInfo();

  useEffect(() => {
    if (isLessThan("md")) {
      setIsSidePanelOpen(false);
    } else {
      if (!drawerInfo.show) setIsSidePanelOpen(true);
    }
  }, [breakpoint]);

  return (
    <div
      className={`${dmSansFont.className} ${infoBottomSheet.apply ? "max-md:flex-col-reverse flex-row" : " "} flex h-full w-full bg-holder-lighter`}
    >
      {/* header for apps that includes share , history , tabs and app title */}
      {props.children}
    </div>
  );
}

// eslint-disable-next-line react-hooks/rules-of-hooks
AppLayout.side = ({
  children,
  className,
  size = "default",
}: {
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "small";
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setInfoBottomSheet, infoBottomSheet } = useAppLayout();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isFullScreen = useEditorStore.use.isFullScreen();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const apply = !!children;
    if (apply) setInfoBottomSheet({ apply: true });
    else {
      setInfoBottomSheet({ apply: false, active: false, open: false });
    }
  }, []);

  const width =
    size == "default"
      ? "md:w-[400px] md:min-w-[400px]"
      : "md:w-[320px] md:min-w-[320px]";

  return (
    <>
      {children ? (
        <div
          className={cn(
            `${infoBottomSheet.apply ? `max-md:flex-1 ${infoBottomSheet.active ? "max-md:pb-[var(--header-height-bottom-sheet)] " : ""}  ` : " gap-y-4 "}  max-md:w-full ${isFullScreen ? " !hidden  " : width} border-r flex flex-col px-6 overflow-y-auto `,
            className,
          )}
        >
          <SidePanelContent>{children}</SidePanelContent>
        </div>
      ) : (
        <SidePanelMenues />
      )}
    </>
  );
};
// eslint-disable-next-line react-hooks/rules-of-hooks
AppLayout.body = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isSidePanelOpen, infoBottomSheet } = useAppLayout();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { drawerInfo } = useDrawerInfo();
  return (
    <main
      className={
        className +
        ` ${drawerInfo.show ? "" : isSidePanelOpen ? "main-holder-open " : "main-holder"} ${infoBottomSheet.apply ? " max-md:flex-none flex-1 max-md:h-header " : " flex-1"}  flex flex-col min-w-[0px]`
      }
    >
      {children}
    </main>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
AppLayout.header = (props: typeHeaderOfFirstLevel) => {
  return (
    <header className="h-header row w-full main-holder-padding header-holder items-center relative bg-holder-lighter">
      <Header className="h-header" {...props} />
    </header>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
AppLayout.main = ({
  children,
  title,
  className,
  style = "full",
  bottomsheetHeight = "large",
}: HTMLProps<HTMLDivElement> & {
  style?: "full" | "content";
  bottomsheetHeight?: "small" | "large";
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { infoBottomSheet, toggleOpen, toggleActive } = useAppLayout();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { common: lang } = useGetDictionary();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    toggleActive(true);
  }, []);

  return (
    <Suspense fallback={<HomeLoading />}>
      <div
        id="main"
        className={cn(
          ` ${
            infoBottomSheet.apply
              ? `${
                  infoBottomSheet.open ? " z-20 " : "max-md:translate-y-full "
                } max-md:absolute ${bottomsheetHeight === "small" ? "max-md:h-[calc(77%-var(--header-height-bottom-sheet)-var(--header-height))]" : " max-md:h-[calc(100%-var(--header-height-bottom-sheet)-var(--header-height))]"} max-md:bottom-0 md:h-full  overflow-y-none md:overflow-y-scroll `
              : "h-full overflow-y-scroll z-0"
          }  transition main-holder-padding w-full flex-col ${style === "full" ? "bg-holder-lighter" : "md:bg-holder-light bg-holder-lighter"}`,
          className,
        )}
      >
        {infoBottomSheet.active && infoBottomSheet.apply && (
          <div
            className={`blur-overlay left-0  ${infoBottomSheet.open ? "h-[1000px]" : "h-header-bottom-sheet"}  absolute md:hidden w-full -translate-y-[calc(100%+1rem)] max-md:flex hidden `}
          >
            <div
              className="cursor-pointer absolute w-full left-0 bottom-0 flex flex-col bg-holder-lighter px-4 border-t"
              onClick={() => {
                toggleOpen();
              }}
            >
              <div className="flex flex-row w-full justify-between items-center h-header-bottom-sheet ">
                <AppTypo title="label">
                  {infoBottomSheet.open ? lang.your_result : lang.drag_to_view}
                </AppTypo>
                <MinimalButton
                  icon={
                    infoBottomSheet.open
                      ? "material-symbols:close-rounded"
                      : "ic:sharp-keyboard-arrow-up"
                  }
                  variant="ghost"
                />
              </div>
              <hr />
            </div>
          </div>
        )}

        <div className={cn("h-full w-full flex-col", className)}>
          {children}
        </div>
      </div>
    </Suspense>
  );
};

interface LayoutDrawerProps extends React.ComponentPropsWithoutRef<"aside"> {
  isOpen: boolean;
}

AppLayout.Drawer = ({
  children,
  className,
  isOpen,
  ...otherProps
}: LayoutDrawerProps) => (
  <aside
    className={cn(
      "h-full transition-all duration-200 overflow-hidden col",
      isOpen ? "w-full" : "max-w-0 w-0",
      className,
    )}
    {...otherProps}
  >
    {children}
  </aside>
);
AppLayout.DrawerBLur = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { drawerInfo, close } = useDrawerInfo();
  return (
    <>
      {drawerInfo.show && (
        <div
          onClick={() => {
            close();
          }}
          className="blur-overlay md:hidden cursor-pointer absolute w-full h-full left-0 top-0 "
        />
      )}
    </>
  );
};

export default AppLayout;
