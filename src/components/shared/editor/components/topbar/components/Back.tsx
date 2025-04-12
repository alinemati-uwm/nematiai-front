import React, { useContext } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";

import ImageEditorContext from "../../../context";

function ImageEditorBack() {
  const {
    props: { modal, file },
  } = useContext(ImageEditorContext);
  const params = useSearchParams();
  const { lang } = useParams();
  const router = useRouter();

  return params.get("token") && params.get("image") ? null : (
    <div
      onClick={() =>
        file ? modal.toggle(false) : router.push(`/${lang}/image`)
      }
      className="cursor-pointer"
    >
      <AppIcon width={20} height={20} icon="majesticons:arrow-left" />
    </div>
  );
}

export default ImageEditorBack;
