---
title: "How I Built My Personal Site in Half a Day with Claude Code + Next.js + Cloudflare Pages"
date: "2026-07-01"
image: "/images/blog/xiaoniubuniu-site-build.png"
category: "build-in-public"
tags: ["Claude Code", "Next.js", "personal website", "Cloudflare Pages", "indie dev", "site building", "SEO"]
description: "No WordPress, no CMS, no server. I used Claude Code for conversational development and shipped a full 7-page website in half a day. From domain registration to Cloudflare Pages deployment, complete workflow and lessons learned. Source code public."
---

## Why build my own site

In 2026 I quit my job, moved back to the countryside, and started full-time indie development. Freelancing needs a portfolio, writing needs a home, products need a base camp — so I decided to build a personal website.

Requirements were clear:

- Blog support (Markdown files, no online editor)
- Showcase my products and freelance services
- Recommend tools (with affiliate links where possible)
- **SEO-friendly** (content discoverable on Google)
- **Near-zero maintenance** (write MD locally, `git push` to publish)

## Domain registration: all-in on Namecheap

I picked `xiaoniubuniu.com` and registered it directly on Namecheap. Why not GoDaddy?

GoDaddy is cheap in year one but doubles on renewal. Namecheap has transparent pricing, free Whois privacy protection, and a clean domain management UI. For an individual developer, stable renewal pricing matters far more than a first-year discount.

## Hosting: why Cloudflare Pages

Common options for a personal blog:

| Option | Cost | Speed | Maintenance | Best for |
|------|------|------|---------|------|
| Cloud server + WordPress | from $5/mo | average | high (security updates, backups, tuning) | non-technical users |
| Vercel / Netlify | free | fast | low | frontend projects |
| **Cloudflare Pages** | **free** | **extremely fast (global CDN)** | **zero** | **static sites** |

Cloudflare Pages wins outright: free, instant loads on a global CDN, auto-deploy on git push, automatic SSL. I need no dynamic backend — all blog content is static Markdown, so Cloudflare Pages is the natural fit.

## Tech choice: why not WordPress or a third-party CMS

This is the question non-technical friends always ask.

WordPress powers 40% of the web, with a massive plugin ecosystem and endless themes. But for me, **WordPress is too heavy**:

- PHP + MySQL to maintain, with constant vulnerability risk
- Writing experience depends on the admin editor; Markdown support is not native
- Want custom styles or a new feature? Find a plugin (maybe incompatible) or hack PHP (painful)
- SEO plugins, cache plugins, security plugins… each one a potential performance killer

I also considered Ghost, Medium, and Notion + Super:

- **Ghost**: open-source blog CMS, lighter than WordPress, but still a server and database to maintain. Editing experience is nice, but the stack is Node.js + Handlebars — still a hassle when I want to change something.
- **Medium**: your articles don't belong to you; if the platform dies, the content goes with it. No custom pages or affiliate links either.
- **Notion + Super / Nextra**: relies on third-party rendering — slow loads, compromised SEO.

**Conclusion**: for a technical blog, **a static site generator (SSG) + Markdown files + Git** is the optimal answer.

## Claude Code: not AI-assisted, AI-driven development

This is the heart of the article.

