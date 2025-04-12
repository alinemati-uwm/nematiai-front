import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import useCurrentWorkspaceIdValue from "../atoms/useCurrentWorkspaceIdValue";

const useAddPersonalDoc = () => {
  const currentWorkspaceId = useCurrentWorkspaceIdValue();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, value }: { name: string; value: string }) =>
      workspaceAPI.createPersonalDocument({ name, value }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          const key = [
            ...QUERY_KEYS.DocumentPersonalAPI.GetDocumentList(),
            "documents",
          ];

          const refetchFlag = query.queryKey.some(item =>
            key.includes(item as string),
          );

          return refetchFlag;
        },
        refetchActive: true,
      });
    },
  });
};

export default useAddPersonalDoc;
