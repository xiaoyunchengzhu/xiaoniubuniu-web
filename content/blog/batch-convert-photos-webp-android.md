---
title: "How to Batch Convert Photos to WebP on Android — JPG, PNG and HEIC, No Uploads"
date: "2026-11-03"
category: "toolbox"
tags: ["WebP", "Android", "image conversion", "HEIC", "batch processing"]
description: "Convert a whole folder of JPG/PNG/HEIC photos to WebP directly on your Android phone: pick the built-in WebP recipe, set a width cap and a size budget, and convert sixty photos without uploading a single byte."
image: "/images/blog/pixtally/home.jpg"
---

WebP gives you roughly 25–35% smaller files than JPEG at the same visual quality, it supports transparency that JPEG throws away, and every browser released since 2020 displays it. For blog images, docs, or anything you ship to a web page, it's the default choice now. The annoying part is the *how* — especially from a phone, where the photo pile actually lives.

## Why "on Android" is the hard part

The desktop tools are fine: Squoosh, `cwebp`, IrfanView. All of them want your images on a computer first. Web converters want your images on *their server* first — which for photos means handing GPS-tagged originals to a stranger just to save 200 KB. iOS-only shortcuts cover the other phone. Meanwhile a modern Android phone has a WebP encoder in its own graphics stack, and enough CPU to encode a 1600px image in well under a tenth of a second. Nobody needs the cloud for this. It's just that nobody wrote the app.

So I wrote [PixTally](/products/pixtally) (free on Google Play, Android 8.0+): batch conversion happens entirely on-device. Here's the sixty-photos workflow end to end.

## The batch WebP conversion, step by step

1. **Open the built-in `WebP` recipe.** It chains the three steps that matter for web images: resize to a 1600px width cap → compress to ≤500 KB → convert to WebP. (Presets cover you; you can also build your own chain of crop/resize/compress/format/EXIF steps and save it.)
2. **Tap Convert → Select Images.** The system photo picker opens — PixTally never asks for storage permission, and it can't see anything you don't pick. Multi-select, including screenshots and camera shots. HEIC originals are fine on Android 9+.
3. **Check the preview.** Before writing anything, you get per-image rows: original size → planned output size, and the format. This is where you catch the one 4000px panorama that will still be 600 KB — drop it or retune the budget.
4. **Convert.** Results go to PixTally's own subfolder under `Pictures/` as `001.webp, 002.webp…`. The originals stay byte-identical — the app has no code path that modifies them (there's a deliberately opt-in, warning-labeled overwrite mode if you really want it).

## What the knobs actually do

| Setting | What it controls | Sensible values |
|---|---|---|
| Width cap (Resize step) | Long-edge limit; aspect kept | 1600px blog, 1920px hero |
| Size budget (Compress step) | Encoder walks quality down until the file fits | ≤500 KB web, ≤2 MB email |
| Quality floor | Hard cap when no budget is set | Q80 ≈ visually free |
| Strip EXIF (Metadata step) | Removes GPS/camera data | always, for anything public |

The size budget is the underrated one: "make every file fit in 500 KB, with as little quality loss as the encoder can get away with" is exactly what you'd tune by eye one image at a time — as a step it applies uniformly to the batch.

## Numbers from a real batch

A 60-photo camera dump (avg 3.8 MB JPG, ~4000px) through the WebP recipe at 1600w / ≤500 KB: **avg 210 KB out** — 94% smaller, all under budget, GPS gone, ~20 seconds wall clock on a midrange 2023 phone, zero bytes transmitted. The same batch in a web-upload converter would have meant sixty file pickers, a queue, and your EXIF in someone's temporary storage.

## Where it beats the alternatives

| Option | Batch? | On-device? | Size budget? | Cost |
|---|---|---|---|---|
| Web upload converters | "yes", upload-first | ❌ | rarely | free / ads / premium |
| Squoosh | one image at a time, needs desktop | — | manual slider | free |
| `cwebp` + shell | yes | yes | script it | desktop-only |
| [PixTally](/products/pixtally) | yes | yes | per-step | free (Pro $4.99 once for unlimited batches) |

**Get it:** [Google Play](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.imagerecipe) · [pixtally.xiaoniubuniu.com](https://pixtally.xiaoniubuniu.com)

Want the size targets for a specific platform instead? The [2026 social image size cheat sheet](/blog/social-media-image-sizes-cheat-sheet) has the numbers, and the same recipes apply.
