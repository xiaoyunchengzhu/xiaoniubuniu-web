import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getAllProducts } from "@/lib/products";
import BlogCard from "@/components/BlogCard";
import { statusLabels, categoryLabels } from "@/lib/product-constants";
import { LuNewspaper, LuArrowRight, LuDownload, LuGithub, LuRss } from "react-icons/lu";

export const metadata: Metadata = {
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  other: {
    "impact-site-verification": "34e7f3ce-0240-4c90-b791-c114de436cb3",
  },
};

/** 首页产品主推状态徽章颜色 */
const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  released: "bg-green-100 text-green-700",
  "in-development": "bg-yellow-100 text-yellow-700",
  archived: "bg-gray-100 text-gray-500",
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  // 首页主推：已发布的排前面，取前两个未归档产品
  const statusPriority = (s: string) => (s === "released" || s === "active" ? 0 : 1);
  const featuredProducts = getAllProducts()
    .filter((p) => p.status !== "archived")
    .sort((a, b) => statusPriority(a.status) - statusPriority(b.status))
    .slice(0, 2);

  return (
    <div>
      {/* ========== Hero ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 md:pt-20 md:pb-14">
        <div className="text-center max-w-2xl mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/common/photo-work.jpg"
            alt="XiaoNiuBuNiu — indie developer"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-6 border-2 border-gray-200 shadow-sm"
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Independent Software Maker
          </h1>
          <p className="text-brand-orange font-semibold text-lg md:text-xl mb-3">
            Apps for macOS &amp; Android — shipped solo, in public
          </p>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            10 years full-stack, now building my own products one at a time.
            Everything I&apos;ve shipped so far works entirely on your device
            &mdash; no accounts, no cloud servers.
          </p>
        </div>

        {/* 产品主推卡片 */}
        <div className="grid gap-5 md:grid-cols-2 max-w-3xl mx-auto mt-10">
          {featuredProducts.map((product) => {
            const statusLabel = statusLabels[product.status] || product.status;
            const categoryLabel =
              categoryLabels[product.category] || product.category;
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  {product.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.icon}
                      alt={`${product.title} icon`}
                      className="w-11 h-11 rounded-xl border border-gray-100"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                      {product.title.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="font-bold text-gray-900 leading-tight">
                      {product.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                          statusColors[product.status] || statusColors.active
                        }`}
                      >
                        {statusLabel}
                      </span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  {product.download_link ? (
                    <span className="inline-flex items-center gap-1 font-medium text-brand-orange">
                      <LuDownload size={15} /> Download
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-medium text-brand-orange">
                      <LuArrowRight size={15} /> Learn more
                    </span>
                  )}
                  {product.github_url && (
                    <span className="inline-flex items-center gap-1 text-gray-400 group-hover:text-gray-600">
                      <LuGithub size={15} /> Source
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-orange font-medium transition-colors"
          >
            View all products <LuArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ========== Latest Blog Posts ========== */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <LuNewspaper size={22} className="text-brand-orange" />
              Latest from the Blog
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-orange font-medium transition-colors"
            >
              All posts <LuArrowRight size={14} />
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No posts yet — hacking away...</p>
              <p className="text-sm mt-2">
                Content is on the way. Check out my apps in the meantime 🐂
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== Bottom CTA ========== */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Following the journey, or want to collaborate? Subscribe or say hi 👇
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-base px-7 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-orange-200"
            >
              Get in Touch
            </Link>
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-2 text-base px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              <LuRss size={17} /> RSS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
