import React, { type FC, type ReactNode } from "react";

import { type INode } from "markmap-common";

import type { AddNode } from "@/components/pages/mind-map/types";
import { Show } from "@/components/shared";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";
import { type StateSetterType } from "@/services/types";

interface IProps {
  children: ReactNode | ReactNode[];
  toggleExpand: (expand?: boolean) => void;
  fit: () => void;
  backToFirstNode: () => void;
  toggleSolidColor: (use: boolean) => void;
  addNode: AddNode;
  deleteNode: () => void;
  setPath: (element?: HTMLElement) => void;
  selectedPath?: string;
  onEditNode: () => void;
  useSolidColor: boolean;
  setUseSolidColor: StateSetterType<boolean>;
  setNodeToClipboard: (cut?: boolean) => void;
  moveNode: (side: "bottom" | "top" | "first" | "last") => void;
}

const PreviewContextMenu: FC<IProps> = ({
  children,
  fit,
  toggleExpand,
  backToFirstNode,
  toggleSolidColor,
  selectedPath,
  setPath,
  addNode,
  deleteNode,
  onEditNode,
  setUseSolidColor,
  useSolidColor,
  setNodeToClipboard,
  moveNode,
}) => {
  const {
    page: { mind_map: dictionary },
  } = useGetDictionary();
  const [copyToClipbloard] = useCopyTextInClipBoard();

  const onContextMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    const elem = e.target as HTMLElement;
    const pathElement = elem.closest("[data-path]");
    setPath(pathElement as HTMLElement);
  };

  const isNodeSelected = !!selectedPath;
  const isFirstChild = selectedPath?.split(".").length === 1;

  const onPaste = async () => {
    const text = await navigator.clipboard.readText();
    if (!text || !text.includes("copiedNode")) return;
    const parsed = JSON.parse(text) as { copiedNode: INode };
    addNode("child", "bottom", parsed.copiedNode);
  };

  const onCopyText = () => {
    const elem = document.querySelector(
      `[data-path="${selectedPath}"] > .markmap-foreign > div > div`,
    );
    copyToClipbloard(elem?.textContent || "");
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="size-full" onContextMenu={onContextMenu}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <Show>
          <Show.When isTrue={isNodeSelected}>
            <ContextMenuItem inset onClick={onCopyText}>
              {dictionary.copy_text}
            </ContextMenuItem>
            <ContextMenuItem inset onClick={() => setNodeToClipboard()}>
              {dictionary.copy_node}
            </ContextMenuItem>
            <ContextMenuItem inset onClick={() => setNodeToClipboard(true)}>
              {dictionary.cut_node}
            </ContextMenuItem>
            <ContextMenuItem inset onClick={onPaste}>
              {dictionary.paste_node}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset onClick={onEditNode}>
              {dictionary.edit_node}
            </ContextMenuItem>
            <ContextMenuItem
              inset
              onClick={() => deleteNode()}
              disabled={isFirstChild}
            >
              {dictionary.delete_node}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>
                {dictionary.insert}
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem onClick={() => addNode("child")}>
                  {dictionary.insert_child}
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => addNode("sibling", "top")}
                  disabled={isFirstChild}
                >
                  {dictionary.sibling_node_to_top}
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => addNode("sibling")}
                  disabled={isFirstChild}
                >
                  {dictionary.sibling_node_to_bottom}
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>
                {dictionary.move_to}
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem
                  disabled={isFirstChild}
                  onClick={() => moveNode("top")}
                >
                  {dictionary.top_node}
                </ContextMenuItem>
                <ContextMenuItem
                  disabled={isFirstChild}
                  onClick={() => moveNode("bottom")}
                >
                  {dictionary.bottom_node}
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  disabled={isFirstChild}
                  onClick={() => moveNode("first")}
                >
                  {dictionary.first_node}
                </ContextMenuItem>
                <ContextMenuItem
                  disabled={isFirstChild}
                  onClick={() => moveNode("last")}
                >
                  {dictionary.last_node}
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </Show.When>
          <Show.Else>
            <ContextMenuItem inset onClick={() => toggleExpand()}>
              {dictionary.expand_all}
            </ContextMenuItem>
            <ContextMenuItem inset onClick={() => toggleExpand(false)}>
              {dictionary.collapse_all}
            </ContextMenuItem>
            <ContextMenuItem inset onClick={backToFirstNode}>
              {dictionary.back_root}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset onClick={fit}>
              {dictionary.fit_to_screen}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              checked={useSolidColor}
              onCheckedChange={val => {
                setUseSolidColor(val);
                toggleSolidColor(val);
              }}
            >
              {dictionary.solid_color_check_label}
            </ContextMenuCheckboxItem>
          </Show.Else>
        </Show>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PreviewContextMenu;
