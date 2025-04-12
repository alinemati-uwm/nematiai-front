import React, { useEffect, useState } from "react";

import Image from "next/image";

import useDivType from "../../hooks/useDivType";
import useImageType from "../../hooks/useImageType";
import useRouteAiImage from "../../hooks/useRouteAiImage";
import TopGallery from "../top/TopGallery";
import GalleryCompare from "./components/GalleryCompare";
import GalleryIcons from "./components/icons/GalleryIcons";
import SidebarGallery from "./components/SidebarGallery";
import { GalleryAiImageContext } from "./context";

type props = {
  images: string[];
  fullscreen?: boolean;
  icons?: boolean;
};

function GalleryAiImage({ images, fullscreen = false, icons = true }: props) {
  // State to store the currently displayed main image
  const [mainImage, setIMainImage] = useState("");

  // Retrieve the feature from the route (e.g., "image_upscale")
  const { feature } = useRouteAiImage();

  // Get the size of the main image
  const sizeImage = useImageType(mainImage);

  // Get the dimensions of the container div
  const [ref, sizeDiv] = useDivType();

  // Effect to set the first image as the main image when images are available
  useEffect(() => {
    if (images && images.length > 0) {
      setIMainImage(images[0]);
    }
  }, [images]);

  // Determine whether to display the image with a full width or height based on aspect ratio
  let sizeOfImage;
  if (
    (sizeImage?.width ?? 1) / (sizeImage?.height ?? 1) >
    (sizeDiv?.width ?? 1) / (sizeDiv?.height ?? 1)
  ) {
    sizeOfImage = "w-full h-auto";
  } else {
    sizeOfImage = "w-auto h-full";
  }

  return (
    <div className="flex justify-center items-center h-full md:py-10">
      {/* Context provider for the gallery (provides the current main image to child components) */}
      <GalleryAiImageContext value={{ mainImage }}>
        <div className="flex flex-col w-[697px] max-w-[100%] gap-y-2 h-full max-h-[100%]">
          {/* Top section with the gallery navigation */}
          <TopGallery images={images} />

          <div className="flex relative flex-col-reverse w-full md:flex-row gap-2 flex-1 h-full max-md:max-h-[calc(100%-2.5rem)] md:max-h-[100%]">
            {/* Conditional rendering of features based on the `feature` variable */}
            {feature === "image_upscale" ? (
              <GalleryCompare />
            ) : (
              <>
                {/* Main image and controls */}
                <div className="w-full flex flex-col gap-y-2 h-full">
                  <div className="flex justify-center flex-col w-full items-center max-md:h-[calc(100%-2.5rem)] md:h-[calc(100%-2rem-0.5rem)]">
                    <div
                      className={`flex-1 items-center flex justify-center w-full relative h-[calc(100%-2rem)] ${images.length > 1 ? "md:pe-[5rem] max-md:pt-[5rem]" : ""}`}
                    >
                      <div
                        ref={ref}
                        className="w-full p-2 border rounded h-full relative items-center flex justify-center"
                      >
                        <Image
                          src={mainImage}
                          alt="Main Image"
                          unoptimized
                          width={100}
                          height={100}
                          className={`md:rounded ${sizeOfImage}`}
                          style={{
                            position: "relative",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Image icons section (optional) */}
                  <div
                    className={`w-full flex min-h-2 flex-row items-center justify-center gap-x-3 md:gap-x-1 ${images.length > 1 ? "md:pe-18" : ""}`}
                  >
                    {icons && <GalleryIcons />}
                  </div>
                </div>

                {/* Sidebar with other images if there's more than one image */}
                {images.length > 1 ? (
                  <div className="absolute items-center justify-center flex md:w-19 md:h-[calc(100%-2rem-0.5rem)] max-md:w-full max-md:h-19 md:end-0 max-md:top-0 md:flex-col max-md:flex-row md:overflow-y-auto max-md:overflow-x-auto md:gap-y-2 max-md:gap-x-2">
                    <div className="flex md:flex-col max-md:flex-row md:max-h-[100%] max-md:max-w-[100%] md:gap-y-2 max-md:gap-x-2">
                      {/* Sidebar gallery component for image navigation */}
                      <SidebarGallery
                        images={images}
                        onClick={img => setIMainImage(img)} // Update the main image when a sidebar image is clicked
                      />
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </GalleryAiImageContext>
    </div>
  );
}

export default GalleryAiImage;
