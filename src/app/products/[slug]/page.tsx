import type { Metadata } from "next";
import {
  getAllProductSlugs,
  getProductBySlug,
  getAllProducts,
} from "@/lib/products";
import { statusLabels } from "@/lib/product-constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ProductDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: ProductDetailPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
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
  released: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  "in-development": "bg-yellow-100 text-yellow-700",
  archived: "bg-gray-100 text-gray-500",
};

const platformIcons: Record<string, string> = {
  macOS: "🍎",
  iOS: "📱",
  web: "🌐",
  Android: "🤖",
  Windows: "🪟",
};

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const allProducts = getAllProducts().filter(
    (p) => p.slug !== product.slug && p.status !== "archived"
  );
  const relatedProducts = allProducts.slice(0, 3);

  const statusLabel = statusLabels[product.status] || product.status;
  const statusColor = statusColors[product.status] || statusColors.active;
  const platforms = product.platforms;

  // 解析 FAQ 和 Tips 区块
  const faqMatch = product.content.match(/## FAQ\s*\n([\s\S]*)/);
  const tipsMatch = product.content.match(/## Tips\s*\n([\s\S]*?)(?=\n## |$)/);
  const bodyContent = product.content
    .replace(/## FAQ[\s\S]*/, "")
    .replace(/## Tips[\s\S]*?(?=\n## |$)/, "")
    .trim();

  // 解析 FAQ 项目（### Q / A 或 **Q:** 格式）
  const faqItems: { q: string; a: string }[] = [];
  if (faqMatch) {
    const faqText = faqMatch[1];
    const faqBlocks = faqText.split(/(?=###?\s)/);
    for (const block of faqBlocks) {
      const lines = block.trim().split("\n");
      if (lines.length < 2) continue;
      const q = lines[0].replace(/^###?\s*/, "").trim();
      const a = lines.slice(1).join("\n").trim();
      if (q && a) faqItems.push({ q, a });
    }
  }

  // 解析 Tips
  let tipsContent = "";
  if (tipsMatch) {
    tipsContent = tipsMatch[1].trim();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.title,
    description: product.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: platforms?.join(", ") || "macOS",
    author: {
      "@type": "Person",
      name: "XiaoNiuBuNiu",
    },
    url: `https://www.xiaoniubuniu.com/products/${product.slug}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== Hero ===== */}
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl overflow-hidden shadow-sm">
          {product.icon ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.icon}
              alt={`${product.title} icon`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-3xl">
              {product.title.charAt(0)}
            </div>
          )}
        </div>

        {/* Title + Tagline */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {product.title}
        </h1>
        <p className="text-lg text-gray-500 mb-2">{product.description}</p>

        {/* Platform + Status */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-400">
          {platforms?.map((p) => (
            <span key={p}>
              {platformIcons[p] || ""} {p}
            </span>
          ))}
          {platforms && platforms.length > 1 && <span>·</span>}
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* Download CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {product.link && (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-orange-200"
            >
              Download for macOS →
            </a>
          )}
          {product.download_link && (
            <a
              href={product.download_link}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-colors"
            >
              Direct Download
            </a>
          )}
          {product.github_url && (
            <a
              href={product.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-colors"
            >
              GitHub →
            </a>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Free · Open Source · macOS 14+
        </p>
      </section>

      {/* ===== Screenshots ===== */}
      {(product.screenshots?.length ?? 0) > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid gap-4 md:grid-cols-2">
            {product.screenshots!.map((src, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${product.title} screenshot ${i + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Content ===== */}
      <section className="max-w-[720px] mx-auto px-4 py-8">
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
            {bodyContent}
          </ReactMarkdown>
        </div>
      </section>

      {/* ===== Tips ===== */}
      {tipsContent && (
        <section className="max-w-[720px] mx-auto px-4 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">
              💡 Tips
            </h3>
            <div className="text-sm text-blue-700 prose-blue prose-sm">
              <ReactMarkdown
                components={{
                  a({ children, href, ...props }) {
                    return (
                      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {tipsContent}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      {faqItems.length > 0 && (
        <section className="max-w-[720px] mx-auto px-4 py-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl"
              >
                <summary className="px-5 py-3 cursor-pointer list-none text-sm font-medium text-gray-900 hover:text-brand-orange transition-colors select-none">
                  {faq.q}
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed prose-sm">
                  <ReactMarkdown
                    components={{
                      a({ children, href, ...props }) {
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {faq.a}
                  </ReactMarkdown>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ===== Cross-promotion ===== */}
      {relatedProducts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 text-center mb-6">
            You Might Also Like
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/products/${rp.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 flex-shrink-0">
                  {rp.title.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {rp.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {rp.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== Footer CTA ===== */}
      <section className="text-center py-12 px-4">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
          {product.title.charAt(0)}
        </div>
        <p className="text-lg font-bold text-gray-900 mb-1">
          {product.title}
        </p>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
          >
            Download →
          </a>
        )}
      </section>
    </div>
  );
}
