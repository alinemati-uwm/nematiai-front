import { type RefObject } from "react";

import * as d3 from "d3";

import { colorPalettes } from "@/components/pages/mind-map/constants";
import {
  PathType,
  type MarkmapStructure,
} from "@/components/pages/mind-map/lib/markmap-view";

const linkShapeH = d3.linkHorizontal();
const linkShapeV = d3.linkVertical();

const lineGenerator = d3
  .line<[number, number]>()
  .x(d => d[0])
  .y(d => d[1]);

function createRoundedLPath(
  source: [number, number],
  target: [number, number],
  structure: MarkmapStructure,
  isLeft: boolean,
) {
  const radius = 8;
  const path = d3.path();
  let mid = [0, 0];
  let hSign = 1; // horizontal sign (1: right, -1: left)
  let vSign = 1; // vertical sign (1: down, -1: up)

  if (structure === "organization" || structure === "organization_upward") {
    // Organizational layouts: draw vertical then horizontal.
    // Use the corner at [target_x, source_y]
    mid = [target[0], source[1]];
    // For organization downward, we go down; upward, we go up.
    vSign = structure === "organization" ? 1 : -1;
    // Horizontal direction is based on whether target is to the right of source.
    hSign = target[0] - source[0] >= 0 ? 1 : -1;

    path.moveTo(source[0], source[1]);
    // Draw vertical line from source toward the corner,
    // stopping radius distance before the bend.
    path.lineTo(source[0], mid[1] - vSign * radius);
    // Create a rounded corner to start horizontal movement.
    path.arcTo(source[0], mid[1], source[0] + hSign * radius, mid[1], radius);
    // Draw horizontal line toward the target,
    // stopping radius distance before reaching the target.
    path.lineTo(target[0] - hSign * radius, mid[1]);
    // Create the second rounded corner.
    path.arcTo(target[0], mid[1], target[0], mid[1] + vSign * radius, radius);
    // Draw the vertical segment to the target.
    path.lineTo(target[0], target[1]);
  } else {
    // Logical layouts: draw horizontal then vertical.
    // Use the corner at [source_x, target_y]
    mid = [source[0], target[1]];
    // For logical right, we extend to the right; for logical left, to the left.
    hSign = isLeft ? -1 : 1;
    // Vertical direction is determined by whether target is below source.
    vSign = target[1] - source[1] >= 0 ? 1 : -1;

    path.moveTo(source[0], source[1]);
    // Draw horizontal line from source toward the corner,
    // stopping radius distance short of the corner.
    path.lineTo(mid[0] - hSign * radius, source[1]);
    // Create a rounded corner to begin vertical movement.
    path.arcTo(mid[0], source[1], mid[0], source[1] + vSign * radius, radius);
    // Draw vertical line, again stopping before the target.
    path.lineTo(mid[0], target[1] - vSign * radius);
    // Round the corner to resume horizontal movement.
    path.arcTo(mid[0], target[1], mid[0] + hSign * radius, target[1], radius);
    // Finally, draw horizontal line to the target.
    path.lineTo(target[0], target[1]);
  }

  return path.toString();
}

export const createPathD = (
  source: [number, number],
  target: [number, number],
  pathType: PathType,
  structure: MarkmapStructure,
  isLeft: boolean,
) => {
  const verticals: MarkmapStructure[] = ["organization", "organization_upward"];
  const linkShape = verticals.includes(structure) ? linkShapeV : linkShapeH;

  switch (pathType) {
    case PathType.LinkShape:
      return linkShape({ source, target });
    case PathType.RoundedL:
      return createRoundedLPath(source, target, structure, isLeft);
    case PathType.Straight:
      return lineGenerator([source, target]);
    default:
      return linkShape({ source, target });
  }
};

export const createTempPath = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  activeColor: string,
) => {
  const tempLinkColor =
    colorPalettes.find(c => c.id === activeColor)?.colors[0] ||
    colorPalettes[0].colors[0];
  return svg
    .append("path")
    .attr("id", "preview-edge")
    .attr("stroke", tempLinkColor)
    .attr("fill", "none");
};

export const updateTempPathD = (
  closePath: string,
  dragDiv: HTMLElement,
  svgRef: RefObject<SVGSVGElement | null>,
  tempLink: d3.Selection<SVGPathElement, unknown, null, undefined>,
  activePathType: PathType,
  activeStructure: MarkmapStructure,
) => {
  const closestNodeElement = document.querySelector(
    `.markmap-node[data-path="${closePath}"] > .markmap-foreign > div > div`,
  );
  if (closestNodeElement) {
    const closestNodeRect = closestNodeElement.getBoundingClientRect();
    const dragDivRect = dragDiv.getBoundingClientRect();
    const svgRect = svgRef.current!.getBoundingClientRect();
    const source: [number, number] = [
      closestNodeRect.x + closestNodeRect.width - svgRect.left,
      closestNodeRect.y + closestNodeRect.height / 2 - svgRect.top,
    ];
    const target: [number, number] = [
      dragDivRect.x - svgRect.left,
      dragDivRect.y + dragDivRect.height / 2 - svgRect.top,
    ];
    tempLink.attr("d", () =>
      createPathD(
        source,
        target,
        activePathType,
        activeStructure,
        activeStructure === "logical_left",
      ),
    );
  }
};
