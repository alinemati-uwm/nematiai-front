import React, { useContext, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";

import AiImagePageContext from "../../context";
import useRouteAiImage from "../../hooks/useRouteAiImage";
import GalleryAiImage from "../gallery/GalleryAiImage";

function FullScreenGallery() {
  const {
    states: { result },
  } = useContext(AiImagePageContext);
  const [States, setStates] = useState({
    modal: false,
    mainImage: "",
  });
  const { feature } = useRouteAiImage();

  const toggleModal = (value: boolean) =>
    setStates(prev => ({ ...prev, modal: value }));

  const images = result[feature];

  return images && images.length && feature !== "image_upscale" ? (
    <>
      <div
        className="flex justify-center absolute right-0 top-0 md:static items-center w-6 h-6 rounded-sm p-1.5 cursor-pointer"
        onClick={() => toggleModal(true)}
      >
        <AppIcon icon="gridicons:fullscreen" />
      </div>
      {States.modal ? (
        <div className="flex justify-center items-center fixed left-0 right-0 bottom-0 top-0 z-40">
          <div
            className="fixed left-0 right-0 bottom-0 top-0 bg-gray-400 bg-opacity-75 backdrop-blur-sm"
            onClick={() => toggleModal(false)}
          ></div>
          <div className="flex justify-center items-center bg-holder-lighter h-[auto] sm:h-[90%] w-4/5 rounded-lg relative p-9">
            <GalleryAiImage fullscreen icons={false} images={images} />
          </div>
        </div>
      ) : null}
    </>
  ) : null;
}

export default FullScreenGallery;
