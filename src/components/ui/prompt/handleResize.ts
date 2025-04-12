// Handle mouse move to resize the div
export const handleMouseMove = (
  e: MouseEvent,
  isResizing: any,
  editableDivRef: any,
  lastHeight: any,
  startY: any,
  setDivHeight: any,
) => {
  if (isResizing.current && editableDivRef.current) {
    const newHeight = lastHeight.current + (e.clientY - startY.current);
    if (newHeight < 150) {
      return;
    }
    lastHeight.current = newHeight;
    setDivHeight(() => Math.max(newHeight, 50)); // Minimum height of 50px
    startY.current = e.clientY;
  }
};

// // Handle mouse up to stop resizing
export const handleMouseUp = (
  isResizing: any,
  handleMouseMove: any,
  handleMouseUp: any,
) => {
  isResizing.current = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

// Handle mouse down on the resize icon
export const handleMouseDown = (
  e: React.MouseEvent,
  isResizing: any,
  startY: any,
  lastHeight: any,
  divHeight: any,
  handleMouseMove: any,
  handleMouseUp: any,
  editableDivRef: any,
  setDivHeight: any,
) => {
  isResizing.current = true;
  startY.current = e.clientY;
  lastHeight.current = divHeight;

  document.addEventListener("mousemove", e => {
    handleMouseMove(
      e,
      isResizing,
      editableDivRef,
      lastHeight,
      startY,
      setDivHeight,
    );
  });
  document.addEventListener("mouseup", () => {
    handleMouseUp(isResizing, handleMouseMove, handleMouseUp);
  });
};
