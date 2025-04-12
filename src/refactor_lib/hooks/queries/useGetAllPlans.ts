import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import subscriptionAPI from "@/refactor_lib/services/api/v1/SubscriptionAPI";

const useGetAllPlans = (monthly: boolean) => {
  return useQuery({
    queryKey: QUERY_KEYS.subscriptionAPI.getAllPlane(monthly),
    queryFn: () => subscriptionAPI.getAllPlans(monthly),
    select: data => {
      return data;
    },
  });
};

export default useGetAllPlans;
