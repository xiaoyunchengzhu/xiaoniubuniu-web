import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
}

const blogDirectory = path.join(process.cwd(), "content/blog");

/**
 * 获取所有博客文章，按日期降序排列
 * 仅在构建时调用（SSG）
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);

  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "1970-01-01",
        category: data.category || "uncategorized",
        tags: data.tags || [],
        description: data.description || "",
        content,
      };
    });

  // 按日期降序排序
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 根据 slug 获取单篇文章
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "1970-01-01",
    category: data.category || "uncategorized",
    tags: data.tags || [],
    description: data.description || "",
    content,
  };
}

/**
 * 获取所有分类及其文章数量
 */
export function getCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const cat = post.category;
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));
}

/**
 * 获取所有文章用到的 slug 列表（用于 generateStaticParams）
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * 根据分类过滤文章
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  if (category === "all" || !category) {
    return posts;
  }
  return posts.filter((post) => post.category === category);
}

/**
 * 模糊搜索文章（标题 + 描述）
 */
export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  if (!query) return posts;

  const lowerQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery)
  );
}
