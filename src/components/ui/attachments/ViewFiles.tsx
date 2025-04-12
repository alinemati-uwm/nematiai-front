import React from "react";

import AppIcon from "@/components/shared/AppIcon";

import AppTypo from "../AppTypo";
import type { FilesType } from "./types";

// Function to get icon representation for a file
const getIconForFile = (file: File, image: string) => {
  const styles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "gray",
  };

  switch (file.type) {
    case "application/pdf": {
      const fileSizeInKB = Math.round(file.size / 1024);
      return (
        <div className="w-[9.625rem] h-12 gap-2 p-1 bg-holder-lighter border rounded flex flex-row items-center">
          <div className="h-9 w-9 min-w-9 bg-danger-lighter text-danger rounded flex flex-col items-center justify-center">
            <AppIcon fontSize={20} icon="hugeicons:pdf-02" />
          </div>
          <div className="flex-1 flex flex-col max-w-full w-[calc(100%-3.25rem)] gap-0.5">
            <AppTypo className="truncate -mt-0.5" variant="small" type="label">
              {file.name}
            </AppTypo>
            <AppTypo variant="small" color="secondary" type="label">
              {fileSizeInKB}kb
            </AppTypo>
          </div>
        </div>
      );
    }
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
      return <div style={styles} className="w-14 h-14 rounded " />;
    default:
      return null;
  }
};

// Component to render the list of files with preview and remove button
const ViewFiles: React.FC<{
  files: FilesType;
  filePreviews: Record<string, string>;
  onRemove?: (key: string) => void;
}> = ({ files, filePreviews, onRemove }) => {
  const listFile = Object.entries(files);
  if (listFile.length === 0) {
    return null;
  }

  return listFile.map(([key, file]) => (
    <div key={key} className="flex row rounded ">
      <div title={file.name} className="relative group">
        {getIconForFile(file, filePreviews[key] || "")}
        {onRemove && (
          <div className="absolute flex justify-center items-center h-4 w-4 -top-1.5 -end-1.5 cursor-pointer text-holder-lighter bg-label-dark rounded-full">
            <AppIcon
              fontSize={10}
              onClick={() => onRemove(key)}
              icon="ep:close-bold"
            />
          </div>
        )}
      </div>
    </div>
  ));
};

export default ViewFiles;
