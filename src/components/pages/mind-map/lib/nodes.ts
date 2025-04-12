import * as d3 from "d3";
import type { INode, IPureNode } from "markmap-common";
import { v4 as uuidv4 } from "uuid";

import { getRects, getTextColor } from "@/components/pages/mind-map/lib/utils";
import type { SVG } from "@/components/pages/mind-map/types";

export const applyNodeBackgrounds = (
  branchColors: Record<string, string>,
  svgElement: SVG,
  staticColor?: string,
) => {
  if (!svgElement) return;
  const nodes = svgElement.querySelectorAll(
    ".markmap-node[data-depth='1'], .markmap-node[data-depth='2']",
  );
  nodes.forEach(node => {
    const elem = node.querySelector(
      " .markmap-foreign > div > div",
    ) as HTMLElement;
    const path = node.getAttribute("data-path");
    const background =
      staticColor || branchColors[path!] || Object.values(branchColors)[0];

    elem.style.background = background;
    elem.style.color = getTextColor(background);
  });
};

export const findNode = (node: INode, path: number[]): IPureNode | null => {
  if (path.length === 0) return node;
  const [head, ...tail] = path;
  const child = node.children?.find(child => child?.state?.id === head);
  return child ? findNode(child, tail) : null;
};

export function removeNodeByPath(root: INode, path: string) {
  // Base case: if there are no children, return the tree as is
  if (!root.children) {
    return root;
  }

  // Filter out the child nodes that match the path
  root.children = root.children.filter(child => {
    // If the child's path matches the path to remove, return false
    if (child.state.path === path) {
      return false; // Remove this child
    }
    // Recursively call removeNode on the child
    child = removeNodeByPath(child, path);
    return true; // Keep this child
  });

  return root;
}

export function editNodeByPath(root: INode, path: string, value: string) {
  // Base case: if there are no children, return the tree as is
  if (!root.children) {
    return root;
  }

  // Filter out the child nodes that match the path
  root.children = root.children.map(child => {
    // If the child's path matches the path to remove, return false
    if (child.state.path === path) {
      child.content = value;
      return child;
    }
    // Recursively call removeNode on the child
    child = editNodeByPath(child, path, value);
    return child; // Keep this child
  });

  return root;
}

export const addNodeByPath = (
  root: INode,
  path: string,
  level: "sibling" | "child",
  side: "bottom" | "top" = "bottom",
  nodeToAdd?: INode,
) => {
  // Base case: if there are no children, return the tree as is
  if (!root.children) {
    return root;
  }

  const insert = (node: INode) => {
    const id = uuidv4();
    const dummyNode: INode = {
      children: [],
      state: {
        id,
        path: `${node.state.path}.${node.children.length}`,
        key: `node-${id}`,
        depth: node.state.depth + 1,
        size: [100, 50], // Default size, to be updated later
        rect: { x: 0, y: 0, width: 100, height: 50 }, // To be updated after layout
      },
      content: "Subtopic",
    };

    const newNode = nodeToAdd || dummyNode;

    if (level === "child") {
      node.children.push(newNode);
    } else {
      const index = node.children.findIndex(c => c.state.path === path);
      if (side === "bottom") {
        node.children.splice(index + 1, 0, newNode);
      } else {
        node.children.splice(index, 0, newNode);
      }
    }
  };

  if (level === "sibling" && path.split(".").length === 2) {
    insert(root);
  } else {
    // Filter out the child nodes that match the path
    root.children = root.children.map(child => {
      // If the child's path matches the path to remove, return false

      if (
        level === "sibling"
          ? child.children.some(c => c.state.path === path)
          : child.state.path === path
      ) {
        insert(child);
        return child;
      }
      // Recursively call removeNode on the child
      child = addNodeByPath(child, path, level, side, nodeToAdd);
      return child; // Keep this child
    });
  }
  return root;
};
export const findNodeByPath = (
  data: INode,
  path: string,
  parent: boolean = false,
) => {
  const splitPath = path.split(".").filter(Boolean).map(Number);
  return findNode(
    data,
    parent ? splitPath.slice(1, -1) : splitPath.slice(1),
  ) as INode;
};

export const getPathAddedNodePath = (
  data: INode,
  selectedPath: string,
  level: "child" | "sibling",
  side?: "top" | "bottom",
) => {
  const node = findNodeByPath(data, selectedPath);
  const parentNode = findNodeByPath(data, selectedPath, true) as INode;
  if (!node || !node.children) return;
  let pathToEdit: string;
  if (level === "child") {
    pathToEdit = node.children[node.children.length - 1].state.path!;
  } else {
    const nodeIndex = parentNode.children!.findIndex(
      child => child.state.id === node.state.id,
    );
    pathToEdit =
      parentNode.children![nodeIndex + (side === "top" ? -1 : 1)].state.path!;
  }

  return pathToEdit;
};

