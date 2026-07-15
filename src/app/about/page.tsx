import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About XiaoNiuBuNiu | Indie App Developer | 10yr Full-Stack",
  description:
    "XiaoNiuBuNiu — 10-year full-stack developer turned indie app maker. Built Android apps, Java backends, computer vision, embedded systems. Now shipping Mac & iOS apps solo.",
  keywords: [
    "indie developer",
    "Mac app developer",
    "iOS developer",
    "full-stack developer",
    "SwiftUI",
    "solo developer",
  ],
  openGraph: {
    title: "About XiaoNiuBuNiu | Indie Mac & iOS Developer",
    description:
      "10yr full-stack veteran building Mac & iOS apps solo. No team, no VC — just one person shipping products.",
    type: "profile",
  },
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "XiaoNiuBuNiu",
    url: "https://www.xiaoniubuniu.com/about",
    image: "https://www.xiaoniubuniu.com/images/common/photo-work.jpg",
    jobTitle: "Indie App Developer",
    description:
      "10-year full-stack developer building indie Mac & iOS apps. Experienced in Java/Spring Boot, Android, Python, AI, embedded systems.",
    sameAs: [
      "https://github.com/xiaoyunchengzhu",
      "https://x.com/xiaoyunchengzhu",
      "https://www.zhihu.com/people/zhang-shi-yu-5-24",
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
    email: "xiaoyunchengzhu@gmail.com",
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
        10yr full-stack veteran · Indie Mac &amp; iOS Developer · Building in Public
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

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
            <div className="w-40 h-40 mx-auto bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/common/qrcode-wechat.jpg"
                alt="WeChat QR code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-500">
              Follow on WeChat: <strong className="text-gray-700">小牛不牛</strong>
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Want to collaborate?
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Building something interesting? Let&apos;s chat.
            </p>
            <a
              href="mailto:xiaoyunchengzhu@gmail.com"
              className="block text-sm text-center px-4 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
            >
              📧 Email Me
            </a>
            <p className="text-xs text-gray-400 mt-2 text-center">
              xiaoyunchengzhu@gmail.com
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-3/5 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Who I Am</h2>
            <p className="text-gray-600 leading-relaxed">
              XiaoNiuBuNiu — a 10-year full-stack veteran, now building indie apps solo.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              I&apos;ve built Android apps, Java backends, C++ computer vision systems, and even controlled drones with Raspberry Pi + Python.
              From real estate apps to P2P platforms, from camera SDKs to automotive ADAS — I once shipped 100 white-label apps with a unified backend single-handedly.
              My stack is broad, but the point is: I can carry an entire product line alone.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              In 2026 I quit my job to build for myself. No hype, no pretense.
              Now shipping
              {" "}
              <a href="/products" className="text-brand-orange hover:underline">
                my own apps
              </a>
              {" "}
              — starting with Mac, expanding to iOS and beyond.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What I Can Do</h2>
            <p className="text-sm text-gray-500 mb-4">
              These skills power my indie app development.
            </p>
            <dl className="space-y-3 text-sm text-gray-600">
              {[
                { term: "Mac / iOS", desc: "SwiftUI, AppKit, native macOS & iOS app development" },
                { term: "Android", desc: "Native Java/Kotlin, hybrid frameworks, performance optimization, SDK development" },
                { term: "Java Backend", desc: "Spring Boot, high-concurrency microservices, API development" },
                { term: "Web Frontend", desc: "React / Next.js / Vue / TypeScript, SSR & SSG" },
                { term: "Python & AI", desc: "FastAPI, LLM apps / RAG, enterprise knowledge bases, AI workflow automation" },
                { term: "Computer Vision", desc: "YOLO model deployment on RK3588, fire/smoke detection, 360° panorama stitching" },
                { term: "Embedded / IoT", desc: "Raspberry Pi, ESP32, sensor control, IoT platforms" },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-2">
                  <dt className="font-semibold text-gray-900 min-w-[130px]">{term}:</dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What I&apos;m Doing Now</h2>
            <p className="text-gray-600 leading-relaxed">
              Revived my long-dormant blog and GitHub to publicly document the indie dev journey.
              What I write isn&apos;t fancy, but it&apos;s real: the struggles, the products shipped, building from 0 to 1, and revenue breakdowns.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              All posts on{" "}
              <a href="/blog" className="text-brand-orange hover:underline">the blog</a>
              {" "}and on WeChat{" "}
              <strong className="text-gray-900">小牛不牛</strong>.
              Follow along, or reach out to collaborate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p className="text-sm text-gray-500 mb-3">
              Building something interesting? Have a collaboration idea? Let&apos;s talk.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:xiaoyunchengzhu@gmail.com"
                  className="text-brand-orange hover:underline"
                >
                  xiaoyunchengzhu@gmail.com
                </a>
              </li>
              <li>
                💬 WeChat:{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                  xiaoyunchenegzhu
                </code>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
