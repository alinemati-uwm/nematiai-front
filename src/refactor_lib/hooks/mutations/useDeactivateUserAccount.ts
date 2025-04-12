import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import userAPI from "@/refactor_lib/services/api/v1/UserAPI";

const useDeactivateUserAccount = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: userAPI.deactivateAccount,
  });
};

export default useDeactivateUserAccount;
