import { useMutation, useQuery } from "@tanstack/react-query";

import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import axiosClient from "@/services/axios-client";

interface inputData {
  name: string;
  email: string;
  message: string;
}
export interface PersonData {
  id: string;
  name: string;
  family: string;
  avatar: string;
  role: {
    title: string;
  };
  about: string;
  review: string;
  services: string;
  favorites: string;
}
export function useSendDataContactUs(reset: () => void) {
  const { showError } = useErrorToast();
  const { showSuccess } = useSuccessToast();
  const { mutateAsync, data, isPending, isSuccess } = useMutation({
    async mutationFn(data: inputData) {
      const response = await axiosClient
        .post<inputData>("/landing/create_contact/", {
          name: data.name,
          email: data.email,
          message: data.message,
        })
        .then(() => {
          showSuccess("Your message has been sent successfully");
        })
        .catch(err => {
          showError("Somthing went wrong");
        })
        .finally(() => {
          reset();
        });
    },
  });

  return {
    mutateAsync,
    data,
    isPending,
    isSuccess,
  };
}
export function useGetTeams() {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["person"],
    async queryFn() {
      const { data } = await axiosClient.get<any>("/landing/teams/");
      return data;
    },
  });

  return { data, isLoading, refetch, isSuccess };
}
export function useGetEmploye(id: string) {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["employe"],
    async queryFn() {
      const { data } = await axiosClient.get<PersonData>(
        `/landing/teams/${id}`,
      );
      return data;
    },
  });

  return { data, isLoading, refetch, isSuccess };
}
