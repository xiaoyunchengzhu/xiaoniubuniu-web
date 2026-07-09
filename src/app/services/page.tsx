import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "远程技术开发服务 | 全栈开发者接单 | MVP开发 | 小牛不牛",
  description:
    "10年全栈开发者提供远程定制开发、AI自动化、MVP极速开发服务。Java/Python/React/Next.js/Android，按项目或人天收费，可签合同开发票。从想法到上线，一个人全栈交付。",
  keywords: [
    "远程开发",
    "全栈开发者",
    "MVP开发",
    "AI自动化",
    "外包开发",
    "freelance developer",
    "hire developer",
    "Java开发",
    "Spring Boot",
  ],
  openGraph: {
    title: "远程全栈开发服务 | 接单 & 技术合作 | 小牛不牛",
    description:
      "10年全栈老兵，一个人扛一整条产品线。MVP开发、AI自动化、后端系统、小程序，按需雇佣。",
  },
};

// 核心服务 Offer（精简为 3 个，商业价值导向）
const coreServices = [
  {
    emoji: "🚀",
    title: "MVP 极速开发",
    description:
      "你有想法，我 1-3 周内做出能用的产品。适合想快速验证市场、给投资人 demo、或者先跑起来再迭代的创业者和非技术创始人。覆盖 Web App、移动端、小程序。",
  },
  {
    emoji: "🤖",
    title: "AI 自动化 & 系统集成",
    description:
      "企业知识库搭建、工作流自动化、AI 客服、数据管道。把你的业务流程从人工变成自动，省人力、提效率。LLM / RAG / FastAPI 技术栈。",
  },
  {
    emoji: "☕",
    title: "后端 & 全栈开发",
    description:
      "Spring Boot / FastAPI / Node.js 后端系统，数据库设计，API 开发，第三方集成。如果你已有前端或 App，我负责后端；如果你什么都没有，我全栈交付。",
  },
];

// 技术能力（一行描述 + 关键词）
const techStack = [
  { name: "后端", skills: "Java / Spring Boot / FastAPI / Python / Node.js" },
  { name: "前端", skills: "React / Next.js / Vue / TypeScript / Tailwind" },
  { name: "移动端", skills: "Android 原生 / Kotlin / Flutter / 小程序" },
  { name: "AI & 数据", skills: "LLM 应用 / RAG / 知识库 / 爬虫 / 数据处理" },
  { name: "嵌入式 & IoT", skills: "ESP32 / Raspberry Pi / MQTT / 传感器" },
  { name: "DevOps", skills: "Docker / Linux / Cloudflare / CI/CD" },
];

// 常见问题
const faqs = [
  {
    q: "怎么收费？",
    a: "按项目固定报价或按人天计费，具体看需求复杂度。远程协作，可签合同、可开发票。先在需求沟通阶段出免费评估和报价，不合适不要钱。",
  },
  {
    q: "你一个人能搞定整个项目吗？",
    a: "能。10 年经验覆盖前端、后端、移动端、嵌入式，大部分中小型项目不需要多人协作。我一个人扛一整条产品线，你不需要找 3 个人分别干不同的事。",
  },
  {
    q: "能接多长期的项目？",
    a: "短期（1-3 周 MVP）到长期（按月合作的技术合伙人模式）都接。也接受按阶段交付：先做 MVP 验证，跑通了再迭代。",
  },
  {
    q: "远程怎么保证进度？",
    a: "每天同步进度，你随时能看到当前版本的演示。用 GitHub 管理代码 + 即时通讯保持联系。两周内不满意可以终止合作。",
  },
];

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "全栈开发 & AI 自动化服务",
    provider: {
      "@type": "Person",
      name: "小牛不牛",
    },
    serviceType: "Software Development, AI Automation, MVP Development",
    areaServed: "Worldwide",
    description:
      "10年全栈开发者提供远程定制开发服务：MVP极速开发、AI自动化、后端系统。Java/Python/React/Android，按项目交付。",
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: 500,
        maxPrice: 10000,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===== Hero ===== */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          远程全栈开发服务
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          10 年经验，一个人扛一整条产品线。从后端到前端，从 App 到嵌入式，从接单到长期合作——
          <strong className="text-gray-700">你只需要我一个技术外援。</strong>
        </p>
      </section>

      {/* ===== 核心服务 Offer ===== */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          我能帮你做什么
        </h2>
        <p className="text-gray-500 text-center mb-8">
          三个核心方向，覆盖 90% 的非技术创始人需求
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {coreServices.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-3">{s.emoji}</span>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500 flex-1 leading-relaxed">
                {s.description}
              </p>
              <div className="mt-4">
                <a
                  href="mailto:xiaoyunchengzhu@gmail.com"
                  className="inline-block text-sm px-4 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
                >
                  聊聊需求 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 更多能力 ===== */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          更多技术能力
        </h2>
        <p className="text-gray-500 text-center mb-8">
          除了上面三个核心方向，这些领域我也能直接上手
        </p>
        <div className="max-w-2xl mx-auto grid gap-3 sm:grid-cols-2">
          {techStack.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
            >
              <span className="text-sm font-semibold text-gray-900">
                {t.name}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">{t.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 合作方式 ===== */}
      <section className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          三种合作方式
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "项目制",
              desc: "明确需求 → 评估工期和价格 → 签合同 → 开发交付。适合需求清晰的短期项目。",
            },
            {
              title: "人天制",
              desc: "按天计费，远程协作。适合需求会动态调整、希望灵活控制节奏的项目。",
            },
            {
              title: "技术合伙人",
              desc: "你出想法和行业资源，我负责全套技术。按收益分成或股权合作，长期绑定。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 我的工作流程 ===== */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          怎么开始合作
        </h2>
        <div className="max-w-3xl mx-auto grid gap-4">
          {[
            {
              step: "1",
              title: "你把需求发过来",
              desc: "邮件或微信描述你要做什么。不用很正式，一句话也行。我会在 24 小时内回复。",
            },
            {
              step: "2",
              title: "我出评估和报价",
              desc: "告诉你技术上能不能做、预计多久、大概多少钱。免费评估，不收费。",
            },
            {
              step: "3",
              title: "签合同开工",
              desc: "明确需求和交付标准后签合同，开始开发。每天同步进度，你随时能看到当前版本。",
            },
            {
              step: "4",
              title: "交付 & 维护",
              desc: "完成后部署上线，免费维护 30 天。后续迭代或新需求另议。",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          常见问题
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border border-gray-200 rounded-xl p-5"
            >
              <summary className="font-medium text-gray-900 cursor-pointer list-none">
                {faq.q}
              </summary>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== 底部 CTA ===== */}
      <section className="text-center bg-gray-50 rounded-2xl py-12 px-6">
        <p className="text-lg text-gray-600 mb-3">
          不知道你的需求属于哪一类？没关系。
        </p>
        <p className="text-gray-500 mb-6">
          直接把想法发到{" "}
          <a
            href="mailto:xiaoyunchengzhu@gmail.com"
            className="text-brand-orange font-medium hover:underline"
          >
            xiaoyunchengzhu@gmail.com
          </a>
          ，我告诉你能不能做、要多久、多少钱。
        </p>
        <a
          href="mailto:xiaoyunchengzhu@gmail.com"
          className="inline-block text-lg px-8 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-orange-200"
        >
          📮 把需求发过来
        </a>
        <p className="text-xs text-gray-400 mt-4">
          24 小时内回复 · 不收费 · 不合适可以不做
        </p>
      </section>
    </div>
  );
}
