import React, { useContext, useRef, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";
import ImageEditorContext from "@/components/shared/editor/context";
import { useGetDictionary } from "@/hooks";

import CaptionTopbar from "../../Caption";
import useHookReset from "./reset/useHookReset";

function ImageEditorNew({ closeModal }: { closeModal(): void }) {
  const [confirm, setConfirm] = useState(false);
  const {
    page: {
      image: { are_you_sure_create_new, new_project, upload_another_file },
    },
  } = useGetDictionary();
  const {
    methods: { updateState },
  } = useContext(ImageEditorContext);
  const { reset } = useHookReset();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        hidden
        accept=".png, .jpg, .jpeg"
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            reset();
            updateState("file", file);
            closeModal();
            e.target.value = "";
          }
        }}
        ref={ref}
      />
      <DeleteAlertDialog
        title={new_project}
        description={are_you_sure_create_new}
        handleSubmit={fn => {
          if (ref.current) ref.current.click();
          fn();
        }}
        Trigger={
          <CaptionTopbar
            icon={<AppIcon width={20} icon="icon-park-outline:new-picture" />}
            title={upload_another_file}
            caption
            onClick={() => setConfirm(true)}
          />
        }
        labelButton={new_project}
        setOpen={setConfirm}
      />
    </>
  );
}

export default ImageEditorNew;
