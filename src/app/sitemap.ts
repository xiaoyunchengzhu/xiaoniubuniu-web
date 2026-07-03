import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProducts } from "@/lib/products";
import { getAllTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.xiaoniubuniu.com";

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/toolbox`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // 博客文章
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 产品页面
  const productPages: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 工具页面
  const toolPages: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${baseUrl}/toolbox/${tool.slug}`,
    lastModified: new Date(tool.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...productPages, ...toolPages];
}
