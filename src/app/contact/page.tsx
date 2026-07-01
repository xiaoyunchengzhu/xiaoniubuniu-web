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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        来，聊个五毛钱的 😄
      </h1>

      <p className="text-gray-500 text-center mb-12 leading-relaxed">
        如果你正好需要技术外援，或者也在折腾自己的事，欢迎直接联系。
        接单、合作、合伙，小活儿大活儿，咱都可以谈。
      </p>

      {/* 联系方式 */}
      <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 mb-10">
        <div className="grid gap-8 md:grid-cols-2">
          {/* 邮箱 */}
          <div>
            <span className="text-sm text-gray-500">📧 邮箱</span>
            <p className="mt-1">
              <a
                href="mailto:xiaoyunchengzhu@gmail.com"
                className="text-brand-orange font-medium hover:underline"
              >
                xiaoyunchengzhu@gmail.com
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              点击直接发送邮件
            </p>
          </div>

          {/* 微信二维码 */}
          {/* 请将微信二维码图片保存为 public/images/qrcode-wechat-contact.jpg */}
          <div>
            <span className="text-sm text-gray-500">💬 微信</span>
            <div className="w-32 h-32 mt-2 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/qrcode-wechat-contact.jpg"
                alt="微信二维码 xiaoyunchenegzhu"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              微信号：xiaoyunchenegzhu
            </p>
          </div>
        </div>
      </div>

      {/* 社交媒体 */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          也可以在这些地方找到我
        </h3>
        <div className="flex items-center justify-center gap-5">
          <a
            href="https://github.com/xiaoyunchengzhu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://x.com/xiaoyunchengzhu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="X (Twitter)"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://www.zhihu.com/people/zhang-shi-yu-5-24"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="知乎"
          >
            <SiZhihu size={28} />
          </a>
          <span
            className="text-gray-400 cursor-default"
            title="微信号：xiaoyunchenegzhu"
            aria-label="微信"
          >
            <FaWeixin size={28} />
          </span>
        </div>
      </div>
    </div>
  );
}
