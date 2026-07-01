---
title: "我用 Claude Code + Next.js 搭了个个人网站，从想法到上线只用了半天"
date: "2026-07-01"
category: "build-in-public"
tags: ["Claude Code", "Next.js", "建站", "Cloudflare", "独立开发"]
description: "不用 WordPress，不用第三方 CMS，纯靠 Claude Code 对话式开发，半天搭完一个完整的个人网站。记录完整选型思路和踩坑经验。"
---

# 我用 Claude Code + Next.js 搭了个个人网站，从想法到上线只用了半天

## 为什么要自己搭网站

2026 年辞了职回到农村，开始全职独立开发。接单需要展示能力，写文章需要沉淀流量，做产品需要有个大本营——于是决定搞一个个人网站。

需求很明确：

- 能写博客（Markdown 格式，不要在线编辑器）
- 能展示我做的产品和接单服务
- 能推荐工具（顺带跑 affiliate）
- **SEO 友好**（内容能被 Google 搜到）
- **更新成本低**（本地写 MD 文件，git push 就发布）

## 域名注册：Namecheap 一把梭

域名选 `xiaoniubuniu.com`，直接在 Namecheap 上注册。为什么不用 GoDaddy？

GoDaddy 首年便宜但续费翻倍，Namecheap 价格透明、免费送 Whois 隐私保护，域名管理界面也干净。对个人开发者来说，续费价格稳定比首年优惠重要得多。

## 服务器选型：为什么是 Cloudflare Pages

常见的个人博客部署方案对比：

| 方案 | 费用 | 速度 | 维护成本 | 适合 |
|------|------|------|---------|------|
| 云服务器 + WordPress | $5/月起步 | 一般 | 高（安全更新、备份、优化） | 非技术用户 |
| Vercel / Netlify | 免费 | 快 | 低 | 前端项目 |
| **Cloudflare Pages** | **免费** | **极快（全球 CDN）** | **零** | **静态站点** |

Cloudflare Pages 一骑绝尘：免费、全球 CDN 秒开、git push 自动部署、SSL 证书自动签发。我不需要后端动态处理，博客内容全是静态 Markdown，Cloudflare Pages 是天然的最佳选择。

## 技术选型：为什么不用 WordPress / 第三方 CMS

这是一个很多非技术朋友会问的问题。

WordPress 装机量占全球 40% 的网站，插件生态庞大，主题丰富。但对我来说，**WordPress 太重了**：

- 需要维护 PHP + MySQL，有安全漏洞风险
- 写作体验依赖后台编辑器，Markdown 支持不够原生
- 想要自定义样式或加新功能？要么找插件（可能不兼容），要么改 PHP（痛苦）
- SEO 插件、缓存插件、安全插件……每个都是潜在的性能杀手

Ghost、Medium、Notion + Super 这些也考虑过：

- **Ghost**：开源博客 CMS，比 WordPress 轻，但还是要维护服务器和数据库。内容编辑体验不错，但技术栈是 Node.js + Handlebars，我想改东西还是麻烦。
- **Medium**：写的文章不属于你，平台倒了内容一起没。而且没办法放自己的 affiliate 链接和定制页面。
- **Notion + Super / Nextra**：依赖第三方渲染，加载速度慢，SEO 也打折扣。

**结论**：对于一个技术博客来说，**静态站点生成器（SSG）+ Markdown 文件管理 + Git 版本控制**才是最优解。

## Claude Code：不是 AI 辅助，是 AI 主力开发

这是这篇文章最想说的部分。

我用了 **Claude Code**（Anthropic 的 CLI 开发工具）来写这个网站的绝大部分代码。过程和感受如下：

### 开发方式：对话即编程

整个开发流程是这样的——

我说：**"我需要一个 Next.js 个人网站，包含首页、博客、产品、工具箱、关于、联系等页面，黑白配色 + 橙色点缀，部署到 Cloudflare Pages，博客用 Markdown"**

Claude Code 自己完成了：

1. 初始化 Next.js 14 + TypeScript + Tailwind 项目
2. 安装所有依赖（gray-matter、react-markdown、react-syntax-highlighter 等）
3. 配置 Cloudflare Pages 适配器 `@cloudflare/next-on-pages`
4. 写完全部页面组件：首页、关于、博客列表、博客详情、工具箱、服务、联系
5. 写完全局组件：导航栏、页脚、博客卡片、工具卡片
6. 配置 SEO metadata、响应式布局、暗色代码高亮
7. 创建示例 Markdown 文章和产品文件
8. 完成部署文档

从第一句话到可运行的完整网站，大概用了 **半天**。如果我自己手写，同样的工作量至少 3-5 天。

### 准确度：超出预期

写过代码的人都知道，手动写一个多页面 Next.js 项目最花时间的不是敲代码，而是：

- 配置 Tailwind、TypeScript、ESLint 互相不打架
- Cloudflare Pages 适配器的版本兼容问题
- Server Component 和 Client Component 的边界处理
- 构建错误排查

Claude Code 在这类问题上表现得像一个有 5 年经验的前端——遇到 @cloudflare/next-on-pages 和 Next.js 14.2.x 的版本冲突，它自己查版本号、降级适配器、重构了博客过滤组件来解决 Edge Runtime 的兼容问题，整个过程只花了不到 10 分钟。

### 后续更新成本：极低

这是选这套方案的另一个关键优势。

**写新文章**：在 `content/blog/` 下新建一个 `.md` 文件，写标题、分类、标签，正文随便写。`git push` → Cloudflare 自动部署 → 上线。

**加新产品**：在 `content/products/` 下新建 `.md` 文件，列表页和详情页自动生成。

