import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { toolCategoryLabels } from "@/lib/tool-constants";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const categoryLabel = toolCategoryLabels[tool.category] || tool.category;

  return (
    <Link
      href={`/toolbox/${tool.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Logo 占位 + 标题 */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-lg flex-shrink-0">
          {tool.title.charAt(0)}
        </div>
        <h3 className="font-semibold text-gray-900 text-lg">{tool.title}</h3>
      </div>

      {/* 分类 + affiliate 标识 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {categoryLabel}
        </span>
        {tool.affiliate && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-brand-orange">
            推荐码
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 line-clamp-2">{tool.description}</p>

      {/* 标签 */}
      {tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tool.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-brand-orange"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
