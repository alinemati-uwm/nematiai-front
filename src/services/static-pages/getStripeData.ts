import { useQuery } from "@tanstack/react-query";

import axiosClient from "@/services/axios-client";

interface ReceiptType {
  date: string;
  plan: {
    title: string;
  };
  price: number;
  status: {
    message: string;
  };
}

function useGetStripeData(uuid: string) {
  const { data, isError, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["uuid"],
    async queryFn() {
      const { data } = await axiosClient.get(`/payment/stripe/success/${uuid}`);
      return data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    retry: 0,
  });
  return { data, isError, isLoading, error, refetch, isRefetching };
}
function useGetStripeReceiptData(uuid: string) {
  const { data } = useQuery({
    queryKey: ["ReceiptData"],
    async queryFn() {
      const data = await axiosClient.get<ReceiptType>(
        `/payment/stripe/${uuid}`,
      );
      return data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    retry: 0,
  });

  return data;
}

export { useGetStripeData, useGetStripeReceiptData };
