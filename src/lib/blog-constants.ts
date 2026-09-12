// 博客分类的单一常量来源（纯常量，客户端组件可安全引入）
// 筛选标签、卡片徽章、文章页徽章都从这里取，避免多处定义不一致

export const blogCategoryOptions = [
  { key: "all", label: "All" },
  { key: "build-in-public", label: "Build in Public" },
  { key: "chuhai-action", label: "Going Global" },
  { key: "toolbox", label: "Toolbox" },
  { key: "tech-deep", label: "Deep Tech" },
];

export const blogCategoryLabels: Record<string, string> = Object.fromEntries(
  blogCategoryOptions.map((c) => [c.key, c.label])
);
