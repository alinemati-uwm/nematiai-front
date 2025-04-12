import React, { useContext, useRef, type ChangeEvent } from "react";

import AppIcon from "@/components/shared/AppIcon";

import ImageEditorContext from "../../../../../context";
import imageEditorModelTools from "../../../../sidebar/model/model";
import CaptionTopbar from "../../Caption";

function ImageEditorUpload({ closeModal }: { closeModal(): void }) {
  const {
    canvas,
    methods: { history },
  } = useContext(ImageEditorContext);
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    image: { create, scaleFactor },
  } = imageEditorModelTools;

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const scaled = await scaleFactor(file);
    await create({
      canvas,
      file,
      props: {
        scaleX: scaled / 4,
        scaleY: scaled / 4,
      },
    });
    history.add();
    closeModal();
  };

  const trigger = () => (fileRef.current ? fileRef.current.click() : {});

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".jpg, .jpeg, .png"
        hidden
        name=""
        id=""
        onChange={upload}
      />
      <CaptionTopbar
        icon={<AppIcon width={20} icon="material-symbols:system-update-alt" />}
        title="Import file"
        caption
        onClick={trigger}
      />
    </>
  );
}

export default ImageEditorUpload;
