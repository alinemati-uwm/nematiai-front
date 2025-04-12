import { useState } from "react";

import useImageEditorPage from "@/components/pages/imageditor/useImageEditorPage";
import useAppHistory from "@/components/shared/HistoryRefactor/useAppHistory";
import { useGetDictionary } from "@/hooks";
import useCurrentWorkspaceIdValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceIdValue";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import axiosClient from "@/services/axios-client";
import { type ModelItem } from "@/services/types";

import useRouteAiImage from "../../hooks/useRouteAiImage";
import aiImageModel from "../../model";
import { type aiImagePageTypes, type imageTypes } from "../../types";
import imageTabsModel from "./model/model";

type submit = {
  defaultValues: aiImagePageTypes["states"]["image_to_image"];
  onSubmit(urls: string[], data: any): void;
  getModel: ModelItem;
  quantity?: number;
  tab: imageTypes;
  document_name: string;
};

// Custom hook for handling form submission within an image editor page
function useSubmitTabs() {
  // Destructuring necessary data from various hooks
  const { auth, query } = useImageEditorPage();
  const [loading, setLoading] = useState(false);
  const { feature } = useRouteAiImage();
  const refetchHistory = useAppHistory({ type: auth ? undefined : feature })
    .query.refetch; // History refetch for non-authenticated users
  const workspace_id = useCurrentWorkspaceIdValue(); // Workspace ID
  const { toaster } = useToaster(); // Toaster for error messages
  const {
    page: { image: imageDictionary },
  } = useGetDictionary(); // Fetching error messages and prompts from dictionary

  // The submit function to handle the form submission logic
  const submit = async ({
    defaultValues,
    getModel,
    quantity,
    onSubmit,
    tab,
    document_name,
  }: submit) => {
    try {
      setLoading(true); // Set loading to true when submission starts

      // Determine workspace ID based on the query or default workspace
      const workspaceID =
        auth && query.data && query.data[0]?.workspace?.id
          ? query.data[0]?.workspace?.id
          : workspace_id;

      // Error handling if workspace ID or model is missing
      if (!workspaceID) throw Error(imageDictionary.somthing_wrong);
      if (!getModel) throw Error(imageDictionary.cant_find_this_model);

      const url = getModel.url.url; // URL for submitting the form
      const form: any = await imageTabsModel.formData[tab]({
        getModel,
        values: defaultValues,
        quantity,
        workspace_id: workspaceID,
        document_name,
      }); // Generate form data based on the tab selected

      // Validate the generated form data
      await imageTabsModel.validate({ imageDictionary, form });

      // Handle authorization for mobile apps
      const mobile_app_auth = auth
        ? { headers: { Authorization: `Bearer ${auth}` } }
        : undefined;

      // Submit form data via POST or POSTForm (based on presence of form image)
      const data = await (form?.image
        ? axiosClient.postForm(url, form, mobile_app_auth)
        : axiosClient.post(url, form, mobile_app_auth));

      // Preload images after form submission and pass them to onSubmit callback
      const imageUrls = await aiImageModel.preloadImages(data.data);

      onSubmit(imageUrls, form); // Invoke the onSubmit callback

      // Refetch history if the user is not authenticated
      if (!auth) refetchHistory();

      setLoading(false); // Set loading to false after completion
    } catch (error: any) {
      setLoading(false); // Ensure loading is false in case of error

      // Error message handling and display using toaster
      const message = error?.response?.data?.detail ?? error;

      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    }
  };

  // Return submit function and loading state
  return { submit, loading };
}

export default useSubmitTabs;