I used **Claude Code** (Anthropic's CLI dev tool) to write the vast majority of this website's code. Here's what it was like:

### How it worked: conversation as programming

The whole flow went like this —

I said: **"I need a Next.js personal site with home, blog, products, tools, about, and contact pages, black-and-white palette with orange accents, deployed to Cloudflare Pages, blog in Markdown."**

Claude Code did the rest on its own:

1. Scaffolded a Next.js 14 + TypeScript + Tailwind project
2. Installed all dependencies (gray-matter, react-markdown, react-syntax-highlighter, etc.)
3. Configured the Cloudflare Pages adapter `@cloudflare/next-on-pages`
4. Wrote every page: home, about, blog list, blog detail, tools, services, contact
5. Wrote the global components: navbar, footer, blog card, tool card
6. Set up SEO metadata, responsive layout, dark code highlighting
7. Created sample Markdown articles and product files
8. Wrote the deployment docs

From the first prompt to a fully running site: about **half a day**. Hand-writing the same work would have taken me at least 3–5 days.

### Accuracy: better than expected

Anyone who has written code knows the slow parts of a multi-page Next.js project aren't the typing — they're:

- Getting Tailwind, TypeScript, and ESLint to stop fighting each other
- Version compatibility issues with the Cloudflare Pages adapter
- Server Component vs Client Component boundary handling
- Debugging build errors

On these, Claude Code performed like a frontend engineer with 5 years of experience. Hit by a version conflict between @cloudflare/next-on-pages and Next.js 14.2.x, it looked up version numbers itself, downgraded the adapter, and refactored the blog filter component to resolve an Edge Runtime compatibility issue — the whole thing took under 10 minutes.

### Cost of updates afterwards: essentially zero

Another key advantage of this stack.

**New article**: create a `.md` file under `content/blog/`, fill in title, category, tags, write the body. `git push` → Cloudflare auto-deploys → live.

**New product**: create a `.md` file under `content/products/`; the listing and detail pages generate themselves.

**Page structure changes**: tell Claude Code "add an XXX entry to the navbar" → I review the diff → push. No hunting through seven or eight files for the line to change.

**New features**: like "add category filtering to the tools page" — Claude Code split out a constants file on its own to keep `fs` out of client components. More careful than I would have been.

## From local to live: the full deployment flow

Once development was done, how do you get it in front of the world? Four steps:

### Step 1: push the code to GitHub

Init Git in the project root, link the GitHub repo, push:

```bash
git init
git add .
git commit -m "Initial commit: xiaoniubuniu.com"
git remote add origin git@github.com:xiaoyunchengzhu/xiaoniubuniu-web.git
git push -u origin main
```

The full source of this site is public — feel free to reference it and drop a Star:

> 👉 **GitHub: [xiaoyunchengzhu/xiaoniubuniu-web](https://github.com/xiaoyunchengzhu/xiaoniubuniu-web)**

### Step 2: connect Cloudflare Pages to GitHub

Cloudflare dashboard → **Workers & Pages** → **Pages** → **Connect to Git**, select the GitHub repo.

Key settings:

| Setting | Value | Notes |
|------|-----|------|
| Build command | `npx @cloudflare/next-on-pages` | Cloudflare adapter build |
| Output directory | `.vercel/output/static` | generated by the adapter |
| Compatibility flags | `nodejs_compat` | Node.js API compatibility |

Hit "Save and Deploy" — Cloudflare pulls the code, installs dependencies, builds, and publishes automatically. The first build takes about 2–3 minutes. You get a `*.pages.dev` preview domain you can visit immediately.

### Step 3: point your domain at Cloudflare (Namecheap → Cloudflare)

For my Namecheap-registered domain, DNS needs to point at Cloudflare Pages.

Namecheap dashboard → Domain List → the domain → **Advanced DNS** → add one CNAME record:

| Host | Type | Value |
|------|------|-------|
| `www` | CNAME | `xiaoniubuniu-web.pages.dev` |

Save and wait a few minutes for DNS to propagate.

### Step 4: custom domain + SSL

Back in Cloudflare Pages → project settings → **Custom Domains**, add `www.xiaoniubuniu.com`.

Once Cloudflare verifies DNS propagation, it issues the SSL certificate automatically. No manual cert setup, no Nginx config, no HTTPS redirect rules — do nothing, wait two minutes, everything's green.

### The full pipeline

```
Write MD locally → git push → Cloudflare auto-build → global CDN deploy → www.xiaoniubuniu.com live
```

From `git push` to production: **fully automatic, under 30 seconds**. No SSHing into servers, no dragging files, no restarting services. That's exactly why I dropped WordPress for Cloudflare Pages — **zero friction to publish content**.

Every future article, page tweak, or bug fix follows the same flow: edit locally → `git add` → `git commit` → `git push` → wait 30 seconds → live.

---

## Pitfalls I hit

### 1. `@cloudflare/next-on-pages` version conflict

The latest next-on-pages requires Next.js >= 14.3.0 — but the newest Next.js 14 is 14.2.35. **Version 14.3.0 simply doesn't exist.** Final answer: pin `@cloudflare/next-on-pages@1.13.15`. Debugging this alone would have cost me an hour or two; Claude Code pinpointed it in minutes.

### 2. `setupDevPlatform()` causing 404s in local dev

Following Cloudflare's official docs, I added `setupDevPlatform()` — and suddenly every JS/CSS chunk 404'd under `next dev`. Root cause: that API simulates the Cloudflare Workers request pipeline, and our project doesn't need the Workers runtime. Removed it, problem gone.

### 3. `fs` can't appear in client components

In the Next.js App Router, any module transitively imported by a `"use client"` component must not depend on `fs`. To read blog/product/tool data from Markdown files, I split "file-reading functions" and "constants + type definitions" into separate files; client components import only the constants file.

### 4. The blog list page can't use `searchParams` for dynamic rendering

Cloudflare Pages expects all pages to be purely static. Using `searchParams` turns a page into a "dynamic route," and the Cloudflare build fails demanding `runtime = 'edge'`. Final approach: **a client component reads URL params for filtering**; the server just outputs the full article list, and search/category switching happens entirely in the browser.

## Who this stack fits

- You know a bit of Markdown and are comfortable with Git
- You want a fast site, good SEO, minimal maintenance
- You don't want WordPress's security and performance baggage
- You want to squeeze maximum productivity out of Claude Code / AI-assisted development

## Final costs

| Item | Cost |
|------|------|
| Domain `xiaoniubuniu.com` | ~$11.48/year |
| Cloudflare Pages hosting | free |
| GitHub hosting | free |
| Claude Code + DeepSeek V4 Pro | token-based, a few RMB — under $1 |

**Bare-running cost: $11.48/year** (call it $12 with tokens). Cheaper than a premium WordPress theme plus paid plugins — and you own everything.

---

> **Related reading**: [How I Built a Demand Mining System with Claude to Find Product Ideas](/blog/require-dis) — the same Claude Code tooling, pointed at finding product direction instead of building a website. Completely different idea.
>
> If you want a site like this, or have questions about the stack, [contact me directly](mailto:xiaoniubuniu@gmail.com). I can take you from zero to live.

---

*This article was drafted with Claude Code assistance based on my personal development notes and first-hand experience building this site. All code, decisions, and opinions are my own.*
