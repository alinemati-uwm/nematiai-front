import { type ReactNode } from "react";

import { type Canvas, type FabricObject } from "fabric";

import type ContextMenuTools from "./components/contextmenu/components/tools/modules/ContextMenuTools";
import type ImageEditorMenuModules from "./components/sidebar/components/items/modules/_index";
import type ImageEditorTopbarTools from "./components/topbar/tools/ImageEditorTopbarTools";

type props = {
  file?: File;
  onSubmit(file: File | string): void;
  modal: {
    status: boolean;
    toggle(status: boolean): void;
  };
  darkTheme?: states["defaults"]["darkTheme"];
};

type states = {
  toolActive: imageEditorTypes["tools"] | null;
  selectedObject: imageEditorTypes["customs"]["FabricObject"] | undefined;
  widthWindow: number;
  defaults: {
    colorPicker: string;
    brush: {
      size: number;
      style: "pencil" | "circle" | "spray";
    };
    darkTheme: boolean;
  };
  history: {
    timestamp: number | null;
    timeline: Record<string, FabricObject[]>;
    canvas: Record<string, any> | null;
  };
  file: File | null;
};

type context = {
  states: imageEditorTypes["states"];
  canvas: Canvas | null;
  props: Pick<imageEditorTypes["props"], "modal" | "onSubmit" | "file">;
  methods: {
    updateState<T extends keyof imageEditorTypes["states"]>(
      key: T,
      value: imageEditorTypes["states"][T],
    ): void;
    history: {
      add(canvas?: Canvas): void;
      reset(): Promise<void>;
    };
  };
};

type items = {
  icon: ReactNode;
  onClick(): void;
  key: imageEditorTypes["tools"];
  tools: Array<keyof typeof ImageEditorTopbarTools>;
  tools_show?: boolean;
  caption: string;
  menu?: keyof typeof ImageEditorMenuModules;
  contextMenu?: keyof typeof ContextMenuTools;
  shortKey: {
    codeKey: number;
    description: string;
  };
};

type imageEditorTypes = {
  tools:
    | "circle"
    | "rect"
    | "textbox"
    | "path"
    | "cursor"
    | "panning"
    | "crop"
    | "ai"
    | "triangle"
    | "arrow"
    | "line"
    | "shapes"
    | "filters";
  props: props;
  states: states;
  context: context;
  items: items[];
  customs: {
    FabricObject: FabricObject & {
      id?: string;
      filters?: any[];
      filterID?: string;
      customType?: imageEditorTypes["tools"];
    };
  };
};

export default imageEditorTypes;
