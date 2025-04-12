import { useMutation } from "@tanstack/react-query";

import { axiosClientV1 } from "@/refactor_lib/services/api/v1";

interface SubscriptionResponse {
  url: string;
  amount: number;
}

interface SubscriptionBody {
  plan_id: number;
  payment_type: "credit_card" | "cryptocurrency";
}

interface SubscriptionError {
  response: {
    data: { detail: string };
  };
}

export function useSubscribe() {
  return useMutation<
    SubscriptionResponse,
    SubscriptionError,
    SubscriptionBody,
    unknown
  >({
    async mutationFn(props: SubscriptionBody) {
      const { data } = await axiosClientV1.post<SubscriptionResponse>(
        "subscriptions/add/",
        { ...props },
      );

      return data;
    },
  });
}
