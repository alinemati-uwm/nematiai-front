import type { FileType } from "./types";

// Handle drag over event
export const handleDragOver = (
  event: React.DragEvent<HTMLDivElement>,
  setDragging: any,
) => {
  event.preventDefault();
  setDragging(true); // Set dragging status to true
};

// Handle drag leave event
export const handleDragLeave = (
  event: React.DragEvent<HTMLDivElement>,
  setDragging: any,
) => {
  event.preventDefault();
  setDragging(false); // Set dragging status to false
};

export const handleDrop = (
  event: React.DragEvent<HTMLDivElement>,
  handleAddFiles: any,
  setDragging: any,
  accept: FileType[],
  multiple: boolean,
) => {
  event.preventDefault();

  const droppedFiles = Array.from(event.dataTransfer.files);

  const validFiles = droppedFiles.filter(file => {
    return accept.includes(`.${file.type.split("/")[1]}` as FileType);
  });

  if (event.dataTransfer.files) {
    if (multiple) handleAddFiles(validFiles);
    else if (!multiple && validFiles[0]) handleAddFiles([validFiles[0]]);
  }

  setDragging(false);
};
