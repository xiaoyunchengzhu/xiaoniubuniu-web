import type { Metadata } from "next";
import {
  getAllToolSlugs,
  getToolBySlug,
  getAllTools,
} from "@/lib/tools";
import { toolCategoryLabels } from "@/lib/tool-constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ToolDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: ToolDetailPageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return { title: "工具未找到" };
  }
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: ToolDetailPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const allTools = getAllTools();
  const currentIndex = allTools.findIndex((t) => t.slug === tool.slug);
  const prevTool =
    currentIndex < allTools.length - 1 ? allTools[currentIndex + 1] : null;
  const nextTool =
    currentIndex > 0 ? allTools[currentIndex - 1] : null;

  const categoryLabel = toolCategoryLabels[tool.category] || tool.category;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="max-w-[720px] mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {categoryLabel}
            </span>
            {tool.affiliate && (
              <span className="text-sm px-3 py-1 rounded-full bg-orange-50 text-brand-orange font-medium">
                推荐码
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {tool.title}
          </h1>

          <p className="text-gray-500 text-lg mb-4">{tool.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-brand-orange"
              >
                #{tag}
              </span>
            ))}
            {tool.link && (
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-lg bg-brand-orange text-white hover:bg-brand-orange-dark transition-colors ml-auto"
              >
                查看 / 注册 →
              </a>
            )}
          </div>
          {tool.affiliate && (
            <p className="text-xs text-gray-400 mt-2">
              （通过此链接注册/购买，我会获得佣金）
            </p>
          )}
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* 正文 — 用户撰写的详细介绍和经验文章 */}
        <div className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const codeString = String(children).replace(/\n$/, "");

                if (match) {
                  return (
                    <div className="relative">
                      <div className="absolute right-2 top-2 text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                        {match[1]}
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          lineHeight: "1.6",
                        }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              a({ children, href, ...props }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {tool.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* 上一篇 / 下一篇 */}
      <nav className="max-w-[720px] mx-auto mt-12 grid grid-cols-2 gap-4">
        {prevTool ? (
          <Link
            href={`/toolbox/${prevTool.slug}`}
            className="block border border-gray-200 rounded-xl p-4 hover:border-brand-orange hover:shadow-sm transition-all text-left"
          >
            <span className="text-xs text-gray-400">← 上一个工具</span>
            <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-1">
              {prevTool.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {nextTool ? (
          <Link
            href={`/toolbox/${nextTool.slug}`}
            className="block border border-gray-200 rounded-xl p-4 hover:border-brand-orange hover:shadow-sm transition-all text-right"
          >
            <span className="text-xs text-gray-400">下一个工具 →</span>
            <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-1">
              {nextTool.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* 底部 CTA */}
      <div className="max-w-[720px] mx-auto mt-12">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-3">
            有更好的工具推荐？或者想聊聊你的工具选型？
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2.5 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
          >
            联系我
          </Link>
        </div>
      </div>
    </div>
  );
}
