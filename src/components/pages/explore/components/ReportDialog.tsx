import React, { useState, type FC } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import useExplorerReport from "@/components/pages/explore/components/useExplorerReport";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";

interface IProps {
  onClose(): void;
  onSubmit(feedback_text: string, report_reason: string): void;
  isPendingSubmit: boolean;
}

const ReportDialog: FC<IProps> = ({ isPendingSubmit, onClose, onSubmit }) => {
  // Extracting values from dictionary for text content in different languages
  const {
    page: {
      explore: {
        you_reporting_this_content,
        relevant_section_page_then_report_below,
        enter_feedback,
        enter_your_feedback_here,
      },
    },
    common: { cancel, send },
  } = useGetDictionary(); // Get dictionary values for translations

  // Get the available report reasons
  const { reasons } = useExplorerReport(); // Fetch the list of reasons to report content
  const [reportReasons, setReportReasons] = useState<string[]>([]);
  const [messageReport, setMessageReport] = useState("");

  const handleChangeCheckBox = (reasons: string) => {
    if (reportReasons.includes(reasons)) {
      const newArray = reportReasons.filter(item => item !== reasons);
      setReportReasons(newArray);
    } else {
      setReportReasons([...reportReasons, reasons]);
    }
  };

  const handleSendReport = () => {
    onSubmit(messageReport, reportReasons.join());
  };

  return (
    <Dialog open onOpenChange={onClose}>
      {" "}
      {/* Dialog component to display the report form */}
      <DialogContent className="flex flex-col max-w-auto max-w-[95%] w-[420px] gap-y-6 p-6">
        <VisuallyHidden>
          <DialogTitle>Report</DialogTitle>
        </VisuallyHidden>
        {/* Title section */}
        <AppTypo variant="headingM" color="secondary">
          {you_reporting_this_content}
        </AppTypo>

        {/* Reasons selection */}
        <div className="flex flex-col gap-y-5">
          <AppTypo color="secondary" variant="small">
            {relevant_section_page_then_report_below}
          </AppTypo>
          {/* Looping through the reasons array to display each reason with a checkbox */}
          {reasons.map((el, key) => (
            <label
              key={key}
              className="flex flex-row items-center gap-x-2 cursor-pointer"
            >
              <Checkbox
                checked={reportReasons.includes(el.label)}
                onClick={() => handleChangeCheckBox(el.label)}
              />{" "}
              {/* Checkbox for selecting the reason */}
              <AppTypo color="secondary" variant="small">
                {el.label} {/* The label for each reason */}
              </AppTypo>
            </label>
          ))}
        </div>

        {/* Feedback section */}
        <div className="flex flex-col gap-y-3">
          <AppTypo color="secondary" variant="headingXS">
            {enter_feedback}
          </AppTypo>
          {/* Textarea to enter additional feedback */}
          <textarea
            className="border bg-transparent rounded min-h-20 outline-none p-2 text-small placeholder:text-muted-darker/60"
            placeholder={enter_your_feedback_here} // Placeholder text inside the textarea
            onChange={e => setMessageReport(e.target.value)} // Placeholder for the change handler (can be added later)
          />
        </div>

        {/* Buttons section */}
        <div className="flex flex-row gap-x-2">
          <Button variant="secondary" className="w-1/3" onClick={onClose}>
            {cancel} {/* Button to cancel the report */}
          </Button>
          <Button
            isPending={isPendingSubmit}
            disabled={isPendingSubmit}
            onClick={handleSendReport}
            className="w-2/3"
          >
            {send} {/* Button to send the report */}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
