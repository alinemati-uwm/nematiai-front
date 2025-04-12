import React, { useContext, useEffect } from "react";

import useAppLayout from "@/components/layout/hook/useAppLayout";

import AiImagePageContext from "../context";
import useRouteAiImage from "../hooks/useRouteAiImage";
import EmptyResult from "./EmptyResult";
import GalleryAiImage from "./gallery/GalleryAiImage";
import GalleryAiImageSkeleton from "./skeletons/GalleryAiImageSkeleton";

function ResultSection() {
  const { states } = useContext(AiImagePageContext);
  const { feature } = useRouteAiImage();
  const { toggleOpen } = useAppLayout();

  const result = states.result[feature] ?? [];

  useEffect(() => {
    toggleOpen(Boolean(result.length));
  }, [result]);

  return (
    <div className="w-full h-full relative flex flex-col overflow-hidden">
      {states.loading ? (
        <GalleryAiImageSkeleton />
      ) : (
        <>
          {result.length ? <GalleryAiImage images={result} /> : <EmptyResult />}
        </>
      )}
    </div>
  );
}

export default ResultSection;
