---
title: "How to Download an m3u8 (HLS) Video as One Playable MP4"
date: "2026-10-24"
image: "/images/products/webmedia-scanner/feature_graphic.png"
category: "toolbox"
tags: ["m3u8", "HLS", "video downloader", "ffmpeg", "Android"]
description: "m3u8 files aren't videos — they're shopping lists for them. Here's how to actually download an HLS stream as a single playable MP4, on a PC with ffmpeg or VLC, and on Android without a computer."
---

## Quick Answers

### Can I download an m3u8 video as a normal MP4 file?
Yes, losslessly and in seconds: `ffmpeg -i "playlist.m3u8" -c copy output.mp4` remuxes the segments without re-encoding. On Android, an app like [WebMedia Scanner](/products/webmedia-scanner) does the same job on-device.

### Why doesn't my download manager save an .m3u8 link properly?
Because an m3u8 isn't a video — it's a text playlist indexing hundreds of separate `.ts` segment files. Something has to fetch every segment and stitch them together; download managers just fetch the one file they were given.

### Can any tool download DRM-protected HLS streams?
No legitimate one. AES-128 clear-key streams (the key is in the playlist) are fine, but Widevine and SAMPLE-AES stay encrypted — that boundary is the point of DRM, and crossing it is a legal problem, not a feature request.

## First: An m3u8 Is Not a Video

Paste an `.m3u8` URL into a normal download manager and one of two things happens: you get a tiny text file, or the download fails. That's expected. HLS (HTTP Live Streaming) splits a video into hundreds of small `.ts` segments — usually 4 to 10 seconds each — and the m3u8 "playlist" is just an index that says *fetch these, in this order, at this quality*. A master playlist adds another layer: one file pointing at several quality variants (1080p, 720p, 480p...), each with its own sub-playlist.

So "downloading an m3u8 video" is always three jobs:

1. Find the right playlist URL.
2. Fetch every segment it references.
3. Stitch (and if needed, decrypt) them into one file.

Doing all three by hand is why people give up. Here's every practical route, worst first.

## Step 0: Find the Real Playlist URL

Right-clicking a video player rarely shows you the m3u8 — the player fetched it dynamically. On a desktop Chrome:

1. Open DevTools (`F12`) → **Network** tab.
2. Type `m3u8` in the filter box.
3. Reload the page and press play.

You'll see one or more playlist requests. The master playlist is usually short (a few hundred bytes, lists `BANDWIDTH` and `RESOLUTION`); open the biggest/most specific one if you want a particular quality. Keep this tab open — you'll also want the request headers in a moment.

If the segment requests (`*.ts`) return **403 Forbidden**, the site uses hotlink protection: it checks the `Referer` header. Note the page URL — you'll need to send it along.

## Method 1: ffmpeg (the honest default)

[ffmpeg](https://ffmpeg.org) handles HLS natively, including reassembling segments:

```bash
ffmpeg -headers "Referer: https://example.com/" \
  -protocol_whitelist file,http,https,tcp,tls,crypto,hls,httpproxy \
  -i "https://example.com/video/master.m3u8" \
  -c copy output.mp4
```

`-c copy` means *don't re-encode* — segments are already H.264/AAC, so this is a remux: no quality loss, finishes in seconds. For `#EXT-X-KEY` playlists using plain **AES-128 with a clear key URI**, ffmpeg fetches and applies the key automatically — "encrypted" m3u8 downloads fine here. (DRM is a different story; see the last section.)

To pick a specific quality instead of letting ffmpeg choose, open the master playlist in a text editor, copy the variant sub-playlist URL, and feed that to `-i`.

## Method 2: VLC (no command line)

VLC can do it: **Media → Open Network Stream**, paste the m3u8 URL, then instead of playing, use **Playback → Convert/Save** and pick MP4 as the container. It works, but it processes the stream in near-real-time — a 50-minute video takes 50 minutes. Acceptable occasionally, painful as a habit.

## Method 3: Browser Extensions and Online Converters

There's a stack of "M3U8 downloader" Chrome extensions (M3U8 Keeper, FetchV) that sniff the playlist for you and merge it, and online converters where you paste a link. Two problems:

- **Extensions are desktop-Chrome only** — and many of the pages you actually want are mobile pages.
- **Online converters route your links through someone's server.** Whatever the privacy policy says, you've just told a third party which URLs you're downloading, and the file passes through hardware you don't control.

For one-off emergencies they're fine. As a tool you rely on, neither shape is good.

## Method 4: On Android, Without a Computer

This is the case nobody's tutorial covers well, because there's no DevTools in your pocket and no ffmpeg in your path. The pieces — watch the network traffic, find the playlist, download segments, decrypt, remux — all have to happen inside one app.

That's exactly what I built [WebMedia Scanner](/products/webmedia-scanner) for. You open the page inside the app; it watches every network request the page makes, and when an HLS stream appears you get it as one entry in the list. Tapping download takes care of the rest:

- Pick any bitrate variant from the master playlist (or batch all qualities on Pro).
- **AES-128 encrypted streams are decrypted automatically** and remuxed into a single playable `.mp4` — no `.ts` confetti.
- Hotlink-protected segments work, because the page's `Referer` and cookies ride along with every request.
- Big files **resume** over HTTP Range instead of restarting when the Wi-Fi hiccups.

It's free on [Google Play](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.mediadownloader) (Android 8.0+), and the whole pipeline runs on-device — no server ever sees your links.

## What None of These Methods Can (or Should) Do

Everything above works on **unencrypted** media and **AES-128 clear-key** streams. It stops dead at real DRM — Widevine (most commercial streaming services) and SAMPLE-AES. That's not a missing feature; it's the line. Decrypting DRM is where "handy utility" becomes a legal problem, and every tool that claims otherwise is lying or about to be removed from its store. WebMedia Scanner detects DRM streams, marks them as unsupported, and leaves them alone.

## A Note on Rights

A download button's absence is not always an accident — it's often the owner's choice. Use these methods on content you're entitled to keep: your own uploads, openly licensed material, or pages offering no offline option for content you have permission to store. Respect the site you're sniffing.

---

If you're archiving media on your phone and want it somewhere useful afterward, my other app [BrowserDrop](/products/browserdrop) shares your Downloads folder to any browser on the same Wi-Fi — no cloud round trip.
