import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

const categoryLabels: Record<string, string> = {
  all: "全部",
  "build-in-public": "Build in Public",
  "chuhai-action": "出海实战",
  toolbox: "工具箱",
  "tech-deep": "技术深度",
};

export default function BlogCard({ post }: BlogCardProps) {
  const categoryLabel = categoryLabels[post.category] || post.category;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-brand-orange font-medium">
          {categoryLabel}
        </span>
        <span className="text-xs text-gray-400">
          {post.date}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1.5 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">
        {post.description}
      </p>
    </Link>
  );
}
