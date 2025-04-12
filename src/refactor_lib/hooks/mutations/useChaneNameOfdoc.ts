import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

const useChaneNameOfdoc = (uuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      appName,
      uuid,
    }: {
      name: string;
      appName: AppsType;
      uuid: string;
    }) => await workspaceAPI.changePersonalDocument(name, appName, uuid),
    onSuccess: (_, { appName }) => {
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.historyAPI.all,
      });
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.chatBotAPI.useConversationsofUser(uuid),
      });
      if (appName === "personal") {
        queryClient.refetchQueries({
          queryKey: QUERY_KEYS.DocumentPersonalAPI.GetDocumentList(),
        });
      }
    },
  });
};

export default useChaneNameOfdoc;
