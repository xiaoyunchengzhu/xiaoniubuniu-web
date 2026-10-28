---
title: "WebMedia Scanner"
date: "2026-10-28"
status: "released"
category: "mobile"
icon: "/images/products/webmedia-scanner/icon_256.png"
image: "/images/products/webmedia-scanner/feature_graphic.png"
platforms: ["Android"]
tags: ["Android", "video downloader", "m3u8", "HLS", "media sniffing", "audio downloader"]
description: "Android app that sniffs hidden videos, audio, images and files out of any web page — an m3u8/HLS downloader with AES-128 decryption, resume and batch save. No cloud, no account."
link: "https://webmediascanner.xiaoniubuniu.com"
cta_label: "Get it on Google Play"
cta_url: "https://play.google.com/store/apps/details?id=com.xiaoniubuniu.mediadownloader"
subline: "Android 8.0+ · Free to use · One-time Pro removes ads forever"
highlights: ["Sniffs every request", "m3u8 → playable MP4", "Resume + batch save"]
pricing: "free"
app_category: "UtilitiesApplication"
screenshots:
  - "/images/products/webmedia-scanner/s01-home.png"
  - "/images/products/webmedia-scanner/s02-scan.png"
  - "/images/products/webmedia-scanner/s03-browsing.png"
  - "/images/products/webmedia-scanner/s04-results.png"
  - "/images/products/webmedia-scanner/s05-downloads.png"
  - "/images/products/webmedia-scanner/s06-settings.png"
  - "/images/products/webmedia-scanner/s07-pro.png"
---

![WebMedia Scanner — find and download hidden media from any web page](/images/products/webmedia-scanner/feature_graphic.png)

## The Download Button Isn't There Anymore

Ten years ago, right-clicking a video gave you "Save video as…". Today the page plays a trailer-length teaser of what's actually a distributed system: video arrives in HLS segments (`*.m3u8` + hundreds of `.ts` chunks), audio hides inside a JavaScript player, images load lazily only when you scroll near them, and half of it refuses requests that don't carry the page's `Referer` header.

Paste that page URL into a classic "copy video address" downloader and it finds nothing — because there is no single address to copy. **WebMedia Scanner** solves this the only way that actually works: it opens the page in a real browser on your phone, watches every single network request the page makes, and shows you the media it was *actually* loading.

## Three Detection Engines, One Scan

You paste a URL (or just copy any link — the app auto-detects it and offers to scan). A WebView loads the page like a normal browser would, while three engines work in parallel on what happens underneath:

| Engine | What it catches |
|---|---|
| **Network interception** | Every request the page fires — including media loaded by JavaScript, lazy images and signed CDN URLs that never appear in the source |
| **DOM analysis** | `<video>` / `<audio>` / `<img>` elements and their sources, even nested in players |
| **Pattern matching** | Media URLs in scripts and page text that the first two paths miss |

Results come back grouped into **Video / Audio / Images / Files** with real thumbnails, sizes and formats, so you can see what you're grabbing before you grab it. Scan results are cached per domain — reopening a recent scan shows the list instantly without re-scanning.

## An m3u8 Downloader That Gives You One Playable MP4

Streaming is where most tools stop at "downloaded 800 fragment files and good luck." WebMedia Scanner finishes the job:

- **HLS / m3u8**: parse the master playlist, pick any bitrate variant (or batch-grab every quality at once on Pro), download all segments, decrypt **AES-128** encrypted streams, merge the `.ts` chunks and remux into a single playable `.mp4`.
- **Plain files**: MP4, WEBM, MKV, FLV, AVI, MOV · MP3, AAC, M4A, WAV, OGG, OPUS · JPG, PNG, WEBP, GIF, BMP · PDF, ZIP and anything else a page exposes.
- **DRM is a hard line, not a gap**: Widevine and SAMPLE-AES streams are detected and clearly marked as unsupported — and left alone. No legal gray zone.

## Downloads That Survive Real Life

- **Resume**: interrupted downloads continue exactly where they stopped (HTTP Range), even after pausing by accident.
- **Hotlink protection handled**: the right `Referer` and cookies travel with every request, so media that "only plays on the site" downloads fine.
- **Batch save**: tap one item, or Download all.
- **Pick your destination**: the system Downloads folder, or any folder you choose via Android's storage picker (SAF) in Settings.
- **Pro Turbo** (one-time purchase): multi-segment parallel downloading finishes large files up to 3× faster.

## Private by Architecture

There is no company server to trust or distrust — there is no server. Scanning runs entirely on your device: the URLs you scan, the sniffed results, your history and downloaded files live in the app's private storage. Clear history in Settings and it's gone; uninstall and it's gone. The Play data-safety form says so because the code makes it true.

## Free, with an Honest Upgrade Path

The app is free to use with ads. A one-time purchase (no subscription) removes ads forever and unlocks the Pro pack: **Turbo parallel downloads · auto-download rules (files matching your rules are saved automatically after each scan) · every HLS quality variant in one batch · unlimited history and result snapshots**. Buy it once, it's restored with your Google account on any device.

> **Only download what you have the right to save.** Respect the websites you visit and their content owners. WebMedia Scanner is a tool for recovering media *you're entitled to* — your own uploads, openly licensed content, pages that offer no other way.

## Get WebMedia Scanner

**[Get it on Google Play →](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.mediadownloader)** · Product site with full documentation: **[webmediascanner.xiaoniubuniu.com](https://webmediascanner.xiaoniubuniu.com)**

Built with the same hands-on approach as everything else on this site — pure Java + Android Views, and a WebView doing the sniffing so what the scanner sees is exactly what the page sees. If you move files between your phone and computer after downloading, my other Android app [BrowserDrop](/products/browserdrop) hands them off over your own Wi-Fi.

## FAQ

### Does it download videos from YouTube, Netflix or other streaming services?
No. Streams protected by real DRM (Widevine, SAMPLE-AES) are detected but never decrypted — that is off-limits by design. What it does download: unencrypted media any page loads — MP4s, HLS/m3u8 with AES-128 segment keys, audio streams, lazy-loaded images, documents.

### How is this different from an online "video downloader" website?
Those services re-implement sniffing server-side for a few supported sites, route your links and files through their servers, and are the first thing to break when a site changes. WebMedia Scanner runs a real browser on your phone, so any page that loads media can be sniffed — and nothing leaves your device.

### The download got interrupted. Do I start over?
No. Downloads resume from where they stopped via HTTP Range, including after you pause them manually or the app is killed mid-transfer.

### Why did a media file fail to download with 403?
Hotlink-protected media needs the page's `Referer`/cookies to authorize the request. The app attaches them automatically; a 403 usually means the link already expired (signed CDN URLs are often time-limited) — rescan the page and grab it again.

### Is it really free?
Yes — full scanning and downloading free, supported by ads. A one-time Pro purchase removes ads forever and adds Turbo parallel downloads, auto-download rules, all-HLS-qualities batch and unlimited history. No subscription.

### What happens to my history if I uninstall?
Everything (history, per-domain scan snapshots, downloaded files you didn't move) lives in the app's private storage and is removed on uninstall. There is no account to delete.