export const setDragOpacity = (node: INode, opacity: string) => {
  const nodeElement = d3.select(`g[data-path="${node.state.path}"]`);
  const edgeElement = d3.select(`path[data-path="${node.state.path}"]`);
  nodeElement.attr("opacity", opacity);
  edgeElement.attr("opacity", opacity);
  opacity = opacity === "1" ? "1" : "0";
  node.children?.forEach(child => setDragOpacity(child, opacity));
};

export const getNodeRect = (path: string) => {
  const node = document.querySelector(
    `.markmap-node[data-path="${path}"] > .markmap-foreign > div > div`,
  );
  if (!node) return null;

  return node.getBoundingClientRect();
};

export const createNodeDragDiv = (
  node: INode,
  initX: number,
  initY: number,
  activeBranchesColors: Record<string, string>,
) => {
  const dragDiv = document.createElement("div");
  const rect = getNodeRect(node.state.path);
  dragDiv.id = "node-drag-div";
  dragDiv.innerHTML = node.content?.toString() || "";
  dragDiv.classList.add(
    "border",
    "border-primary",
    "rounded-md",
    "items-center",
    "px-1",
    "fixed",
    "pointer-events-none",
    "-translate-x-1/2",
    "-translate-y-1/2",
  );

  dragDiv.style.display = "none";
  dragDiv.style.width = rect!.width + "px"; // Adjust size as needed
  dragDiv.style.height = rect!.height + "px"; // Adjust size as needed
  // Calculate and set font size based on node width and height
  const fontSize = Math.min(rect!.width / 10, rect!.height / 2);
  dragDiv.style.fontSize = `${fontSize}px`;
  if (node.state.depth < 3) {
    const bg = activeBranchesColors![node.content?.toString()];
    dragDiv.style.backgroundColor = bg;
    dragDiv.style.color = getTextColor(bg);
  }
  // Position the div at the start
  dragDiv.style.left = `${initX}px`;
  dragDiv.style.top = `${initY}px`;
  document.body.appendChild(dragDiv);
};

export const removeNodeDragDiv = (node: INode) => {
  setDragOpacity(node, "1");
  const dragDiv = document.getElementById("node-drag-div");
  if (dragDiv) {
    // Remove the div when drag ends
    document.body.removeChild(dragDiv);
  }
};

export const getClosestPath = (x: number, y: number, path: string) => {
  const nodeRects = getRects();
  const nearest = nodeRects.filter(rect => {
    const draggedReact = getNodeRect(path);
    const dragX = x - draggedReact!.width / 2;
    const dragY = y + draggedReact!.height / 2;
    return (
      dragX > rect.start &&
      dragX < rect.end &&
      dragY > rect.top &&
      dragY < rect.bottom &&
      rect.path !== path
    );
  });
  if (nearest.length) {
    return nearest.sort((a, b) => {
      return (
        Math.abs(x - (a.start + a.end) / 2) -
        Math.abs(x - (b.start + b.end) / 2)
      );
    })[0].path;
  }
  return null;
};

export const moveNodeByPath = (
  root: INode,
  path: string,
  side: "bottom" | "top" | "first" | "last",
) => {
  const findIndex = root.children!.findIndex(
    child => child.state.path === path,
  );
  if (findIndex > -1) {
    switch (side) {
      case "bottom": {
        if (findIndex === root.children!.length - 1) return root;
        const [removed] = root.children!.splice(findIndex, 1);
        root.children!.splice(findIndex + 1, 0, removed);
        break;
      }
      case "top": {
        if (findIndex === 0) return root;
        const [removed] = root.children!.splice(findIndex, 1);
        root.children!.splice(findIndex - 1, 0, removed);
        break;
      }
      case "first": {
        if (findIndex === 0) return root;
        const [removed] = root.children!.splice(findIndex, 1);
        root.children!.unshift(removed);
        break;
      }
      case "last": {
        if (findIndex === root.children!.length - 1) return root;
        const [removed] = root.children!.splice(findIndex, 1);
        root.children!.push(removed);
        break;
      }
    }
  } else {
    root.children = root.children!.map(child => {
      if (child.children) {
        child = moveNodeByPath(child, path, side);
      }
      return child;
    });
  }
  return root;
};
