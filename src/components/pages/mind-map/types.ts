import type React from "react";

import type { INode } from "markmap-common";

export type MindMapTab =
  | "prompt_tab"
  | "pdf_tab"
  | "long_text_tab"
  | "web_tab"
  | "youtube_tab"
  | "image_tab";
export type MindMapField = "text" | "file" | "link";

export interface MindMapFormItem {
  id: string;
  title: string;
  tabKey: MindMapTab;
  filedType: MindMapField;
  icon: string;
  fieldMaxLength?: number;
}

export type Div = React.ComponentPropsWithoutRef<"div">;

export interface NodeProps {
  depth: string;
  path: string;
}

export type AddNodeHandler = (
  level: "sibling" | "child",
  side?: "bottom" | "top",
) => void;

export type NodeMenuPosition = {
  x: number;
  y: number;
};

export interface EditInputRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface INodeRect {
  start: number;
  end: number;
  top: number;
  bottom: number;
  path: string;
}

export type SVG = SVGSVGElement | null;
export type AddNode = (
  level: "sibling" | "child",
  side?: "bottom" | "top",
  nodeToAdd?: INode,
  pathToAdd?: string,
  newData?: INode,
) => void;
