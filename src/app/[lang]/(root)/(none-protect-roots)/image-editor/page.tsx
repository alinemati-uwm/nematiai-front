"use client";

import React, { useState } from "react";

import Image from "next/image";

import ImageEditor from "@/components/shared/editor/ImageEditor";
import { getFileAddress } from "@/lib/utils";

function Page() {
  const [File, setFile] = useState<File | null>(null);
  const [Modal, setModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="w-full h-screen p-4">
      {image ? (
        <Image
          src={getFileAddress(image) ?? ""}
          alt=""
          width={200}
          height={200}
        />
      ) : null}
      <input
        type="file"
        name=""
        id=""
        onChange={e => {
          setFile(e.target.files ? e.target.files[0] : null);
          setModal(true);
        }}
      />
      <ImageEditor
        modal={{
          status: Modal,
          toggle: () => setModal(false),
        }}
        file={File as File}
        onSubmit={file => setImage(file as File)}
      />
    </div>
  );
}

export default Page;
