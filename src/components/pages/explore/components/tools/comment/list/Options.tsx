import React, { useState } from "react";

import ReportDialog from "@/components/pages/explore/components/ReportDialog";
import { useCommentReport } from "@/components/pages/explore/components/tools/comment/comments-actions";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useErrorToast from "@/hooks/useErrorToast";

interface IProps {
  commentId: number;
}

function ExplorerCommentOptions({ commentId }: IProps) {
  const [isOpenReport, setIsOpenReport] = useState(false);
  const { mutate, isPending } = useCommentReport();
  const { showError } = useErrorToast();

  const submitReport = (feedback_text: string, report_reason: string) => {
    mutate(
      {
        comment_id: commentId,
        feedback_text: `Reason: ${report_reason} \n ${feedback_text}`,
      },
      {
        onSuccess: () => setIsOpenReport(false),
        onError: data => {
          showError(data?.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger>
            <AppIcon
              icon="ri:more-fill"
              className="w-5 h-5 border rounded-full cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="end"
            alignOffset={-10}
            className="!p-0.5  w-[130px]"
          >
            <div
              className="flex flex-row items-center py-1.5 px-2 gap-x-1 cursor-pointer hover:bg-muted-dark rounded-md"
              onClick={() => setIsOpenReport(true)}
            >
              <AppIcon icon="material-symbols:flag" width={16} />
              <AppTypo variant="small" color="secondary">
                Report
              </AppTypo>
            </div>
            {/* <ExplorerReport params={{id:'1'}} message="" onClose={() => null}  /> */}
          </PopoverContent>
        </Popover>
      </div>
      <RenderIf isTrue={isOpenReport}>
        <ReportDialog
          onClose={() => setIsOpenReport(false)}
          onSubmit={submitReport}
          isPendingSubmit={isPending}
        />
      </RenderIf>
    </>
  );
}

export default ExplorerCommentOptions;
