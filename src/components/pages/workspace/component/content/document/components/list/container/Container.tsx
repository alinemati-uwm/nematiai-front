import React from "react";

import Image from "next/image";
import Link from "next/link";

import AppTypo from "@/components/ui/AppTypo";
import { timePassedSince } from "@/lib/date-transform";
import { type WorkspaceAPIResponse } from "@/refactor_lib/types/api/v1/WorkspaceAPI";

import type workspaceDocumentsTypes from "../../../type";
import WorkspaceDocumentDelete from "./Delete";
import WorkspaceDocuemntMoved from "./moved/Moved";

interface props {
  item: WorkspaceAPIResponse["getWorkspaceDocuments"][0];
  tabModel: workspaceDocumentsTypes["tabs"] | undefined;
  refetch(): Promise<any>;
}

/**
 * Renders a document container for the workspace.
 * Displays document details, a thumbnail (if available), and actions for deletion and movement.
 * Supports dynamic linking based on the document type.
 */
function WorkspaceDocumentContainer({ item, tabModel, refetch }: props) {
  // Determine the query parameter based on the document type
  const queryParam =
    tabModel && tabModel.app_type === "chat_bot" ? "chatId" : "uuid";

  // Generate the link to the document, ensuring the correct route and query param
  const link = tabModel
    ? `/${tabModel.route}?${queryParam}=${item.history.uuid}`
    : "";

  return (
    <div className="flex flex-col group border rounded p-3 gap-y-2">
      {/* Document Thumbnail and Name */}
      <div className="flex flex-row gap-x-2 items-center">
        {/* Display document thumbnail if available */}
        {item.history.urls ? (
          <Link href={link}>
            <Image
              src={item.history.urls[0]} // Load the first image URL
              width={35}
              height={35}
              alt="image"
              className="rounded-md"
            />
          </Link>
        ) : null}

        {/* Display document name as a clickable link */}
        <Link href={link} className="truncate">
          <AppTypo className="truncate">{item.name}</AppTypo>
        </Link>
      </div>

      {/* Display a short answer text if available */}
      {item?.history?.answer_text ? (
        <AppTypo className="truncate" variant="small" color="secondary">
          {item.history.answer_text}
        </AppTypo>
      ) : null}

      {/* Document Actions & Timestamp */}
      <div className="flex flex-row gap-x-2 items-center justify-between mt-2">
        {/* Display time passed since document was created */}
        <AppTypo variant="small" color="secondary">
          {timePassedSince(item.history.created_at)}
        </AppTypo>

        {/* Action buttons (delete & move), only fully visible on hover */}
        <div className="flex flex-row items-center gap-x-1 group-hover:opacity-100 transition">
          <WorkspaceDocumentDelete id={item.id} refetch={refetch} />
          <WorkspaceDocuemntMoved document={item} refetch={refetch} />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceDocumentContainer;
