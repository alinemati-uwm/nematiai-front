"use client";

import AppIcon from "@/components/shared/AppIcon";
import { useGetDictionary } from "@/hooks";

/**
 * show a message in result section when no image generated and history is empty too
 * @constructor
 */
export default function EmptyResult() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  return (
    <div className="centered-col h-full w-full gap-2">
      <div className="centered-col h-20 w-20 rounded-full border border-primary-lighter bg-primary-light/60 shadow-card-hover">
        <AppIcon icon="fa-solid:magic" className="h-8 w-8 fill-label-icon" />
      </div>
      <h2 className="text-3xl text-label-light">
        {imageDictionary.empty_result_message}
      </h2>
      <p className="text-small font-normal text-label-light">
        {imageDictionary.empty_result_subtitle}
      </p>
    </div>
  );
}
