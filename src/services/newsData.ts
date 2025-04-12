"use client";

import { useQuery } from "@tanstack/react-query";

import newsApi from "@/refactor_lib/services/api/v1/NewsApi";

function useGetTopic(All: string) {
  const News = useQuery({
    queryKey: ["newsTopic"],
    queryFn: () => newsApi.getAllTopic(All),
  });
  return { News };
}

export { useGetTopic };
