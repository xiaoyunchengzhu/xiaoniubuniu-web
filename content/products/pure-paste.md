---
title: "PurePaste：开源 macOS 智能剪贴板工具，不只是净化格式，更是理解复制意图"
date: "2026-07-09"
status: "released"
category: "macOS"
tags: ["macOS", "SwiftUI", "剪贴板", "效率工具", "MenuBar", "开源", "PasteFlow", "意图识别", "剪贴板历史"]
description: "PurePaste 是一款开源的 macOS 菜单栏剪贴板工具。纯文本自动净化 + PasteFlow 智能识别 11 种内容类型（URL/邮箱/颜色/数学/经纬度等）+ 意图历史回溯。SwiftUI 原生开发，本地处理，零隐私风险。免费开源。"
keywords: ["macOS剪贴板工具", "PurePaste", "剪贴板增强", "纯文本粘贴", "Mac效率工具", "开源剪贴板", "SwiftUI剪贴板"]
---

## 痛点：复制粘贴这件事，多少年了还是这么难用

从网页复制一段文字，粘贴到飞书 / Notion / 微信 / 邮件——字体变了、颜色带了、链接嵌了、行间距崩了。

Cmd+Shift+V 是个半吊子方案：有些 App 不支持，有些快捷键冲突，而且它不会帮你识别你复制的是 URL 还是邮箱还是颜色值。

**PurePaste 要解决的就是「复制之后做什么」的问题。**

## PurePaste 是什么？

**PurePaste** 是一款开源的 macOS 菜单栏应用，常驻屏幕右上角，自动监听剪贴板。它有两个核心模式：

- **纯文本模式**：自动剥离富文本格式，清理多余空白和 CJK 空格
- **PasteFlow 模式**：识别复制内容的类型，在鼠标旁弹出操作面板，一键直达

所有处理在本地完成，数据永不上传。

## PasteFlow：你的剪贴板会思考了

这是 PurePaste 区别于所有同类工具的核心功能。复制内容后，PasteFlow 自动检测它是什么，然后弹出对应操作：

| 类型 | 示例 | 自动弹出 |
|------|------|----------|
| 🔗 链接 | `https://github.com/xiaoyunchengzhu/PurePaste` | 浏览器打开 |
| 📧 邮箱 | `xiaoyunchengzhu@gmail.com` | 写邮件 |
| 📱 电话 | `13812345678` | 拨打电话 |
| 📍 地址 | `北京市海淀区中关村南大街5号` | 地图查看 |
| 🎨 颜色 | `#FF5733` | 面板内大色块预览 + 复制 HEX / RGB |
| 🧮 数学 | `(35+47)*1.2` | 自动计算结果并复制 |
| 🌍 经纬度 | `39.9042, 116.4074` | 地图定位 |
| 📅 日期 | `2024-01-15 14:00` | 添加到日历 |
| 📡 IP | `192.168.1.1` | Ping |
| 📦 快递 | `SF123456789012` | 查快递 |
| 📄 富文本 | 网页复制带格式 | 转为 Markdown / 纯文本 |

**单按钮面板按 Enter 直接触发，无需点鼠标。** 这是反复打磨后的体验细节——识别到 URL，Enter 打开浏览器，一气呵成。

## 意图历史：不只是「复制过什么」，更是「用剪贴板完成了什么」

市面上所有剪贴板历史工具（Maccy、Paste、CopyClip）都只记录「复制了什么内容」。PurePaste 的意图历史记录的是：

- 🟢 **意图已完成**：复制 URL → 打开了浏览器
- 🟠 **已识别但未操作**：复制了颜色 → 没做任何操作
- ⚪ **普通复制**：纯文本模式下的净化记录

每条记录带时间、类型、操作、模式四个标签。支持按类型（只看 URL / 只看颜色）、模式（只看 PasteFlow）、关键词实时筛选。数据存储在本地 JSON 文件，最大 5000 条。

## 技术架构：纯原生，零依赖

```swift
SwiftUI + AppKit + MenuBarExtra + NSPasteboard + Combine
```

- **剪贴板监听**：基于 `NSPasteboard.changeCount` 轮询，`internalWriteFlag` + `lastChangeCount` 双重防死循环
- **数学计算器**：手写递归下降解析器，支持 `+ - * / % ^ ()` 及一元负号
- **浮动面板**：`NSWindow.borderless` + `.nonactivatingPanel`，鼠标旁弹出不抢焦点
- **历史存储**：纯 JSON 文件，内存常驻过滤，无数据库依赖
- **双语支持**：手动切换中文 / English，未设置时自动跟随系统

项目完整开源，全部 12 个 Swift 源文件，结构清晰，注释完备。

## 安装方式

**方式一：源码编译（推荐，完全免费）**

```bash
git clone https://github.com/xiaoyunchengzhu/PurePaste.git
cd PurePaste
open PurePaste.xcodeproj
# Cmd+R 运行
```

**方式二：下载已构建版本（DMG 安装包）**

👉 [**下载 PurePaste 2.0 DMG**](/downloads/PurePaste_2.0.dmg)（667 KB，macOS 14+）

下载后双击打开，拖到 `/Applications` 即可。首次打开如提示「无法验证开发者」，右键 → 打开 → 仍要打开。

## 隐私承诺

没有后端，没有统计 SDK，没有埋点。剪贴板内容、历史记录、识别结果——所有数据从生成到存储再到处理，全程不离开你的 Mac。源码公开可审计。

## 链接

- GitHub：[github.com/xiaoyunchengzhu/PurePaste](https://github.com/xiaoyunchengzhu/PurePaste)
- 产品页 & 下载：[xiaoniubuniu.com/products/pure-paste](https://www.xiaoniubuniu.com/products/pure-paste/)

---

*本工具开源免费。如果你觉得有用，欢迎给个 Star ⭐*
