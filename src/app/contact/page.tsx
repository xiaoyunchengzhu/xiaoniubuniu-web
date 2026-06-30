import type { Metadata } from "next";
import { FaGithub, FaTwitter, FaWeixin } from "react-icons/fa";
import { SiZhihu } from "react-icons/si";

export const metadata: Metadata = {
  title: "联系我",
  description:
    "想聊合作、咨询技术方案，或者只是想打个招呼？欢迎随时联系。",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        来，聊个五毛钱的 😄
      </h1>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* 左：联系表单 */}
        <div className="md:w-3/5">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            发送消息
          </h2>

          {/* 表单：UI 先行，功能后续接入 Formspree / Web3Forms */}
          <form
            action="https://formspree.io/f/placeholder"
            method="POST"
            className="space-y-5"
          >
            {/* 姓名 */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="你的名字"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-shadow text-gray-900"
              />
            </div>

            {/* 邮箱 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-shadow text-gray-900"
              />
            </div>

            {/* 需求描述 */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                需求描述
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="说说你遇到的坑、想做的东西，或者随便聊聊..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-shadow resize-y text-gray-900"
              />
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange-dark transition-colors shadow-md"
            >
              发送消息
            </button>

            {/* 提示 */}
            <p className="text-xs text-gray-400 mt-2">
              （表单功能待接入 Formspree 或 Web3Forms，请先使用右侧联系方式）
            </p>
          </form>
        </div>

        {/* 右：联系方式 */}
        <div className="md:w-2/5">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            直接联系
          </h2>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-sm text-gray-500">📧 邮箱</span>
                <p className="text-gray-900 font-medium mt-1">
                  xiaoyunchengzhu@gmail.com
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">💬 微信</span>
                <p className="text-gray-900 font-medium mt-1">
                  xiaoyunchenegzhu
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              更推荐直接发邮件或微信，回复更快。
            </p>
          </div>

          {/* 社交媒体 */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              也可以在这些地方找到我
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/xiaoyunchengzhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://x.com/xiaoyunchengzhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="X (Twitter)"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.zhihu.com/people/zhang-shi-yu-5-24"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="知乎"
              >
                <SiZhihu size={24} />
              </a>
              <span
                className="text-gray-400 cursor-default"
                title="微信号：xiaoyunchenegzhu"
                aria-label="微信"
              >
                <FaWeixin size={24} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
