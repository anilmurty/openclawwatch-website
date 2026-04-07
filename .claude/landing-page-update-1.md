# Task: Update opencla.watch landing page

## Context
OpenClawWatch v0.1.1-alpha is now live on PyPI and npm. The repo is public at github.com/Metabuilder-Labs/openclawwatch. The landing page needs to reflect this — it currently still has a waitlist form and doesn't link to the live product.

---

## 1. Hero section overhaul

The hero should immediately communicate three things: what this is, who it's for, and what ecosystem it works with.

### Integration showcase strip
Add a horizontal strip of integration logos/icons above or below the headline. These should be subtle, monochrome/muted on the dark background, arranged in a single row:

**Providers:** Anthropic · OpenAI · Google Gemini · AWS Bedrock
**Frameworks:** LangChain · LangGraph · CrewAI · AutoGen · LlamaIndex · OpenAI Agents SDK · OpenClaw
**Infra:** NemoClaw

Use simple text pills or small SVG icons — not full-color logos. Keep them muted (`--text-secondary` or lower opacity) so they don't compete with the headline. On hover, brighten to `--text-primary`.

### Update hero copy
Current: "Observe every agent. Locally."
Keep this — it's strong.

Replace the subtitle with something that emphasizes the product is live:
```
Open-source, OTel-native observability for autonomous AI agents.
Now available on PyPI and npm. MIT licensed.
```

### Replace CTAs
Current: "Join the waitlist" + "Read the docs"
New: **"Get started"** (anchor to #install section) + **"View on GitHub"** (links to github.com/Metabuilder-Labs/openclawwatch, opens in new tab)

The "Get started" button should be the primary CTA (accent color). "View on GitHub" should be secondary/outline style with a GitHub icon.

### Key feature badges
Keep the existing badges below the CTAs but update them:
- `v0.1.0-alpha` (new — version badge)
- `MIT License`
- `Python + TypeScript`
- `OTel SemConv compliant`

### Terminal animation
Keep the existing terminal animation — it's good. Make sure the `pip install` command shows `openclawwatch` and the npm install shows `@openclawwatch/sdk` (verify the npm package name matches the published name).

---

## 2. Remove all waitlist references

The product is live. Remove:
- The "Join waitlist" nav CTA button → replace with **"Get started"** (anchor to #install) 
- The "Join the waitlist" hero CTA → replaced above
- The entire **"Early access / Be first to run it"** waitlist section near the bottom
- Any "waitlist" anchor links in the nav
- The waitlist form and associated JavaScript

### Update nav structure
```
[Logo]    Features   Install   Compare   ClawWatch   Docs ↗    [Get started]
```

- **Docs ↗** should link to the GitHub repo README for now (the README IS the docs)
- **Get started** button anchors to `#install`

---

## 3. Add Contact section

Replace the removed waitlist section with a **Contact** section. Match the style from metabldr.com's CONNECT section (dark background, clean typography, same email structure).

### Section structure
```
CONNECT

Got a complimentary product?     partner@metabldr.com
Interested in joining our mission?   join@metabldr.com
Looking for advice on how to use AI & Agents?   consult@metabldr.com
Inspired by what you see and want to invest?   invest@metabldr.com

Follow us on our social channels:   [X icon] [LinkedIn icon] [Substack icon]
```

### Styling
- Section label: `CONNECT` — same style as other section labels (`JetBrains Mono`, 11px, letter-spacing 0.12em, accent color)
- Layout: each line is a row with the description on the left and the email on the right (or inline on mobile)
- Email addresses should be `mailto:` links styled in the accent color
- Social icons: X (twitter), LinkedIn, Substack — small, monochrome, hover to accent color
- Background: match the dark section background used elsewhere on the page
- Placement: between the OSS/Commercial boundary table and the footer

---

## 4. Additional updates

### Update the quick install strip
Verify the npm package name shows `@openclawwatch/sdk` (not `@ocw/sdk`).

### Update the "Works with every major agent runtime" section
This section already exists and looks good. Make sure it matches the integration list in the hero strip. If any are missing, add them.

### Footer updates
- Add GitHub repo link
- Add PyPI link
- Add npm link
- Update any "coming soon" or "waitlist" language
- Keep the "Part of the ClawWatch ecosystem" → cla.watch link

### GitHub social preview reference
If there's a way to add an Open Graph image meta tag, set it to a good preview image. The hero section itself — with the integration strip, headline, and terminal animation — is what should be captured in `og:image`. This can be a static screenshot or a designed preview image added later.

---

## What NOT to change
- The comparison table — it's accurate and well-structured
- The OSS/Commercial boundary table — keep as-is
- The problem/solution section — keep as-is
- The features card grid — keep as-is
- The overall dark theme and color system (`#0D1117` background, `#00E5A0` accent if that's what's in use, `JetBrains Mono` for UI chrome)
- The terminal animation interaction pattern — keep, just verify content

---

## Verification
- No remaining references to "waitlist" anywhere on the page
- Hero CTAs link to #install and GitHub repo respectively
- Contact section renders with correct emails and social links
- npm package name shows `@openclawwatch/sdk` everywhere
- All nav links work (Features, Install, Compare, ClawWatch, Docs, Get started)
- Page is responsive — check mobile layout for the integration strip and contact section