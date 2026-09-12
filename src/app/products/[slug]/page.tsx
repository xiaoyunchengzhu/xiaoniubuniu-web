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
import { LuApple, LuSmartphone, LuGlobe, LuMonitor, LuLightbulb, LuDownload, LuGithub, LuArrowRight } from "react-icons/lu";

// SPDX 标识 → 标准 License URL
const licenseUrls: Record<string, string> = {
  MIT: "https://opensource.org/licenses/MIT",
  "Apache-2.0": "https://www.apache.org/licenses/LICENSE-2.0",
};

// 站内链接同标签页，外链新标签页
function linkTargetProps(href?: string) {
  const isExternal = !!href && /^https?:\/\//.test(href);
  return isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

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
  // og 图优先产品封面图，回落图标；都没有就不声明图
  const ogImage = product.image || product.icon;
  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, alt: product.title }] } : {}),
    },
    twitter: ogImage
      ? { card: "summary_large_image", title: product.title, description: product.description, images: [ogImage] }
      : undefined,
  };
}

const statusColors: Record<string, string> = {
  released: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  "in-development": "bg-yellow-100 text-yellow-700",
  archived: "bg-gray-100 text-gray-500",
};

const platformIcons: Record<string, React.ReactNode> = {
  macOS: <LuApple size={14} />,
  iOS: <LuSmartphone size={14} />,
  Android: <LuSmartphone size={14} />,
  web: <LuGlobe size={14} />,
  Windows: <LuMonitor size={14} />,
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

  // 主 CTA：优先 frontmatter 的 cta_url，回落到 link
  const ctaUrl = product.cta_url || product.link;
  const ctaLabel = product.cta_label || "Learn more";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.title,
    description: product.description,
    applicationCategory: product.app_category || "UtilitiesApplication",
    url: `https://www.xiaoniubuniu.com/products/${product.slug}`,
    author: {
      "@type": "Person",
      name: "XiaoNiuBuNiu",
    },
    ...(platforms?.length ? { operatingSystem: platforms.join(", ") } : {}),
    ...(product.pricing === "free"
      ? {
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }
      : {}),
    ...(product.license && licenseUrls[product.license]
      ? { license: licenseUrls[product.license] }
      : {}),
    ...(product.download_link
      ? {
          downloadUrl: `https://www.xiaoniubuniu.com${product.download_link}`,
        }
      : {}),
    ...(product.icon
      ? { image: `https://www.xiaoniubuniu.com${product.icon}` }
      : {}),
  };

  // FAQPage 结构化数据（有 FAQ 时输出，方便搜索引擎展示）
  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              // 去掉 Markdown 链接语法，只留纯文本
              text: faq.a.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"),
            },
          })),
        }
      : null;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
        <div className="flex items-center justify-center gap-3 mb-6 text-sm text-gray-400">
          {platforms?.map((p) => (
            <span key={p} className="inline-flex items-center gap-1">
              {platformIcons[p] || null}
              {p}
            </span>
          ))}
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* 主 CTA（文案与链接均来自产品 frontmatter） */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ctaUrl && (
            <a
              href={ctaUrl}
              {...linkTargetProps(ctaUrl)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-orange-200"
            >
              {ctaUrl === product.download_link ? (
                <LuDownload size={16} />
              ) : (
                <LuArrowRight size={16} />
              )}
              {ctaLabel}
            </a>
          )}
          {product.download_link && product.download_link !== ctaUrl && (
            <a
              href={product.download_link}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-colors"
            >
              <LuDownload size={16} /> Direct Download
            </a>
          )}
          {product.github_url && (
            <a
              href={product.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-colors"
            >
              <LuGithub size={16} /> GitHub
            </a>
          )}
        </div>
        {product.subline && (
          <p className="text-xs text-gray-400 mt-3 mb-4">{product.subline}</p>
        )}
        {/* Value-in-5-seconds */}
        {product.highlights && product.highlights.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mt-4">
            {product.highlights.map((h) => (
              <span key={h} className="px-3 py-1 bg-gray-50 rounded-full">
                {h}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* ===== Screenshots ===== */}
      {(product.screenshots?.length ?? 0) > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              // 表格套横向滚动容器，防止窄屏（手机）把整页撑出横向滚动
              table({ children }) {
                return (
                  <div className="w-full overflow-x-auto my-[1em]">
                    <table style={{ margin: 0 }}>{children}</table>
                  </div>
                );
              },
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
                  <a href={href} {...linkTargetProps(href)} {...props}>
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
            <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-1.5">
              <LuLightbulb size={15} /> Tips
            </h3>
            <div className="text-sm text-blue-700 prose-blue prose-sm">
              <ReactMarkdown
                components={{
                  a({ children, href, ...props }) {
                    return (
                      <a href={href} {...linkTargetProps(href)} {...props}>
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
                          <a href={href} {...linkTargetProps(href)} {...props}>
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/products/${rp.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                {rp.icon ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={rp.icon}
                    alt=""
                    className="w-10 h-10 rounded-lg border border-gray-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 flex-shrink-0">
                    {rp.title.charAt(0)}
                  </div>
                )}
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
        {product.icon ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.icon}
            alt={`${product.title} icon`}
            className="w-12 h-12 mx-auto mb-4 rounded-xl border border-gray-100"
          />
        ) : (
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
            {product.title.charAt(0)}
          </div>
        )}
        <p className="text-lg font-bold text-gray-900 mb-1">
          {product.title}
        </p>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        {ctaUrl && (
          <a
            href={ctaUrl}
            {...linkTargetProps(ctaUrl)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
          >
            {ctaLabel}
          </a>
        )}
      </section>
    </div>
  );
}
