import type { Metadata } from "next";
import {
  getAllProductSlugs,
  getProductBySlug,
  getAllProducts,
} from "@/lib/products";
import { statusLabels, categoryLabels } from "@/lib/product-constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ProductDetailPageProps {
  params: { slug: string };
}

// 构建时生成所有静态页面
export function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 动态 metadata
export function generateMetadata({
  params,
}: ProductDetailPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: "article",
    },
  };
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  "in-development": "bg-yellow-100 text-yellow-700",
  archived: "bg-gray-100 text-gray-500",
};

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const currentIndex = allProducts.findIndex((p) => p.slug === product.slug);
  const prevProduct =
    currentIndex < allProducts.length - 1
      ? allProducts[currentIndex + 1]
      : null;
  const nextProduct =
    currentIndex > 0 ? allProducts[currentIndex - 1] : null;

  const statusLabel = statusLabels[product.status] || product.status;
  const categoryLabel = categoryLabels[product.category] || product.category;
  const statusColor = statusColors[product.status] || statusColors.active;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="max-w-[720px] mx-auto">
        {/* 产品头部 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${statusColor}`}
            >
              {statusLabel}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {categoryLabel}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {product.title}
          </h1>

          <p className="text-gray-500 text-lg mb-4">{product.description}</p>

          {/* 标签 + 链接 */}
          <div className="flex flex-wrap items-center gap-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-brand-orange"
              >
                #{tag}
              </span>
            ))}
            {product.link && (
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1 rounded-lg bg-brand-orange text-white hover:bg-brand-orange-dark transition-colors ml-auto"
              >
                Visit →
              </a>
            )}
          </div>
        </div>

        {/* 分隔线 */}
        <hr className="border-gray-200 mb-8" />

        {/* 正文 */}
        <div className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const codeString = String(children).replace(/\n$/, "");

                if (match) {
                  return (
                    <div className="relative">
                      <div className="absolute right-2 top-2 text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                        {match[1]}
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          lineHeight: "1.6",
                        }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              a({ children, href, ...props }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {product.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* 上一篇 / 下一篇 */}
      <nav className="max-w-[720px] mx-auto mt-12 grid grid-cols-2 gap-4">
        {prevProduct ? (
          <Link
            href={`/products/${prevProduct.slug}`}
            className="block border border-gray-200 rounded-xl p-4 hover:border-brand-orange hover:shadow-sm transition-all text-left"
          >
            <span className="text-xs text-gray-400">← Previous</span>
            <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-1">
              {prevProduct.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {nextProduct ? (
          <Link
            href={`/products/${nextProduct.slug}`}
            className="block border border-gray-200 rounded-xl p-4 hover:border-brand-orange hover:shadow-sm transition-all text-right"
          >
            <span className="text-xs text-gray-400">Next →</span>
            <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-1">
              {nextProduct.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* 底部 CTA */}
      <div className="max-w-[720px] mx-auto mt-12">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-3">
            Have a product idea or want to collaborate?
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-2.5 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
