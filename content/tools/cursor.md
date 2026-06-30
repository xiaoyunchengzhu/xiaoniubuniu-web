---
title: "Cursor — AI 编程体验，效率提升的真实感受"
date: "2026-06-05"
category: "dev-tool"
tags: ["AI", "编辑器", "效率"]
description: "从 VS Code + Copilot 切换到 Cursor，3个月的真实使用体验。有些任务快了一倍，有些场景反而更慢。"
link: "https://cursor.sh/?ref=placeholder"
affiliate: true
---

# Cursor 三个月使用体验

## 从 Copilot 换到 Cursor

之前一直用 VS Code + GitHub Copilot，感觉还行。但看大家都在吹 Cursor，抱着试试的心态装了。三个月下来，回不去了。

## 哪些场景 Cursor 明显更快

### 1. 多文件重构

传统方式：手动一个个文件改，或用 VS Code 的全局查找替换（经常误伤）。

Cursor：选中要改的文件 → `Cmd+I` → "把这些文件里的 xxx 改成 yyy" → 它自动改完，你检查一遍确认就行。

这个场景**效率提升 3-5 倍**，特别是改 API 参数名这种跨十几个文件的操作。

### 2. 生成样板代码

"创建一个 Next.js API route，接收 POST，用 zod 校验参数，返回统一的 Response 格式"

→ 10 秒出完整代码，基本只需要微调。

### 3. 自动修复 TypeScript 错误

光标放到红色波浪线上，Tab 一下，大部分类型错误自动修好。

## 哪些场景反而更慢

- **复杂业务逻辑**：AI 不理解你的上下文，生成的代码需要大量修改，不如自己写
- **旧项目代码**：AI 倾向于用最新的 API 写法，在旧项目里会引入不兼容的代码

## 总结

Cursor 不是魔法，但对于**写样板代码、重构、修 Bug** 这些高频操作，确实能省很多时间。个人觉得值这个价。

[通过此链接试用 Cursor →](https://cursor.sh/?ref=placeholder)
