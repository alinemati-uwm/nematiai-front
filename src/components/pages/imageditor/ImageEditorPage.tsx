"use client";

import React, { useEffect, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import ImageEditor from "@/components/shared/editor/ImageEditor";

import sendGalleryModel from "../image/feature/components/gallery/components/icons/buttons/send/model";
import useImageEditorPage from "./useImageEditorPage";

function ImageEditorPage() {
  const {
    image,
    isDark,
    query: { isSuccess, isError },
  } = useImageEditorPage();
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState<any>(null);
  const { urlToFile } = sendGalleryModel;

  const updateFile = async () => {
    try {
      if (!image) return;
      const file = await urlToFile(image);
      setFile(file);
    } catch (error) {
      console.log("error", error);
      setErr(error);
    }
  };

  useEffect(() => {
    void updateFile();
  }, [image]);

  return file && isSuccess ? (
    <div>
      <ImageEditor
        file={file}
        modal={{ status: true, toggle: () => {} }}
        darkTheme={isDark === "true"}
        onSubmit={file => {
          if (!file) return;
          try {
            //@ts-ignore
            Toaster.postMessage(file);
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      {err || isError ? (
        <div className="text-gray-200">
          {err
            ? "Somthing went wrong"
            : "You do not have permission to access this feature."}
        </div>
      ) : (
        <AppIcon width={50} color="#999" icon="eos-icons:loading" />
      )}
    </div>
  );
}

export default ImageEditorPage;
