//custom hook for implement dragging component
import type React from "react";
import { useEffect, useRef, useState } from "react";

import useBreakpoint from "./useBreakpoint";

//initial position is the place that modal is opened related to the componentRef
//initial size is the size of the opened modal

interface Props {
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  minHeight?: number;
}

/**
 * Custom hook to implement dragging functionality for a component.
 *
 * This hook provides the necessary state and event handlers to enable dragging and resizing of a component.
 *
 * @param props - The properties for the hook.
 * @param {Object} props.initialPosition - The initial position of the component.
 * @param {number} props.initialPosition.x - The initial x-coordinate.
 * @param {number} props.initialPosition.y - The initial y-coordinate.
 * @param {Object} props.initialSize - The initial size of the component.
 * @param {number} props.initialSize.width - The initial width of the component.
 * @param {number} props.initialSize.height - The initial height of the component.
 * @param {number} [props.minHeight=350] - The minimum height of the component.
 *
 * @returns Object - An object containing the event handlers and state for the draggable component.
 * @returns function onMouseDown - Event handler for the mousedown event to start dragging.
 * @returns function onResizeMouseDown - Event handler for the mousedown event to start resizing.
 * @returns React.MutableRefObject<HTMLDivElement | null> componentRef - Reference to the component being dragged.
 * @returns Object size - The current size of the component.
 * @returns function setSize - Function to set the size of the component.
 * @returns Object position - The current position of the component.
 * @returns boolean isDragging - Indicates whether the component is currently being dragged.
 */
const useDraggComponent = ({
  initialPosition,
  initialSize,
  minHeight = 350,
}: Props) => {
  //states related to modal and dragging functionality
  const [position, setPosition] = useState(initialPosition);
  //size of the modal
  const [size, setSize] = useState(initialSize);
  //is dragging or not
  const [isDragging, setIsDragging] = useState<boolean>(false);

  //refs for dragging and resizing
  const dragging = useRef(false);
  const resizing = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 });
  const componentRef = useRef<HTMLDivElement>(null);
  const { isLessThan, windowWidth } = useBreakpoint();
  useEffect(() => {
    const checkintialPosition = initialPosition;
    if (isLessThan("md")) {
      let width = initialSize.width;
      if (width > windowWidth - 20) {
        width = windowWidth - 20;
        setSize({ width: width, height: initialSize.height });
      }

      checkintialPosition["x"] = windowWidth / 2 - width / 2;
    }

    setPosition(checkintialPosition);
  }, [initialPosition]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    dragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    setIsDragging(true);
    e.stopPropagation();
    e.preventDefault();

    if (dragging.current) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }

    if (resizing.current) {
      const newWidth =
        resizeStart.current.width + (e.clientX - resizeStart.current.x);
      const newHeight =
        resizeStart.current.height + (e.clientY - resizeStart.current.y);
      setSize({
        width: Math.max(450, newWidth),
        height: Math.max(minHeight, newHeight),
      }); // Minimum size constraints
    }
  };

  const onMouseUp = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 10);
    dragging.current = false;
    resizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    resizing.current = true;
    resizeStart.current = {
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return {
    onMouseDown,
    onResizeMouseDown,
    componentRef,
    size,
    setSize,
    position,
    isDragging,
  };
};

export default useDraggComponent;
