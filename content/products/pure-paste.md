---
title: "PurePaste：一键净化剪贴板的 macOS 菜单栏小工具"
date: "2026-07-03"
status: "in-development"
category: "macOS"
tags: ["macOS", "SwiftUI", "剪贴板", "效率工具", "MenuBar", "纯文本", "Markdown"]
description: "自动监听剪贴板，将复制内容即时转换为纯文本或智能 Markdown，解决「粘贴带格式」的痛点。SwiftUI + MenuBarExtra 原生实现，零依赖，所有处理均在本地完成。"
---

## 痛点：你多久被「粘贴带格式」折磨一次？

从网页复制一段文字，粘贴到飞书 / Notion / 微信 / 邮件——字体变了、颜色带了、链接嵌了、行间距崩了。

我每天至少遇到十次。Cmd+Shift+V（无格式粘贴）是个半吊子方案：有些 App 不支持，有些快捷键冲突，而且它不会帮你清理多余空白、也不会把网页链接转成干净的 Markdown。

于是写了 [PurePaste](*)。

## 它做什么

PurePaste 是一个 macOS 菜单栏应用，打开后常驻菜单栏。核心功能就一句话：**监听剪贴板，把复制的内容自动纯化，再写回去**。你正常 Cmd+C，然后随便 Cmd+V 到任何地方，粘贴出来的都是干净格式。

两种工作模式：

| 模式 | 做什么 |
|------|--------|
| **纯文本模式** | 剥离全部富文本（RTF/HTML），清理多余换行和空白，智能移除 CJK 字符间不必要的空格，保留英文词间空格 |
| **智能 Markdown 模式** | 在纯文本基础上，把网页链接转成 `[text](url)`，加粗转 `**text**`，斜体转 `*text*`，列表转 `- item` |

一键切换，菜单栏图标颜色会随之变化（灰/蓝/紫），一眼就知道当前状态。

## 技术选型

用到的都是原生框架，没有第三方依赖：

- **SwiftUI** — 整个应用入口是 `MenuBarExtra`，不需要 Dock 图标，不需要 NSWindow
- **NSPasteboard** — 读取系统剪贴板，基于 `changeCount` 轮询检测新复制
- **SMAppService** — 实现「开机启动」
- **@AppStorage** — 偏好持久化 + 试用计数

项目非常轻量，四个源文件加起来不到 600 行。

## 核心设计：怎么避免死循环

剪贴板工具最典型的坑是「写回剪贴板 → 触发自身监听 → 再读 → 再写」的死循环。

PurePaste 用了双重防护：

```swift
// 防护 1：写入前设标志位，顶部 guard 直接跳过
guard !internalWriteFlag else { return }

// ... 纯化处理 ...

// 防护 2：写回后立即更新 changeCount，
// 下一次轮询发现 changeCount 相等 → 跳过
internalWriteFlag = true
pasteboard.clearContents()
pasteboard.setString(processed, forType: .string)
lastChangeCount = pasteboard.changeCount
internalWriteFlag = false
```

同时，非文本内容（图片、文件、PDF）直接跳过，不做任何修改。

## 试用与变现

内置了轻量试用系统：

- 前 7 次启动全功能免费（`@AppStorage("launchCount")` 计数）
- 超过 7 次后，智能 Markdown 模式锁定，菜单显示「请购买以解锁」
- 点击「购买激活」跳转占位 URL，可接入自己的支付页
- Debug 模式下提供「模拟激活」按钮，方便开发测试

真实支付还没接——目前是功能验证阶段，如果你有兴趣试用，欢迎提 issue。

## 隐私声明

菜单里的「关于」弹窗明确写了：

> 所有处理均在本地完成，数据永不上传。

没有后端，没有统计 SDK，没有埋点。剪贴板内容从来不会离开你的电脑。

## 小结

写这个工具花了一个下午，但解决的是一个每天都遇到的痛点。如果你也是「Cmd+C → Cmd+Shift+V」肌肉记忆持有者，试试看，也许能让你少按一个键。

项目地址暂未公开，感兴趣的朋友可以留言或私信交流。

---

*更新于 2026-07-03 · 项目状态：开发中*
