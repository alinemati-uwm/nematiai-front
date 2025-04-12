import React from "react";

function FormAiImageSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center gap-x-6 p-8 animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
      </div>
      <div className="flex flex-col px-8  gap-y-5">
        <div className="h-[170px] border border-gray-200 rounded-sm p-4">
          <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse w-1/3"></div>
        </div>
        <div className="flex flex-row gap-x-5 flex-wrap gap-y-5">
          <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700 animate-pulse w-[47%]"></div>
          <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700 animate-pulse w-[47%]"></div>
          <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700 animate-pulse w-[47%]"></div>
          <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700 animate-pulse w-[47%]"></div>
        </div>
      </div>
    </div>
  );
}

export default FormAiImageSkeleton;
