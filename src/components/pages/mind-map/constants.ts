import {
  EdgeShape1,
  EdgeShape2,
  EdgeShape3,
  Logical,
  MindMap,
  Organization,
} from "@/components/pages/mind-map/icons";
import { PathType } from "@/components/pages/mind-map/lib/markmap-view";
import type { MindMapFormItem } from "@/components/pages/mind-map/types";

export const mindMapForms: MindMapFormItem[] = [
  {
    id: "mind-map-form-1",
    title: "Your Prompt",
    tabKey: "prompt_tab",
    filedType: "text",
    icon: "ri:chat-ai-line",
  },
  {
    id: "mind-map-form-2",
    title: "Pdf/Doc",
    tabKey: "pdf_tab",
    filedType: "file",
    icon: "ic:outline-picture-as-pdf",
    fieldMaxLength: 5,
  },
  {
    id: "mind-map-form-3",
    title: "Long Text",
    tabKey: "long_text_tab",
    filedType: "text",
    icon: "fluent:text-grammar-wand-16-filled",
  },
  {
    id: "mind-map-form-4",
    title: "Web",
    tabKey: "web_tab",
    filedType: "link",
    icon: "material-symbols:language",
  },
  {
    id: "mind-map-form-5",
    title: "YouTube",
    tabKey: "youtube_tab",
    filedType: "link",
    icon: "ic:outline-video-library",
  },
  {
    id: "mind-map-form-6",
    title: "Image",
    tabKey: "image_tab",
    filedType: "file",
    icon: "ic:outline-image",
  },
];

export const colorPalettes = [
  {
    id: "mind-map-color-palette-1",
    colors: ["#009988", "#c9dd00", "#ff9100", "#ff2725", "#3c51bc", "#0099fa"],
  },
  {
    id: "mind-map-color-palette-2",
    colors: ["#e1e1d5", "#85c1d3", "#6b3747", "#f9633f", "#35c290", "#7fc0f8"],
  },
  {
    id: "mind-map-color-palette-3",
    colors: ["#2c2d30", "#7ac0ff", "#e88bff", "#ffa88b", "#bbffb0", "#fff0b1"],
  },
  {
    id: "mind-map-color-palette-4",
    colors: ["#1a2c1b", "#06592f", "#626d46", "#40955b", "#b7ad8d", "#d7d9c1"],
  },
  {
    id: "mind-map-color-palette-5",
    colors: ["#191959", "#4a51d9", "#8bb5ff", "#ff7b31", "#ffaba8", "#4a96d9"],
  },
  {
    id: "mind-map-color-palette-6",
    colors: ["#413f57", "#d12d48", "#eec900", "#eec900", "#524aa0", "#005ba5"],
  },
];

export const nodeMenuItems = [
  {
    id: "mind-map-node-menu-1",
    itemKey: "delete_node",
    icon: "ic:outline-delete",
  },
  {
    id: "mind-map-node-menu-2",
    itemKey: "edit_node",
    icon: "material-symbols:edit-square-outline",
  },
  {
    id: "mind-map-node-menu-3",
    itemKey: "insert_sibling",
    icon: "ant-design:sisternode-outlined",
  },
  {
    id: "mind-map-node-menu-4",
    itemKey: "insert_child",
    icon: "ant-design:subnode-outlined",
  },
] as const;

export const linkShapes = [
  {
    id: "mind-map-link-shape-1",
    value: PathType.LinkShape,
    Icon: EdgeShape1,
  },
  {
    id: "mind-map-link-shape-2",
    value: PathType.RoundedL,
    Icon: EdgeShape2,
  },
  {
    id: "mind-map-link-shape-3",
    value: PathType.Straight,
    Icon: EdgeShape3,
  },
];

export const structures = [
  {
    id: "mind-structure-1",
    key: "logical",
    Icon: Logical,
  },
  {
    id: "mind-structure-2",
    key: "logical_left",
    Icon: Logical,
  },
  {
    id: "mind-structure-3",
    key: "mind_map",
    Icon: MindMap,
  },
  {
    id: "mind-structure-4",
    key: "organization",
    Icon: Organization,
  },
  {
    id: "mind-structure-5",
    key: "organization_upward",
    Icon: Organization,
  },
  // {
  // 	id: "mind-structure-6",
  // 	key: "catalog",
  // 	Icon: Catalog,
  // },
  // {
  // 	id: "mind-structure-7",
  // 	key: "timeline",
  // 	Icon: Timeline,
  // },
  // {
  // 	id: "mind-structure-8",
  // 	key: "vertical_timeline",
  // 	Icon: VerticalTimeline,
  // },
  // {
  // 	id: "mind-structure-9",
  // 	key: "fish_bone",
  // 	Icon: FishBone,
  // },
] as const;
