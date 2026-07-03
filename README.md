# 🐂 小牛不牛 — 个人网站

一个农村全栈老兵的出海折腾日记。技术博客 + 服务接单 + 工具箱推荐 + 合作孵化。

**技术栈**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Cloudflare Pages

## 项目结构

```
xiaoniubuniu-web/
├── content/blog/          # Markdown 博客文章
├── data/                  # 工具数据等静态数据文件
├── src/
│   ├── app/               # Next.js App Router 页面
│   │   ├── about/         # 关于我
│   │   ├── blog/
│   │   │   ├── page.tsx   # 博客列表页
│   │   │   └── [slug]/    # 博客详情页（动态路由）
│   │   ├── contact/       # 联系页面
│   │   ├── services/      # 服务与合作
│   │   └── toolbox/       # 工具箱
│   ├── components/        # 全局组件（Navbar, Footer, BlogCard 等）
│   └── lib/               # 工具库（博客读取、数据处理）
├── next.config.mjs        # Next.js 配置（含 Cloudflare 适配器）
└── tailwind.config.ts     # Tailwind CSS 配置
```

## 本地开发

### 环境要求

- **Node.js** 18+
- **npm** 9+

### 开始开发

```bash
# 1. 克隆仓库
git clone <your-repo-url>
cd xiaoniubuniu-web

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 查看效果。

## 添加博客文章

在 `content/blog/` 目录下创建 `.md` 文件，文件名即为 URL slug（例如 `my-post.md` → `/blog/my-post`）。

每篇文章开头需要 YAML frontmatter：

```yaml
---
title: "文章标题"
date: "2026-06-28"
category: "build-in-public"   # build-in-public | chuhai-action | toolbox | tech-deep
tags: ["出海", "独立开发"]
description: "文章摘要，用于列表页和 SEO"
---

文章正文（Markdown）...
```

## 部署到 Cloudflare Pages

### 前提条件

- Cloudflare 账号
- 域名 `xiaoniubuniu.com` 的 DNS 托管在 Cloudflare（或在其他平台，需手动配置 CNAME）

### 部署步骤

1. **将代码推送到 GitHub 仓库**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:xiaoyunchengzhu/xiaoniubuniu-web.git
git push -u origin main
```

2. **登录 Cloudflare 控制台**

   进入 **Workers & Pages** → **Pages** → **连接到 Git**

3. **选择 GitHub 仓库，配置构建参数**

   | 参数 | 值 |
   |---|---|
   | **构建命令** | `npx @cloudflare/next-on-pages` |
   | **输出目录** | `.vercel/output/static` |
   |**设置/运行时/兼容性标志**| nodejs_compat|
4. **部署**

   点击「保存并部署」，Cloudflare 会自动构建并发布。
5. Namecheap 申请域名和DNS解析
- 登录 Namecheap → **Domain List** → 你的域名 → **“Advanced DNS”** 标签
- 点击 **“ADD NEW RECORD”**：
  - **CNAME 记录**：
    - Type: `CNAME Record`
    - Host: 比如 `www`
    - Value: `你的项目名.pages.dev`（Cloudflare 提示的那串）
    - TTL: 自动
- 保存
6. **绑定自定义域名**
   在项目设置 → **自定义域** 中添加 `www.xiaoniubuniu.com`。
   按照 Cloudflare 提示修改 DNS 记录（通常是 CNAME 到 Cloudflare Pages 提供的地址）。

7. **SSL 证书**

   Cloudflare 会自动签发 SSL 证书，无需额外操作。

8. **持续部署**

   之后每次 `git push` 到 main 分支，Cloudflare 会**自动触发构建和部署**。

> **注意**：本项目使用 `@cloudflare/next-on-pages@1.13.15`，兼容 Next.js 14.2.x。所有读取本地文件的逻辑（如博客 Markdown 解析）仅在构建时执行（SSG），不会在运行时调用。

## 自定义内容

### 替换个人信息

以下文件包含个人信息的内容，发布前需要替换：

| 文件 | 需要替换的内容 |
|---|---|
| `src/app/about/page.tsx` | 邮箱、微信号、个人照片 |
| `src/app/contact/page.tsx` | 邮箱、微信号、社交链接 |
| `src/components/Footer.tsx` | GitHub、Twitter、知乎链接 |
| `data/tools.ts` | 工具推荐链接（替换为你的 affiliate 链接） |


## License

MIT
