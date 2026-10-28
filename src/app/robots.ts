import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // GEO：显式放行主流 AI 抓取器（通配符本已允许，单列是为了让各家爬虫与审计一眼确认意图）
    rules: [
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
          "DuckAssistBot",
        ],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.xiaoniubuniu.com/sitemap.xml",
  };
}
