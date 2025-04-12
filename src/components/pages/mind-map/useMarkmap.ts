import { useEffect, useRef, useState } from "react";

import { type INode } from "markmap-common";

import { colorPalettes } from "@/components/pages/mind-map/constants";
import {
  Markmap,
  PathType,
  type MarkmapStructure,
} from "@/components/pages/mind-map/lib/markmap-view";
import {
  addNodeByPath,
  applyNodeBackgrounds,
  editNodeByPath,
  findNodeByPath,
  getPathAddedNodePath,
  moveNodeByPath,
  removeNodeByPath,
} from "@/components/pages/mind-map/lib/nodes";
import { transformer } from "@/components/pages/mind-map/lib/transformer";
import {
  downloadAsHtml,
  downloadAsSvg,
  generateBranchColors,
  generateMarkdown,
  safeCaller,
} from "@/components/pages/mind-map/lib/utils";
import { useMarkmapListeners } from "@/components/pages/mind-map/useMarkmapListeners";
import { useCopyTextInClipBoard } from "@/hooks";

interface UseMarkmapProps {
  value: string;
  setValue: (value: string) => void;
}

const nodeMenuInitialPosition = { x: -1, y: -1 };

export const useMarkmap = ({ value, setValue }: UseMarkmapProps) => {
  // Ref for SVG element
  const svgRef = useRef<SVGSVGElement>(null);
  // Ref for markmap object
  const markmapRef = useRef<Markmap>(undefined);
  const [activeColor, setActiveColor] = useState(colorPalettes[0].id);
  const [useSolidColor, setUseSolidColor] = useState(false);
  const [addedPath, setAddedPath] = useState("");
  const [copyToClipboard] = useCopyTextInClipBoard();
  const [loaded, setLoaded] = useState(false);
  const [activePathType, setActivePathType] = useState<PathType>(
    PathType.LinkShape,
  );
  const [activeBranchesColors, setActiveBranchesColors] =
    useState<Record<string, string>>();
  const [nodeMenuPosition, setNodeMenuPosition] = useState(
    nodeMenuInitialPosition,
  );
  const [expanded, setExpanded] = useState(true);
  const [selectedPath, setSelectedPath] = useState<string>();
  const [selectedStructure, setSelectedStructure] =
    useState<MarkmapStructure>("logical");

  const setPath = (element?: HTMLElement) => {
    if (!element) return setSelectedPath(undefined);
    const path = element.getAttribute("data-path");
    if (path) {
      setSelectedPath(path);
    }
  };

  useEffect(() => {
    if (value) {
      setTimeout(() => setLoaded(true), 10);
    }
    return () => setLoaded(false);
  }, [value]);

  useEffect(() => {
    (async () => {
      // Update data for markmap once value is changed
      if (!svgRef.current || !loaded) return;

      const { root } = transformer.transform(value);

      const mm = markmapRef.current
        ? markmapRef.current
        : Markmap.create(svgRef.current, {
            pathType: activePathType,
            duration: 200,
            structure: selectedStructure,
          });

      await mm.setData(root);
      const data = mm.state.data!;
      const colorPalette =
        colorPalettes.find(c => c.id === activeColor)?.colors ||
        colorPalettes[0].colors;
      const branchColors = generateBranchColors(data as INode, colorPalette);
      setActiveBranchesColors(branchColors);
      mm.setOptions({
        color: node => {
          // Customize edge colors based on depth
          if (node.state.depth === 1) return colorPalette[0];
          return branchColors[node.state.path];
        },
      });
      await mm.fit();

      markmapRef.current = mm;
      // Add Backgrounds after Render
      applyNodeBackgrounds(branchColors, svgRef.current);
    })();
  }, [loaded, value]);

  const rescale = (type: "zoomIn" | "zoomOut" | "fit") => {
    if (!markmapRef.current) return;
    safeCaller(() => {
      const mm = markmapRef.current!;
      if (type === "zoomIn") return mm.rescale(1.25);
      if (type === "zoomOut") return mm.rescale(0.8);
      return mm.fit();
    })();
  };

  const handleDownload = (type: "svg" | "html", title: string) => {
    type === "svg"
      ? downloadAsSvg(svgRef.current, title)
      : downloadAsHtml(value, title);
  };

  const setColors = async (colors: string[], staticColor: boolean = false) => {
    if (!markmapRef.current) return;
    const { data } = markmapRef.current.state;
    if (!data) return;
    const branchColors = generateBranchColors(data, colors);
    setActiveBranchesColors(branchColors);
    markmapRef.current.options.color = node => {
      if (node.state.depth === 1) return colors[0];
      return staticColor ? colors[0] : branchColors[node.state.path];
    };
    await markmapRef.current.renderData();
    applyNodeBackgrounds(
      branchColors,
      svgRef.current,
      staticColor ? colors[0] : undefined,
    );
  };

  const toggleExpand = async (expand: boolean = true) => {
    if (markmapRef.current) {
      const { data } = markmapRef.current.state;
      if (!data) return;
      data.payload!.fold = expand ? 0 : 1;
      await markmapRef.current.renderData();
      setExpanded(expand);
    }
  };

  const backToFirstNode = async () => {
    if (markmapRef.current) {
      const { data } = markmapRef.current.state;
      if (!data) return;
      await markmapRef.current.centerNode(data);
    }
  };

  const changeCaller = async (
    handler: (data: INode) => INode,
    callback?: () => void,
    newData?: INode,
  ) => {
    if (!markmapRef.current) return;
    const { data } = markmapRef.current.state;
    if (!data) return;
    const updatedRoot = handler(newData || { ...data });
    const markdown = generateMarkdown(updatedRoot);
    setValue(markdown);
    await markmapRef.current.setData(updatedRoot);
    await markmapRef.current.fit();
    await setColors(
      colorPalettes.find(c => c.id === activeColor)?.colors ||
        colorPalettes[0].colors,
      useSolidColor,
    );
    callback?.();
  };

  const addNode = async (
    level: "sibling" | "child",
    side: "bottom" | "top" = "bottom",
    nodeToAdd?: INode,
    pathToAdd?: string,
    newData?: INode,
  ) => {
    const path = pathToAdd || selectedPath;
    if (!path) return;
    await changeCaller(
      data => {
        const newData = addNodeByPath(data, path!, level, side, nodeToAdd);
        const markdown = generateMarkdown(newData);
        setValue(markdown);
        const { root } = transformer.transform(markdown);
        return root as INode;
      },
      () => {
        if (!markmapRef.current || !!nodeToAdd) return;
        const { data } = markmapRef.current.state;
        if (!data || !path) return;
        const pathToEdit = getPathAddedNodePath(data, path, level, side);
        setSelectedPath(pathToEdit);
        setAddedPath(pathToEdit!);
      },
      newData,
    );
  };

  const deleteNode = async (path?: string) => {
    if (!selectedPath) return;
    await changeCaller(data => removeNodeByPath(data, path || selectedPath!));
  };

  const editNode = async (value: string) => {
    if (!selectedPath) return;
    await changeCaller(data => editNodeByPath(data, selectedPath!, value));
  };

  const moveNode = async (side: "top" | "bottom" | "first" | "last") => {
    if (!selectedPath) return;
    await changeCaller(data => moveNodeByPath(data, selectedPath!, side));
  };

  const setNodeToClipboard = (cut: boolean = false) => {
    if (!selectedPath) return;
    const { data } = markmapRef.current!.state;
    if (!data) return;
    const node = findNodeByPath(data, selectedPath);
    if (!node) return;
    copyToClipboard(JSON.stringify({ copiedNode: node }, null, 2));
    if (cut) {
      deleteNode();
    }
  };

  const changeLinkShape = async (value: PathType) => {
    if (!markmapRef.current) return;
    const originalDuration = markmapRef.current.options.duration;
    markmapRef.current.setOptions({
      pathType: value,
      duration: 0,
    });
    setActivePathType(value);
    await markmapRef.current.renderData();
    markmapRef.current.setOptions({
      duration: originalDuration,
    });
  };

  const changeStructure = async (structure: MarkmapStructure) => {
    if (!markmapRef.current) return;
    markmapRef.current.setOptions({
      structure,
    });
    setSelectedStructure(structure);
    await markmapRef.current.renderData();
    await markmapRef.current.fit();
  };

  useMarkmapListeners({
    svgRef,
    addNode,
    activePathType,
    activeColor,
    markmapRef,
    setPath,
    setNodeMenuPosition,
    setSelectedPath,
    expanded,
    activeBranchesColors,
    activeStructure: selectedStructure,
  });

  return {
    svgRef,
    rescale,
    handleDownload,
    setColors,
    nodeMenuPosition,
    toggleExpand,
    backToFirstNode,
    deleteNode,
    addNode,
    selectedPath,
    setPath,
    editNode,
    activeColor,
    setActiveColor,
    useSolidColor,
    setUseSolidColor,
    addedPath,
    setAddedPath,
    setNodeToClipboard,
    changeLinkShape,
    changeStructure,
    activePathType,
    moveNode,
  };
};
