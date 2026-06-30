"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogCard from "./BlogCard";
import type { BlogPost } from "@/lib/blog";

interface BlogFilterProps {
  posts: BlogPost[];
}

const categoryOptions = [
  { key: "all", label: "全部" },
  { key: "build-in-public", label: "Build in Public" },
  { key: "chuhai-action", label: "出海实战" },
  { key: "toolbox", label: "工具箱" },
  { key: "tech-deep", label: "技术深度" },
];

const POSTS_PER_PAGE = 9;

export default function BlogFilter({ posts }: BlogFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  // 当 URL 参数变化时同步状态
  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("search") || "");
    setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
  }, [searchParams]);

  // 过滤
  let filteredPosts = posts;
  if (activeCategory !== "all") {
    filteredPosts = filteredPosts.filter(
      (post) => post.category === activeCategory
    );
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q)
    );
  }

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // 更新 URL 参数
  const updateParams = useCallback(
    (updates: { category?: string; search?: string; page?: number }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.category !== undefined) {
        if (updates.category === "all") {
          params.delete("category");
        } else {
          params.set("category", updates.category);
        }
        params.delete("page"); // 切换分类时重置页码
      }
      if (updates.search !== undefined) {
        if (updates.search) {
          params.set("search", updates.search);
        } else {
          params.delete("search");
        }
        params.delete("page"); // 搜索时重置页码
      }
      if (updates.page !== undefined) {
        if (updates.page > 1) {
          params.set("page", String(updates.page));
        } else {
          params.delete("page");
        }
      }
      const qs = params.toString();
      router.push(`/blog${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div>
      {/* 搜索框 */}
      <form
        className="max-w-md mx-auto mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const search = formData.get("search") as string;
          updateParams({ search });
        }}
      >
        <div className="relative">
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文章..."
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none text-gray-900"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {/* 分类按钮组 */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryOptions.map((cat) => (
          <button
            key={cat.key}
            onClick={() =>
              updateParams({ category: cat.key, page: undefined })
            }
            className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-brand-orange text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      {paginatedPosts.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              {currentPage > 1 ? (
                <button
                  onClick={() => updateParams({ page: currentPage - 1 })}
                  className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  上一页
                </button>
              ) : (
                <span className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed">
                  上一页
                </span>
              )}

              <span className="text-sm text-gray-500">
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <button
                  onClick={() => updateParams({ page: currentPage + 1 })}
                  className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  下一页
                </button>
              ) : (
                <span className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed">
                  下一页
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">
            {searchQuery ? "没有找到匹配的文章" : "这个分类下还没有文章"}
          </p>
          <p className="text-sm mt-2">
            {searchQuery ? "换一个关键词试试" : "内容正在路上，敬请期待 🐂"}
          </p>
        </div>
      )}
    </div>
  );
}
