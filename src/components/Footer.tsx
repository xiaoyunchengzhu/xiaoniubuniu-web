import Link from "next/link";
import { FaGithub, FaTwitter, FaWeixin } from "react-icons/fa";
import { LuRss } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} XiaoNiuBuNiu &mdash; Independent Software Maker
          </p>
          <p className="text-xs text-gray-400">
            Built with Next.js &amp; Cloudflare
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
              href="/feed.xml"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="RSS feed"
            >
              <LuRss size={20} />
            </a>
            <span
              className="text-gray-400 cursor-default"
              title="WeChat: xiaoyunchengzhu"
              aria-label="WeChat"
            >
              <FaWeixin size={20} />
            </span>
          </div>
        </div>

        {/* 次级页面链接 */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-400">
          <Link href="/support" className="hover:text-gray-600 transition-colors">
            Support
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">
            Privacy Policy
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
