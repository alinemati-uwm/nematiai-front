"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { APP_ROUTES } from "@/refactor_lib/constants";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

import useGetMe from "../queries/useGetMe";

const useCheckClientSession = () => {
  const router = useRouter();
  const [isSessionValid, setIsSessionValid] = useState(false);
  const pathname = usePathname();

  const handleAuthSuccess = () => {
    setIsSessionValid(true);
  };

  const handleAuthError = () => {
    router.push(APP_ROUTES.login);
  };

  const { isError } = useGetMe({
    onSuccessCallback: handleAuthSuccess,
    // onErrorCallback: handleAuthError,
  });

  useEffect(() => {
    const userSession = LocalStorageManger.getUserSession();
    if (!userSession) handleAuthError();
  }, []);

  return isSessionValid;
};

export default useCheckClientSession;
