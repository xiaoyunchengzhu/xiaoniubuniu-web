"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ToolCard from "./ToolCard";
import { toolCategoryLabels } from "@/lib/tool-constants";
import type { Tool } from "@/lib/tools";

interface ToolFilterProps {
  tools: Tool[];
}

export default function ToolFilter({ tools }: ToolFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  // 过滤
  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  // 更新 URL
  const updateParams = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const qs = params.toString();
    router.push(`/toolbox${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <div>
      {/* 分类筛选 */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => updateParams("all")}
          className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-brand-orange text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          全部分类
        </button>
        {Object.entries(toolCategoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => updateParams(key)}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
              activeCategory === key
                ? "bg-brand-orange text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 工具列表 */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">这个分类下还没有工具</p>
          <p className="text-sm mt-2">内容正在路上，敬请期待 🐂</p>
        </div>
      )}
    </div>
  );
}
