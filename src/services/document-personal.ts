import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import DocumentPersonalAPI from "@/refactor_lib/services/api/v1/DocumentPersonalAPI";

function useGetListPersoanl() {
  const query = useQuery({
    queryKey: QUERY_KEYS.DocumentPersonalAPI.GetDocumentList(),
    queryFn: () =>
      DocumentPersonalAPI.getAllDocPErsonal({ appName: "personal" }),
    select: res => res.data,
  });
  // ******** Return
  return {
    data: query.data,
    query,
  };
}

export default useGetListPersoanl;
