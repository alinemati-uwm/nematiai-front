import React, { useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";
import { useGetDictionary } from "@/hooks";

import CaptionTopbar from "../../../Caption";
import useHookReset from "./useHookReset";

function ImageEditorReset({ closeModal }: { closeModal(): void }) {
  const [confirm, setConfirm] = useState(false);
  const {
    page: {
      image: { label_reset_image_editor, message_reset_image_editor },
      template: { reset_label_button },
    },
  } = useGetDictionary();
  const { reset } = useHookReset();

  return (
    <>
      <DeleteAlertDialog
        title={label_reset_image_editor}
        description={message_reset_image_editor}
        handleSubmit={fn => {
          reset();
          closeModal();
          fn();
        }}
        Trigger={
          <CaptionTopbar
            icon={<AppIcon width={20} icon="material-symbols:delete-outline" />}
            props={{ className: "text-red-600" }}
            title="Reset"
            caption
            onClick={() => setConfirm(true)}
          />
        }
        labelButton={reset_label_button}
        setOpen={setConfirm}
      />
    </>
  );
}

export default ImageEditorReset;
