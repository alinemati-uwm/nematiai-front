"use client";

import React, { useEffect } from "react";

import { DirectionProvider } from "@radix-ui/react-direction";
import { AppProgressBar } from "next-nprogress-bar";

import { Toaster } from "@/components/ui/toaster";
import { dirInLocalStorage } from "@/stores/browser-storage";
import { EditorContextProvider } from "@/stores/contexts/editor-context";
import { useChangeDirection } from "@/hooks";
import ReactQueryProvider from "@/refactor_lib/providers/ReactQueryProvider";
import ReactToastifyProvider from "@/refactor_lib/providers/ReactToastifyProvider";

import useThemeProvider from "./useThemeProvider";

/**
 * all providers of app
 * used in main layout
 * @param children
 * @constructor
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const { dirState } = useChangeDirection();
  useInitialSetDirToHtmlTag();
  useThemeProvider();

  return (
    <ReactQueryProvider>
      <EditorContextProvider>
        <ReactToastifyProvider>
          <DirectionProvider dir={dirState}>{children}</DirectionProvider>
        </ReactToastifyProvider>
        <AppProgressBar
          height="4px"
          color="hsl(256, 78%, 69%)"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster />
      </EditorContextProvider>
    </ReactQueryProvider>
  );
}

function useInitialSetDirToHtmlTag() {
  useEffect(() => {
    document.documentElement.dir = dirInLocalStorage.get().dir ?? "ltr";
  }, []);
}
