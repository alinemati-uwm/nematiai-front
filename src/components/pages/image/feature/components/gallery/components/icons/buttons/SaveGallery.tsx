import React, { useContext, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import AiImagePageContext from "@/components/pages/image/feature/context";
import useRouteAiImage from "@/components/pages/image/feature/hooks/useRouteAiImage";
import useAppHistory from "@/components/shared/HistoryRefactor/useAppHistory";
import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";
import { type HistoryAPIRequest } from "@/refactor_lib/types/api/v1/HistoryAPI";

import GalleryIcon from "../container/GalleryIcon";

function SaveGallery() {
  const [IsFavorite, setIsFavorite] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { feature } = useRouteAiImage();
  const {
    states: { result },
  } = useContext(AiImagePageContext);
  const { data, query } = useAppHistory({});
  const { toaster } = useToaster();

  const favorite = useMutation({
    mutationFn: (params: HistoryAPIRequest["addAnswerToFavorite"]) =>
      historyAPI.addAnswerToFavorite(params),
  });

  const {
    page: {
      image: { somthing_wrong, favorite_success },
    },
  } = useGetDictionary();

  const getHistoryId = () => {
    if (!data || !result) return;
    const history = data.histories.find(
      el =>
        el.urls[0] === result[feature][0] &&
        el.urls.length === result[feature].length,
    );

    setIsFavorite(Boolean(history?.favorite));
    return history?.id;
  };

  const save = async () => {
    try {
      setLoading(true);
      await query.refetch();
      if (!data) return;
      const historyID = getHistoryId();
      if (!historyID) throw Error(somthing_wrong);
      await favorite.mutateAsync({ answer_id: historyID });
      await query.refetch();
      toaster({
        toastProps: {
          type: "success",
          message: favorite_success,
        },
      });
      setLoading(false);
    } catch (error: any) {
      const message = error?.response?.data?.detail;
      setLoading(false);
      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    }
  };

  // Check favorite with last data history
  useEffect(() => {
    getHistoryId();
  }, [data]);

  // When change result update history
  useEffect(() => {
    query.refetch();
  }, [result]);

  return (
    <div onClick={save}>
      <GalleryIcon
        loading={Loading}
        title="Save"
        icon="fa-regular:bookmark"
        style={{ background: IsFavorite ? "#e5e7eb" : "" }}
      />
    </div>
  );
}

export default SaveGallery;
