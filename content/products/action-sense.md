---
title: "ActionSense — Smart Clipboard Manager for macOS"
date: "2026-07-15"
status: "released"
category: "macOS"
tags: ["macOS", "SwiftUI", "clipboard", "productivity", "MenuBar", "open source", "PasteFlow", "ActionSense"]
description: "ActionSense is an open-source macOS menu bar clipboard assistant. Auto plain-text cleaning + PasteFlow smart detection of 9 content types (URL/email/color/math/geo/JSON) + intent-based history. 5 languages, fully local, zero privacy risk. Free & open source."
keywords: ["macOS clipboard manager", "ActionSense", "clipboard enhancer", "Mac productivity tool", "open source clipboard", "SwiftUI clipboard"]
---

## The Problem

Copying from a webpage and pasting into Notion, Slack, or an email — the fonts break, the colors bleed, the links embed themselves, and the spacing collapses. Cmd+Shift+V is a half-fix: some apps don't support it, shortcuts conflict, and it never tells you *what* you just copied was a URL, an email, or a hex color.

**ActionSense fixes "what happens after you copy."**

## What is ActionSense?

**ActionSense** is an open-source macOS menu bar app. It lives in your menu bar, watches your clipboard, and does two things:

- **Plain Text Mode**: auto-strips rich text formatting, cleans whitespace and CJK spacing
- **PasteFlow Mode**: detects *what* you copied and pops up a one-click action panel at your cursor

All processing is local. Nothing ever leaves your Mac.

## PasteFlow — Your Clipboard Just Got Smarter

PasteFlow detects what you copied and offers the right action instantly:

| Type | Example | Action |
|------|---------|--------|
| URL | `https://github.com` | Open in Browser (+ Open Repo for git repos) |
| Email | `hello@example.com` | Compose Mail |
| Phone | `13812345678` | Call |
| Color | `#FF5733` | Color preview + Copy HEX / RGB |
| Date/Time | `2024-01-15 14:00` | Add to Calendar |
| Math | `(35+47)*1.2` | Auto-calculate result |
| Coordinates | `39.9042, 116.4074` | Open in Maps |
| JSON | `{"key":"val"}` | Formatted preview + Format / Minify |
| Rich HTML | Web content with formatting | Convert to Markdown / Plain Text |



![PasteFlow Demo](https://www.xiaoniubuniu.com/images/products/purepaste/menubar.png)

![URL Detection](https://www.xiaoniubuniu.com/images/products/purepaste/url-detect.png)
![Color Preview](https://www.xiaoniubuniu.com/images/products/purepaste/color-detect.png)
![Math Calculation](https://www.xiaoniubuniu.com/images/products/purepaste/math-detect.png)

## Intent History — Not Just What You Copied, But What You Did

Traditional clipboard managers only record *what you copied*. ActionSense records *what you did with it*:

- 🟢 Intent fulfilled: copied URL → opened browser
- 🟠 Detected but not acted: copied color → did nothing
- ⚪ Plain text: auto-cleaned formatting

Filter by type, mode, or keyword. Up to 5000 entries, stored locally.

![Intent History](https://www.xiaoniubuniu.com/images/products/purepaste/history.png)

## Tech Stack — Pure Native, Zero Dependencies

```
SwiftUI + AppKit + MenuBarExtra + NSPasteboard + Combine
```

- **Clipboard polling** — `NSPasteboard.changeCount` every 0.5s, dual-guard dead-loop prevention
- **Math evaluator** — hand-written recursive descent parser, avoids `NSExpression` format-string traps
- **Floating panel** — `NSWindow .nonactivatingPanel`, appears at cursor without stealing focus
- **History storage** — plain JSON file, in-memory filtering, no database
- **5 languages** — English / 中文 / 日本語 / Français / Deutsch, manual switch, restart to apply

17 Swift source files. Clean architecture, well-commented.

## Installation

**Option 1: Build from Source**
```bash
git clone https://github.com/xiaoyunchengzhu/ActionSense.git
cd ActionSense
open ActionSense.xcodeproj
# Cmd+R to run
```
macOS 14.0+, Xcode 15.0+. No Apple Developer account needed.

**Option 2: Download DMG**

👉 [**Download ActionSense 2.0 DMG**](/downloads/ActionSense_2.0.dmg) (573 KB, macOS 14+)

Drag to `/Applications`. On first launch, right-click → Open to bypass Gatekeeper.

## Privacy

No backend. No analytics SDK. No tracking. Clipboard content, history, detection results — everything stays on your Mac. Source code is public and auditable.

## Links

- GitHub: [github.com/xiaoyunchengzhu/ActionSense](https://github.com/xiaoyunchengzhu/ActionSense)
- Product page: [xiaoniubuniu.com/products/action-sense](https://www.xiaoniubuniu.com/products/action-sense/)

---

*Free & open source. If you find it useful, give it a Star ⭐*
