/* eslint-disable */
import { scaleOrdinal } from "d3";
import { type FlextreeNode } from "d3-flextree";
import { walkTree, type INode } from "markmap-common";

import { defaultOptions, lineWidthFactory } from "./constants";
import type {
  IMarkmapJSONOptions,
  IMarkmapOptions,
  IMarkmapState,
  MarkmapStructure,
} from "./types";

export function deriveOptions(jsonOptions?: Partial<IMarkmapJSONOptions>) {
  const derivedOptions: Partial<IMarkmapOptions> = {};
  const options = { ...jsonOptions };

  const { color, colorFreezeLevel, lineWidth } = options;
  if (color?.length === 1) {
    const solidColor = color[0];
    derivedOptions.color = () => solidColor;
  } else if (color?.length) {
    const colorFn = scaleOrdinal(color);
    derivedOptions.color = (node: INode) => colorFn(`${node.state.path}`);
  }
  if (colorFreezeLevel) {
    const color = derivedOptions.color || defaultOptions.color;
    derivedOptions.color = (node: INode) => {
      node = {
        ...node,
        state: {
          ...node.state,
          path: node.state.path.split(".").slice(0, colorFreezeLevel).join("."),
        },
      };
      return color(node);
    };
  }
  if (lineWidth) {
    const args = Array.isArray(lineWidth) ? lineWidth : [lineWidth, 0, 1];
    derivedOptions.lineWidth = lineWidthFactory(
      ...(args as Parameters<typeof lineWidthFactory>),
    );
  }

  const numberKeys = [
    "duration",
    "fitRatio",
    "initialExpandLevel",
    "maxInitialScale",
    "maxWidth",
    "nodeMinHeight",
    "paddingX",
    "spacingHorizontal",
    "spacingVertical",
  ] as const;
  numberKeys.forEach(key => {
    const value = options[key];
    if (typeof value === "number") derivedOptions[key] = value;
  });

  const booleanKeys = ["zoom", "pan"] as const;
  booleanKeys.forEach(key => {
    const value = options[key];
    if (value != null) derivedOptions[key] = !!value;
  });

  return derivedOptions;
}

/**
 * Credit: https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781?permalink_comment_id=4738050#gistcomment-4738050
 */
export function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

export function childSelector<T extends Element>(
  filter?: string | ((el: T) => boolean),
): () => T[] {
  if (typeof filter === "string") {
    const selector = filter;
    filter = (el: T): boolean => el.matches(selector);
  }
  const filterFn = filter;
  return function selector(this: Element): T[] {
    let nodes = Array.from(this.childNodes as NodeListOf<T>);
    if (filterFn) nodes = nodes.filter(node => filterFn(node));
    return nodes;
  };
}

type FNode = FlextreeNode<INode>;

const getNodeTakenSpaces = (fnodes: FNode) => {
  let top = 0;
  let bottom = 0;
  walkTree(fnodes, (item, next) => {
    if (item.x > bottom) {
      bottom = item.x;
    }
    if (item.x < top) {
      top = item.x;
    }
    next();
  });

  return {
    top,
    bottom,
    height: bottom - top,
  };
};

const getId = (node: FNode) => {
  return node.data.state.id;
};

