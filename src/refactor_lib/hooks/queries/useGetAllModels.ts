import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import modelAPI from "@/refactor_lib/services/api/v1/ModelAPI";
import { type ModelAPIRequest } from "@/refactor_lib/types/api/v1/ModelAPI";

const useGetAllModels = (props: ModelAPIRequest) => {
  return useQuery({
    queryKey: props.modelName
      ? QUERY_KEYS.modelAPI.get(props.modelName)
      : QUERY_KEYS.modelAPI.getAllModels(),
    queryFn: () => modelAPI.getAllModels(props),
    staleTime: 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllModels;
