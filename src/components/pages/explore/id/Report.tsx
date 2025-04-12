import React from "react";

import ReportDialog from "@/components/pages/explore/components/ReportDialog";
import { useMutateReport } from "@/components/pages/explore/news-actions";
import useErrorToast from "@/hooks/useErrorToast";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

type props = {
  onClose(): void;
  params: { id: string };
};

function ExplorerReport({ onClose, params }: props) {
  const { mutate: mutateReport, isPending } = useMutateReport();
  const { toaster } = useToaster();
  const { showError } = useErrorToast();

  const handleSubmit = (feedback_text: string, report_reason: string) => {
    mutateReport(
      {
        news_id: +params.id,
        feedback_text,
        report_reason,
      },
      {
        onSuccess() {
          toaster({
            toastProps: {
              type: "success",
              message: "Report submitted successfully",
            },
          });
        },
        onError(data) {
          showError(data.message);
        },
      },
    );
  };
  return (
    <ReportDialog
      onClose={onClose}
      onSubmit={handleSubmit}
      isPendingSubmit={isPending}
    />
  );
}

export default ExplorerReport;
