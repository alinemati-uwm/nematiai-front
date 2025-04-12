import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { authAPI } from "@/refactor_lib/services/api/v1";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

export type workspaceInviteParams = { token: string; email: string };

interface accept {
  isInviteWorkspace: workspaceInviteParams;
  password?: string;
  token?: string | null;
}

/**
 * Custom hook to handle workspace invitations.
 *
 * This hook provides a function to accept workspace invitations, including handling login and API calls.
 *
 * @returns Object - An object containing the accept function.
 */
function useInviteWorkspace() {
  const { toaster } = useToaster();

  /**
   * Accepts a workspace invitation.
   *
   * This function handles the process of accepting a workspace invitation, including optional login and API calls.
   *
   * @param {Object} params - The parameters for the function.
   * @param {workspaceInviteParams} params.isInviteWorkspace - The workspace invitation parameters.
   * @param {string} [params.password] - The password for login, if required.
   * @param {string | null} [params.token=null] - The token for authorization, if available.
   *
   * @example
   * // Accept a workspace invitation with a password
   * accept({
   *   isInviteWorkspace: { token: "inviteToken", email: "user@example.com" },
   *   password: "userPassword"
   * });
   *
   * @example
   * // Accept a workspace invitation with an existing token
   * accept({
   *   isInviteWorkspace: { token: "inviteToken", email: "user@example.com" },
   *   token: "existingToken"
   * });
   */
  const accept = async ({
    isInviteWorkspace,
    password,
    token = null,
  }: accept) => {
    try {
      let access_token = token;
      if (!isInviteWorkspace.email || !isInviteWorkspace.token)
        throw Error("Accept workspace fail");
      if (password) {
        const login = await authAPI.login({
          email: isInviteWorkspace.email,
          password,
        });
        access_token = login.data.access_token;
      }
      await workspaceAPI.confirmInviteToWorkspaceWithoutRegister(
        isInviteWorkspace,
        { headers: { Authorization: `Bearer ${access_token}` } },
      );
      toaster({ toastProps: { type: "success", message: "Invite completed" } });
    } catch (error) {
      toaster({
        toastProps: { type: "error", message: (error as Error).message },
      });
    }
  };

  return { accept };
}

export default useInviteWorkspace;
