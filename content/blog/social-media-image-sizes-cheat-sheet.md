---
title: "The 2026 Social Media Image Size Cheat Sheet (Instagram, LinkedIn, X, YouTube)"
date: "2026-11-05"
category: "toolbox"
tags: ["social media", "image size", "Instagram", "LinkedIn", "batch resize"]
description: "Every feed, story and thumbnail dimension that still matters in 2026 — aspect ratios, pixel targets, and export settings — plus how to prep a whole batch of photos for them in one tap on your phone."
image: "/images/blog/pixtally/home.jpg"
---

Every platform recompresses what you upload. The only defense is uploading something that already matches what they'll do to it — right ratio, right pixel target, no EXIF — so their compressor has nothing to improvise. Here's the numbers table, and the batch workflow to hit it from your phone.

> Platforms change specs; these are the values that hold up well as of late 2026. When a platform "changes nothing visibly," it usually just re-crops to these ratios — so the ratio matters more than the last pixel.

## Feed dimensions that still matter

| Placement | Aspect | Export at | Notes |
|---|---|---|---|
| Instagram feed, square-era look | 1:1 | **1080×1080** | still the safest all-rounder |
| Instagram portrait | 4:5 | 1080×1350 | fills more screen, more feed real estate |
| Instagram / WhatsApp / TikTok stories | 9:16 | 1080×1920 | full-bleed; keep text centered |
| LinkedIn link-post image | **1.91:1** | **1200×627** | the classic opengraph ratio |
| X (Twitter) in-stream | 16:9 | 1600×900 | 2:1 cards if you want the tall preview |
| Facebook shared link | 1.91:1 | 1200×630 | same family as LinkedIn — one crop serves both |
| YouTube thumbnail | 16:9 | **1280×720** | hard cap 2 MB; JPG or PNG |
| WhatsApp status / chat photo | 4:5-ish | 1600px cap | chat preview crops square-first |
| Email signature / blog in-text | ≤1600w | **≤500 KB, WebP** | 1920w for full-width hero images |

The quiet pattern: **1.91:1 is the link-preview lingua franca** (LinkedIn + Facebook + most CMS cards), and **4:5 / 9:16 won the phone era** (vertical fills the screen, screen-fill wins feeds).

## The three settings that decide whether your upload survives

- **Match the ratio *before* uploading.** Cropping after the fact (or letting the platform do it) is how heads leave the frame. Crop to the target ratio first, then let the resize do the rest.
- **Export slightly larger than display size, then cap.** Instagram stores your 1080px image; X serves ~1200px wide. Exporting at ~1.5× the display size costs nothing and survives retina feeds — beyond that you're just paying bytes nobody sees.
- **Strip EXIF — twice valuable.** Location metadata riding along to a public post is a privacy leak with zero upside, and every platform strips it anyway: their re-encode throws it out on the server, so keeping it only means bigger files until then. Strip locally, upload smaller.

## Prepping a batch on the phone without touching Photoshop

For one image this is five minutes in any editor. For fifty — a conference photo dump, a week of product shots for four platforms — that's a machine job. The workflow I built into [PixTally](/products/pixtally) (Android, on-device, no uploads): each platform above is a saved recipe — a chain of `Crop (ratio) → Resize (px cap) → Compress (size budget) → Strip EXIF` — pick the recipe, multi-select through the system photo picker, preview planned sizes, convert. The built-in set covers the exact rows in the table:

| Recipe | = table row |
|---|---|
| **Square** 1:1 · 1080×1080 · JPG Q85 | Instagram square |
| **LinkedIn** 1.91:1 · 1200×627 · JPG · no EXIF | LinkedIn + FB link cards |
| **Website** 1920w · ≤500 KB · WebP | blog/CMS images |
| **Email** 1920w · ≤2 MB · JPG | attachable batches |
| **Small Photo** 1200w · ≤500 KB · no EXIF | chat/forum spam-fighting size |
| **WebP** 1600w · ≤500 KB · WebP | modern web export |

Originals stay untouched (results go to a `Pictures/` subfolder), and every run is replayable — next week's photo dump gets the same recipes, one tap. Install: [Google Play](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.imagerecipe).

## The 30-second version

- Ratio first, pixels second: 1:1 (1080²), 4:5 (1080×1350), 9:16 (1080×1920), 1.91:1 (1200×627), 16:9 (1280×720 for YouTube, 1600×900 elsewhere).
- ≤500 KB per image is the size that gets you through everywhere that matters.
- Strip EXIF before anything goes public — always free, sometimes load-bearing for privacy.
- Prep the batch before opening any app that previews it; recompressed previews lie about quality.

If your bottleneck is size caps rather than dimensions, the [compress-to-exact-size guide](/blog/compress-photos-bulk-android) goes deeper on the size-budget mechanics, and [batch WebP conversion](/blog/batch-convert-photos-webp-android) covers the format swap that saves another ~30%.
