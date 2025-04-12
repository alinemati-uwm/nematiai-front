import { useEffect, useRef, type RefObject } from "react";

import * as d3 from "d3";
import type { INode } from "markmap-common";

import {
  createTempPath,
  updateTempPathD,
} from "@/components/pages/mind-map/lib/edges";
import type {
  Markmap,
  MarkmapStructure,
} from "@/components/pages/mind-map/lib/markmap-view";
import {
  createNodeDragDiv,
  getClosestPath,
  removeNodeByPath,
  removeNodeDragDiv,
  setDragOpacity,
} from "@/components/pages/mind-map/lib/nodes";
import type { AddNode } from "@/components/pages/mind-map/types";

interface IProps {
  svgRef: RefObject<SVGSVGElement | null>;
  markmapRef: RefObject<Markmap | undefined | null>;
  activePathType: number;
  activeColor: string;
  addNode: AddNode;
  activeBranchesColors?: Record<string, string>;
  setSelectedPath: (val: string) => void;
  expanded: boolean;
  setNodeMenuPosition: (val: { x: number; y: number }) => void;
  setPath: (element: HTMLElement) => void;
  activeStructure: MarkmapStructure;
}

export const useMarkmapListeners = ({
  svgRef,
  markmapRef,
  activeColor,
  activePathType,
  addNode,
  activeBranchesColors,
  expanded,
  setNodeMenuPosition,
  setSelectedPath,
  setPath,
  activeStructure,
}: IProps) => {
  const draggingRef = useRef<boolean>(false);

  const removeActiveNode = () => {
    const activeNodes = document.querySelectorAll(".active-node");
    activeNodes.forEach(node => node.classList.remove("active-node"));
    setNodeMenuPosition({ x: -1, y: -1 });
  };

  const enableDrag = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const nodes = svg.selectAll<SVGCircleElement, INode>(
      "g.markmap-node > .markmap-foreign",
    );
    const tempLink = createTempPath(svg, activeColor);

    nodes.call(
      d3
        .drag<SVGCircleElement, INode>()
        .on("start", function (event, d) {
          setSelectedPath(d.state.path);
          // Create a draggable div
          createNodeDragDiv(
            d,
            event.sourceEvent.x,
            event.sourceEvent.y,
            activeBranchesColors!,
          );
        })
        .on("drag", function (event, d) {
          draggingRef.current = true;
          const dragDiv = document.getElementById("node-drag-div");
          setDragOpacity(d, "0.3");
          dragDiv!.style.display = "flex";
          if (dragDiv) {
            // Update the position of the div
            dragDiv.style.left = `${event.sourceEvent.x}px`;
            dragDiv.style.top = `${event.sourceEvent.y}px`;

            // Update the temporary link
            const closestPath = getClosestPath(
              event.sourceEvent.x,
              event.sourceEvent.y,
              d.state.path,
            );
            if (closestPath) {
              updateTempPathD(
                closestPath,
                dragDiv,
                svgRef,
                tempLink,
                activePathType,
                activeStructure,
              );
            } else {
              tempLink.attr("d", "");
            }
          }
        })
        .on("end", async function (event, d) {
          if (!draggingRef.current) return;
          draggingRef.current = false;
          removeNodeDragDiv(d);
          tempLink.attr("d", "");
          d3.select("#preview-edge").remove(); // Remove the preview edge
          const closetPath = getClosestPath(
            event.sourceEvent.x,
            event.sourceEvent.y,
            d.state.path,
          );
          if (closetPath) {
            const node = JSON.parse(JSON.stringify(d));
            node.state.path = `${closetPath}.${node.state.id}`;
            const { data } = markmapRef.current!.state;
            const deletedData = removeNodeByPath({ ...data! }, d.state.path);
            await addNode("child", "bottom", node, closetPath, deletedData);
          }
        }),
    );
  };

  useEffect(() => {
    if (!svgRef.current || !expanded) return;

    document.addEventListener("click", removeActiveNode);

    const nodes = svgRef.current.querySelectorAll(
      ".markmap-node > .markmap-foreign",
    );

    nodes.forEach(node => {
      node.addEventListener("click", e => {
        removeActiveNode();
        const target = node as HTMLElement;
        target.classList.add("active-node");
        const nodeRects = target.getBoundingClientRect();
        setNodeMenuPosition({
          y: nodeRects.top,
          x: nodeRects.left + nodeRects.width / 2,
        });
        setPath(target.parentElement!);
        e.stopPropagation();
      });
    });

    enableDrag();
    return () => {
      document.removeEventListener("click", removeActiveNode);
      nodes.forEach(node => {
        node.removeEventListener("click", removeActiveNode);
      });
      removeActiveNode();
    };
  }, [expanded, activeBranchesColors, activePathType]);
};
