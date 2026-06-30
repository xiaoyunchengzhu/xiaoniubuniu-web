import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getAllProducts } from "@/lib/products";
import BlogCard from "@/components/BlogCard";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredProducts = getAllProducts()
    .filter((p) => p.status !== "archived")
    .slice(0, 3);

  return (
    <div>
      {/* ========== Hero 区域 ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* 左侧：头像 + 文案 */}
          <div className="flex-1 text-center md:text-left">
            {/* 圆形头像占位图 */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-100 flex items-center justify-center mx-auto md:mx-0 mb-6 border-2 border-gray-200">
              <svg
                className="w-14 h-14 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .66.54 1.2 1.2 1.2h16.8c.66 0 1.2-.54 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              一个农村全栈老兵的
              <br />
              <span className="text-brand-orange">出海折腾日记</span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              10年Java+前端+安卓 | 正在全职独立开发中 | 只讲实战，不扯虚的
            </p>
          </div>

          {/* 右侧：快捷入口卡片 */}
          <div className="flex-1 w-full max-w-md">
            <div className="grid gap-4">
              {[
                {
                  emoji: "📦",
                  title: "出海建站服务",
                  desc: "从0到1帮你搭建海外网站，定制化开发",
                  href: "/services",
                },
                {
                  emoji: "📝",
                  title: "独立开发日记",
                  desc: "记录全职独立开发者真实的折腾过程",
                  href: "/blog?category=build-in-public",
                },
                {
                  emoji: "🧰",
                  title: "出海工具箱",
                  desc: "亲测好用的工具推荐，持续更新中",
                  href: "/toolbox",
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-3xl">{card.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500">{card.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== 最新文章 ========== */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            📝 最新折腾记录
          </h2>

          {latestPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">还没有文章，折腾中...</p>
              <p className="text-sm mt-2">内容正在路上，先逛逛别的页面吧 🐂</p>
            </div>
          )}

          {/* 查看全部 */}
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-block text-sm px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              查看全部文章 →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 独立产品 ========== */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              🚀 独立产品
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="inline-block text-sm px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                查看全部产品 →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========== 底部 CTA ========== */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 mb-6">
            目前在接出海建站 / 技术咨询的活儿，欢迎老板来撩 👇
          </p>
          <Link
            href="/contact"
            className="inline-block text-lg px-8 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-orange-200"
          >
            联系我
          </Link>
        </div>
      </section>
    </div>
  );
}
