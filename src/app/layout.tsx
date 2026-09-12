import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      </body>
    </html>
  );
}
