import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于小牛不牛 | 10年全栈独立开发者 | 技术背景 & 接单服务",
  description:
    "小牛不牛，10年全栈老兵（Java/Android/Python/AI/嵌入式），远程接单和独立开发中。做过安卓、P2P、相机SDK、车载辅助驾驶、100个矩阵APP。现在提供MVP开发、AI自动化、后端开发服务。",
  keywords: [
    "全栈开发者",
    "独立开发者",
    "freelance developer",
    "Java开发",
    "Android开发",
    "远程开发",
    "hire developer China",
  ],
  openGraph: {
    title: "关于小牛不牛 | 10年全栈独立开发者",
    description:
      "10年全栈老兵，从安卓写到AI，从后端写到嵌入式。一个人扛一整条产品线。远程接单，按项目交付。",
    type: "profile",
  },
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "小牛不牛",
    url: "https://www.xiaoniubuniu.com/about",
    image: "https://www.xiaoniubuniu.com/images/common/photo-work.jpg",
    jobTitle: "全栈独立开发者",
    description:
      "10年全栈开发经验，擅长Java/Spring Boot、Android、Python、AI应用、嵌入式开发。远程接单，提供MVP开发、后端系统、AI自动化服务。",
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
      "React",
      "Next.js",
      "AI Automation",
      "Embedded Systems",
      "IoT",
      "Computer Vision",
    ],
    email: "xiaoyunchengzhu@gmail.com",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* JSON-LD Person 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* 页面标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
        关于这头牛 🐂
      </h1>
      <p className="text-gray-500 text-center mb-12">
        10 年全栈老兵，远程独立开发者，接单 & 创业中
      </p>

      {/* 两栏布局 */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* 左栏：照片 + 公众号二维码 */}
        <div className="md:w-2/5 flex-shrink-0 space-y-6">
          {/* 工作场景照片 */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/common/photo-work.jpg"
                alt="小牛不牛 — 全栈独立开发者工作场景"
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
          </div>

          {/* 公众号二维码 */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
            <div className="w-40 h-40 mx-auto bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/common/qrcode-wechat.jpg"
                alt="公众号「小牛不牛」二维码"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              （将二维码图片保存为 public/images/common/qrcode-wechat.jpg）
            </p>
            <p className="text-xs text-gray-500">
              扫码关注公众号{" "}
              <strong className="text-gray-700">小牛不牛</strong>
            </p>
          </div>

          {/* 快速联系 */}
          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              需要技术外援？
            </p>
            <p className="text-xs text-gray-500 mb-3">
              接单、合作、合伙，小活儿大活儿都可以聊。先沟通需求，免费评估报价。
            </p>
            <a
              href="mailto:xiaoyunchengzhu@gmail.com"
              className="block text-sm text-center px-4 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
            >
              📧 发邮件给我
            </a>
            <p className="text-xs text-gray-400 mt-2 text-center">
              xiaoyunchengzhu@gmail.com
            </p>
          </div>
        </div>

        {/* 右栏：文字内容 */}
        <div className="md:w-3/5 space-y-10">
          {/* ===== 我是谁 ===== */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">我是谁</h2>
            <p className="text-gray-600 leading-relaxed">
              小牛不牛，10 年全栈老兵，远程独立开发中。
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              做过安卓、Java 后端、C++ 视觉，甚至用树莓派 + Python 控过无人机。
              从房地产 APP 干到 P2P，从相机底层 SDK 写到车载辅助驾驶，还一个人撸过 100
              个矩阵 APP 加统一后台。
              技术栈杂，但胜在能一个人扛起一整条产品线——前端、后端、安卓、嵌入式，连打包加固脚本都自己写。
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              2026 年辞了职，开始自己创业。不画饼，不装大牛。先接单养活自己，再慢慢打磨
              <a
                href="/products"
                className="text-brand-orange hover:underline"
              >
                自己的产品
              </a>
              。
            </p>
          </section>

          {/* ===== 我能干什么 ===== */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              技术能力 & 接单范围
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              以下能力均可远程交付，按项目或按人天收费。详情见
              <a
                href="/services"
                className="text-brand-orange hover:underline"
              >
                服务页
              </a>
              。
            </p>
            <dl className="space-y-3 text-sm text-gray-600">
              {[
                {
                  term: "安卓开发",
                  desc: "原生 Java/Kotlin，混合框架调优，性能优化，SDK 开发",
                },
                {
                  term: "Java 后端",
                  desc: "Spring Boot 体系，高并发微服务，矩阵应用后台，API 开发",
                },
                {
                  term: "小程序 / 前端",
                  desc: "微信小程序、Vue / React / Next.js 前端，AI 加持下出活飞快",
                },
                {
                  term: "Python & AI",
                  desc: "FastAPI 后端，LLM 应用 / RAG / 企业知识库，AI 工作流自动化",
                },
                {
                  term: "计算机视觉",
                  desc: "RK3588 YOLO 模型部署，火焰烟雾识别，360 全景拼接",
                },
                {
                  term: "嵌入式 / IoT",
                  desc: "树莓派、ESP32、无人机定位、传感器控制、物联网平台",
                },
                {
                  term: "Vibe Coding",
                  desc: "给我需求，一两天还你一个 App。Claude Code + 10 年经验 = 3-5 倍开发速度",
                },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-2">
                  <dt className="font-semibold text-gray-900 min-w-[130px]">
                    {term}：
                  </dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ===== 我在干嘛 ===== */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">我在干嘛</h2>
            <p className="text-gray-600 leading-relaxed">
              重启了停更多年的博客和 GitHub，开始公开记录「独立开发 + 出海」的全过程。
              写的东西可能不高级，但真实：踩坑、接单、产品从 0 到 1、收入复盘。
              想让别人看到，一个普通程序员靠自己能不能走出一条路。
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              所有文章首发在
              <a href="/blog" className="text-brand-orange hover:underline">
                博客
              </a>
              ，公众号{" "}
              <strong className="text-gray-900">小牛不牛</strong>{" "}
              同步更新。欢迎围观、指路、甚至合作。
            </p>
          </section>

          {/* ===== 联系方式 ===== */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">联系方式</h2>
            <p className="text-sm text-gray-500 mb-3">
              如果你正好需要技术外援，或者也在折腾自己的事，欢迎直接联系。
              接单、合作、合伙，小活儿大活儿，咱都可以谈。
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>
                📧 邮箱：{" "}
                <a
                  href="mailto:xiaoyunchengzhu@gmail.com"
                  className="text-brand-orange hover:underline"
                >
                  xiaoyunchengzhu@gmail.com
                </a>
              </li>
              <li>
                💬 微信：{" "}
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
