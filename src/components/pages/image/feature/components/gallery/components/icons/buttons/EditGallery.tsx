import React, { useContext, useState } from "react";

import { getFileAddress } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import ImageEditor from "../../../../../../../../shared/editor/ImageEditor";
import { GalleryAiImageContext } from "../../../context";
import GalleryIcon from "../container/GalleryIcon";
import sendGalleryModel from "./send/model";

type states = {
  modal: boolean;
  file: File | null;
  loading: boolean;
};

function EditGallery() {
  // Access the current 'mainImage' from the galleryAiImageContext
  const { mainImage } = useContext(GalleryAiImageContext);

  // Define state to manage modal visibility, file, and loading status
  const [states, setStates] = useState<states>({
    modal: false, // Whether the modal is visible
    file: null, // The selected file (if any)
    loading: false, // Whether the app is in a loading state
  });

  // Destructure the 'urlToFile' from the sendGalleryModel for converting a URL to a file
  const { urlToFile } = sendGalleryModel;

  // Access the dictionary for the 'edit_editor' title (localized text)
  const {
    page: {
      image: { edit_editor },
    },
  } = useGetDictionary();

  // Function to handle opening the image in a new tab
  const handleOpenImage = (file: File) => {
    if (!file) return; // If no file is provided, return early
    const imageUrl = getFileAddress(file); // Get the URL of the image
    if (imageUrl) window.open(imageUrl, "_blank"); // Open the image in a new tab
  };

  // Update a specific part of the state
  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  // Function to handle showing the modal for image editing
  const showModal = async () => {
    try {
      updateState("loading", true);
      const file = await urlToFile(mainImage); // Convert the mainImage URL to a file
      updateState("file", file);
      updateState("loading", false);
      updateState("modal", true);
    } catch (error) {
      updateState("loading", false); // If an error occurs, stop the loading state
    }
  };

  return (
    <>
      {/* Trigger the modal opening when this div is clicked */}
      <div onClick={showModal}>
        <GalleryIcon
          loading={states.loading}
          title={edit_editor}
          mobileLabel
          icon="grommet-icons:magic"
        />
      </div>

      {/* Render the ImageEditor component and pass the necessary props */}
      <ImageEditor
        modal={{
          status: states.modal,
          toggle: () => updateState("modal", false),
        }}
        file={states.file as File}
        onSubmit={handleOpenImage}
      />
    </>
  );
}

export default EditGallery;
