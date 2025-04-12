import React, { useContext } from "react";

import MarkdownRenderer from "@/components/shared/markdown-rendered/MarkdownRendered";

import CodeContext from "../../context";
import useCode from "../../hooks/useCode";

interface CodeDisplayProps {
  content: string;
  loading: boolean;
}

const CodeDisplay = ({ content, loading }: CodeDisplayProps) => {
  const { data } = useContext(CodeContext);
  const { feature, getTabPrompt } = useCode();

  const historyTab = data?.prompt ? getTabPrompt(data.prompt) : "";

  return (
    <div className="pb-6 whitespace-pre-wrap w-full overflow-hidden">
      {data?.answer_text && (
        <MarkdownRenderer
          content={
            content.length
              ? content
              : history && feature === historyTab
                ? data?.answer_text
                : ""
          }
        />
      )}
    </div>
  );
};

export default CodeDisplay;
