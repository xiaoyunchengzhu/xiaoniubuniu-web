import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于这头牛",
  description:
    "小牛不牛，10年全栈老兵，离职继续创业。安卓、Java后端、嵌入式、小程序都能搞，一个人扛一整条产品线。",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* 页面标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        关于这头牛 🐂
      </h1>

      {/* 两栏布局 */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* 左栏：照片 + 公众号二维码 */}
        <div className="md:w-2/5 flex-shrink-0 space-y-6">
          {/* 工作场景照片 */}
          {/* 请将照片保存为 public/images/photo-work.jpg */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/photo-work.jpg"
                alt="小牛不牛工作场景"
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
          </div>

          {/* 公众号二维码 */}
          {/* 请将你的公众号二维码图片保存为 public/images/qrcode-wechat.jpg */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
            <div className="w-40 h-40 mx-auto bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/qrcode-wechat.jpg"
                alt="公众号「小牛不牛」二维码"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              （将二维码图片保存为 public/images/qrcode-wechat.jpg）
            </p>
            <p className="text-xs text-gray-500">
              扫码关注公众号 <strong className="text-gray-700">小牛不牛</strong>
            </p>
          </div>
        </div>

        {/* 右栏：文字内容 */}
        <div className="md:w-3/5 space-y-8">
          {/* ===== 我是谁 ===== */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">我是谁</h2>
            <p className="text-gray-600 leading-relaxed">
              小牛不牛，10年全栈老兵，离职继续创业。
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              做过安卓、Java后端、C++视觉，甚至用树莓派+Python控过无人机。
              从房地产APP干到P2P，从相机底层SDK写到车载辅助驾驶，还一个人撸过100个矩阵APP加统一后台。
              技术栈杂，但胜在能一个人扛起一整条产品线——前端、后端、安卓、嵌入式，连打包加固脚本都自己写。
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              2026年，辞了职，开始自己创业。
              不画饼，不装大牛。先接单养活自己，再慢慢打磨自己的产品。
            </p>
          </section>

          {/* ===== 我能干什么 ===== */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">我能干什么</h2>
            <p className="text-sm text-gray-500 mb-4">
              如果你需要一个能独立搞定整包的技术外援，我大概能帮上忙：
            </p>
            <dl className="space-y-3 text-sm text-gray-600">
              {[
                {
                  term: "安卓开发",
                  desc: "原生 Java/Kotlin，混合框架调优，性能优化，SDK 开发",
                },
                {
                  term: "Java 后端",
                  desc: "Spring Boot 体系，高并发微服务，矩阵应用后台",
                },
                {
                  term: "小程序 / 前端",
                  desc: "微信小程序、Vue/React 前端，AI 加持下出活飞快",
                },
                {
                  term: "计算机视觉",
                  desc: "RK3588 上的 YOLO 模型部署，火焰烟雾识别等模型训练和系统开发",
                },
                {
                  term: "嵌入式 / 物联网",
                  desc: "树莓派、ESP32，折腾过室内麦克风无人机定位，各类传感器控制，物联网平台系统开发",
                },
                {
                  term: "Vibe Coding",
                  desc: "给我一个 需求，一两天还你一个 App",
                },
                {
                  term: "大模型应用 & 自动化",
                  desc: "企业知识库搭建，流程自动化，AI 工具链",
                },
              ].map(({ term, desc }) => (
                <div key={term} className="flex gap-2">
                  <dt className="font-semibold text-gray-900 min-w-[120px]">
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
              重启了停更多年的博客和 GitHub，开始公开记录&ldquo;独立开发+出海&rdquo;的全过程。
              写的东西可能不高级，但真实：踩坑、接单、产品从0到1、收入复盘。
              想让别人看到，一个普通程序员靠自己能不能走出一条路。
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              公众号{" "}
              <strong className="text-gray-900">小牛不牛</strong>{" "}
              同步更新，欢迎围观、指路、甚至合作。
            </p>
          </section>

          {/* ===== 联系方式 ===== */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">联系方式</h2>
            <p className="text-sm text-gray-500 mb-3">
              如果你正好需要技术外援，或者也在折腾自己的事，欢迎留言或直接邮件来聊。
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
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-block text-sm px-5 py-2.5 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
              >
                直接联系我 →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
