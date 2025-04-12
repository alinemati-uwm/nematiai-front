import { saveAs } from "file-saver";
import type { INode } from "markmap-common";

import type { SVG } from "@/components/pages/mind-map/types";

let promise: Promise<void> | undefined;

export function safeCaller<T extends unknown[]>(
  fn: (...args: T) => Promise<void>,
) {
  return async (...args: T) => {
    if (promise) return;
    promise = fn(...args);
    try {
      await promise;
    } finally {
      promise = undefined;
    }
  };
}

export const getHtmlContent = (markmapValue: string, title: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>
    <script src="https://cdn.jsdelivr.net/npm/markmap-lib"></script>
    <style>  
    body {
    margin: 0;
    padding: 2rem;
    height: 100vh;
    width: 100vw;
    }
    #markmap {
      width: 100%;
      height: 100%;
      flex: 1
    }
</style>
</head>
<body >
    <svg id="markmap" class="markmap mindmap"></svg>
    <script>
    (async function() {
        const { Transformer, Markmap, loadCSS, loadJS } = window.markmap;
        const transformer = new Transformer();
        const { scripts, styles } = transformer.getAssets();
        if (styles) loadCSS(styles);
        if (scripts) {
            loadJS(scripts, {
                getMarkmap: () => markmap,
            });
        }
        const markdown = \`${markmapValue.replace(/`/g, "\\`")}\`;
        const { root } = transformer.transform(markdown);
        const mm = Markmap.create("svg#markmap");
        await mm.setData(root);
        await mm.fit();
    })();
    </script>
</body>
</html>`;
};

export const downloadAsHtml = (value: string, title: string) => {
  const htmlContent = getHtmlContent(value, title);

  const blob = new Blob([htmlContent], { type: "text/html" });
  saveAs(blob, `${title}.html`);
};

export const downloadAsSvg = (svgElement: SVG, title: string) => {
  if (!svgElement) return;
  const serializer = new XMLSerializer();
  const svgBlob = new Blob([serializer.serializeToString(svgElement)], {
    type: "image/svg+xml",
  });
  saveAs(svgBlob, `${title}.svg`);
};

export const generateBranchColors = (
  root: INode,
  colorPalette: string[],
  color?: string,
  colors: Record<string, string> = {},
) => {
  if (!root || !root.children) return {};

  root.children.forEach((child, index) => {
    const selectedColor =
      color || colorPalette[index % colorPalette.length] || colorPalette[0];
    colors[child?.state?.path] = selectedColor; // Inherit the same color from parent
    generateBranchColors(child, colorPalette, selectedColor, colors);
  });

  return colors;
};

export function getTextColor(backgroundColor: string): string {
  if (!backgroundColor) return "#171717";

  // Helper function to convert hex to RGB
  function hexToRgb(hex: string): [number, number, number] {
    // Remove the hash if it's there
    hex = hex.replace(/^#/, "");
    // Parse the hex string to RGB values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  // Helper function to calculate luminance
  function calculateLuminance(r: number, g: number, b: number): number {
    // Formula for relative luminance
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  // Convert the background color to RGB
  let rgb: [number, number, number];
  if (backgroundColor?.startsWith("#")) {
    rgb = hexToRgb(backgroundColor);
  } else if (backgroundColor.startsWith("rgb")) {
    // Extract RGB values from rgb() or rgba() string
    const matches = backgroundColor.match(/\d+/g);
    if (!matches || matches.length < 3) {
      throw new Error("Invalid RGB/RGBA color format.");
    }
    rgb = matches.slice(0, 3).map(Number) as [number, number, number];
  } else {
    throw new Error("Invalid background color format. Use hex or rgb/rgba.");
  }

  // Calculate luminance
  const luminance = calculateLuminance(rgb[0], rgb[1], rgb[2]);

  // Decide text color based on luminance
  return luminance > 0.5 ? "#171717" : "#f7f8f7";
}

export const generateMarkdown = (node: INode, depth = 0): string => {
  let markdown = `${"#".repeat(depth + 1)} ${node.content}`;
  if (node.children.length > 0) {
    markdown += `\n${node.children.map(child => generateMarkdown(child, depth + 1)).join("\n")}`;
  }
  return markdown;
};

export const getRects = () => {
  const nodes = document.querySelectorAll(
    ".markmap-node >.markmap-foreign > div > div",
  );
  return Array.from(nodes).map(node => {
    const rect = node.getBoundingClientRect();
    return {
      path: node.parentElement!.parentElement!.parentElement!.getAttribute(
        "data-path",
      )!,
      start: rect.x,
      end: rect.x + rect.width + 50,
      top: rect.y - 5,
      bottom: rect.y + rect.height + 5,
    };
  });
};
