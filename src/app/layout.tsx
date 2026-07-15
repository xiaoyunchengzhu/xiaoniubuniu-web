import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xiaoniubuniu.com"),
  title: {
    default: "XiaoNiuBuNiu — Indie Mac & iOS App Developer",
    template: "%s | XiaoNiuBuNiu",
  },
  description:
    "Indie developer building Mac & iOS apps solo. 10yr full-stack veteran. Building in public — real stories, real products.",
  keywords: ["indie developer", "Mac app", "iOS app", "full-stack", "SwiftUI", "solo developer"],
  authors: [{ name: "XiaoNiuBuNiu" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "XiaoNiuBuNiu — Indie Mac & iOS App Developer",
    description:
      "Indie developer building Mac & iOS apps solo. 10yr full-stack veteran. Building in public.",
    url: "https://www.xiaoniubuniu.com",
    type: "website",
    locale: "en_US",
    siteName: "XiaoNiuBuNiu",
  },
  twitter: {
    card: "summary",
    title: "XiaoNiuBuNiu — Indie Mac & iOS App Developer",
    description:
      "Indie developer building Mac & iOS apps solo. 10yr full-stack veteran.",
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
                "Indie developer building Mac & iOS apps solo. 10yr full-stack veteran. Building in public.",
              author: {
                "@type": "Person",
                name: "XiaoNiuBuNiu",
                url: "https://www.xiaoniubuniu.com/about",
                sameAs: [
                  "https://github.com/xiaoyunchengzhu",
                  "https://x.com/xiaoyunchengzhu",
                  "https://www.zhihu.com/people/zhang-shi-yu-5-24",
                ],
                jobTitle: "Indie Mac & iOS App Developer",
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
