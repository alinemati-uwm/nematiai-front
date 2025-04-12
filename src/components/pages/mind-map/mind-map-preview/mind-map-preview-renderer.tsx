import React, { forwardRef, useEffect, useRef, useState } from "react";

import { nodeMenuItems } from "@/components/pages/mind-map/constants";
import PreviewContextMenu from "@/components/pages/mind-map/mind-map-preview/preview-context-menu";
import type {
  AddNode,
  NodeMenuPosition,
} from "@/components/pages/mind-map/types";
import { MinimalButton } from "@/components/shared";
import RenderIf from "@/components/shared/RenderIf";
import { useGetDictionary } from "@/hooks";
import type { StateSetterType } from "@/services/types";

import "./markmap.styles.css";

interface IProps {
  nodeMenuPosition: NodeMenuPosition;
  addNode: AddNode;
  deleteNode: () => void;
  toggleExpand: (expand?: boolean) => void;
  fit: () => void;
  backToFirstNode: () => void;
  toggleSolidColor: (use: boolean) => void;
  setPath: (element?: HTMLElement) => void;
  selectedPath?: string;
  addedPath?: string;
  setAddedPath: (value: string) => void;
  editNode: (value: string) => void;
  useSolidColor: boolean;
  setUseSolidColor: StateSetterType<boolean>;
  setNodeToClipboard: (cut?: boolean) => void;
  moveNode: (side: "bottom" | "top" | "first" | "last") => void;
}

const initialEditInputRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

const MindMapPreviewRenderer = forwardRef<SVGSVGElement, IProps>(
  (
    {
      nodeMenuPosition,
      addNode,
      deleteNode,
      toggleSolidColor,
      fit,
      toggleExpand,
      backToFirstNode,
      selectedPath,
      setPath,
      editNode,
      setUseSolidColor,
      useSolidColor,
      addedPath,
      setAddedPath,
      setNodeToClipboard,
      moveNode,
    },
    ref,
  ) => {
    const [editValue, setEditValue] = useState("");
    const [editInputRect, setEditInputRect] = useState(initialEditInputRect);
    const editInputRef = useRef<HTMLInputElement>(null);

    const {
      page: { mind_map: dictionary },
    } = useGetDictionary();

    const isFirstNode = selectedPath?.split(".").length === 1;

    const onEdit = () => {
      const elem = document.querySelector(
        `[data-path="${selectedPath}"] > .markmap-foreign > div > div`,
      );
      if (elem) {
        const rects = elem.getBoundingClientRect();
        setEditInputRect(rects);
        const value = elem.textContent || "";
        setEditValue(value);
        setAddedPath("");
        setTimeout(() => {
          editInputRef.current?.focus();
          editInputRef.current?.setSelectionRange(0, value.length);
        }, 10);
      }
    };

    useEffect(() => {
      if (addedPath && addedPath === selectedPath) {
        setTimeout(onEdit, 300);
      }
    }, [selectedPath, addedPath]);

    const handlers = {
      delete_node: () => deleteNode(),
      edit_node: onEdit,
      insert_sibling: () => addNode("sibling"),
      insert_child: () => addNode("child"),
    };

    const onBlur = () => {
      editNode(editValue);
      setEditInputRect(initialEditInputRect);
      setEditValue("");
    };

    return (
      <main className="w-full p-2 h-full">
        <RenderIf isTrue={nodeMenuPosition.x > 0}>
          <div
            className="fixed  -translate-x-1/2 pb-1.5 -translate-y-full"
            style={{ top: nodeMenuPosition.y, left: nodeMenuPosition.x }}
          >
            <div className="bg-holder-lighter shadow-lg rounded-md h-8  row border p-0.5 gap-0.5">
              {nodeMenuItems.map(item => (
                <MinimalButton
                  className="!h-7 !w-7 rounded-sm"
                  key={item.id}
                  icon={item.icon}
                  title={dictionary[item.itemKey]}
                  onClick={handlers[item.itemKey]}
                  disabled={item.itemKey === "delete_node" && isFirstNode}
                />
              ))}
            </div>
          </div>
        </RenderIf>

        <div
          className="fixed  -translate-x-1/2 pb-1.5 -translate-y-full "
          style={{ top: nodeMenuPosition.y, left: nodeMenuPosition.x }}
        ></div>

        <RenderIf isTrue={editInputRect.width > 0}>
          <div
            className="fixed row  -translate-x-0.5"
            style={{
              top: editInputRect.top + "px",
              left: editInputRect.left + "px",
              width: editInputRect.width + 2 + "px",
              height: editInputRect.height + "px",
            }}
          >
            <input
              autoFocus
              ref={editInputRef}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={onBlur}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  onBlur();
                }
              }}
              className="w-full h-full  !text-[10px] !px-1 !rounded-sm ring-offset-background focus:outline-none focus:ring-0 focus:ring-offset-0 bg-holder-lighter border shadow-lg"
            />
          </div>
        </RenderIf>
        <PreviewContextMenu
          toggleExpand={toggleExpand}
          fit={fit}
          backToFirstNode={backToFirstNode}
          toggleSolidColor={toggleSolidColor}
          addNode={addNode}
          deleteNode={deleteNode}
          setPath={setPath}
          selectedPath={selectedPath}
          onEditNode={onEdit}
          useSolidColor={useSolidColor}
          setUseSolidColor={setUseSolidColor}
          setNodeToClipboard={setNodeToClipboard}
          moveNode={moveNode}
        >
          <svg className="flex-1 h-full w-full" ref={ref} />
        </PreviewContextMenu>
      </main>
    );
  },
);

export default MindMapPreviewRenderer;
