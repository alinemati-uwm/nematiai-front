"use client";

import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import { APP_ROUTES } from "@/refactor_lib/constants";
import { authAPI } from "@/refactor_lib/services/api/v1";
import modelAPI from "@/refactor_lib/services/api/v1/ModelAPI";
import userAPI from "@/refactor_lib/services/api/v1/UserAPI";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

interface IProps {
  email: string;
  token: string;
}

/**
 * `SignupConfirm` is a React component that handles the signup confirmation process.
 * It uses the `useEffect` hook from React to perform the signup confirmation when the component is mounted.
 * It uses the `useRouter` hook from `next/navigation` to navigate between pages.
 * It uses the `signIn` function from `next-auth/react` to confirm the signup.
 * It uses a custom hook `useErrorToast` to display error messages.
 * It uses `useGetDictionary` to get the localized strings for the page.
 *
 * @param {Object} props - The props object.
 * @param {string} props.email - The email of the user.
 * @param {string} props.token - The token for signup confirmation.
 *
 * @returns {JSX.Element} The rendered signup confirmation page.
 */
function SignupConfirm({ email, token }: IProps) {
  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();

  // Use `useRouter` from `next/navigation` to navigate between pages.
  const router = useRouter();
  const { lang } = useParams();

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    page: { signup: signupDictionary },
  } = useGetDictionary();

  // Use `useEffect` to perform the signup confirmation when the component is mounted.
  useEffect(() => {
    /**
     * `confirmSignup` is an async function that handles the signup confirmation process.
     * It sends a request to the signup confirmation API with the email and token,
     * and navigates to the home page if the request is successful.
     */
    console.log({ email, token });
    const confirmSignup = async () => {
      authAPI
        .registerConfirm({
          email,
          token,
        })
        .then(res => {
          // console.log('the response is',res);
          LocalStorageManger.updateAuthTokens(res.data);
          userAPI.getMe();
          modelAPI.getAllModels({ modelName: null });
          workspaceAPI.getUserWorkspace();
          router.push(`/${lang}/${APP_ROUTES.chatApp}`);
        })
        .catch(e => {
          showFetchError(e);
        });

      // try {
      //   // Send a request to the signup confirmation API with the email and token.
      //   await signIn("signup-confirm-credentials", {
      //     redirect: false,
      //     email,
      //     token,
      //     callbackUrl: "/",
      //   });

      //   // If the request is successful, navigate to the home page.
      //   router.push("/");
      // } catch (e) {
      //   // If the request fails, show an error message.
      // }
    };
    confirmSignup();
  }, [email, token]);

  // Render the signup confirmation page.
  return (
    <div className="col h-screen items-center justify-center gap-5">
      <div className="col z-10 h-fit w-full max-w-[480px] items-center gap-4 rounded-lg bg-white p-5 shadow-2xl sm:px-16 sm:py-10">
        {/*<Loading svgClass="h-20 w-20" />*/}
        <AppIcon
          icon="flat-color-icons:feedback"
          width={60}
          className="animate-bounce"
        />
        <h1 className="text-xl font-semibold">
          {signupDictionary.email_verification_title}
        </h1>
        <p className="text-center font-normal text-label-light">
          {signupDictionary.email_verification_message}
        </p>
      </div>
    </div>
  );
}

export default SignupConfirm;
