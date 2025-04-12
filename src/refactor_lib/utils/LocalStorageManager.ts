import { produce } from "immer";

import {
  ROLLBACK_WORKSPACE_STORAGE_KEY,
  USER_SESSION_STORAGE_KEY,
} from "../constants/localStorageKey";
import { type AuthAPIResponse } from "../types/api/v1/AuthAPI";
import { type UserAPIResponse } from "../types/api/v1/UserAPI";

class LocalStorageManger {
  static setUserSession(
    userSession: AuthAPIResponse["login"] | AuthAPIResponse["register"],
  ) {
    const userSessionStringified = JSON.stringify(userSession);
    localStorage.setItem(USER_SESSION_STORAGE_KEY, userSessionStringified);
  }

  static getUserSession(): AuthAPIResponse["login"] | null {
    const userSessionStringified = localStorage.getItem(
      USER_SESSION_STORAGE_KEY,
    );

    if (!userSessionStringified) return null;

    const userSessionParsed = JSON.parse(userSessionStringified);

    return userSessionParsed;
  }
  static updateAuthTokens(tokens: AuthAPIResponse["refresh"]) {
    const userSession = this.getUserSession();
    if (!userSession) return false;
    const nextUserSession = produce(userSession, draft => {
      draft.access_token = tokens.access_token;
      draft.refresh_token = tokens.refresh_token;
    });
    this.setUserSession(nextUserSession);
    return true;
  }
  static updateUserInfo(userInfo: UserAPIResponse["getMe"]) {
    const userSession = this.getUserSession();
    if (!userSession) return false;
    const nextUserSession = produce(userSession, draft => {
      draft.workspace.user = userInfo;
    });
    this.setUserSession(nextUserSession);
    return true;
  }

  static setRollbackWorkspaceId(workspaceId: number | null) {
    if (!workspaceId) return;
    localStorage.setItem(
      ROLLBACK_WORKSPACE_STORAGE_KEY,
      workspaceId.toString(),
    );
  }

  static getRollbackWorkspaceId() {
    return localStorage.getItem(ROLLBACK_WORKSPACE_STORAGE_KEY);
  }

  static removeRollbackWorkspaceId() {
    localStorage.removeItem(ROLLBACK_WORKSPACE_STORAGE_KEY);
  }

  static updateWorkspace(workspace: AuthAPIResponse["login"]["workspace"]) {
    const userSession = this.getUserSession();
    if (!userSession) return false;
    const nextUserSession = produce(userSession, draft => {
      draft.workspace = workspace;
    });
    this.setUserSession(nextUserSession);
    return true;
  }
}
export default LocalStorageManger;
