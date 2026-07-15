---
title: "From PurePaste to ActionSense — A Major Upgrade to My macOS Clipboard Tool"
date: "2026-07-15"
platform: "Blog"
description: "PurePaste has been renamed to ActionSense and received a major architecture overhaul: detector protocol system, 5-language support, dependency injection, and a cleaner type set. Here's what changed and why."
tags: ["macOS", "SwiftUI", "open source", "refactoring", "ActionSense"]
---

Two weeks ago I shipped the first public version of PurePaste, a macOS menu bar clipboard assistant. Today I'm releasing a major upgrade under a new name: **ActionSense**.

## Why the rename

A few days after launch, someone pointed out that [sindresorhus/pure-paste](https://sindresorhus.com/pure-paste) already exists — a command-line tool by Sindre Sorhus that's been around for years. I should have checked before naming. Lesson learned.

The new name, ActionSense, better captures what the app actually does: it *makes sense of* clipboard content and maps it to *actions*. PasteFlow is the detection engine, but the product is about turning copied data into something actionable.

## What changed under the hood

I didn't just rename the project. I tore down and rebuilt significant parts of the architecture.

### Detector protocol system

The original 825-line `ContentDetector.swift` was a single enum with 13 detection functions, a math tokenizer, and a priority chain all crammed together. Adding a new type meant touching at least four different switch statements across three files.

The new architecture defines a `ContentDetecting` protocol, with each detector as an independent class:

```swift
protocol ContentDetecting {
    var identifier: String { get }
    var priority: Int { get }
    func detect(_ text: String, htmlData: Data?) -> DetectedContent?
}
```

A `DetectorRegistry` manages the priority chain. Adding a new type now means writing one class and registering it at startup. The core detection logic is distributed across five focused files instead of one god object.

### Dependency injection

The ViewModel no longer reaches out to seven singletons directly. Dependencies are injected through the initializer with sensible defaults:

```swift
init(monitor: ClipboardMonitor? = nil,
     registry: DetectorRegistry? = nil,
     panel: FloatingPanelController? = nil,
     history: HistoryStore? = nil)
```

Not revolutionary, but it means I can actually test the coordinator logic without spinning up a real pasteboard and window system.

### ClipboardMonitor extraction

The NSPasteboard polling loop was tangled inside the ViewModel alongside mode switching, history recording, and Pro purchase logic. It's now a standalone `ClipboardMonitor` class — one timer, one callback, one responsibility. The dual-guard dead-loop prevention (`internalWriteFlag` + `lastChangeCount`) lives there, not scattered across 200 lines of unrelated code.

### Fewer detector types, higher precision

The initial release tried to cover everything: IP addresses, Chinese tracking numbers, address keywords. Several of these turned out to be either low-utility (IP Ping in an era where Terminal.app exists) or overly region-specific (Chinese address patterns that trigger false positives on any text containing 市 or 路).

The current set is nine types: URL, Email, Phone, Date/Time, Color, Math, Coordinates, JSON, and Rich HTML. Each one justifies its existence with a clear, frequent use case.

### No more IAP

The v1 code had a StoreKit 2 integration, daily usage limits, and a Pro upgrade path. I removed all of it. The project is MIT-licensed. Charging money for an open-source clipboard tool when you have zero users and zero distribution felt like optimizing for a future that may never arrive. If someone wants to pay for this someday, they'll tell me.

### Five languages

The original bilingual toggle grew into full five-language support: English, Chinese, Japanese, French, and German. The implementation uses a straightforward `loc()` function with hardcoded fallbacks rather than `.strings` files, because the app's String Catalog wasn't loading reliably from the bundle in development builds. Not elegant, but it works every time.

## What stayed the same

- **Fully local.** No backend, no telemetry, no network calls. The clipboard never leaves the machine.
- **Plain Text Mode.** Still the one feature I use the most.
- **Intent History.** Still the feature I'm proudest of designing.
- **Zero dependencies.** SwiftUI + AppKit. No CocoaPods, no SPM packages.
- **The floating panel.** `NSWindow.borderless` + `.nonactivatingPanel`, positioned at `NSEvent.mouseLocation`. Dismisses on app switch or after five seconds — no global mouse hooks, App Store sandbox compliant.

## Get it

```bash
git clone https://github.com/xiaoyunchengzhu/ActionSense.git
cd ActionSense
open ActionSense.xcodeproj
# Cmd+R
```

Or download the DMG from [xiaoniubuniu.com/products/action-sense](https://www.xiaoniubuniu.com/products/action-sense/).

macOS 14.0+. Xcode 15.0+. MIT license.

---

*If you find it useful, a GitHub Star goes a long way.*
