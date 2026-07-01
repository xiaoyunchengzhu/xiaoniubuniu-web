import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务与合作",
  description:
    "10年Java全栈老兵提供定制开发、技术咨询、合作孵化服务。从后端到前端，从手机到嵌入式，从接单到合伙，咱都可以聊。",
};

// 定制开发服务列表
const devServices = [
  {
    emoji: "☕",
    title: "Java/Spring Boot 后端系统",
    description:
      "企业管理系统、SaaS 后台、微服务架构、数据库设计、第三方 API 集成。",
  },
  {
    emoji: "🌐",
    title: "Web 前端开发",
    description:
      "Vue / React / Next.js 单页应用或服务端渲染网站，SEO 友好，性能优化。",
  },
  {
    emoji: "📱",
    title: "App 开发",
    description:
      "原生 Android（Java/Kotlin），或跨平台方案（Flutter / React Native），上架应用市场。",
  },
  {
    emoji: "💬",
    title: "微信小程序 / 企业微信应用",
    description: "商城、预约系统、内部工具，含支付、消息模板等整套方案。",
  },
  {
    emoji: "🔌",
    title: "嵌入式 / 物联网应用",
    description:
      "Raspberry Pi、ESP32、边缘设备数据采集，配合 Java 后端做物联网平台。",
  },
  {
    emoji: "🕷️",
    title: "爬虫与数据处理",
    description:
      "分布式爬虫、数据清洗、可视化，适合出海竞品分析或数据服务。",
  },
];

// 合作孵化列表
const partnerServices = [
  {
    emoji: "🚀",
    title: "独立产品联合开发",
    description:
      "你出想法和行业 know-how，我负责全套技术实现，收益按约定分成。",
  },
  {
    emoji: "🔧",
    title: "开源项目商业包装",
    description:
      "将成熟的开源项目二次开发、包装成 SaaS 服务，共同推向市场。",
  },
  {
    emoji: "🎮",
    title: "出海工具 / 小游戏合伙",
    description:
      "快速验证市场需求，用最小成本开发 MVP，一起跑出海赛道。",
  }
];

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* 页面标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        我能帮你搞定什么？
      </h1>
      <p className="text-gray-500 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
        10 年 Java 全栈老兵，从后端到前端，从手机到嵌入式，从接单到合伙，咱都可以聊。
      </p>

      {/* 板块一：定制开发 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🛠️ 定制开发（接单干活儿）
        </h2>
        <p className="text-gray-500 mb-8">
          你有想法，我来实现。纯远程协作，按项目或按人天收费，可签合同、可开发票。
        </p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {devServices.map((service) => (
            <ServiceCard
              key={service.title}
              emoji={service.emoji}
              title={service.title}
              description={service.description}
              buttonText="聊聊需求"
            />
          ))}
        </div>
      </section>

      {/* 分割线 */}
      <div className="my-16 border-t border-gray-200" />

      {/* 板块二：合作孵化 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🤝 合作孵化 & 合伙项目（利益共享）
        </h2>
        <p className="text-gray-500 mb-8">
          除了纯接单，我也在找有前景的产品方向。如果你有好的想法、行业资源或运营能力，我可以技术入股或共同开发，利益分成好商量。
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {partnerServices.map((service) => (
            <ServiceCard
              key={service.title}
              emoji={service.emoji}
              title={service.title}
              description={service.description}
              buttonText="聊聊合作"
            />
          ))}
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="mt-16 text-center bg-gray-50 rounded-2xl py-12 px-6">
        <p className="text-lg text-gray-600 mb-6">
          不想看这么多？直接告诉我你的需求，我能搞定就接，搞不定帮你指条路。
        </p>
        <Link
          href="/contact"
          className="inline-block text-lg px-8 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-orange-200"
        >
          📮 把需求砸过来
        </Link>
      </section>
    </div>
  );
}
