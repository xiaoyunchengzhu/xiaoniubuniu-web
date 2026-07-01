import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xiaoniubuniu.com"),
  title: {
    default: "小牛不牛 — 农村全栈老兵的出海折腾日记",
    template: "%s | 小牛不牛",
  },
  description:
    "10年Java+前端+安卓全栈独立开发者，在农村全职做出海。分享独立开发日记、出海建站实战、工具箱推荐。",
  keywords: ["独立开发", "出海", "全栈", "Java", "Next.js", "建站"],
  authors: [{ name: "小牛不牛" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "小牛不牛 — 农村全栈老兵的出海折腾日记",
    description:
      "10年全栈独立开发者，在农村全职做出海。只讲实战，不扯虚的。",
    url: "https://www.xiaoniubuniu.com",
    type: "website",
    locale: "zh_CN",
    siteName: "小牛不牛",
  },
  twitter: {
    card: "summary",
    title: "小牛不牛 — 农村全栈老兵的出海折腾日记",
    description:
      "10年全栈独立开发者，在农村全职做出海。只讲实战，不扯虚的。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "小牛不牛",
              url: "https://www.xiaoniubuniu.com",
              description:
                "10年全栈独立开发者，在农村全职做出海。分享独立开发日记、出海建站实战、工具箱推荐。",
              author: {
                "@type": "Person",
                name: "小牛不牛",
                url: "https://www.xiaoniubuniu.com/about",
                sameAs: [
                  "https://github.com/xiaoyunchengzhu",
                  "https://x.com/xiaoyunchengzhu",
                  "https://www.zhihu.com/people/zhang-shi-yu-5-24",
                ],
                jobTitle: "全栈独立开发者",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
