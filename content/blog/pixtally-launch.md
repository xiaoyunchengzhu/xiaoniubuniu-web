---
title: "Launching PixTally: Whole Batches of Photos, One Saved Recipe, Zero Uploads"
date: "2026-11-02"
category: "build-in-public"
tags: ["launch", "Android", "photo processing", "privacy", "indie dev"]
description: "PixTally is live on Google Play: chain crop, resize, compress, format-convert and EXIF-strip into one saved recipe, then run it over any batch of photos — entirely on your phone. Here's why it exists, why it refuses uploads, and why it changed its name."
image: "/images/blog/pixtally/feature-graphic.png"
---

Today [PixTally](/products/pixtally) went live on [Google Play](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.imagerecipe) (Android 8.0+, free with ads + a one-time Pro). It's a batch image processor with one idea at its core: you should describe an image-editing task **once** and reuse it forever, instead of doing the same four-tap dance sixty times.

## The itch

Every time I publish a blog post I end up with the same pile of photos to prep: resize to 1600px, squeeze under 500 KB, export WebP, strip GPS. On a desktop that's a drool-worthy shell one-liner or Squoosh tab number nine. On my phone — where the photos actually live — the options were: a one-trick "compress photo" app that processes one image at a time, or a web tool that says "please upload your images to our server."

I kept refusing the upload. These are photos with EXIF coordinates of my neighborhood. The processing itself — decode, scale, re-encode — is what, 80 milliseconds of a phone CPU per image? Since roughly 2015. The upload wasn't a feature; it was an accident of where the tools got written.

So I wrote the one that doesn't upload.

## The shape it took

A **workflow** (internally: a recipe) is an ordered chain of five step types: **Crop · Resize · Compress · Format (JPG/PNG/WebP) · Strip EXIF**. Resize takes a width cap or exact pixels; Compress takes a quality target *or* a hard size budget ("≤500 KB"); steps can repeat. Save the chain, name it, run it over any batch: system photo picker → per-image preview of output size before anything is written → Convert. Output goes to its own `Pictures/` subfolder; originals are never touched. Every run is logged and replayable.

Six recipes ship built-in (WebP for blog images, Square 1080 for Instagram, LinkedIn 1200×627, Email ≤2 MB…), because most people want to tap a verb, not configure a pipeline.

The design constraints I held the line on:

- **On-device or nothing.** No upload endpoint exists in the app. It works in airplane mode. (Ads and anonymous crash stats are the only network traffic — the ad SDK never sees your image bytes.)
- **No storage permission.** The system photo picker is enough; the app literally cannot browse your gallery.
- **Originals are sacred.** Output always goes to a new file. There's an opt-in overwrite mode in Settings for the people who really want it — off by default, with a warning label.

## Why "PixTally", and what about ImageRecipe?

The app's first public builds were named **ImageRecipe** — literal, descriptive, and dead on arrival as a brand. It reads like a cooking blog, three syllables too long, and after a few months of saying it out loud I was still restating it. The product's actual promise is "run a whole batch and get a clean count of what changed," so it became **PixTally**. Everything technical stayed put: same package, same signature, existing installs update in place, saved workflows and history carry over untouched. 1.4.0 is the first release out of the gate with the new name — store title is *PixTally: Image Batch Workflow*.

## What beta caught

Closed testing earned its keep. The ugliest bug class was threading: the ad SDK's next-generation version dispatches load callbacks on background threads, and one of those callbacks flipped a `View` — a crash that never reproduced in the emulator and showed up in exactly one crashlytics fingerprint on real devices. Fixed, plus a full regression matrix of rotate-mid-load / kill-mid-load / airplane-mode launches. Android 8–9 storage quirks (no scoped storage, no `RELATIVE_PATH`) also shook out — pre-Q devices write through a different code path that only a real 8.x device would have bullied into correctness.

## The deal

Free: 3 saved recipes, 20-image batches, ads on. Pro is a one-time $4.99: unlimited recipes, unlimited batches, no ads. If PixTally saves you the one-by-one tap dance even once a week, it's worth five dollars — and it will never, ever upload your photos to find out.

Install: **[play.google.com/store/apps/details?id=com.xiaoniubuniu.imagerecipe](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.imagerecipe)** · Product site: **[pixtally.xiaoniubuniu.com](https://pixtally.xiaoniubuniu.com)**

Next up: a workflow import/export format, and per-step undo in the editor. If you try it, tell me which built-in recipe you actually use — the numbers decide what gets a seventh slot.
