import React, { useState, type ReactNode } from "react";

import ExplorerComment from "@/components/pages/explore/components/tools/comment/ExplorerComment";
import {
  useMutateLikeOrDislike,
  useSaveOrUnSaveNews,
} from "@/components/pages/explore/news-actions";

import ExplorerReport from "../../id/Report";
import { type ExploreNewsData } from "../../index/newsTypes";
import ExploreToolsCard from "./Card";
import ExploreToolsShare from "./Share";
import ExploreToolsVolume from "./Volume";

type tools =
  | "volume"
  | "like"
  | "dislike"
  | "comment"
  | "share"
  | "report"
  | "save";
type props = {
  tools: tools[];
  params: { id: string };
  newsDataById?: ExploreNewsData["getNewsDataById"];
};

type items = Record<
  tools,
  {
    icon: string;
    onClick(str?: string): void;
    popover?: ReactNode;
  }
>;

/**
 * ExploreTools component renders a set of tools with various functionalities such as volume control, commenting, liking, disliking, sharing, reporting, and saving.
 *
 * @param {Object} props - The properties object.
 * @param {Array<string>} props.tools - An array of tool identifiers to be displayed.
 *
 * @returns JSX.Element The rendered ExploreTools component.
 *
 * @component
 *
 * @example
 * const tools = ['volume', 'comment', 'like', 'dislike', 'share', 'report', 'save'];
 * return <ExploreTools tools={tools} />;
 */
function ExploreTools({ tools, params, newsDataById }: props) {
  // State to manage the visibility of modals (comment and report)
  const [modals, setModals] = useState({
    comment: false,
    report: false,
  });
  const { mutate: mutateLikeOrDislike } = useMutateLikeOrDislike();
  const { mutate: mutateSaveOrUnSaveNews } = useSaveOrUnSaveNews();

  // Define the available tools and their behavior
  const items: items = {
    volume: {
      icon: "material-symbols:volume-up-outline", // Icon for volume tool
      onClick: () => {}, // Action for volume tool (currently empty)
      popover: <ExploreToolsVolume text={newsDataById?.full_description} />, // Popover component for volume tool
    },
    comment: {
      icon: "majesticons:comment-text-line", // Icon for comment tool
      onClick: () => setModals(prev => ({ ...prev, comment: !prev.comment })), // Toggles comment modal visibility
    },
    like: {
      icon: newsDataById?.user_liked ? "mdi:like" : "mdi:like-outline", // Icon for like tool
      onClick: () => {
        mutateLikeOrDislike({
          value: !newsDataById?.user_liked,
          action: "like",
          news_id: params.id,
        });
        if (newsDataById?.user_disliked && !newsDataById?.user_liked) {
          mutateLikeOrDislike({
            value: false,
            action: "dislike",
            news_id: params.id,
          });
        }
      },
    },
    dislike: {
      icon: newsDataById?.user_disliked ? "mdi:dislike" : "mdi:dislike-outline", // Icon for dislike tool
      onClick: () => {
        mutateLikeOrDislike({
          value: !newsDataById?.user_disliked,
          action: "dislike",
          news_id: params.id,
        });
        if (newsDataById?.user_liked && !newsDataById?.user_disliked) {
          mutateLikeOrDislike({
            value: false,
            action: "like",
            news_id: params.id,
          });
        }
      },
    },
    share: {
      icon: "ic:outline-share", // Icon for share tool
      onClick: () => {}, // Action for share tool (currently empty)
      popover: <ExploreToolsShare url={location.href} />, // Popover component for share tool
    },
    report: {
      icon: "material-symbols:flag-outline-rounded", // Icon for report tool
      onClick: () => setModals(prev => ({ ...prev, report: !prev.report })), // Toggles report modal visibility
    },
    save: {
      icon: newsDataById?.is_saved
        ? "material-symbols:bookmark"
        : "material-symbols:bookmark-outline", // Icon for save tool
      onClick: () => {
        mutateSaveOrUnSaveNews({
          value: !newsDataById?.is_saved,
          news_id: params.id,
        });
      },
    },
  };

  return (
    <>
      {/* Tools container: flex layout that adapts based on screen size */}
      <div className="flex flex-row  justify-center items-center w-full gap-2 lg:gap-4 xl:gap-4 xl:w-auto xl:fixed top-1/2 xl:flex-col xl:-translate-y-1/2 xl:left-[270px]">
        {/* Mapping through the tools array passed as props */}
        {tools.map((el, key) => {
          const element = items[el]; // Retrieve the tool object based on the tool name
          return (
            // Render each tool card with corresponding icon, action, and popover
            <ExploreToolsCard
              key={key}
              onClick={() => element.onClick(el)} // Function to handle click action
              icon={element.icon} // Icon for the tool
              popover={element.popover} // Popover content for the tool
            />
          );
        })}
      </div>

      {/* Comment modal */}
      <ExplorerComment
        params={params}
        open={modals.comment} // Modal visibility controlled by the comment state
        onClose={() => setModals(prev => ({ ...prev, comment: false }))} // Close the modal when triggered
      />

      {/* Report modal (conditionally rendered if modals.report is true) */}
      {modals.report ? (
        <ExplorerReport
          params={params}
          onClose={() =>
            setModals(prev => ({
              ...prev,
              report: false,
            }))
          } // Close the report modal when triggered
        />
      ) : null}
    </>
  );
}

export default ExploreTools;