**改页面结构**：告诉 Claude Code "帮我在导航栏加个 XXX 入口" → 改完我过一眼 → push。不需要自己在七八个文件里找要改的地方。

**加新功能**：比如"工具箱加个分类筛选"——Claude Code 自己拆出常量文件避免 `fs` 模块被客户端引用，比我自己考虑得还细。

## 从本地到上线：完整部署流程

开发完成后，怎么让全世界看到？整个过程分四步：

### 第一步：代码推到 GitHub

项目根目录初始化 Git，关联 GitHub 仓库，push 上去：

```bash
git init
git add .
git commit -m "Initial commit: xiaoniubuniu.com"
git remote add origin git@github.com:xiaoyunchengzhu/xiaoniubuniu-web.git
git push -u origin main
```

这个网站的完整源码是公开的，欢迎参考和 Star：

> 👉 **GitHub: [xiaoyunchengzhu/xiaoniubuniu-web](https://github.com/xiaoyunchengzhu/xiaoniubuniu-web)**

### 第二步：Cloudflare Pages 连接 GitHub

登录 Cloudflare 控制台 → **Workers & Pages** → **Pages** → **连接到 Git**，选择 GitHub 仓库。

关键配置：

| 参数 | 值 | 说明 |
|------|-----|------|
| 构建命令 | `npx @cloudflare/next-on-pages` | Cloudflare 适配器构建 |
| 输出目录 | `.vercel/output/static` | 适配器自动生成 |
| 兼容性标志 | `nodejs_compat` | 解决 Node.js API 兼容 |

点「保存并部署」，Cloudflare 会自动拉代码、安装依赖、构建、发布。第一次构建大概 2-3 分钟。完成后你会得到一个 `*.pages.dev` 的临时域名，可以立刻访问。

### 第三步：域名解析（Namecheap → Cloudflare）

我在 Namecheap 注册的域名，需要把 DNS 指向 Cloudflare Pages。

Namecheap 后台 → Domain List → 域名 → **Advanced DNS** → 添加一条 CNAME 记录：

| Host | Type | Value |
|------|------|-------|
| `www` | CNAME | `xiaoniubuniu-web.pages.dev` |

保存后等几分钟 DNS 生效。

### 第四步：绑定自定义域名 + SSL

回到 Cloudflare Pages → 项目设置 → **自定义域**，添加 `www.xiaoniubuniu.com`。

Cloudflare 验证 DNS 已生效后，自动签发 SSL 证书。整个过程不需要手动搞证书、配 Nginx、设 HTTPS 重定向——什么都不用干，等两分钟就全绿了。

### 完整链路

```
本地写 MD → git push → Cloudflare 自动构建 → 全球 CDN 部署 → www.xiaoniubuniu.com 可访问
```

从 `git push` 到线上更新，**全自动，30 秒内完成**。不需要登录服务器、不拖拽文件、不重启服务。这也是我放弃 WordPress 选 Cloudflare Pages 的核心原因——**更新内容的阻力为零**。

后续每次发新文章、改页面、修 Bug，流程都一样：本地改完 → `git add` → `git commit` → `git push` → 等 30 秒 → 线上生效。

---

## 踩过的坑

### 1. `@cloudflare/next-on-pages` 版本冲突

最新版的 next-on-pages 要求 Next.js >= 14.3.0，但 Next.js 14 最新只有 14.2.35。**14.3.0 这个版本号根本不存在**。最终锁定 `@cloudflare/next-on-pages@1.13.15`。这种坑自己排查可能要花一两个小时，Claude Code 几分钟就定位出来了。

### 2. `setupDevPlatform()` 导致本地开发 404

按照 Cloudflare 官方文档加了 `setupDevPlatform()`，结果 `next dev` 时所有的 JS/CSS chunk 全部 404。根因是这个 API 模拟了 Cloudflare Workers 的请求管道，而我们项目不需要 Workers 运行时。去掉就好了。

### 3. `fs` 模块不能出现在客户端组件

Next.js App Router 里，`"use client"` 组件中引用的任何模块都不能间接依赖 `fs`。为了把博客/产品/工具的数据从 Markdown 文件里读出来，我把"读取文件的函数"和"常量和类型定义"拆到了不同的文件里，客户端组件只引常量文件。

### 4. 博客列表页不能用 `searchParams` 做动态渲染

Cloudflare Pages 期望所有页面都是纯静态的。用 `searchParams` 会让页面变成"动态路由"，Cloudflare 构建就报错要求加 `runtime = 'edge'`。最后改成了**客户端组件读取 URL 参数做筛选**，服务端只负责输出全量文章列表，搜索和分类切换全在浏览器里完成。

## 这套方案适合谁

- 你懂一点 Markdown，愿意用 Git
- 你希望网站加载快、SEO 好、维护成本低
- 你不想要 WordPress 的安全和性能包袱
- 你想用 Claude Code / AI 辅助开发，效率最大化

## 最终成本

| 项目 | 费用 |
|------|------|
| 域名 `xiaoniubuniu.com` | ~$11.48/年 |
| Cloudflare Pages 托管 | 免费 |
| GitHub 代码托管 | 免费 |
| Claude Code + deepseek V4 pro|根据token消耗，预估大约几块钱人民币，不到1美元  |

**裸跑成本：一年 $11.48**。token 消耗算$1 。比买一整套 WordPress 主题 + 付费插件还便宜，而且东西完全属于自己。

---

> 如果你也想搭一个类似的站，或者对这套方案有疑问，[直接联系我](/contact)。我自己就在做建站服务，帮你从 0 到 1 搞定。
