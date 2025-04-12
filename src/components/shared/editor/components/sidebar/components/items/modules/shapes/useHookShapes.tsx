import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import type imageEditorTypes from "@/components/shared/editor/type";
import useBreakpoint from "@/hooks/useBreakpoint";

import imageEditorModelTools from "../../../../model/model";

function useHookShapes({
  canvas,
  states: {
    defaults: { colorPicker },
    file,
  },
  methods: { history, updateState },
}: imageEditorTypes["context"]) {
  const { circle, rectangle, arrow, line, triangle } = imageEditorModelTools;
  const { breakpoint } = useBreakpoint();

  const styles = {
    width: breakpoint === "xs" ? 32 : 46,
    height: breakpoint === "xs" ? 32 : 46,
  };

  const addHistory = () => {
    if (!canvas) return;
    history.add();
  };

  const items: imageEditorTypes["items"] = [
    {
      icon: <AppIcon {...styles} icon="material-symbols:rectangle-outline" />,
      onClick: () => {
        if (!canvas || !file) return;
        rectangle.create({ canvas, file, props: { fill: colorPicker } });
        updateState("toolActive", "rect");
        addHistory();
      },
      key: "rect",
      tools: [],
      caption: "Rect",
      shortKey: {
        codeKey: 85,
        description: "Ctrl+Alt+U",
      },
    },
    {
      icon: <AppIcon {...styles} icon="material-symbols:circle-outline" />,
      onClick: () => {
        if (!canvas || !file) return;
        circle.create({ canvas, file, props: { fill: colorPicker } });
        updateState("toolActive", "circle");
        addHistory();
      },
      key: "circle",
      tools: [],
      caption: "Circle",
      shortKey: {
        codeKey: 73,
        description: "Ctrl+Alt+I",
      },
    },
    {
      icon: <AppIcon {...styles} icon="gravity-ui:triangle-up" />,
      onClick: () => {
        if (!canvas || !file) return;
        triangle.create({
          canvas,
          file,
          props: { fill: colorPicker },
        });
        updateState("toolActive", "triangle");
        addHistory();
      },
      key: "triangle",
      tools: [],
      caption: "Triangle",
      shortKey: {
        codeKey: 79,
        description: "Ctrl+Alt+O",
      },
    },
    {
      icon: <AppIcon {...styles} icon="heroicons:arrow-long-right-solid" />,
      onClick: () => {
        if (!canvas) return;
        arrow.create({
          canvas,
          props: { fill: colorPicker },
        });
        updateState("toolActive", "arrow");
        addHistory();
      },
      key: "arrow",
      tools: [],
      caption: "Arrow",
      shortKey: {
        codeKey: 70,
        description: "Ctrl+Alt+F",
      },
    },
    {
      icon: <AppIcon {...styles} icon="pepicons-pop:line-x" />,
      onClick: () => {
        if (!canvas) return;
        line.create({
          canvas,
          props: { fill: colorPicker },
        });
        updateState("toolActive", "line");
        addHistory();
      },
      key: "line",
      tools: [],
      caption: "Line",
      shortKey: {
        codeKey: 76,
        description: "Ctrl+Alt+L",
      },
    },
  ];

  return { items };
}

export default useHookShapes;
