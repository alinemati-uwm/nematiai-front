import { type AxiosResponse } from "axios";

import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";

import type UseAppHistoryTypes from "../../types";

/**
 * Custom hook to handle actions related to app history query icons.[delete & pin]
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.refetch - The function to refetch the data.
 *
 * @returns {Object} An object containing functions to handle different actions.
 * @returns {Function} returns.deleted - Function to handle the delete action.
 * @returns {Function} returns.pin - Function to handle the pin action.
 */
const useAppHistoryQueryIcons = ({
  refetch,
}: Pick<UseAppHistoryTypes["model"], "refetch">) => {
  // Handle all actions
  const action = async <T>(
    action: (params: T) => Promise<AxiosResponse<{ message: string }>>,
    params: T,
  ) => {
    await action(params);
    await refetch();
  };

  // Deleted
  const deleted = (params: UseAppHistoryTypes["model"]["delete"]) =>
    action(
      async ({ UUID }: UseAppHistoryTypes["model"]["delete"]) =>
        await historyAPI.deleteAnswerByUUID(params.UUID),
      params,
    );

  // Pin
  const pin = (params: UseAppHistoryTypes["model"]["pin"]) =>
    action(
      async (params: UseAppHistoryTypes["model"]["pin"]) =>
        await historyAPI.addAnswerToPin({ data: params }),
      params,
    );

  return { deleted, pin };
};

export default useAppHistoryQueryIcons;
