---
title: "BrowserDrop"
date: "2026-09-11"
status: "in-development"
category: "mobile"
icon: "/images/products/browserdrop/icon_256.png"
platforms: ["Android"]
tags: ["Android", "file transfer", "LAN", "HTTP", "Java", "no cloud"]
description: "Your Android files, in any browser. Pick a folder on your phone, open a link on your computer — browse, download, upload over your local Wi-Fi. No cloud, no account, no PC client. Currently in closed beta."
link: "https://browserdrop.xiaoniubuniu.com"
image: "/images/products/browserdrop/feature_graphic.png"
cta_label: "Join the Closed Beta"
cta_url: "https://play.google.com/apps/testing/com.xiaoniubuniu.browserdrop"
subline: "Free during beta · Android · No account needed"
highlights: ["No cloud", "No account", "No PC client"]
pricing: "free"
app_category: "UtilitiesApplication"
screenshots:
  - "/images/products/browserdrop/shot-1.jpg"
  - "/images/products/browserdrop/shot-2.jpg"
  - "/images/products/browserdrop/shot-3.jpg"
  - "/images/products/browserdrop/shot-4.jpg"
---

![BrowserDrop](/images/products/browserdrop/feature_graphic.png)

## Move Files Between Phone and Computer Without a Middleman

Every file-transfer tool I tried had the same problem: a middleman. Chat apps re-compress your photos and cap file size. Cloud drives upload to a server you don't control — then the "fast" download crawls at 1 MB/s behind a bandwidth paywall. Dedicated apps need a client installed on both ends.

None of that is necessary. Your phone and your computer are already on the same Wi-Fi, talking to each other all the time. BrowserDrop just exposes the file channel directly: **your phone becomes the server, your browser becomes the client.**

## How It Works

1. Open BrowserDrop on your Android phone, pick one folder to share (SAF picker — the app never asks for all-storage permission).
2. Tap **Start Sharing**. A QR code and a 6-digit pairing code appear.
3. On your computer, open the shown `http://192.168.x.x:8080` address in any browser and enter the code. That's it.

The web workspace shows the folder tree, previews photos and videos inline, downloads single files or entire directories as ZIP, and accepts uploads back to the phone. It works from laptops, desktops, even a second phone's browser — anything with Wi-Fi and a browser, including locked-down machines where you can't install software.

Everything happens over plain local HTTP inside your network. **Files never touch a server owned by me or anyone else.** There is no account, no sign-in, and the app's only network permission is talking to devices on your own LAN.

| Traditional way | BrowserDrop |
|---|---|
| Upload to cloud → wait → download | Direct LAN transfer at Wi-Fi speed |
| Re-compresses photos | Bytes arrive untouched |
| Account + app on both devices | One app, browser on the other end |
| Transfer history kept on servers | Stop sharing and the server is simply gone |

## The Details That Matter

**Approval, not open access.** A pairing code that expires with the session, an optional approve-each-connection gate, and session expiry. Anyone who closes the sharing page has closed the door — there is no port left forwarded, no background sync reaching out anywhere.

**One folder, exactly one.** BrowserDrop shares only what you picked through Android's Storage Access Framework. It cannot see the rest of your storage even if asked.

**Works while the phone sleeps.** A foreground service keeps the server alive with a persistent notification and a one-tap Stop — so you can close the lid of your laptop... and your phone's screen, without the transfer dying.

## Status: Closed Beta

BrowserDrop is currently in **closed testing on Google Play** and is not listed in the store yet. The beta exists to stress-test exactly the things simulators can't: aggressive OEM battery killers (Xiaomi, Samsung, vivo...), flaky networks, and real-world usage patterns before the public release.

The beta is free and ad-free, and it collects nothing beyond anonymous crash reports.

**Want in?** Three steps, one Google account, about two minutes (Android 7.0+):

1. **Join the test group:** [groups.google.com/g/xiaoniubuniu](https://groups.google.com/g/xiaoniubuniu)
2. **Become a tester:** [play.google.com/apps/testing/com.xiaoniubuniu.browserdrop](https://play.google.com/apps/testing/com.xiaoniubuniu.browserdrop)
3. **Install the test build:** [play.google.com/store/apps/details?id=com.xiaoniubuniu.browserdrop](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.browserdrop)

Step 3 only works after step 2 — if the Play page says the app isn't available in your country, your opt-in hasn't propagated yet; wait a few minutes and refresh. And please stay opted in for at least two weeks — the beta window Google counts runs on continuous participation.

Product site with full documentation: **[browserdrop.xiaoniubuniu.com](https://browserdrop.xiaoniubuniu.com)**

## What's Next

After the beta stabilizes: public release on Google Play, then quality-of-life work based on tester feedback — multi-folder sharing and faster bulk downloads are the two most requested items so far. I'll update this page when the doors open.
