import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xiaoniubuniu.com"),
  title: {
    default: "XiaoNiuBuNiu — Independent Software Maker",
    template: "%s | XiaoNiuBuNiu",
  },
  description:
    "Independent Software Maker. I build useful software products across desktop & mobile. 10yr full-stack veteran. Building in public — real stories, real products.",
  keywords: ["independent software maker", "indie developer", "desktop app", "web app", "mobile app", "full-stack"],
  authors: [{ name: "XiaoNiuBuNiu" }],
  // canonical 不在根布局声明：会被所有子页继承，导致文章页全被判定为首页重复页；
  // 各页面在自身 metadata 里声明自己的 canonical
  // 默认社交分享图：子页未声明 images 时继承这张（工作照）
  openGraph: {
    title: "XiaoNiuBuNiu — Independent Software Maker",
    description:
      "Independent Software Maker. Building useful software products across desktop & mobile.",
    url: "https://www.xiaoniubuniu.com",
    type: "website",
    locale: "en_US",
    siteName: "XiaoNiuBuNiu",
    images: [{ url: "/images/common/photo-work.jpg", alt: "XiaoNiuBuNiu — Independent Software Maker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "XiaoNiuBuNiu — Independent Software Maker",
    description:
      "Independent Software Maker. Building useful software products across desktop & mobile.",
    images: ["/images/common/photo-work.jpg"],
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
    <html lang="en">
      <head>
        {/* Google Tag Manager 容器（GTM-5XKJJ43V）：根布局一次注入，覆盖全站每个页面。
            标签（GA4 等）在 GTM 控制台配置；内容为固定字面量，无外部输入 */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-5XKJJ43V"
        ></script>
        {/* Consent Mode：在 gtm.js（async）执行前先把同意状态置入 dataLayer。
            默认 denied；仅当本机 localStorage 里已点过 Accept 才置 granted。
            键名与 CookieConsent.tsx 的 CONSENT_KEY 保持一致（此处是内联字符串，无法 import） */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}var ac='denied';try{if(localStorage.getItem('xiaoniubuniu-analytics-consent')==='granted')ac='granted';}catch(e){}gtag('consent','default',{ad_storage:'denied',analytics_storage:ac});gtag('js', new Date());",
          }}
        />
        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "XiaoNiuBuNiu",
              url: "https://www.xiaoniubuniu.com",
              description:
                "Independent Software Maker. Building useful software products across desktop & mobile.",
              author: {
                "@type": "Person",
                name: "XiaoNiuBuNiu",
                url: "https://www.xiaoniubuniu.com/about",
                sameAs: [
                  "https://github.com/xiaoyunchengzhu",
                  "https://x.com/xiaoyunchengzhu",
                ],
                jobTitle: "Independent Software Maker",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
