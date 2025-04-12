/**
 * @const `QUERY_KEYS` - Store react-query keys
 */
export const QUERY_KEYS = {
  modelAPI: {
    all: ["model"] as const,
    get: (modelName: string) => [modelName + "_models"],
    getAllModels: () => [...QUERY_KEYS.modelAPI.all, "getAllModels"],
  },
  userAPI: {
    all: ["user"] as const,
    getMe: () => [...QUERY_KEYS.userAPI.all, "me"],
  },
  workspaceAPI: {
    all: ["workspace", "history"] as const,
    getUserWorkspaces: () => [...QUERY_KEYS.workspaceAPI.all, "me"],
    getCurrentWorkspaceDocuments: (
      workspaceId: number,
      appType: string | null,
      page_size: number,
      search?: string,
    ) => [
      ...QUERY_KEYS.workspaceAPI.all,
      "current",
      "documents",
      `workspaceId:${workspaceId}`,
      appType && `appType:${appType}`,
      `page_size:${page_size}`,
      `search:${search ? search : ""}`,
    ],
    getCurrentWorkspaceApps: (
      workspaceId: number,
      page_size: number,
      search: string,
    ) => [
      ...QUERY_KEYS.workspaceAPI.all,
      "current",
      "apps",
      `workspaceId:${workspaceId}`,
      `page_size:${page_size}`,
      `search:${search ? search : ""}`,
    ],
    getWorkspaceMembers: (workspaceId: number) => [
      ...QUERY_KEYS.workspaceAPI.all,
      "members",
      `workspaceId:${workspaceId}`,
    ],
    getCurrentWorkspaceMembers: (workspaceId: number) => [
      ...QUERY_KEYS.workspaceAPI.all,
      "current",
      "members",
      `workspaceId:${workspaceId}`,
    ],
    getWorkspaceStatus: (workspaceId: number) => [
      ...QUERY_KEYS.workspaceAPI.all,
      "status",
      `workspaceId:${workspaceId}`,
    ],
    getCurrentWorkspaceStatus: (workspaceId: number) => [
      ...QUERY_KEYS.workspaceAPI.all,
      "current",
      "status",
      `workspaceId:${workspaceId}`,
    ],
    getPersonalDoc: (workspaceId: number) =>
      [...QUERY_KEYS.workspaceAPI.all, "personalDoc"] as const,
    workspaceAppMobile: ["workspace_mobile"] as const,
  },
  DocumentPersonalAPI: {
    all: ["DocumentPersonal"] as const,
    GetDocumentList: () => [...QUERY_KEYS.DocumentPersonalAPI.all, "getlist"],
  },
  historyAPI: {
    all: ["history"] as const,
    getAllPinnedHistories: () => [...QUERY_KEYS.historyAPI.all, "pinned"],
    useGetAllFavoriteHistories: () => [
      ...QUERY_KEYS.historyAPI.all,
      "favorite",
    ],
    getHistories: (appName: AppsType) => [
      ...QUERY_KEYS.historyAPI.all,
      `app_type:${appName}`,
    ],
    getDetailsHistory: (appName: AppsType, uuid: string, version: string) => [
      ...QUERY_KEYS.historyAPI.all,
      "detailsHistory",
      { appName },
      { uuid },
      { version },
    ],
  },
  subscriptionAPI: {
    all: ["subscription"] as const,
    getReferralCode: ["getReferralCode"],
    getAllPlane: (monthly: boolean) => [
      ...QUERY_KEYS.subscriptionAPI.all,
      `monthly:${monthly}`,
    ],
  },
  chatBotAPI: {
    all: ["chatbot", "history"] as const,
    useConversationsofUser: (conversation_uuid: string) => [
      "historyChatBot",
      ...QUERY_KEYS.chatBotAPI.all,
    ],
    useLikeOrDislike: () => [...QUERY_KEYS.chatBotAPI.all],
  },
  aiImage: {
    text_to_image: ["text_to_image"] as const,
    image_to_image: ["image_to_image"] as const,
    image_upscale: ["image_upscale"] as const,
  },
  changeLog: {
    about: ["about"],
  },
};
