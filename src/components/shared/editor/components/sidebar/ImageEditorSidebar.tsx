import React, { useContext, useState } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../context";
import useImageEditorItems from "../../hooks/useImageEditorItems";
import type imageEditorTypes from "../../type";
import ImageEditorCard from "../Card";
import ImageEditorMenuLayout from "./components/items/MenuLayout";
import ImageEditorMenuModules from "./components/items/modules/_index";
import ImageEditorSidebarContext from "./context";
import ImageEditorSidebar_desktop from "./screens/Desktop";
import ImageEditorSidebar_mobile from "./screens/Mobile";
import type imageEditorSidebarProps from "./type";

function ImageEditorSidebar() {
  const { breakpoint } = useBreakpoint();
  const [states, setStates] = useState<imageEditorSidebarProps["states"]>({
    filters: [],
  });
  const context = useContext(ImageEditorContext);
  const {
    canvas,
    states: { toolActive },
    methods,
  } = context;
  const { items } = useImageEditorItems(context);

  const updateState = <T extends keyof imageEditorSidebarProps["states"]>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  const findMenu = toolActive
    ? items.find(el => el.key === toolActive && el.menu)
    : null;

  const getComponent = (menu: imageEditorTypes["items"][0]["menu"]) => {
    if (!menu) return;
    const View = ImageEditorMenuModules[menu];
    return <View />;
  };

  return (
    <ImageEditorSidebarContext value={{ states, updateState }}>
      <>
        <ImageEditorCard
          props={{
            className: `px-2 ${breakpoint === "xs" ? (findMenu ? "rounded-none" : "rounded-b-none") : ""}`,
          }}
        >
          {breakpoint !== "xs" ? (
            <ImageEditorSidebar_desktop />
          ) : (
            <ImageEditorSidebar_mobile />
          )}
        </ImageEditorCard>

        {findMenu && canvas ? (
          <ImageEditorMenuLayout
            closeModal={() => methods.updateState("toolActive", null)}
            icon={findMenu.icon}
            title={findMenu.caption ?? ""}
            separate={findMenu.key === "shapes"}
          >
            {getComponent(findMenu.menu)}
          </ImageEditorMenuLayout>
        ) : null}
      </>
    </ImageEditorSidebarContext>
  );
}

export default ImageEditorSidebar;
