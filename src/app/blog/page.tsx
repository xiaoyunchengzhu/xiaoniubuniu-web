import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/blog";
import BlogFilter from "@/components/BlogFilter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Building in public — indie dev stories, technical deep dives, and product journeys. Real talk from a solo developer.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* 页面标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        Blog
      </h1>

      <Suspense
        fallback={
          <div className="text-center py-12 text-gray-400">Loading...</div>
        }
      >
        <BlogFilter posts={posts} />
      </Suspense>
    </div>
  );
}
