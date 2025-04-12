"use client";

import { useEffect, useState } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";
import useGetDetailsHistory from "@/refactor_lib/hooks/queries/useGetDetailsHistory";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

//refactoreli 1
//convert the main history item to the editor HTML type because generated item in history doesn"t have a json related to its styling
import {
  type selectedUUIdANdVersion,
  type TypeLoadDetailsByQuery,
} from "../types";

export const useLoadDetailsByQuery = ({
  selectedVersion = "",
  selectedUUID,
  appName,
  setSelectedUUID,
  setSelectedVersion = () => {},
  afterLoadDetails,
}: TypeLoadDetailsByQuery) => {
  const [getFromPath, setGetFromPathUuid] = useState<
    Pick<selectedUUIdANdVersion, "uuid" | "version">
  >({
    uuid: selectedUUID,
    version: selectedVersion,
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const { queries } = useQueryParams();
  const [getData, setGetData] = useState<boolean>(false);
  const { data: detailsHistory, refetch: getDetailsAfterLoad } =
    useGetDetailsHistory({
      appName,
      uuid: getFromPath.uuid,
      version: getFromPath.version,
    });

  useEffect(() => {
    if (getFromPath.uuid) {
      if (
        getFromPath.uuid !== selectedUUID ||
        getFromPath.version !== selectedVersion
      ) {
        setSelectedUUID(getFromPath.uuid);
        setSelectedVersion(getFromPath.version);
        setIsPending(true);
        getDetailsAfterLoad()
          .then(data => {
            afterLoadDetails({
              data: data.data as HistoryAPIResponse["answers"],
              selected: getFromPath,
            });
          })
          .finally(() => {
            setIsPending(false);
          });
      }
    } else {
      setSelectedUUID("");
      setSelectedVersion("");
      afterLoadDetails({
        reset: true,
      });
    }
  }, [getFromPath, getData]);

  useEffect(() => {
    let version = "";
    let uuid = "";

    if (queries.version) {
      version = queries.version;
    }

    if (queries.uuid) {
      uuid = queries.uuid;
    }

    if (uuid === selectedUUID && version === "") {
      setGetFromPathUuid(prev => {
        setGetData(!getData);
        return { uuid, version };
      });

      return;
    }

    setGetFromPathUuid({ uuid, version });
  }, [queries.uuid, queries.version]);

  return {
    isPending,
  };
};
