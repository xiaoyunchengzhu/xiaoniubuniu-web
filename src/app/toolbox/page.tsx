import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllTools } from "@/lib/tools";
import ToolFilter from "@/components/ToolFilter";

export const metadata: Metadata = {
  title: "出海工具箱",
  description:
    "我常用且推荐的出海工具，包括VPS、域名、支付、部署、营销等。亲测好用，持续更新。",
};

export default function ToolboxPage() {
  const tools = getAllTools();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        我常用且推荐的出海工具
      </h1>
      <p className="text-gray-500 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
        这些是我亲自用过或正在用的工具，有些链接带推荐码。如果你通过它们注册，我会得到一点佣金，这对我维持网站帮助很大，感谢 🧡
      </p>

      <Suspense
        fallback={
          <div className="text-center py-12 text-gray-400">加载中...</div>
        }
      >
        <ToolFilter tools={tools} />
      </Suspense>

      {/* 底部说明 */}
      <div className="mt-12 text-center text-sm text-gray-400">
        <p>
          工具列表会持续更新。如果你有好的工具推荐，欢迎{" "}
          <a href="/contact" className="text-brand-orange hover:underline">
            告诉我
          </a>
          。
        </p>
      </div>
    </div>
  );
}
