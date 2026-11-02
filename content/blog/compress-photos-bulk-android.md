---
title: "How to Compress Photos in Bulk on Android to an Exact File Size (≤500 KB, ≤2 MB)"
date: "2026-11-04"
category: "toolbox"
tags: ["image compression", "batch processing", "Android", "JPEG", "file size"]
description: "Email limits, forum caps, upload ceilings: how to squeeze a whole batch of photos under an exact size budget on Android — the right order of operations, and why doing it on-device beats every 'online compressor'."
image: "/images/blog/pixtally/home.jpg"
---

"Can you send me the photos?" Sure, if your inbox accepts 1.4 GB. Forum attachment limits, airline baggage-claim portals, visa application sites, print shops that cap uploads at "5 MB per file" — size *ceilings* are one of the few universal constants of the modern web. And the tooling for hitting them is bizarrely manual: drag a slider, squint at "487 KB," undo, redo.

Here's how photo compression actually works, what order to do things in, and how to put a hard size cap on fifty photos at once without handing any of them to a mystery server.

## The two levers, in the right order

File size is pixels × quality. You have exactly two knobs, and the order matters:

1. **Resize first.** A 4032×3024 photo (12 MP, ~4 MB) displayed in a chat thread at 360px wide carries its other 11 million pixels all the way to the recipient's phone, for nothing. Dropping the long edge to ~1600px removes 90%+ of the pixels while still printing fine at 4×6" and looking crisp on any screen. This is free quality — wasted resolution costs size, not fidelity.
2. **Then compress quality.** Now the encoder has far fewer pixels to spend bytes on, so the same quality setting yields dramatically smaller files — and you can afford a *higher* quality setting than you'd have needed at full size.

The classic mistake is the reverse: maxing out JPEG quality at full resolution and then wondering why a 300 KB cap forces a visible 40% quality collapse. Resize is the heavy lift; quality is the fine-tune.

## Why "≤500 KB" is harder than it sounds

JPEG encoders don't work in file-size units — they work in a quality dial. To hit an exact byte target you need to *search*: encode, measure, lower, re-encode… A human doing this per photo is exactly as tedious as it sounds, which is why every online "compress to 500 KB" tool exists.

They also share one design flaw: **your photos get uploaded** — full-resolution, EXIF intact, GPS coordinates included — to a server whose privacy policy you have never read, to do work your phone can do locally in 80 milliseconds. A modern phone's image pipeline (the same Android `Bitmap`/`BitmapCompressor` stack every gallery app uses) encodes JPEG and WebP natively, at hardware speeds, offline. Server-side compression for photos is a 2010 relic kept alive by convenience.

## The batch version, on-device

The flow I use, via [PixTally](/products/pixtally) (Android, free tier covers small batches; full chain is any crop → resize → compress → convert → strip EXIF, saved as a reusable recipe):

1. Pick the built-in **Email** recipe (1920px cap, ≤2 MB) or **Small Photo** (1200px, ≤500 KB), or set your own budget — the compressor binary-searches quality until each file lands under the cap.
2. Select photos through the system picker — no storage permission, and originals are never opened for writing.
3. Check the preview: every image shows *original size → planned output size* before a byte is written. This is the step that prevents the "wait, did that actually look okay?" surprise.
4. Convert. Results land in a `Pictures/` subfolder with clean sequential names. Fifty photos ≈ thirty seconds, airplane mode optional but satisfying.

The size budget being a *per-step target* is the part that doesn't exist in gallery editors — they do one photo, one guess.

## Rules of thumb for common caps

| Cap you're fighting | Settings that hit it reliably |
|---|---|
| ≤100 KB (forms, avatars) | ~800px long edge · JPG Q~55, or WebP |
| ≤500 KB (forums, email) | 1200–1600px · JPG/WebP, size target does the rest |
| ≤2 MB (attachment etiquette) | 1920px · JPG Q80-ish |
| "Whole thread under 25 MB" | 1600px · ≤500 KB × N photos, no math required |

One more lever worth knowing: if a photo looks bad *after* compression, it's usually text edges or sky gradients — those want PNG/WebP-lossless, and they tolerate lower quality on photos than you'd expect. When in doubt, halve the dimensions before you halve the quality; the human eye forgives resolution far more readily than artifacts.

## And the EXIF thing

Since the batch is open anyway: a size cap in KB is also the moment to shed metadata. EXIF can pin a photo to within a few meters of where it was taken. Nothing about "≤500 KB" needs your camera model or coordinates, and server-upload tools keep all of it. An on-device workflow can strip it as a checkbox — which doubles as a good privacy default for anything you're about to send to strangers.

**Try it:** [PixTally on Google Play](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.imagerecipe) (Android 8.0+) · or build the same recipe chain yourself in any batch tool — the recipe is the point. If your batches skew WebP, the [batch WebP guide](/blog/batch-convert-photos-webp-android) covers the quality-vs-size curve there; for fixed platform dimensions, the [image size cheat sheet](/blog/social-media-image-sizes-cheat-sheet).
