import { FaGithub, FaTwitter, FaWeixin } from "react-icons/fa";
import { SiZhihu } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} 小牛不牛 | Powered by Next.js &amp; Cloudflare
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/xiaoyunchengzhu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://x.com/xiaoyunchengzhu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="X (Twitter)"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.zhihu.com/people/zhang-shi-yu-5-24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="知乎"
            >
              <SiZhihu size={20} />
            </a>
            <span
              className="text-gray-400 cursor-default"
              title="微信号：xiaoyunchenegzhu"
              aria-label="微信"
            >
              <FaWeixin size={20} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
