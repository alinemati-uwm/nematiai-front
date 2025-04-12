import React, { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { type typeHeaderOfFirstLevel } from "@/components/layout/types";
import usePodcastSingle from "@/components/pages/podcast/id/usePodcastSingle";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import type appHistoryTypes from "../../types";
import HistoryIconContainer from "./Button";
import useAppHistoryQueryIcons from "./modelQuery";

/**
 * Component that renders a set of history icons with associated actions.
 *
 * @param  props - The component props.
 * @param {Array<string>} props.icons - Array of icon keys to be displayed.
 * @param {Object} props.history - The history object associated with the icons.
 * @param {Function} [props.onClick] - Optional callback function to be called when an icon is clicked.
 * @param {Object} props.service - Service object containing delete and pin methods.
 * @param {Function} props.refetch - Function to refetch the history data.
 *
 * @typedef {Object} appHistoryTypes
 * @property {Object} icons
 * @property {Object} appHistoryIconsProps
 * @property {string} keys
 * @property {Object} model
 * @property {Function} refetch
 *
 * @typedef {Object} typeHeaderOfFirstLevel
 * @property {Object} history
 *
 * @returns JSX.Element The rendered component.
 */
const AppHistoryIcons = ({
  icons,
  history,
  onClick,
  service,
  refetch,
}: appHistoryTypes["icons"]["appHistoryIconsProps"] &
  typeHeaderOfFirstLevel["history"] & {
    refetch: appHistoryTypes["model"]["refetch"];
  }) => {
  const [loading, setLoading] = useState<
    appHistoryTypes["icons"]["keys"] | null
  >(null);
  const { deleted, pin } = useAppHistoryQueryIcons({ refetch });
  const router = useRouter();
  const { toaster } = useToaster();
  const {
    components: {
      history_items: { delete_title, delete_description, delete_item },
    },
  } = useGetDictionary();
  const resetConversation = useChatbotStore.use.resetConversation(); // Function to reset the conversation in the Zustand store.
  const { setQueryByRouter } = useQueryParams();
  const chatIdParams = useSearchParams().get("chatId");
  const uuidParams = useSearchParams().get("uuid");
  const { id } = usePodcastSingle();
  const pathname = usePathname();
  const { setHistoryIsOpen } = useHistoryStore();

  const handleClick = async (key: appHistoryTypes["icons"]["keys"]) => {
    setLoading(key);
    try {
      if (key === "delete") {
        await (service?.delete
          ? service.delete(history)
          : deleted({ UUID: history.uuid }));
        if (history.uuid === chatIdParams || history.uuid === uuidParams) {
          resetConversation(); // Reset the conversation.
          setQueryByRouter({}, ["chatid"]);
          setQueryByRouter({}, ["uuid"]);
        } else if (id && id === history.uuid) {
          // Just for ID parent pages
          router.push(pathname.replace(id.toString(), ""));
          setHistoryIsOpen(false);
        }
      } else if (key === "pin")
        await (service?.pin
          ? service.pin(history)
          : pin({ answer_id: history.uuid }));
      await refetch();
    } catch (error: any) {
      const message = error?.response?.data?.detail;

      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    } finally {
      if (onClick) onClick({ type: key, uuid: history.uuid });
      setLoading(null);
    }
  };

  return (
    <>
      {icons.map((el, key) =>
        el === "delete" ? (
          <DeleteAlertDialog
            key={key}
            title={delete_title}
            description={delete_description}
            handleSubmit={fn => {
              handleClick(el);
              fn();
            }}
            Trigger={
              <HistoryIconContainer
                el={el}
                key={key}
                loading={loading}
                history={history}
              />
            }
            labelButton={delete_item}
          />
        ) : (
          <HistoryIconContainer
            el={el}
            key={key}
            history={history}
            handleClick={() => handleClick(el)}
            loading={loading}
          />
        ),
      )}
    </>
  );
};

export default AppHistoryIcons;
