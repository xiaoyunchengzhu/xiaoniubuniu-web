import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Product {
  slug: string;
  title: string;
  date: string;
  status: "active" | "in-development" | "archived";
  category: string;
  tags: string[];
  description: string;
  link?: string;
  image?: string;
  content: string;
}

const productDirectory = path.join(process.cwd(), "content/products");

/**
 * 获取所有产品，按日期降序排列
 * 仅在构建时调用（SSG）
 */
export function getAllProducts(): Product[] {
  if (!fs.existsSync(productDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(productDirectory);

  const allProducts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(productDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "1970-01-01",
        status: data.status || "active",
        category: data.category || "other",
        tags: data.tags || [],
        description: data.description || "",
        link: data.link || undefined,
        image: data.image || undefined,
        content,
      };
    });

  return allProducts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 根据 slug 获取单个产品
 */
export function getProductBySlug(slug: string): Product | null {
  const fullPath = path.join(productDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "1970-01-01",
    status: data.status || "active",
    category: data.category || "other",
    tags: data.tags || [],
    description: data.description || "",
    link: data.link || undefined,
    image: data.image || undefined,
    content,
  };
}

/**
 * 获取所有产品 slug 列表（用于 generateStaticParams）
 */
export function getAllProductSlugs(): string[] {
  if (!fs.existsSync(productDirectory)) {
    return [];
  }

  return fs
    .readdirSync(productDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// 注意：statusLabels 和 categoryLabels 已移至 ./product-constants.ts
// 避免客户端组件引用 fs 模块
