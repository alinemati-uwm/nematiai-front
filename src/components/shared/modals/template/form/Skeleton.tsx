import React from "react";

function TemplateModalFormSkeleton() {
  return (
    <div className="flex flex-col animate-pulse mt-7">
      <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="flex flex-col mt-5">
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
        <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
      </div>
    </div>
  );
}

export default TemplateModalFormSkeleton;
