import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { statusLabels } from "@/lib/product-constants";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "XiaoNiuBuNiu — Independent Software Maker. Building useful software products across desktop & mobile. 10yr full-stack veteran.",
  keywords: [
    "independent software maker",
    "indie developer",
    "desktop app",
    "web app",
    "mobile app",
    "full-stack",
  ],
  openGraph: {
    title: "About XiaoNiuBuNiu | Independent Software Maker",
    description:
      "Independent Software Maker. Building useful software products across desktop & mobile.",
    type: "profile",
  },
};

export default function AboutPage() {
  // 在制产品列表（数据驱动，新产品发布后此页自动更新）；已发布的排前面
  const statusPriority = (s: string) => (s === "released" || s === "active" ? 0 : 1);
  const shippedProducts = getAllProducts()
    .filter((p) => p.status !== "archived")
    .sort((a, b) => statusPriority(a.status) - statusPriority(b.status))
    .slice(0, 3);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "XiaoNiuBuNiu",
    url: "https://www.xiaoniubuniu.com/about",
    image: "https://www.xiaoniubuniu.com/images/common/photo-work.jpg",
    jobTitle: "Independent Software Maker",
    description:
      "Independent Software Maker building useful products across desktop & mobile. 10-year full-stack experience in Java, Android, Python, AI, embedded systems.",
    sameAs: [
      "https://github.com/xiaoyunchengzhu",
      "https://x.com/xiaoyunchengzhu",
    ],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "Android Development",
      "Python",
      "SwiftUI",
      "React",
      "Next.js",
      "AI Automation",
      "Embedded Systems",
      "IoT",
    ],
    email: "xiaoniubuniu@gmail.com",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
        About Me 🐂
      </h1>
      <p className="text-gray-500 text-center mb-12">
        Independent Software Maker · Building across desktop &amp; mobile
      </p>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left column */}
        <div className="md:w-2/5 flex-shrink-0 space-y-6">
          <div>
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/common/photo-work.jpg"
                alt="XiaoNiuBuNiu — indie developer at work"
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Want to collaborate?
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Building something interesting? Let&apos;s chat.
            </p>
            <a
              href="mailto:xiaoniubuniu@gmail.com"
              className="block text-sm text-center px-4 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
            >
              📧 Email Me
            </a>
            <p className="text-xs text-gray-400 mt-2 text-center">
              xiaoniubuniu@gmail.com
            </p>
          </div>

          {/* 微信二维码：面向中文读者的次级入口，降权置底 */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
            <div className="w-32 h-32 mx-auto bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/common/qrcode-wechat.jpg"
                alt="WeChat QR code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-500">
              WeChat (中文读者): <strong className="text-gray-700">小牛不牛</strong>
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-3/5 min-w-0 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Who I Am</h2>
            <p className="text-gray-600 leading-relaxed">
              I&apos;m XiaoNiuBuNiu — an independent developer. One person, shipping
              and owning my own apps, documenting the whole journey in public.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              Before going solo I spent 10 years as a full-stack engineer — Android
              apps, Java backends, C++ computer vision, even drones controlled with
              Raspberry Pi + Python. The proudest proof of going it alone: I once
              shipped{" "}
              <strong className="text-gray-900">100 white-label apps on a unified
              backend, single-handedly</strong>
              . The point was never the breadth of the stack — it&apos;s that one
              person can carry an entire product line.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              In 2026 I quit my job to build for myself. No hype, no pretense.
              Everything I&apos;ve shipped so far works entirely on your device —
              no accounts, no cloud servers.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mt-3">
              The stack behind these apps: SwiftUI &amp; AppKit, Java &amp; Kotlin,
              TypeScript &amp; Next.js, Python.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              What I&apos;m Building
            </h2>
            <ul className="space-y-3">
              {shippedProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-brand-orange transition-colors"
                  >
                    {product.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.icon}
                        alt=""
                        className="w-9 h-9 rounded-lg border border-gray-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0">
                        {product.title.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {product.title}
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {statusLabels[product.status] || product.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-3">
              macOS and Android today; iOS and Windows on the roadmap.{" "}
              <Link href="/products" className="text-brand-orange hover:underline">
                All products →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Building in Public
            </h2>
            <p className="text-gray-600 leading-relaxed">
              I write down the real numbers and the real struggles: products
              shipped, builds from 0 to 1, revenue breakdowns, and the mistakes
              along the way. Everything lands on{" "}
              <a href="/blog" className="text-brand-orange hover:underline">
                the blog
              </a>{" "}
              first —{" "}
              <a href="/feed.xml" className="text-brand-orange hover:underline">
                subscribe via RSS
              </a>{" "}
              so you don&apos;t miss the next one.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <ul className="text-gray-600 space-y-2">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:xiaoniubuniu@gmail.com"
                  className="text-brand-orange hover:underline"
                >
                  xiaoniubuniu@gmail.com
                </a>
              </li>
              <li>
                💬 WeChat:{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                  xiaoyunchengzhu
                </code>{" "}
                <span className="text-xs text-gray-400">
                  (中文读者可通过微信联系)
                </span>
              </li>
              <li>
                🛟 Product help:{" "}
                <Link href="/support" className="text-brand-orange hover:underline">
                  Support page
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
