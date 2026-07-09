import type { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/blog";
import { getReadingTime, extractToc } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TableOfContents from "@/components/TableOfContents";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "文章未找到" };
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

const categoryLabels: Record<string, string> = {
  "build-in-public": "Build in Public",
  "chuhai-action": "出海实战",
  toolbox: "工具箱",
  "tech-deep": "技术深度",
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // 同分类相关文章（排除当前文章，最多 3 篇）
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const categoryLabel = categoryLabels[post.category] || post.category;
  const readingTime = getReadingTime(post.content);
  const tocItems = extractToc(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "小牛不牛",
      url: "https://www.xiaoniubuniu.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "小牛不牛",
    },
    url: `https://www.xiaoniubuniu.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.xiaoniubuniu.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 桌面端两栏：正文 + TOC 侧边栏 */}
      <div className="flex gap-10 lg:gap-16">
        {/* 正文区 */}
        <article className="flex-1 min-w-0 max-w-[720px] mx-auto lg:mx-0">
          {/* 文章头部 */}
          <div className="mb-8">
            {/* 分类 + 日期 + 阅读时长 */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Link
                href={`/blog?category=${post.category}`}
                className="text-sm px-3 py-1 rounded-full bg-orange-50 text-brand-orange font-medium hover:bg-orange-100 transition-colors"
              >
                {categoryLabel}
              </Link>
              <span className="text-sm text-gray-400">{post.date}</span>
              <span className="text-sm text-gray-400">·</span>
              <span className="text-sm text-gray-400">
                约 {readingTime} 分钟读完
              </span>
            </div>

            {/* 标题 */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            {/* 标签 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

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
              {post.content}
            </ReactMarkdown>
          </div>

          {/* 上一篇 / 下一篇 */}
          <nav className="mt-12 grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="block border border-gray-200 rounded-xl p-4 hover:border-brand-orange hover:shadow-sm transition-all text-left"
              >
                <span className="text-xs text-gray-400">← 上一篇</span>
                <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-1">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="block border border-gray-200 rounded-xl p-4 hover:border-brand-orange hover:shadow-sm transition-all text-right"
              >
                <span className="text-xs text-gray-400">下一篇 →</span>
                <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-1">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* 相关文章 */}
          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                📎 相关文章
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="block border border-gray-200 rounded-xl p-4 hover:border-brand-orange hover:shadow-sm transition-all"
                  >
                    <span className="text-xs text-gray-400">{rp.date}</span>
                    <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">
                      {rp.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 底部 CTA */}
          <div className="mt-12">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
              <p className="text-gray-700 font-medium mb-3">
                想聊出海或合作？把你的需求砸过来 →
              </p>
              <Link
                href="/about"
                className="inline-block px-6 py-2.5 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
              >
                联系我
              </Link>
            </div>
          </div>
        </article>

        {/* TOC 侧边栏（仅桌面端） */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <TableOfContents items={tocItems} />
        </aside>
      </div>
    </div>
  );
}
