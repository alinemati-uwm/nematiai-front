import { type AxiosRequestConfig } from "axios";

import {
  type SubscriptionAPIRequest,
  type SubscriptionAPIResponse,
} from "@/refactor_lib/types/api/v1/SubscriptionAPI";

import { axiosClientV1 } from ".";

const subscriptionAPI = {
  basePath: "/subscriptions",
  getAllPlans: (monthly: boolean) =>
    axiosClientV1.get<SubscriptionAPIResponse["getAllPlans"]>(
      `${subscriptionAPI.basePath}/?monthly=${monthly}`,
    ),
  createPayment: (
    data: SubscriptionAPIRequest["createPayment"],
    requestConfig: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<SubscriptionAPIResponse["createPayment"]>(
      `${subscriptionAPI.basePath}/add/`,
      data,
      requestConfig,
    ),
  getUserSubscription: () =>
    axiosClientV1.get<SubscriptionAPIResponse["getUserSubscription"]>(
      `${subscriptionAPI.basePath}/user/`,
    ),
  applyReferralCode: (params: SubscriptionAPIRequest["applyReferralCode"]) =>
    axiosClientV1.post(
      `${subscriptionAPI.basePath}/applyReferralCode/`,
      params,
    ),
  getReferralCode: () =>
    axiosClientV1.post<SubscriptionAPIResponse["getReferralCode"]>(
      `${subscriptionAPI.basePath}/referral_code/`,
    ),
};

export default subscriptionAPI;