function getSecondNodesVerticalPositions(fnodes: FNode[]) {
  const midY = 0;
  let result: Record<number, number> = {};

  if (fnodes.length % 2 !== 0) {
    const centerIndex = (fnodes.length - 1) / 2;
    result[getId(fnodes[centerIndex])] = midY;

    for (let i = 0; i < centerIndex; i++) {
      result[getId(fnodes[i])] = fnodes
        .slice(i, centerIndex)
        .reduce((acc, curr, currentIndex) => {
          const { height } = getNodeTakenSpaces(curr);
          return acc - (currentIndex === i ? height / 2 : height);
        }, midY);
    }

    for (let j = centerIndex + 1; j < fnodes.length; j++) {
      result[getId(fnodes[j])] = fnodes.slice(j).reduce((acc, curr) => {
        const { height } = getNodeTakenSpaces(curr);
        const currentIndex = fnodes.findIndex(n => getId(n) === getId(curr));
        return acc + (currentIndex === j ? height / 2 : height);
      }, midY);
    }
  } else {
    const firstCenterIndex = fnodes.length === 2 ? 0 : (fnodes.length - 2) / 2;
    const secondCenterIndex = firstCenterIndex + 1;

    const firsCenterY =
      midY - getNodeTakenSpaces(fnodes[firstCenterIndex]).height / 2;
    const secondCenterY =
      midY + getNodeTakenSpaces(fnodes[secondCenterIndex]).height / 2;
    result[getId(fnodes[firstCenterIndex])] = firsCenterY;
    result[getId(fnodes[secondCenterIndex])] = secondCenterY;

    if (fnodes.length > 2) {
      for (let i = 0; i < firstCenterIndex; i++) {
        result[getId(fnodes[i])] = fnodes
          .slice(i, firstCenterIndex)
          .reduce((acc, curr, currentIndex) => {
            const { height } = getNodeTakenSpaces(curr);
            return acc - (currentIndex === i ? height / 2 : height);
          }, firsCenterY);
      }

      for (let j = secondCenterIndex + 1; j < fnodes.length; j++) {
        result[getId(fnodes[j])] = fnodes.slice(j).reduce((acc, curr) => {
          const { height } = getNodeTakenSpaces(curr);
          const currentIndex = fnodes.findIndex(n => getId(n) === getId(curr));
          return acc + (currentIndex === j ? height / 2 : height);
        }, secondCenterY);
      }
    }
  }

  return result;
}

export function rePoseNodes(
  fnodes: FNode[],
  structure: MarkmapStructure,
  rect: IMarkmapState["rect"],
  spaceX: number,
) {
  const centerX = 0;
  const centerY = 0;
  const firstNode = fnodes.find(n => n.data.state.depth === 1);
  const addedNodes: INode[] = [];
  const secondNode = firstNode?.children || [];
  let oddSecondNodes: FNode[] = [];
  let evenSecondNodes: FNode[] = [];
  for (let i = 0; i < secondNode.length; i++) {
    const number = i + 1;
    if (number % 2 === 0) {
      evenSecondNodes.push(secondNode[i]);
    } else {
      oddSecondNodes.push(secondNode[i]);
    }
  }
  const secondNodesVerticalPose = {
    ...getSecondNodesVerticalPositions(oddSecondNodes),
    ...getSecondNodesVerticalPositions(evenSecondNodes),
  };

  function getNodeLayoutRect(fnode: FNode) {
    const defaultRect = {
      x: fnode.y,
      y: fnode.x - fnode.xSize / 2,
    };

    switch (structure) {
      case "logical":
        return defaultRect;
      case "logical_left":
        return {
          x: rect.x2 - fnode.y - fnode.ySize,
          y: fnode.x - fnode.xSize / 2,
        };
      case "organization":
        return {
          x: fnode.x,
          y: fnode.y - fnode.ySize / 2,
        };
      case "organization_upward":
        return {
          x: fnode.x,
          y: rect.y2 - fnode.y - fnode.xSize,
        };
      case "mind_map":
        const { depth } = fnode.data.state;

        if (depth === 1) {
          return {
            x: centerX,
            y: centerY,
          };
        } else if (depth === 2) {
          const nodeId = getId(fnode);
          const isOdd = oddSecondNodes.some(n => getId(n) === nodeId);
          const y = secondNodesVerticalPose[nodeId];

          return {
            y,
            x: centerX + (spaceX + fnode.ySize) * (isOdd ? 1 : -1),
            payload: { side: isOdd ? "right" : "left" },
          };
        } else {
          const parent = fnode.parent;
          const node = addedNodes.find(n => n.state.id === getId(parent!));
          const side = node?.payload?.side as "left" | "right";
          const secondParentId = Number(
            fnode.data.state.path.split(".")[1] || 1,
          );
          const secondNodeAfterRects = addedNodes.find(
            n => n.state.id === secondParentId,
          )?.state.rect;
          const secondNodeBefore = fnodes.find(
            n => getId(n) === secondParentId,
          );

          const offsetY = secondNodeAfterRects!.y - secondNodeBefore!.x;
          const offsetX = secondNodeAfterRects!.x - secondNodeBefore!.y;
          return {
            x:
              side === "left"
                ? centerX - fnode.y - spaceX - fnode.ySize / 2
                : fnode.y + offsetX,
            y: fnode.x + offsetY,
            payload: { side },
          };
        }
      default:
        return defaultRect;
    }
  }

  fnodes.forEach(fnode => {
    const node = fnode.data;
    const { payload = {}, ...rect } = getNodeLayoutRect(fnode) as {
      x: number;
      y: number;
      payload?: Record<string, any>;
    };

    node.state.rect = {
      ...rect,
      width: fnode.ySize - spaceX,
      height: fnode.xSize,
    };
    node.payload = node.payload ? { ...node.payload, ...payload } : payload;
    addedNodes.push(node);
  });
}

