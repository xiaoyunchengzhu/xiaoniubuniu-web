import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/blog";
import BlogFilter from "@/components/BlogFilter";

export const metadata: Metadata = {
  title: "所有文章",
  description:
    "小牛不牛的独立开发日记，包括出海实战、工具箱推荐、技术深度分享。记录真实的创业过程。",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* 页面标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        所有文章
      </h1>

      <Suspense
        fallback={
          <div className="text-center py-12 text-gray-400">加载中...</div>
        }
      >
        <BlogFilter posts={posts} />
      </Suspense>
    </div>
  );
}
