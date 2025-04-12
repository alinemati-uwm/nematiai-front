import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import userAPI from "@/refactor_lib/services/api/v1/UserAPI";

const useChangeUserProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userAPI.changeProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.userAPI.all,
      });
    },
  });
};

export default useChangeUserProfilePicture;
