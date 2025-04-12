import React from "react";

function GalleryAiImageSkeleton() {
  return (
    <div className="flex flex-col gap-y-3 h-full justify-center items-center">
      <div className="h-[100px] w-[100px] bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 animate-pulse"></div>
    </div>
  );
}

export default GalleryAiImageSkeleton;
