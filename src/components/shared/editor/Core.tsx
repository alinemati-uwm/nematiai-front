import React, { useEffect, useRef } from "react";

import { useWindowSize } from "usehooks-ts";

import { Dialog, DialogPortal } from "@/components/ui/dialog";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useTheme } from "@/hooks/useTheme";

import ImageEditorContextmenu from "./components/contextmenu/ContextMenu";
import ImageEditorDropZone from "./components/dropzone";
import ShortkeysHelp from "./components/help/ShortkeysHelp";
import ImageToolsLayers from "./components/layers/ImageToolsLayers";
import MobileTools from "./components/screens/Mobile/MobileTools";
import TabletTools from "./components/screens/tablet/TabletTools";
import ImageEditorSidebar from "./components/sidebar/ImageEditorSidebar";
import ImageEditorTopbar from "./components/topbar/Topbar";
import ImageEditorContext from "./context";
import useBrushChange from "./hooks/events/useBrushChange";
import useImageEditorModify from "./hooks/events/useModify";
import useSelectionImageMove from "./hooks/events/useMove";
import useSelectionImageEditor from "./hooks/events/useSelection";
import useShortKeys from "./hooks/events/useShortKeys";
import useImageEditorWeel from "./hooks/events/useWeel";
import useImageEditor from "./hooks/main/useImageEditor";
import ImageEditorProviderFonts from "./provider/Fonts";
import type imageEditorTypes from "./type";

const ImageEditorCore = ({
  file,
  onSubmit,
  modal,
  darkTheme,
}: imageEditorTypes["props"]) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initialCanvas, states, updateState, canvas, history } =
    useImageEditor();
  const { breakpoint, isGreaterThan } = useBreakpoint();
  const { width } = useWindowSize();
  const { changeTheme } = useTheme();
  const context = {
    states,
    canvas,
    props: { modal, onSubmit, file },
    methods: { updateState, history },
  };

  // Events
  useSelectionImageMove({ canvas, toolActive: states.toolActive });
  useImageEditorWeel({ canvas, toolActive: states.toolActive });
  useSelectionImageEditor({ canvas, updateState });
  useImageEditorModify({ canvas, history });
  useBrushChange({ canvas, states });
  useShortKeys(context);

  useEffect(() => {
    if (states.file) initialCanvas({ boxRef, canvasRef, file: states.file });
  }, [modal.status, states.file]);

  useEffect(() => {
    return () => {
      if (canvas) canvas.dispose();
    };
  }, [canvas]);

  useEffect(() => {
    if (!states.widthWindow) updateState("widthWindow", width);
    else if (canvas && states.widthWindow !== width) modal.toggle(false);
  }, [width, states.widthWindow]);

  // Change theme image editor
  useEffect(() => {
    if (typeof darkTheme === "boolean") {
      changeTheme({
        primaryColorClass: "default",
        themeClass: darkTheme ? "theme-dark" : "default",
      });
    }
  }, [darkTheme]);

  // Update File
  useEffect(() => {
    if (file) updateState("file", file);
  }, [file]);

  return modal.status ? (
    <ImageEditorContext value={context}>
      <Dialog open={modal.status} onOpenChange={modal.toggle}>
        <DialogPortal>
          <ImageEditorProviderFonts>
            <div className="fixed transform z-[30] w-full top-0 left-0 right-0 bottom-0 gap-y-0 pb-6 bg-background">
              <ImageEditorContextmenu />
              <div className="relative w-full h-full flex flex-col gap-y-6">
                <ImageEditorTopbar />
                <div className="w-[100%] h-full px-5 gap-x-1 mx-auto flex flex-row items-start justify-between">
                  <div
                    className={`w-full z-10 fixed left-0 bottom-0 right-0 sm:w-16 sm:h-full sm:relative ${canvas ? "" : "pointer-events-none opacity-70"}`}
                  >
                    {breakpoint === "xs" ? <MobileTools /> : null}
                    <ImageEditorSidebar />
                  </div>

                  <div
                    className="w-full sm:w-[91%] md:w-[92%] lg:w-[80%] xl:w-[75%] 2xl:w-[86%] h-full relative justify-center items-center flex"
                    ref={boxRef}
                  >
                    {states.file ? (
                      <canvas ref={canvasRef} />
                    ) : (
                      <ImageEditorDropZone />
                    )}
                  </div>

                  {isGreaterThan("md") ? (
                    <div className="w-[23%] xl:w-[20%] 2xl:w-[17%] h-full">
                      <ImageToolsLayers />
                    </div>
                  ) : ["sm", "md", "lg"].includes(breakpoint) ? (
                    <TabletTools />
                  ) : null}
                </div>
              </div>
              <ShortkeysHelp />
            </div>
          </ImageEditorProviderFonts>
        </DialogPortal>
      </Dialog>
    </ImageEditorContext>
  ) : null;
};

export default ImageEditorCore;
