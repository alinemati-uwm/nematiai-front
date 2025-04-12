import useBreakpoint from "@/hooks/useBreakpoint";

import AppIcon from "../../AppIcon";
import imageEditorModelTools from "../components/sidebar/model/model";
import type imageEditorTypes from "../type";

function useImageEditorItems({
  canvas,
  methods: { history, updateState },
  states: {
    defaults: { colorPicker },
  },
}: imageEditorTypes["context"]) {
  const { text, cursor, crop } = imageEditorModelTools;
  const { breakpoint } = useBreakpoint();

  const addHistory = () => {
    if (!canvas) return;
    history.add();
  };

  const styles = {
    width: breakpoint === "xs" ? 18 : 22,
    height: breakpoint === "xs" ? 18 : 22,
  };

  const items: imageEditorTypes["items"] = [
    {
      icon: (
        <AppIcon
          {...styles}
          icon="material-symbols:arrow-selector-tool-outline"
        />
      ),
      onClick: () => {
        if (!canvas) return;
        cursor.drawingDisable({ canvas });
        updateState("toolActive", "cursor");
      },
      key: "cursor",
      tools: [],
      caption: "Cursor",
      shortKey: {
        codeKey: 65,
        description: "Ctrl+Alt+A",
      },
    },
    {
      icon: <AppIcon {...styles} icon="material-symbols:pan-tool-outline" />,
      onClick: () => {
        if (canvas) {
          cursor.drawingDisable({ canvas });
          canvas.discardActiveObject();
          canvas.defaultCursor = "grab";
          canvas.requestRenderAll();
          updateState("toolActive", "panning");
        }
      },
      key: "panning",
      tools: [],
      caption: "Move",
      shortKey: {
        codeKey: 72,
        description: "Ctrl+Alt+H",
      },
    },
    {
      icon: (
        <AppIcon
          {...styles}
          icon="material-symbols:stylus-note-outline-rounded"
        />
      ),
      onClick: () => {
        if (canvas) {
          canvas.isDrawingMode = true;
          canvas.discardActiveObject();
          canvas.requestRenderAll();
          updateState("toolActive", "path");
        }
      },
      key: "path",
      tools: ["BrushSize"],
      tools_show: true,
      caption: "Draw",
      shortKey: {
        codeKey: 66,
        description: "Ctrl+Alt+B",
      },
    },
    {
      icon: <AppIcon {...styles} icon="material-symbols:title" />,
      onClick: () => {
        if (!canvas) return;
        text.create({ canvas, props: { fill: colorPicker } });
        updateState("toolActive", "textbox");
        addHistory();
      },
      key: "textbox",
      tools: ["Text"],
      caption: "Text",
      contextMenu: "text",
      shortKey: {
        codeKey: 84,
        description: "Ctrl+Alt+T",
      },
    },
    {
      icon: (
        <AppIcon {...styles} icon="material-symbols:shapes-outline-rounded" />
      ),
      onClick: () => {
        updateState("toolActive", "shapes");
      },
      key: "shapes",
      tools: [],
      menu: "Shapes",
      caption: "Shapes",
      shortKey: {
        codeKey: 83,
        description: "Ctrl+Alt+S",
      },
    },
    {
      icon: <AppIcon {...styles} icon="material-symbols:hdr-auto-outline" />,
      onClick: () => {
        updateState("toolActive", "ai");
      },
      key: "ai",
      tools_show: true,
      menu: "AiEditor",
      tools: [],
      caption: "Ai",
      shortKey: {
        codeKey: 81,
        description: "Ctrl+Alt+Q",
      },
    },
    {
      icon: <AppIcon {...styles} icon="material-symbols:crop" />,
      onClick: () => {
        if (!canvas) return;
        crop.selectFrame({ canvas });
        updateState("toolActive", "crop");
      },
      key: "crop",
      tools_show: true,
      tools: [],
      caption: "Crop",
      shortKey: {
        codeKey: 67,
        description: "Ctrl+Alt+C",
      },
    },
    {
      icon: <AppIcon {...styles} icon="material-symbols:tonality" />,
      onClick: () => {
        updateState("toolActive", "filters");
      },
      key: "filters",
      tools_show: false,
      tools: [],
      menu: "Filters",
      caption: "Filters",
      shortKey: {
        codeKey: 87,
        description: "Ctrl+Alt+W",
      },
    },
  ];

  return { items };
}

export default useImageEditorItems;
