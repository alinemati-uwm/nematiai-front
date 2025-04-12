import React, { useContext } from "react";

import InputDocumentName from "@/components/shared/InputDocumentName";

import AiImagePageContext from "../../context";
import useRouteAiImage from "../../hooks/useRouteAiImage";

// import FullScreenGallery from "./FullScreenGallery";

type props = {
  images: string[];
};

function TopGallery({ images }: props) {
  const { history, feature } = useRouteAiImage();
  const {
    states: { document_name },
    methods: { dispatch },
  } = useContext(AiImagePageContext);

  return history ? (
    <div className="flex w-full md:w-[50%] flex-row">
      <InputDocumentName
        justEdit={true}
        appName={feature}
        value={document_name}
        onChange={e => {
          dispatch({
            type: "set_state",
            payload: { state: "document_name", value: e },
          });
        }}
        uuid={history}
      />
    </div>
  ) : null;
}

export default TopGallery;
