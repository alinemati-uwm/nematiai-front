import React, { useContext } from "react";

import { Template } from "@/components/icons";

import TemplateContentContext from "../../../context";

function TemplateCardImage() {
  const {
    states: { category },
  } = useContext(TemplateContentContext);

  const ImageIcon = Template[category?.name] ?? Template["Bussiness"];

  return (
    <div className="flex justify-center items-center w-12 h-12">
      <ImageIcon fontSize={32} className="text-[#ccbaff] " />
    </div>
  );
}

export default TemplateCardImage;
