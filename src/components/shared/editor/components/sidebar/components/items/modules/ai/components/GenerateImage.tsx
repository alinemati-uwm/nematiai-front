import React, { useContext } from "react";

import sendGalleryModel from "@/components/pages/image/feature/components/gallery/components/icons/buttons/send/model";
import TextToImage from "@/components/pages/image/feature/components/tabs/components/TextToImage";
import ImageEditorContext from "@/components/shared/editor/context";
import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import imageEditorModelTools from "../../../../../model/model";
import MenuLayoutContext from "../../../context";

function GenerateImage() {
  const { canvas } = useContext(ImageEditorContext);
  const { closeModal } = useContext(MenuLayoutContext);
  const { urlToFile } = sendGalleryModel;
  const { toaster } = useToaster();
  const {
    page: {
      image: { somthing_wrong },
    },
  } = useGetDictionary();

  return (
    <div>
      <TextToImage
        document_name="Image editor generate"
        quantity={1}
        onSubmit={async urls => {
          try {
            if (!canvas || !urls[0]) return;
            const file = await urlToFile(urls[0]);
            await imageEditorModelTools.image.create({
              canvas,
              file,
            });
            closeModal();
          } catch (error) {
            toaster({ toastProps: { type: "error", message: somthing_wrong } });
            console.log(error);
          }
        }}
      />
    </div>
  );
}

export default GenerateImage;
