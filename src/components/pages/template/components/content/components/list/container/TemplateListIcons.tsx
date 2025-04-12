import React, { useState, type ReactNode } from "react";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import templateAPI from "@/refactor_lib/services/api/v1/TemplateAPI";
import {
  type TemplateAPIRequest,
  type TemplateAPIResponse,
} from "@/refactor_lib/types/api/v1/TemplateAPI";

import TemplateInfo from "./TemplateInfo";

type iconTypes = "favorite" | "info" | "delete" | "edit";

export type templateListIconsProps = {
  icon: Array<iconTypes>;
  template: TemplateAPIResponse["allTemplates"];
  fetch?(): Promise<void>;
};

function TemplateListIcons({ icon, template, fetch }: templateListIconsProps) {
  // State hooks for tracking loading state and favorite status
  const [Loading, setLoading] = useState<iconTypes | null>(null);
  const [Favorite, setFavorite] = useState(template.is_favorite);
  const { toaster } = useToaster(); // Custom hook to show toast notifications
  const { lang } = useParams(); // Retrieves the current language from URL params

  // Mutation hook for marking/unmarking a template as a favorite
  const favorite = useMutation({
    mutationFn: (params: TemplateAPIRequest["favorite"]) =>
      templateAPI.favorite(params),
  });

  // Helper function to handle submission of mutations and display notifications
  const submit = async (key: iconTypes, mutate: Promise<any>) => {
    try {
      setLoading(key); // Set loading state based on action (favorite, delete, etc.)
      const data = await mutate; // Await the mutation result
      toaster({
        toastProps: { type: "success", message: data.data.message }, // Show success toast
      });
      setLoading(null); // Reset loading state
    } catch (error) {
      setLoading(null); // Reset loading state
      toaster({
        toastProps: { type: "error", message: "Error" }, // Show error toast
      });
    }
  };

  // Conditional rendering of the favorite icon based on the current favorite state
  const FavoriteIcon = Favorite
    ? "line-md:star-alt-filled" // Filled star if favorite
    : "line-md:star-alt"; // Outline star if not favorite

  // Map of icon actions with corresponding components
  const getIcon: Record<iconTypes, ReactNode> = {
    delete: <AppIcon icon="ri:delete-bin-line" color="#ED2E7E" width={18} />,
    edit: (
      <Link
        href={`/${lang}/template/custom-template/create?template_id=${template.id}&template_type=${template.template_type}`}
      >
        <AppIcon icon="tabler:edit" color="#B9BAC0" width={18} />
      </Link>
    ),
    favorite: (
      <AppIcon
        icon={FavoriteIcon} // Conditional icon
        onClick={async () => {
          // Toggle the favorite status when clicked
          await submit(
            "favorite",
            favorite.mutateAsync({
              is_favorite: !template.is_favorite,
              template_type: template.template_type,
              template_id: template.id,
            }),
          );
          setFavorite(!Favorite); // Update local state for the favorite status
        }}
        color="#FFAB00" // Yellow color for favorite
        width={18}
      />
    ),
    info: <TemplateInfo template={template} />, // Info icon triggers TemplateInfo component
  };

  return (
    <div className="flex flex-row items-center gap-x-2">
      {/* Render the icons dynamically based on the 'icon' prop */}
      {icon.map((el, key) => (
        <div key={key} className="cursor-pointer relative">
          {/* Show loading spinner if the current action is in progress */}
          {Loading === el ? (
            <div className="absolute w-full h-full bg-white bg-opacity-85 flex justify-center items-center">
              <div className="w-3 h-3 border-2 border-t-2 border-t-white border-gray-400 border-solid rounded-full animate-spin" />
            </div>
          ) : null}
          {/* Render the corresponding icon for the current action */}
          {getIcon[el]}
        </div>
      ))}
    </div>
  );
}

export default TemplateListIcons;
