---
title: "农村老兵的出海独立站第一周复盘"
date: "2026-06-28"
category: "build-in-public"
tags: ["出海", "独立开发", "复盘"]
description: "辞职回村第一周，我用 Next.js 和 Tailwind 搭了个个人网站，成本不到100块，踩了几个坑，也收获了一些insight。"
---

# 农村老兵的出海独立站第一周复盘

## 为什么开始

2026年6月，我正式辞职回到农村，开始全职独立开发。做了10年Java全栈，待过大厂，也接过外包，但始终觉得应该做点自己的东西。

## 这周做了什么

### 1. 搭建个人网站

用 **Next.js 14 + Tailwind CSS** 搭了这个个人网站，部署在 **Cloudflare Pages** 上。整个流程花了大约半天，Claude Code 写了绝大部分代码。

### 2. 选型理由

- **Next.js**: SSG模式对SEO友好，个人博客首选
- **Tailwind**: 写样式快，不用切来切去
- **Cloudflare Pages**: 免费，全球CDN，自动部署

## 踩过的坑

1. `@cloudflare/next-on-pages` 版本兼容：锁定1.13.15
2. 中文排版调优
3. Server Component 和 Client Component 边界

> 如果你也在做出海独立开发，欢迎联系交流。
