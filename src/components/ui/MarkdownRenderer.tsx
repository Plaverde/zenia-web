"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div
      className="prose prose-lg mx-auto max-w-[68ch]
        prose-headings:font-serif prose-headings:text-charcoal prose-headings:font-normal prose-headings:tracking-normal
        prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-warm-gray prose-p:leading-[1.85] prose-p:mb-6
        prose-strong:text-charcoal prose-strong:font-semibold
        prose-a:text-sage-dark prose-a:font-medium prose-a:no-underline prose-a:underline-offset-2 hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-sage prose-blockquote:bg-sage/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-charcoal
        prose-ul:my-6 prose-ol:my-6 prose-li:text-warm-gray prose-li:leading-[1.85] prose-li:my-2
        prose-img:rounded-2xl
        prose-hr:border-sand"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
