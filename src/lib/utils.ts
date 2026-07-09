/**
 * 估算文章阅读时间（中文约 300 字/分钟，英文约 200 词/分钟）
 * @param text 文章纯文本内容
 * @returns 阅读时间（分钟），向上取整，最少 1 分钟
 */
export function getReadingTime(text: string): number {
  // 统计中文字符
  const chineseChars = (text.match(/[一-鿿]/g) || []).length;
  // 统计英文单词
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  // 中文 300 字/分钟，英文 200 词/分钟
  const minutes = chineseChars / 300 + englishWords / 200;
  return Math.max(1, Math.ceil(minutes));
}

/**
 * 从 Markdown 内容中提取所有标题（h2 和 h3）
 * @param content Markdown 原始内容
 * @returns 标题数组，包含 text、level 和生成的 id
 */
export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    // 生成与 react-markdown 兼容的 id（小写，空格替换为连字符，移除特殊字符）
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w一-鿿-]/g, "");
    items.push({ id, text, level });
  }

  return items;
}
