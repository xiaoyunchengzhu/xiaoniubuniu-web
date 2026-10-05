---
title: "How to Transfer Files from Android to PC Without a USB Cable"
date: "2026-10-05"
category: "toolbox"
tags: ["file transfer", "Android", "PC", "Wi-Fi", "no USB"]
description: "Five ways to move files between an Android phone and a computer without plugging anything in — compared on speed, setup friction, and whether your files pass through a third-party server. The method I keep coming back to runs entirely over your own Wi-Fi."
image: "/images/blog/browserdrop/3-why-its-different.png"
---

Every listicle on this topic opens with "just use Google Drive." That advice breaks the first time you try to move 2 GB of raw footage, or work from a machine you don't own, or notice your photos came back re-compressed. Here are the options that actually work, with the tradeoffs stated honestly.

## The short version

| Method | Needs on PC | Needs on phone | Files leave your network? | Good for |
|---|---|---|---|---|
| Local HTTP server app | Nothing (browser) | One app | No | Large files, locked-down machines |
| FTP server app | FTP client | One app | No | Bulk folder sync, existing workflows |
| SMB / Windows sharing | Nothing | Built-in settings | No | Occasional transfers, no new installs |
| Chat-app transfer | Desktop client | Chat app | **Yes** | Small files you're sending anyway |
| Cloud drive | Client or browser | App | **Yes** | Access from anywhere, cross-device |

The first three are LAN methods: your phone and computer talk directly, at whatever speed your Wi-Fi supports, and nothing touches the internet. The last two route through someone else's server — usually fine, sometimes not.

## 1. A local HTTP server on the phone

This is the one I use most, and it's the reason I built [BrowserDrop](https://browserdrop.xiaoniubuniu.com).

The idea: the phone runs a tiny web server bound to your local network. You open its address — something like `http://192.168.1.20:8080` — in a browser on any computer, and the shared folder appears as a web page. Browse, click to download, select a bunch of files and grab them as one ZIP, or drag files from the desktop into the browser window to push them back to the phone.

Why this beats the other LAN options for everyday use:

- **Nothing installs on the computer.** That matters on a work laptop with software restrictions, on someone else's machine, or on a Chromebook.
- **It's bidirectional.** Uploads work the same way downloads do.
- **Preview works inline.** Photos, video, PDFs and text open in the browser tab, so you can find the file you actually want instead of guessing at filenames.

The setup is the phone side only: pick one folder to share, tap Start, read the pairing code or scan the QR. Any app that does this works roughly the same way. Mine shares exactly one folder chosen through Android's Storage Access Framework, which means it can't read anywhere else on the phone even if it wanted to.

The limitation: both devices need to be on the same Wi-Fi. This is a local tool, not a remote-access tool.

## 2. An FTP server app

Old reliable. Apps in this category start an FTP/SFTP listener, and you connect from FileZilla or a OS file manager.

Fast for bulk moves and scriptable — if you already have an FTP habit, keep it. But it's a two-machine setup: you need a client on the computer, credentials to manage, and nothing previews. You're looking at filenames and downloading on faith. For most people who don't already run FTP, it's strictly more work than method 1.

## 3. SMB / Windows network sharing

Android ships a built-in SMB client under Settings → Connected devices (labelled differently per OEM), and macOS mounts SMB out of the box. No new software anywhere.

The catch is that the direction is usually backwards from what you want — the *computer* shares a folder and the phone reads it. Exposing the phone's storage over SMB is not a stock Android feature, and where OEMs add it, it tends to be buried and inconsistent. It also wants a network profile that isn't set to "public." Worth knowing exists; awkward as a daily path.

## 4. Chat apps (WhatsApp, Telegram, Messenger)

Sending files to yourself through a chat app is genuinely convenient for a handful of small documents. It is a bad file transport: photos get re-compressed, video gets re-encoded, size caps force chunking, and a "transfer" becomes two round trips through a company's servers. If the file is sensitive or large, this is the wrong tool regardless of how quick it feels.

## 5. Cloud drives

Google Drive, Dropbox, OneDrive — same architecture problem as chat apps, plus a bandwidth paywall on the download side for many free plans. Upload-then-download is also slower than a direct Wi-Fi transfer by however long the upload takes.

Where cloud wins: the receiving device isn't on your network. If you need the file tomorrow from a café, put it in the cloud. For moving files between two devices sitting in the same room, it's a detour through someone else's datacenter.

## What about the "nearby sharing" built-ins?

Quick Share (Android) and AirDrop (Apple) are excellent for phone-to-phone. Phone-to-*computer* is where the story changes: AirDrop needs a Mac; Quick Share now has a Windows preview, but it requires installing a Google app on the PC and, in practice, a signed-in Google account. If you have a Mac, both methods are worth using. If you don't, or if the machine can't install software, the browser route above is more universal.

## My actual recommendation

For files over 100 MB, or anything you'd rather not upload, or a computer you can't install software on: run a local HTTP file server on the phone and open it in a browser. It's the only method that needs nothing on the receiving end and never puts your bytes on a third-party server.

The one I wrote is free on Google Play — [BrowserDrop](https://play.google.com/store/apps/details?id=com.xiaoniubuniu.browserdrop), Android 7 and up. It carries a small banner ad; there's a one-time purchase to remove it. If you'd rather build the setup yourself, any "HTTP file server" app in the store follows the same shape, and the method transfers between them.
