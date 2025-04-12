"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import userAPI from "@/refactor_lib/services/api/v1/UserAPI";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";
import toMilliseconds from "@/refactor_lib/utils/toMiliseconds";

interface UseGetMeProps {
  onSuccessCallback?: () => void;
  onErrorCallback?: () => void;
}

const useGetMe = (props: UseGetMeProps = {}) => {
  const { onSuccessCallback, onErrorCallback } = props;

  const query = useQuery({
    queryKey: QUERY_KEYS.userAPI.getMe(),
    queryFn: userAPI.getMe,
    select: data => data.data,
    staleTime: toMilliseconds({ minutes: 5 }),
  });

  // update session
  useEffect(() => {
    if (!query.isSuccess) return;
    LocalStorageManger.updateUserInfo(query.data);
    onSuccessCallback && onSuccessCallback();
  }, [query.isSuccess]);

  useEffect(() => {
    if (!query.isError) return;
    onErrorCallback && onErrorCallback();
  }, [query.isError]);

  return query;
};

export default useGetMe;
