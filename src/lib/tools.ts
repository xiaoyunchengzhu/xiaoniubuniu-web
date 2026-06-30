import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Tool {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  link?: string;
  affiliate?: boolean;
  content: string;
}

const toolDirectory = path.join(process.cwd(), "content/tools");

/**
 * 获取所有工具，按日期降序排列
 */
export function getAllTools(): Tool[] {
  if (!fs.existsSync(toolDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(toolDirectory);

  const allTools = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(toolDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "1970-01-01",
        category: data.category || "other",
        tags: data.tags || [],
        description: data.description || "",
        link: data.link || undefined,
        affiliate: data.affiliate || false,
        content,
      };
    });

  return allTools.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 根据 slug 获取单个工具
 */
export function getToolBySlug(slug: string): Tool | null {
  const fullPath = path.join(toolDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "1970-01-01",
    category: data.category || "other",
    tags: data.tags || [],
    description: data.description || "",
    link: data.link || undefined,
    affiliate: data.affiliate || false,
    content,
  };
}

/**
 * 获取所有工具 slug（用于 generateStaticParams）
 */
export function getAllToolSlugs(): string[] {
  if (!fs.existsSync(toolDirectory)) {
    return [];
  }

  return fs
    .readdirSync(toolDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
