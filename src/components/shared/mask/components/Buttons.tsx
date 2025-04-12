import React, { useContext } from "react";

import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

import ContextMask from "../context";
import imageEditorMaskModel from "../model";

function MaskButtons() {
  const {
    props: { modal, onSubmit, file },
    states: { canvas },
  } = useContext(ContextMask);
  const { common } = useGetDictionary();
  const { exportFile } = imageEditorMaskModel;

  const apply = async () => {
    if (!canvas || !file) return;
    const filed = await exportFile(canvas, file);
    if (filed) {
      modal.toggle(false);
      onSubmit(filed);
    }
  };

  return (
    <div className="grid grid-cols-2 md:flex md:flex-row gap-x-2 justify-end">
      <Button onClick={() => modal.toggle(false)} size="lg" variant="secondary">
        {common.cancel}
      </Button>
      <Button onClick={apply} className="px-12" size="lg">
        {common.import}
      </Button>
    </div>
  );
}

export default MaskButtons;
