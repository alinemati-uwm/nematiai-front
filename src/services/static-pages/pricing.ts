import { useQuery } from "@tanstack/react-query";

import axiosClient from "../axios-client";

interface ResponseData {
  plans: Plans[];
}

interface Plans {
  id: number;
  title: string;
  description: string;
  price: number;
  is_monthly: true;
  highlight: true;
  credit: number;
  features: Features[];
  active: false;
}
interface Features {
  description: string;
  title: string;
}

export default function useGetPricingData() {
  const { data } = useQuery({
    queryKey: ["pricing"],
    async queryFn() {
      const { data } = await axiosClient.get<ResponseData>(
        "/subscriptions/pricing/",
      );

      return data;
    },
  });

  return data;
}
