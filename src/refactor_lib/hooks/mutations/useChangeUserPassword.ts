import { useMutation } from "@tanstack/react-query";

import userAPI from "@/refactor_lib/services/api/v1/UserAPI";

const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: userAPI.changePassword,
  });
};

export default useChangeUserPassword;
