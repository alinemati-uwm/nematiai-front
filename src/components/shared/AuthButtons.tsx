"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import useInviteWorkspace, {
  type workspaceInviteParams,
} from "@/hooks/useInviteWorkspace";
import { APP_ROUTES } from "@/refactor_lib/constants";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { authAPI } from "@/refactor_lib/services/api/v1";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

import AppIcon from "./AppIcon";

interface Prop {
  className?: string;
  setRedirecting: (bool: boolean) => void;
  setIsPending: (bool: boolean) => void;
  isInviteWorkspace: workspaceInviteParams;
  continue_with_google: string;
}

/**
 * Component for Google Sign-In button.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} [props.className] - Additional class names for the button.
 * @param {function} props.setRedirecting - Function to set the redirecting state.
 * @param {workspaceInviteParams} props.isInviteWorkspace - Parameters for workspace invitation.
 * @param {function} props.setIsPending - Function to set the pending state.
 * @param {string} props.continue_with_google - Text to display on the button.
 */
export function GoogleSignInButton({
  className,
  setRedirecting,
  isInviteWorkspace,
  setIsPending,
  continue_with_google,
}: Prop) {
  const { toaster } = useToaster();
  const router = useRouter();
  const { accept } = useInviteWorkspace();
  const { lang } = useParams();

  // Google login hook
  const googleLogin = useGoogleLogin({
    /**
     * Handle successful Google login.
     *
     * @param {Object} tokenResponse - The response from Google login.
     * @param {string} tokenResponse.access_token - The access token from Google.
     */
    onSuccess: async tokenResponse => {
      setIsPending(true);

      if (!tokenResponse || !tokenResponse.access_token) {
        throw new Error("Access token is missing");
      }

      authAPI
        .oauthGoogle({
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(serverResponse => {
          toaster({
            toastProps: { type: "success", message: "Logged in successfully" },
          });
          LocalStorageManger.setUserSession(serverResponse.data);
          if (isInviteWorkspace.email && isInviteWorkspace.token)
            accept({ isInviteWorkspace, token: tokenResponse.access_token });
          router.push(`/${lang}/${APP_ROUTES.chatApp}`);
          setIsPending(false);
          setRedirecting(true);
        });
    },
    onError: errorResponse => {
      setIsPending(false);
      setRedirecting(false);
      toaster({ toastProps: { type: "error", message: errorResponse.error } });
    },
  });

  return (
    <Button
      onClick={() => googleLogin()}
      variant="outline"
      type="button"
      className="w-full flex flex-row justify-center gap-x-1 items-center"
    >
      <AppIcon icon="logos:google-icon" width={16} />
      {continue_with_google}
    </Button>
  );
}
