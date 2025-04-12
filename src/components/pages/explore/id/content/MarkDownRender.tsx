"use client";

import ReactMarkdown from "react-markdown";
import rehypeFormat from "rehype-format";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import useDarkMode from "@/hooks/useDarkMode";
import { cn } from "@/lib/utils";

export function MarkDownRender({ content }: { content?: string }) {
  const isDark = useDarkMode();

  return (
    <div className={cn("prose max-w-none", isDark && "prose-invert")}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, rehypeFormat]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