export function getCirclePosition(d: INode, structure: MarkmapStructure) {
  const defaultPos = {
    cx: d.state.rect.width,
    cy: d.state.rect.height / 2,
  };
  const r = 6;

  switch (structure) {
    case "logical":
      return defaultPos;
    case "logical_left":
      return {
        cx: r / 2,
        cy: d.state.rect.height / 2,
      };
    case "organization":
      return {
        cx: d.state.rect.width / 2 - r / 2,
        cy: d.state.rect.height + r,
      };
    case "organization_upward":
      return {
        cx: d.state.rect.width / 2 - r / 2,
        cy: -r,
      };
    case "mind_map":
      const isRight = d.payload && d.payload.side === "right";
      return {
        cx: isRight ? d.state.rect.width : r / 2,
        cy: d.state.rect.height / 2,
      };
    default:
      return defaultPos;
  }
}

interface GetPathPositionsReturn {
  source: [number, number];
  target: [number, number];
}

export function getPathPositions(
  d: {
    source: INode;
    target: INode;
  },
  structure: MarkmapStructure,
): GetPathPositionsReturn {
  const r = 6;
  const origSource = d.source;
  const origTarget = d.target;

  const logicalFirstNodeOffset =
    structure === "mind_map" && origSource.state.depth === 1 ? r : 0;

  const defaultPose = {
    source: [
      origSource.state.rect.x +
        origSource.state.rect.width -
        logicalFirstNodeOffset,
      origSource.state.rect.y + origSource.state.rect.height / 2,
    ],
    target: [
      origTarget.state.rect.x,
      origTarget.state.rect.y + origTarget.state.rect.height / 2,
    ],
  } as GetPathPositionsReturn;

  const logicalLeft = {
    source: [
      origSource.state.rect.x + logicalFirstNodeOffset,
      origSource.state.rect.y + origSource.state.rect.height / 2,
    ],
    target: [
      origTarget.state.rect.x + origTarget.state.rect.width,
      origTarget.state.rect.y + origTarget.state.rect.height / 2,
    ],
  } as GetPathPositionsReturn;

  switch (structure) {
    case "logical":
      return defaultPose;
    case "logical_left":
      return logicalLeft;
    case "organization":
      return {
        source: [
          origSource.state.rect.x + origSource.state.rect.width / 2 - r / 2,
          origSource.state.rect.y + origSource.state.rect.height + r,
        ],
        target: [
          origTarget.state.rect.x + origSource.state.rect.width / 2,
          origTarget.state.rect.y,
        ],
      };
    case "organization_upward":
      return {
        source: [
          origSource.state.rect.x + origSource.state.rect.width / 2 - r / 2,
          origSource.state.rect.y - r,
        ],
        target: [
          origTarget.state.rect.x + origSource.state.rect.width / 2,
          origTarget.state.rect.y + origTarget.state.rect.height,
        ],
      };
    case "mind_map":
      const isRight = origTarget.payload && origTarget.payload.side === "right";
      return isRight ? defaultPose : logicalLeft;
    default:
      return defaultPose;
  }
}
