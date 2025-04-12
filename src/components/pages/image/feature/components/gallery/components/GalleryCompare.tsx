import React, { useContext } from "react";

import ReactCompareImage from "react-compare-image";

import AiImagePageContext from "../../../context";
import useRouteAiImage from "../../../hooks/useRouteAiImage";
import { GalleryAiImageContext } from "../context";

function GalleryCompare() {
  const { mainImage } = useContext(GalleryAiImageContext);
  const { feature } = useRouteAiImage();
  const {
    states: { result },
  } = useContext(AiImagePageContext);

  return (
    <div className="w-full">
      <ReactCompareImage
        skeleton
        leftImage={mainImage}
        rightImage={result[feature][0]}
      />
    </div>
  );
}

export default GalleryCompare;
