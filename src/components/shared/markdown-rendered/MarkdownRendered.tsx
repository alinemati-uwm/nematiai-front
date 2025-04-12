"use client";

import React from "react";

import "katex/dist/katex.min.css";

import Lottie from "react-lottie";
import ReactMarkdown, { type ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeFormat from "rehype-format";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MinimalButton } from "@/components/shared";
import CopyButton from "@/components/shared/CopyButton";
import RenderIf from "@/components/shared/RenderIf";
import useDarkMode from "@/hooks/useDarkMode";
import { cn } from "@/lib/utils";

import CircleLoadingChatbot from "../../../../public/animations/circle_loading_chatbot.json";

interface MarkdownRendererProps {
  content: string;
  onEditCode?: (code: string, language: string) => void;
  isLastMessage?: boolean;
  isStreaming?: boolean;
  wrapperClassName?: string;
}

type CodeProps = React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  ExtraProps & {
    onEditCode?: (code: string, language: string) => void;
  };

//style of the code block in the markdown
const CodeBlock: React.FC<CodeProps> = ({
  className,
  children,
  onEditCode,
}) => {
  const language = className?.replace("language-", "");
  const code = String(children).trim();
  const isDark = useDarkMode();

  return (
    <div className="relative my-2">
      {language && (
        <div className="bg-holder flex flex-row justify-between text-label font-sans text-base px-4 py-3 rounded-t-md">
          <div>{language}</div>
          <div className="row gap-1">
            <CopyButton text={code!.toString()} />
            <RenderIf isTrue={!!onEditCode}>
              <MinimalButton
                size="xs"
                icon="iconamoon:edit-light"
                onClick={() => onEditCode!(code, language)}
              />
            </RenderIf>
          </div>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          marginTop: 0,
          borderTopLeftRadius: language ? 0 : "6px",
          borderTopRightRadius: language ? 0 : "6px",
          marginBottom: "1.5rem",
        }}
        className="!rounded-b-md  text-sm"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  onEditCode,
  isLastMessage,
  isStreaming,
  wrapperClassName,
}) => {
  const streamChatBot = {
    loop: true,
    autoplay: true,
    animationData: CircleLoadingChatbot,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const contentWithLoading =
    isStreaming && isLastMessage
      ? `${content} <span class="loading-icon"></span>`
      : content;
  return (
    <div className={cn("prose-custom max-w-none", wrapperClassName)} dir="auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, rehypeFormat]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code: props => <CodeBlock onEditCode={onEditCode} {...props} />,
          span: ({ node, children }) => {
            const classString = String(node?.properties?.className ?? "");
            return classString.includes("loading-icon") ? (
              <Lottie
                options={streamChatBot}
                width={25}
                height={40}
                style={{
                  display: "inline-flex",
                  verticalAlign: "middle",
                  margin: "0,1px",
                }}
              />
            ) : (
              <span className={classString}>{children}</span>
            );
          },
        }}
      >
        {contentWithLoading}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
