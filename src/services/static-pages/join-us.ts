"use client";

import { useMutation } from "@tanstack/react-query";

import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { axiosClientV1 } from "@/refactor_lib/services/api/v1";

export interface InputData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  telegram_id: string;
  address: string;
  education: string;
  university: string;
  experience: string;
  company: string;
  resume: File[];
}

export default function useSendDataJoinUs(
  setIsSubmitting: (bool: boolean) => void,
  reset: () => void,
) {
  const { showError } = useErrorToast();
  const { showSuccess } = useSuccessToast();
  const { data, mutateAsync } = useMutation({
    async mutationFn(data: InputData) {
      const formData = new FormData();
      formData.append("file", data.resume[0]);
      formData.append(
        "data",
        JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          telegram_id: data.telegram_id,
          address: data.address,
          education: data.education,
          university: data.university,
          company: data.company,
          experience: data.experience,
        }),
      );
      const sendData = axiosClientV1
        .post<InputData>("/landing/joinUs/", formData)
        .then(res => {
          showSuccess("Your form has been submitted successfully");
        })
        .catch(error => {
          showError(
            error.response.data.detail[0].msg + "- (' + error.message + ')",
          );
        })
        .finally(() => {
          setIsSubmitting(false);
          reset();
        });
    },
  });

  return {
    data,
    mutateAsync,
  };
}
