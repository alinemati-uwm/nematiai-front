import { type AxiosRequestConfig } from "axios";

import {
  type WorkspaceAPIRequest,
  type WorkspaceAPIResponse,
} from "@/refactor_lib/types/api/v1/WorkspaceAPI";
import axiosClient from "@/services/axios-client";

import { axiosClientV1 } from ".";

const workspaceAPI = {
  basePath: "/workspaces",
  createWorkspace: (
    data: WorkspaceAPIRequest["createWorkspace"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<WorkspaceAPIResponse["createWorkspace"]>(
      `${workspaceAPI.basePath}/create_workspace/`,
      data,
      requestConfig,
    ),
  getUserWorkspace: (request?: AxiosRequestConfig, v1: boolean = true) => {
    const method = v1 ? axiosClientV1 : axiosClient;
    return method.get<WorkspaceAPIResponse["getUserWorkspace"]>(
      `${workspaceAPI.basePath}/get_user_workspaces/`,
      request,
    );
  },
  updateWorkspaceName: (
    data: WorkspaceAPIRequest["updateWorkspaceName"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.put<WorkspaceAPIResponse["updateWorkspaceName"]>(
      `${workspaceAPI.basePath}/update_workspace/`,
      { name: data.name },
      requestConfig,
    ),
  getUserWorkspaceInformation: () =>
    axiosClientV1.get(`${workspaceAPI.basePath}/get_workspace_detail/`),
  getWorkspaceDocuments: ({
    appType,
    page = 1,
    page_size = 10,
    search,
  }: WorkspaceAPIRequest["getWorkspaceDocuments"]) =>
    axiosClientV1.get<WorkspaceAPIResponse["getWorkspaceDocuments"]>(
      `${workspaceAPI.basePath}/get_workspace_documents/`,
      {
        params: {
          app_type: appType,
          page,
          page_size,
          search: search,
        },
      },
    ),
  deleteWorkspaceHistory: ({
    historyId,
    app_type,
  }: WorkspaceAPIRequest["deleteWorkspaceHistory"]) =>
    axiosClientV1.delete(
      `${workspaceAPI.basePath}/delete_document_workspace?history_type=${app_type}`,
      {
        data: {
          document_workspace_id: historyId,
        },
      },
    ),
  getWorkspaceMembers: () =>
    axiosClientV1.get<WorkspaceAPIResponse["getWorkspaceMembers"]>(
      `${workspaceAPI.basePath}/get_workspace_members/`,
    ),
  deleteWorkspaceMember: (memberId: number) =>
    axiosClientV1.delete(
      `${workspaceAPI.basePath}/delete_workspace_members/${memberId}/`,
    ),
  deleteWorkspace: () =>
    axiosClientV1.delete<WorkspaceAPIResponse["deleteWorkspace"]>(
      `${workspaceAPI.basePath}/delete_workspace/`,
    ),
  deleteWorkspaceById: (id: string) =>
    axiosClientV1.delete<WorkspaceAPIResponse["deleteWorkspace"]>(
      `${workspaceAPI.basePath}/delete_workspace_by_id/${id}/`,
    ),
  leaveWorkspaceById: (id: string) =>
    axiosClientV1.delete<WorkspaceAPIResponse["deleteWorkspace"]>(
      `${workspaceAPI.basePath}/leave_workspace/${id}/`,
    ),
  transferOwnership: (
    data: WorkspaceAPIRequest["transferOwnership"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post(
      `${workspaceAPI.basePath}/transfer_ownership/`,
      data,
      requestConfig,
    ),
  inviteToWorkspace: (
    data: WorkspaceAPIRequest["inviteToWorkspace"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post(
      `${workspaceAPI.basePath}/invite_to_workspace/`,
      data,
      requestConfig,
    ),
  confirmInviteToWorkspaceWithRegister: (
    data: WorkspaceAPIRequest["confirmInviteToWorkspaceWithRegister"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<
      WorkspaceAPIResponse["confirmInviteToWorkspaceWithRegister"]
    >(
      `${workspaceAPI.basePath}/confirm_invite_to_workspace_with_register/`,
      data,
      requestConfig,
    ),
  confirmInviteToWorkspaceWithoutRegister: (
    data: WorkspaceAPIRequest["confirmInviteToWorkspaceWithoutRegister"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<
      WorkspaceAPIResponse["confirmInviteToWorkspaceWithoutRegister"]
    >(
      `${workspaceAPI.basePath}/confirm_invite_to_workspace_without_register/`,
      data,
      requestConfig,
    ),
  getWorkspaceApps: (params: WorkspaceAPIRequest["getWorkspaceApps"]) =>
    axiosClientV1.get<WorkspaceAPIResponse["getWorkspaceApps"]>(
      `${workspaceAPI.basePath}/get_workspace_apps/`,
      {
        params,
      },
    ),
  getUserApps: () =>
    axiosClientV1.get<WorkspaceAPIResponse["getUserApps"]>(
      `${workspaceAPI.basePath}/get_user_apps/`,
    ),
  addAppToWorkspace: (
    workspaceId: number,
    data: WorkspaceAPIRequest["addAppToWorkspace"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<WorkspaceAPIResponse["addAppToWorkspace"]>(
      `${workspaceAPI.basePath}/add_app_to_workspace/${workspaceId}/`,
      data,
      requestConfig,
    ),
  deleteAppFromWorkspace: (workspaceId: number, appId: number) =>
    axiosClientV1.delete(
      `${workspaceAPI.basePath}/delete_app_from_workspace/${workspaceId}/${appId}/`,
    ),
  changeWorkspaceToDefault: (workspaceId: number) =>
    axiosClientV1.put(`${workspaceAPI.basePath}/change_default/`, {
      workspace_id: workspaceId,
    }),
  changeMemberRole: (
    data: WorkspaceAPIRequest["changeMemberRole"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.put<WorkspaceAPIResponse["changeMemberRole"]>(
      `${workspaceAPI.basePath}/change_member_role/`,
      data,
      requestConfig,
    ),
  moveAppToAnotherWorkspace: (
    workspaceId: number,
    data: WorkspaceAPIRequest["moveAppToAnotherWorkspace"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.put(`${workspaceAPI.basePath}/move_app/`, data, {
      ...requestConfig,
      params: { workspace_id: workspaceId },
    }),
  moveDocumentToAnotherWorkspace: (
    workspaceId: number,
    data: WorkspaceAPIRequest["moveDocumentToAnotherWorkspace"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.put(`${workspaceAPI.basePath}/move_document/`, data, {
      ...requestConfig,
      params: { workspace_id: workspaceId },
    }),
  createPersonalDocument: ({ name, value }: { name: string; value: string }) =>
    axiosClientV1.post<WorkspaceAPIResponse["addPersonalDoc"]>(
      `${workspaceAPI.basePath}/create_personal_document/`,
      {
        history_text: value,
        document_text: name,
      },
    ),
  changePersonalDocument: (name: string, appName: AppsType, uuid: string) =>
    axiosClientV1.patch<WorkspaceAPIResponse["changePersonalDocument"]>(
      `${workspaceAPI.basePath}/update_document_name/`,
      {
        document_name: name,
        document_uuid: uuid,
      },
      {
        params: {
          history_type: appName,
        },
      },
    ),
};

export default workspaceAPI;
