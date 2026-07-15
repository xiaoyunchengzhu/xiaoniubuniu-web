import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getAllProducts } from "@/lib/products";
import BlogCard from "@/components/BlogCard";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  other: {
    "impact-site-verification": "34e7f3ce-0240-4c90-b791-c114de436cb3",
  },
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredProducts = getAllProducts()
    .filter((p) => p.status !== "archived")
    .slice(0, 3);

  return (
    <div>
      {/* ========== Hero ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: avatar + copy */}
          <div className="flex-1 text-center md:text-left">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-100 flex items-center justify-center mx-auto md:mx-0 mb-6 border-2 border-gray-200">
              <svg
                className="w-14 h-14 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .66.54 1.2 1.2 1.2h16.8c.66 0 1.2-.54 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
              Indie Mac &amp; iOS App Developer
              <br />
              <span className="text-brand-orange">Building in Public</span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              10yr full-stack · Quit my job to build my own products · Real talk, no fluff
            </p>
          </div>

          {/* Right: quick links */}
          <div className="flex-1 w-full max-w-md">
            <div className="grid gap-4">
              {[
                {
                  emoji: "🚀",
                  title: "My Apps",
                  desc: "Indie Mac & iOS apps I built and shipped",
                  href: "/products",
                },
                {
                  emoji: "📝",
                  title: "Blog",
                  desc: "Building in public — real stories & technical deep dives",
                  href: "/blog",
                },
                {
                  emoji: "🐂",
                  title: "About Me",
                  desc: "10 years of full-stack, now a solo indie developer",
                  href: "/about",
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

      {/* ========== Featured Products ========== */}
      {featuredProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              🚀 My Apps
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
                View All Apps →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========== Latest Blog Posts ========== */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            📝 Latest from the Blog
          </h2>

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

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-block text-sm px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              View All Posts →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Bottom CTA ========== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Interested in my apps or want to collaborate? Let&apos;s talk 👇
          </p>
          <Link
            href="/about"
            className="inline-block text-lg px-8 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-orange-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
