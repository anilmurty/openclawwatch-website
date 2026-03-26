# OpenClawWatch Landing Page — Implementation Spec
**For Claude Code** | Target URL: `opencla.watch` | Last updated: March 2026

---

## Overview

Single-page marketing/waitlist site for OpenClawWatch OSS. Dark navy + electric blue theme. Sibling to `cla.watch` (same product family, different accent color — cla.watch uses green, opencla.watch uses blue). No backend required for the static page. Waitlist form can POST to a simple serverless endpoint (e.g. Resend, Loops, or a Google Form embed).

**Stack:** Plain HTML + CSS + vanilla JS. No framework. One file (`index.html`) or split into `index.html` + `style.css` + `main.js` — your choice. Zero build step required.

---

## Fonts

Load from Google Fonts. Both are critical — do not substitute.

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight |
|---|---|---|
| Page headings (h1, h2) | Bricolage Grotesque | 800 |
| Body text, descriptions | IBM Plex Sans | 300–500 |
| All code, terminal, CLI output, badges, monospace labels | IBM Plex Mono | 300–500 |

---

## Color Tokens

Define as CSS custom properties on `:root`.

```css
:root {
  /* Dark backgrounds */
  --navy:   #070d1a;   /* page bg, hero bg */
  --navy-2: #0d1627;   /* section-dark, footer */
  --navy-3: #111e35;   /* install strip, table headers */
  --navy-4: #162240;   /* hover states */

  /* Blue accent (primary brand color) */
  --blue:      #3d8eff;
  --blue-dim:  #2a6fd4;
  --blue-glow: rgba(61,142,255,0.15);
  --blue-line: rgba(61,142,255,0.25);

  /* White / text on dark */
  --white:       #f5f8ff;
  --white-dim:   rgba(245,248,255,0.65);
  --white-faint: rgba(245,248,255,0.35);
  --white-ghost: rgba(245,248,255,0.08);

  /* Semantic */
  --green: #22d37a;
  --amber: #f0a500;
  --red:   #ff5b5b;

  /* Light section text */
  --text-dark:   #0f172a;
  --text-mid:    #334155;
  --text-light:  #64748b;
  --border-light: #e2e8f0;
  --bg-light:    #f8faff;
}
```

---

## Page Structure (top to bottom)

```
<nav>                    fixed, 60px tall
<section.hero>           dark navy, full viewport height
<div.install-strip>      dark navy-3, ~70px tall
<section.section-light>  white, problem/solution split
<section.section-light>  white, features grid + integrations
<section.section-dark>   navy-2, comparison table
<section.section-light>  white, OSS/commercial boundary table
<section.waitlist-section> dark navy, waitlist form + CTA
<footer>                 navy-2
```

---

## Section 1: Navigation (`<nav>`)

**Layout:** `display: flex; justify-content: space-between; align-items: center`  
**Position:** `fixed; top: 0; z-index: 100`  
**Height:** 60px  
**Background:** `rgba(7,13,26,0.85)` with `backdrop-filter: blur(16px)`  
**Border bottom:** `1px solid rgba(61,142,255,0.25)`  
**Padding:** `0 40px`

### Left: Logo
- Small icon: 28×28px box, `border: 1.5px solid var(--blue)`, `border-radius: 6px`. Contains a simple SVG radial/crosshair shape in `--blue`.
- Text: `Open` + `Claw` (in `--blue`) + `Watch`, `font-family: IBM Plex Mono`, `font-size: 15px`, `font-weight: 500`, `letter-spacing: -0.02em`

### Center: Nav links
`font-size: 14px`, `color: var(--white-dim)`, hover → `var(--white)`, gap `28px`

Links (in order):
1. `Features` → `#features`
2. `Install` → `#install`
3. `Compare` → `#compare`
4. `cla.watch ↗` → `https://cla.watch` (external)
5. `Docs` → `#` (placeholder)

### Right: CTA button
Single button: `Join waitlist` → scrolls to `#waitlist`  
Style: `background: var(--blue)`, `color: var(--navy)`, `font-weight: 500`, `font-size: 13px`, `padding: 7px 16px`, `border-radius: 6px`  
Hover: slightly lighter blue (`#5aa3ff`)

> ⚠️ No GitHub button or star count. These are hidden until the repo is public.

---

## Section 2: Hero

**Background:** `var(--navy)`  
**Min-height:** `100vh`  
**Display:** flex column, centered  
**Padding:** `100px 40px 80px`  
**Overflow:** hidden (for grid + glow effects)

### Background effects (layered, `position: absolute; inset: 0`)

**Grid texture:**
```css
background-image:
  linear-gradient(rgba(61,142,255,0.07) 1px, transparent 1px),
  linear-gradient(90deg, rgba(61,142,255,0.07) 1px, transparent 1px);
background-size: 48px 48px;
mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%);
```

**Top glow:**
```css
position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
width: 900px; height: 600px;
background: radial-gradient(ellipse at 50% 0%, rgba(61,142,255,0.18) 0%, transparent 70%);
```

### Hero content (`position: relative`, `text-align: center`, `max-width: 820px`, centered)

All hero children animate in with staggered `fadeUp` keyframe (opacity 0 → 1, translateY 16px → 0, 0.6s ease):

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Delays: badge 0s, h1 0.1s, subtitle 0.2s, CTAs 0.3s, meta 0.35s, terminal 0.45s.

**Badge** (delay 0s):  
Pill shape: `background: rgba(61,142,255,0.1)`, `border: 1px solid rgba(61,142,255,0.3)`, `border-radius: 20px`, `padding: 5px 14px`  
Font: IBM Plex Mono, 12px, `color: var(--blue)`  
Contains: pulsing dot (6×6px, `--blue`, `border-radius: 50%`, 2s pulse animation) + text:  
`MIT License · OTel GenAI SemConv · No signup required`

**H1** (delay 0.1s):  
Font: Bricolage Grotesque 800, `clamp(52px, 7vw, 88px)`, `line-height: 0.95`, `letter-spacing: -0.03em`  
Text (3 lines, with `<br>` breaks):
```
Observe every
agent.
Locally.
```
`Locally.` is wrapped in a `<span>` with `color: var(--blue)`.

**Subtitle** (delay 0.2s):  
IBM Plex Sans, 18px, `color: var(--white-dim)`, `line-height: 1.6`, `max-width: 580px`, centered  
Text: *"Open-source, OTel-native observability for autonomous AI agents. Full telemetry, cost tracking, and safety alerts — on your machine, no backend required."*

**CTA row** (delay 0.3s, `display: flex; gap: 12px; justify-content: center; flex-wrap: wrap`):

1. **Primary CTA** — `Join the waitlist`  
   `background: var(--blue)`, `color: var(--navy)`, `padding: 12px 24px`, `border-radius: 8px`, `font-size: 15px`, `font-weight: 500`  
   Has a small star/sparkle SVG icon left of text.  
   Hover: lighter blue + `box-shadow: 0 0 48px rgba(61,142,255,0.5)` + `translateY(-1px)`  
   Default shadow: `0 0 32px rgba(61,142,255,0.3)`

2. **Secondary CTA** — `Read the docs`  
   Font: IBM Plex Mono, 14px, `color: var(--white-dim)`  
   `border: 1px solid rgba(245,248,255,0.2)`, `border-radius: 8px`, `padding: 11px 22px`  
   Has a small monitor/screen SVG icon.  
   Hover: `color: var(--white)`, border lightens, subtle ghost background

**Meta row** (delay 0.35s, `display: flex; gap: 24px; justify-content: center; flex-wrap: wrap`):  
Font: IBM Plex Mono, 12px, `color: var(--white-faint)`  
Four items, each with a small SVG icon (13×13px, `color: var(--blue)`):
1. `5 min setup` (clock icon)
2. `Python + TypeScript` (plus/grid icon)
3. `OTel SemConv compliant` (star icon)
4. `Works with Grafana, Jaeger, Datadog` (list/lines icon)

---

## Section 2a: Animated Terminal (inside hero)

Positioned below the meta row. `max-width: 720px`, centered, `margin: 0 auto`.

### Terminal shell

```css
background: #080f1e;
border: 1px solid rgba(61,142,255,0.2);
border-radius: 12px;
overflow: hidden;
box-shadow:
  0 0 0 1px rgba(61,142,255,0.08),
  0 40px 80px rgba(0,0,0,0.6),
  0 0 80px rgba(61,142,255,0.1);
font-family: IBM Plex Mono, monospace;
font-size: 13px;
line-height: 1.7;
```

### Titlebar
`padding: 12px 16px`, `background: rgba(61,142,255,0.05)`, `border-bottom: 1px solid rgba(61,142,255,0.12)`  
Three traffic-light dots (11px circles, `#ff5f57` / `#ffbd2e` / `#28c840`) left-aligned.  
Center title: `ocw — bash`, IBM Plex Mono 12px, `rgba(245,248,255,0.3)`

### Terminal body
`padding: 20px 24px`, `min-height: 280px`

**Text color classes used in output:**
- `.t-prompt` — `rgba(61,142,255,0.7)` — the `$ ` prefix
- `.t-cmd` — `#e8edf7` — the command text
- `.t-success` — `var(--green)` (#22d37a) — success messages
- `.t-warn` — `var(--amber)` (#f0a500) — warnings/flags
- `.t-dim` — `rgba(245,248,255,0.35)` — secondary output
- `.t-blue` — `var(--blue)` — highlights
- `.t-key` — `#a78bfa` — key names (left of colon)
- `.t-val` — `#93c5fd` — values (right of colon)
- `.t-label` — `rgba(245,248,255,0.5)`, 11px — column headers

**Blinking cursor:** 7×8px inline-block `background: var(--blue)`, 1s step-end blink animation.

### Step tabs (below terminal body)
`display: flex`, `border-top: 1px solid rgba(61,142,255,0.12)`  
4 tabs, each `flex: 1`, `text-align: center`, IBM Plex Mono 11px  
Dividers: `border-right: 1px solid rgba(61,142,255,0.08)`

Tab states:
- **Default:** `color: rgba(245,248,255,0.3)`, transparent bg
- **Active:** `color: var(--blue)`, `background: rgba(61,142,255,0.07)`, 2px blue top border
- **Done (visited):** `color: var(--green)`, prefix `✓ `

Tab labels: `install` | `init` | `status` | `traces`  
Clicking a tab immediately shows that step's content.

### Animation logic

Steps auto-advance. Each line appears after its `delay` (ms). After the last line + 2000ms, advance to next step (wraps around).

**Step 0 — install:**
```
delay:0     $ pip install ocw                              [prompt+cmd]
delay:500   Collecting ocw...                              [dim]
delay:900     Downloading ocw-0.1.0-py3-none-any.whl      [dim]
delay:1500  Successfully installed ocw-0.1.0              [success]
delay:1800  (blank line)
delay:2100  $ ocw --version                               [prompt+cmd]
delay:2500  ocw 0.1.0 (python 3.12)                       [dim]
```

**Step 1 — init:**
```
delay:0     $ ocw init --agent my-email-agent             [prompt+cmd]
delay:600   ✓ Created .ocw/config.yaml                    [success]
delay:900   ✓ SQLite store at ~/.ocw/telemetry.db         [success]
delay:1200  ✓ Prometheus endpoint on :9464/metrics        [success]
delay:1400  (blank)
delay:1600    agent_id:    my-email-agent                 [key+val]
delay:1800    budget_usd:  5.00/day                       [key+val]
delay:2000    alerts:      email.send, file.write [CRITICAL] [key+val]
```

**Step 2 — status:**
```
delay:0     $ ocw status                                  [prompt+cmd]
delay:300   (blank)
delay:500   ● my-email-agent  active  (4m 23s)            [success]
delay:600   (blank)
delay:800     Cost today:    $0.034 / $5.00 limit         [key+val]
delay:1000    Tokens:        12,447 in · 3,821 out        [key+val]
delay:1200    Tool calls:    47  (2 failed)               [key+val]
delay:1400  (blank)
delay:1600    ⚠ email.send → 3 times in last 10 min      [warn]
delay:1900    ✓ No retry loops detected                   [success]
delay:2100    ✓ Schema valid on all tool outputs          [success]
```

**Step 3 — traces:**
```
delay:0     $ ocw traces --since 1h --limit 5             [prompt+cmd]
delay:400   (blank)
delay:600     TRACE ID       TYPE         DUR   COST  STATUS   [label, 11px]
delay:700     ─────────────────────────────────────────────    [dim]
delay:900     trace-a1b2c3   invoke_agent  1.2s  $0.008  ✓    [val]
delay:1100    trace-d4e5f6   tool: send_email  0.3s  —  ⚠ flagged [warn]
delay:1300    trace-g7h8i9   invoke_agent  0.9s  $0.006  ✓    [val]
delay:1500    trace-j1k2l3   tool: read_file  0.1s  —   ✓    [val]
delay:1700    trace-m4n5o6   invoke_agent  2.1s  $0.014  ✓    [val]
```

After the last line of each step, add a `$ ▌` cursor line (prompt color + blinking cursor element).

---

## Section 3: Install Strip (`id="install"`)

**Background:** `var(--navy-3)` (#111e35)  
**Border:** `border-top` and `border-bottom`: `1px solid rgba(61,142,255,0.1)`  
**Padding:** `24px 40px`

Inner: `max-width: 1080px`, centered, `display: flex; align-items: center; gap: 40px; flex-wrap: wrap`

**Label** (left): IBM Plex Mono, 12px, `var(--white-faint)`, text: `quick install`

**Command pills** (flex row, `gap: 12px`):

Each pill: `display: flex; align-items: center; gap: 10px`, `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 6px`, `padding: 8px 14px`, IBM Plex Mono 13px

- **Language label** (inside pill, left): 11px, `rgba(245,248,255,0.35)`, `border-right: 1px solid rgba(255,255,255,0.08)`, `padding-right: 10px`
- **Command text**: `color: #7cd4a3` (mint green)
- **Copy button** (right): small clipboard SVG icon, `color: rgba(245,248,255,0.3)`, hover → `var(--white-dim)`. On click: swaps icon to checkmark + turns green for 1.5s, copies text to clipboard.

Two pills:
1. `pip` | `pip install ocw` | copy button
2. `npm` | `npm install @ocw/sdk` | copy button

---

## Section 4: Problem / Solution (Light Section)

**Background:** `#fff`  
**Padding:** `100px 40px`  
**Max-width container:** 1080px centered  

**Layout:** `display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start`

### Left column: Problems

**Section label** (above h2):  
`display: inline-flex; align-items: center; gap: 8px`  
`font-family: IBM Plex Mono; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); margin-bottom: 16px`  
Has a 16×1px `var(--blue)` line before the text (via `::before` pseudo or inline element).  
Text: `the problem`

**H2:** Bricolage Grotesque 800, `clamp(32px, 4vw, 52px)`, `line-height: 1.05`, `letter-spacing: -0.025em`, `color: var(--text-dark)`  
Text: `Your agent ran.` / `But did it behave?`

**Intro text:** IBM Plex Sans, 17px, `color: var(--text-mid)`, `line-height: 1.65`, `max-width: 560px`, `margin-bottom: 32px`  
Text: *"Every other observability tool is built for LLM developers. OpenClawWatch is built for people whose agents have real-world side effects."*

**Three problem points** (`margin-bottom: 28px` each):  
Layout: `display: flex; gap: 16px`

Left: **Icon box** — 32×32px, `border-radius: 6px`, `background: rgba(255,91,91,0.08)`, `border: 1px solid rgba(255,91,91,0.2)`, `flex-shrink: 0`, `margin-top: 2px`. Contains 15×15px SVG in `var(--red)`.

Right: **Text**  
- `h4`: Bricolage Grotesque 700, 16px, `color: var(--text-dark)`, `margin-bottom: 5px`
- `p`: IBM Plex Sans, 14px, `color: var(--text-light)`, `line-height: 1.6`

Three points:
1. Icon: warning circle (⚠). Title: *"No visibility into what agents do while you sleep"*. Body: *"Agents running overnight have full access to email, files, and services. Without observability, you find out what happened when a customer complains."*

2. Icon: check/graph (trending up). Title: *"Silent cost blowouts"*. Body: *"An agent looping on a failing tool call can burn $40/hr. Without per-agent cost tracking, you get the bill at the end of the month."*

3. Icon: X/close. Title: *"Every tool requires a SaaS account"*. Body: *"Behavioral drift detection, safety alerts, schema validation — they all require API keys, hosted backends, and credit cards. OpenClawWatch runs on your machine."*

### Right column: Solution panel

**Container:** `background: var(--bg-light)` (#f8faff), `border: 1px solid var(--border-light)`, `border-radius: 12px`, `padding: 28px`

**H3:** Bricolage Grotesque 700, 20px, `color: var(--text-dark)`, `margin-bottom: 20px`  
Text: `What OpenClawWatch gives you`

**Six solution items** (`margin-bottom: 14px` each):  
Layout: `display: flex; align-items: flex-start; gap: 10px`

Left: **Check circle** — 18×18px, `border-radius: 50%`, `background: rgba(61,142,255,0.1)`, `border: 1px solid rgba(61,142,255,0.3)`. Contains 10×10px checkmark SVG in `var(--blue)`. `flex-shrink: 0; margin-top: 1px`

Right: Text — IBM Plex Sans, 14px, `color: var(--text-mid)`, `line-height: 1.5`

Six items:
1. *"Full OTel-native telemetry — agent spans, tool calls, token metrics — conforming to GenAI SemConv, exportable to Grafana or Jaeger"*
2. *"Real-time USD cost tracking per agent, per model, per task — with configurable daily budget alerts"*
3. *"Sensitive action alerts — fires when your agent sends email, writes files, or submits forms, before the session ends"*
4. *"Local behavioral drift detection — catches when agent behavior diverges from its baseline without any cloud dependency"*
5. *"Full-featured CLI + local REST API — pipe to jq, grep, tail, or any tool you already use"*
6. *"Works with OpenClaw, LangChain, CrewAI, AutoGen, OpenAI Assistants, or any custom agent"*

---

## Section 5: Features Grid (`id="features"`)

Continues the white section (same `section-light`). `padding-top: 20px; padding-bottom: 100px`.

### Section header
**Section label:** `features`  
**H2:** `Everything a single developer needs.` / `Nothing they don't.`  
`margin-bottom: 40px`

### 3-column features grid

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1px;
background: var(--border-light);   /* gap color between cards */
border: 1px solid var(--border-light);
border-radius: 16px;
overflow: hidden;
```

**Each card:** `background: #fff; padding: 32px 28px`  
Hover: `background: var(--bg-light)`

Card anatomy:
1. **Icon box** — 40×40px, `border-radius: 8px`, `background: rgba(61,142,255,0.08)`, `border: 1px solid rgba(61,142,255,0.2)`, `margin-bottom: 16px`. Contains 20×20px SVG, `color: var(--blue)`.
2. **Title** — Bricolage Grotesque 700, 17px, `color: var(--text-dark)`, `margin-bottom: 8px`
3. **Description** — IBM Plex Sans, 14px, `color: var(--text-light)`, `line-height: 1.6`
4. **Badge** (optional, `margin-top: 12px`) — IBM Plex Mono, 10px, `font-weight: 500`, `padding: 2px 8px`, `border-radius: 4px`
   - `.badge-new`: `background: rgba(61,142,255,0.1); color: var(--blue)`
   - `.badge-oss`: `background: rgba(34,211,122,0.1); color: var(--green)`

**Six cards (left-to-right, top row then bottom row):**

| # | Icon | Title | Description | Badge |
|---|---|---|---|---|
| 1 | Clock circle | OTel-native telemetry | Full GenAI Semantic Conventions compliance from day one. Agent spans, tool calls, token metrics — exportable to Grafana, Jaeger, Datadog, or any OTel backend without transformation. | `OTel SemConv v1.37+` (oss) |
| 2 | Line chart rising | Token & cost tracking | Real-time USD cost per LLM call, attributed to the agent and tool that triggered it. Configurable daily/session/per-agent budget alerts fire before you get the bill. | `per-model pricing YAML` (oss) |
| 3 | Star/sparkle | Autonomous agent safety alerts | The only observability tool built for agents with real-world side effects. Configurable alerts fire on email sends, file writes, form submissions, and payment actions. | `unique to OpenClawWatch` (new) |
| 4 | Pulse/waveform | Local behavioral drift detection | Deterministic, no-cloud drift detection. Automatically baselines token usage, tool call sequences, output schema, and session duration — alerts when agents deviate. | `no API key required` (new) |
| 5 | Document/text | Output schema validation | JSON Schema validation for tool outputs and agent responses. Declare schemas per-agent/tool in config, or use inference mode to auto-derive from observed sessions. | `JSON Schema draft-07` (oss) |
| 6 | Grid/table | CLI + local REST API | A full-featured CLI (ocw status / traces / cost / drift) with JSON output on every command. Local API at localhost with Prometheus /metrics endpoint, OpenAPI spec included. | `pipe-friendly · scriptable` (oss) |

### Integrations row (below cards)

**Label above:** IBM Plex Mono, 12px, `color: var(--text-light)`, uppercase, `letter-spacing: 0.08em`, centered  
Text: `Works with every major agent runtime`  
`margin-bottom: 24px`

**Integration pills** (`display: flex; flex-wrap: wrap`, no gaps — divided by `border-right: 1px solid var(--border-light)`):

Each pill: `display: flex; align-items: center; gap: 8px; padding: 10px 20px; font-size: 14px; font-weight: 500; color: var(--text-mid)`  
Contains: 8×8px blue dot (`background: var(--blue); opacity: 0.5; border-radius: 50%`) + name  

Eight pills:
`OpenClaw` | `LangChain` | `LangGraph` | `CrewAI` | `AutoGen` | `OpenAI Assistants` | `Anthropic Claude` | `Custom agents`

Last pill has no right border.

---

## Section 6: Comparison Table (`id="compare"`)

**Background:** `var(--navy-2)` (#0d1627)  
**Color:** `var(--white)`  
**Padding:** `100px 40px`  
Has a decorative top border: `1px solid` with `linear-gradient(90deg, transparent, rgba(61,142,255,0.25), transparent)`

**Section label:** `comparison` (blue)  
**H2:** `Everything monitoring tells you the agent ran.` / `OpenClawWatch tells you what it did.`  
**Section desc:** 17px, `var(--white-dim)`, max-width 560px, margin-bottom 60px  
Text: *"The tools your team already uses are built for LLM developers. OpenClawWatch fills the gap they all leave open."*

### Table container
`border-radius: 12px; border: 1px solid rgba(61,142,255,0.15); overflow-x: auto`

### Table styles

```css
.comp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
```

**Header row** (`thead tr`):  
`border-bottom: 1px solid rgba(61,142,255,0.15)`

Header cells (`th`):
- Padding: `14px 16px`
- Font: IBM Plex Mono, 12px, `font-weight: 500`
- Default: `color: var(--white-faint)`, `background: var(--navy-3)`
- First th (feature name): `text-align: left`
- OCW column (`th.ocw-col`): `color: var(--blue)`, `background: rgba(61,142,255,0.12)`, `border-left/right: 1px solid rgba(61,142,255,0.25)`

**Columns:** Feature | **OCW OSS** | Langfuse | LangSmith | Vex | Guardrails AI

**Body rows** (`td`):
- Padding: `12px 16px`
- `border-bottom: 1px solid rgba(255,255,255,0.04)`
- Default text/value cells: `color: rgba(245,248,255,0.35)`, centered
- First column (feature name): `color: var(--white-dim)`, 13px, `text-align: left`
- OCW column: `background: rgba(61,142,255,0.06)`, same blue side borders as header

**Section divider rows** (`.section-row td`):
- Font: IBM Plex Mono, 10px, `letter-spacing: 0.08em`, uppercase
- `color: rgba(245,248,255,0.2)`, `background: rgba(255,255,255,0.02)`
- Padding: `8px 16px`
- OCW col in section row: `background: rgba(61,142,255,0.05)`

**Cell value indicators:**
- `.yes` → `✓` — `color: var(--green)`, 15px
- `.partial` → `~` — `color: var(--amber)`, 14px, IBM Plex Mono
- `.no` → `—` — `color: rgba(245,248,255,0.2)`, 16px
- `.cloud-only` → `API key` — IBM Plex Mono 10px, `color: rgba(245,248,255,0.25)`, `background: rgba(255,255,255,0.04)`, `border-radius: 3px`, `padding: 2px 6px`

**Feature rows (grouped by section divider):**

*Section: Observability*
| Feature | OCW | Langfuse | LangSmith | Vex | Guardrails |
|---|---|---|---|---|---|
| OTel GenAI SemConv native *(sub: compliant from day one)* | ✓ | ~ | ~ | ✓ | — |
| LLM call tracing | ✓ | ✓ | ✓ | ✓ | — |
| Token & cost tracking | ✓ | ✓ | ✓ | ✓ | — |
| Framework agnostic | ✓ | ✓ | — | ✓ | ✓ |

*Section: Autonomous agent safety*
| Feature | OCW | Langfuse | LangSmith | Vex | Guardrails |
|---|---|---|---|---|---|
| Sensitive action alerts *(sub: email, file write, payment, form submit)* | ✓ | — | — | — | — |
| Cost budget alerts *(sub: daily / session / per-agent)* | ✓ | — | — | — | — |
| Retry loop detection | ✓ | — | — | — | — |

*Section: Runtime verification*
| Feature | OCW | Langfuse | LangSmith | Vex | Guardrails |
|---|---|---|---|---|---|
| Behavioral drift detection | ✓ | — | — | `API key` | — |
| Output schema validation | ✓ | — | — | ✓ | ✓ |

*Section: Developer experience*
| Feature | OCW | Langfuse | LangSmith | Vex | Guardrails |
|---|---|---|---|---|---|
| Fully local, no signup | ✓ | ✓ | — | — | ✓ |
| CLI interface | ✓ | — | — | — | — |
| OTLP export to any backend *(sub: Grafana, Jaeger, Datadog…)* | ✓ | ✓ | — | — | — |
| Open source / self-hostable | ✓ | ✓ | — | ✓ | ✓ |

**Legend** (below table, `margin-top: 16px`):  
`display: flex; gap: 24px; flex-wrap: wrap`  
IBM Plex Mono, 12px, `color: var(--white-faint)`, 4 items:  
`✓ Supported` | `~ Partial or roadmap` | `— Not available` | `API key Requires hosted service`

---

## Section 7: OSS / Commercial Boundary Table (Light Section)

**Background:** `#fff`  
**Padding:** `100px 40px`

**Section label:** `oss boundary`  
**H2:** `OSS is genuinely useful.` / `Commercial solves a different problem.`  
**Section desc:** *"The commercial tier isn't a restriction — it's for teams. Multi-agent aggregation, dashboards, and SSO require cloud infrastructure that is out of scope for a local developer tool by design."*  
`margin-bottom: 60px`

### Boundary table container
`overflow-x: auto; border-radius: 12px; border: 1px solid var(--border-light)`

### Boundary table styles

```css
.boundary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
```

**Header row:**  
Font: IBM Plex Mono, 12px, `font-weight: 500`, `text-align: left`, `padding: 12px 20px`  
Border-bottom: 2px

- First col `Capability`: `color: var(--text-light)`, `border-bottom-color: var(--border-light)`, `width: 40%`
- `OpenClawWatch OSS` col: `color: var(--blue)`, `background: rgba(61,142,255,0.04)`, `border-bottom-color: var(--blue)`, `border-left/right: 1px solid var(--border-light)`
- `ClawWatch Commercial` col: `color: #a855f7` (purple), `background: rgba(168,85,247,0.04)`, `border-bottom-color: #a855f7`

**Body rows:**  
`border-bottom: 1px solid var(--border-light)`, `padding: 10px 20px`, `font-size: 13.5px`

- Capability col: `color: var(--text-mid)`
- OSS col: `background: rgba(61,142,255,0.03)`, IBM Plex Mono 12.5px, `color: var(--blue)` (for supported), or `color: rgba(100,116,139,0.4)` for `—` (not available)
- Commercial col: IBM Plex Mono 12.5px, `color: #a855f7` (purple) for supported, or `rgba(100,116,139,0.4)` for `—`

**Rows:**
| Capability | OSS col | Commercial col |
|---|---|---|
| Telemetry collection | ✓ All runtimes | ✓ Via OSS layer |
| OTLP export (Grafana, Jaeger, etc.) | ✓ Full export | ✓ Plus hosted ingestion |
| Token & cost tracking | ✓ Single agent | ✓ Multi-agent + org budgets |
| Local safety alerts | ✓ stdout / webhook / file | ✓ Plus cloud channels |
| Behavioral drift detection | ✓ Deterministic, local | ✓ Plus LLM-as-judge |
| Output schema validation | ✓ JSON Schema | ✓ Plus custom eval rules |
| CLI interface | ✓ Full featured | — |
| Local REST API | ✓ localhost | ✓ Cloud-hosted |
| Web dashboard & charts | — intentionally excluded | ✓ |
| Multi-agent aggregation | — out of scope | ✓ |
| SSO / RBAC | — | ✓ |
| LLM-as-judge evaluation | — | ✓ |
| Hosted retention & search | — | ✓ |

Last row has no border-bottom.

**Footer note** (below table, `margin-top: 20px`):  
IBM Plex Mono, 13px, `color: var(--text-light)`  
Text: `Want the commercial tier? → ` + link `cla.watch` in `var(--blue)` to `https://cla.watch`

---

## Section 8: Waitlist (`id="waitlist"`)

**Background:** `var(--navy)` (#070d1a)  
**Padding:** `120px 40px`  
**Text-align:** center  
**Overflow:** hidden  
Has blue top border (same gradient technique as section-dark).

**Bottom glow effect** (absolute, centered bottom):  
```css
position: absolute; bottom: -200px; left: 50%; transform: translateX(-50%);
width: 700px; height: 400px;
background: radial-gradient(ellipse at 50% 100%, rgba(61,142,255,0.15) 0%, transparent 70%);
```

### Waitlist content (`max-width: 540px`, centered, `position: relative`)

**Eyebrow:** IBM Plex Mono, 12px, `color: var(--blue)`, `letter-spacing: 0.08em`, uppercase, `margin-bottom: 20px`  
Text: `Early access`

**H2 (waitlist title):** Bricolage Grotesque 800, `clamp(36px, 5vw, 56px)`, `line-height: 1.0`, `letter-spacing: -0.02em`, `color: var(--white)`, `margin-bottom: 16px`  
Text: `Be first to run it.`

**Subtitle:** IBM Plex Sans, 16px, `color: var(--white-dim)`, `line-height: 1.6`, `margin-bottom: 40px`  
Text: *"OpenClawWatch is in active development. Join the waitlist to get early access, shape the roadmap, and get notified when v0.1 ships."*

### Waitlist form

`display: flex; gap: 10px; max-width: 440px; margin: 0 auto 24px`

**Email input:**  
Font: IBM Plex Mono, 14px, `color: var(--white)`  
`background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(61,142,255,0.25)`, `border-radius: 8px`, `padding: 12px 16px`, `outline: none`, `flex: 1`  
Placeholder: `you@example.com`, `color: rgba(245,248,255,0.25)`  
Focus: `border-color: var(--blue)`  
Validation error: `border-color: var(--red)`, reset after 1.5s

**Submit button:**  
IBM Plex Sans, 14px, `font-weight: 500`, `color: var(--navy)`, `background: var(--blue)`, `border: none`, `border-radius: 8px`, `padding: 12px 20px`, `white-space: nowrap`  
Default shadow: `0 0 24px rgba(61,142,255,0.25)`  
Hover: `background: #5aa3ff`, shadow brightens  
Text: `Join waitlist`

### Success state

On successful submit, hide form, show success message:  
`display: flex → none` / `display: block`  
Success message container: IBM Plex Mono, 14px, `color: var(--green)`, `background: rgba(34,211,122,0.08)`, `border: 1px solid rgba(34,211,122,0.2)`, `border-radius: 8px`, `padding: 16px`, `max-width: 440px`, centered  
Text: `✓ You're on the list. We'll be in touch.`

**Disclaimer** (below form/success):  
IBM Plex Mono, 11px, `color: var(--white-faint)`  
Text: `No spam. Just a ping when we ship. Apache 2.0 / MIT licensed.`

> ⚠️ Stats block (GitHub stars, runtimes count, waitlist count, days to v0.1) is **commented out**. Do not render it. It will be re-enabled when numbers are real.

---

## Section 9: Footer

**Background:** `var(--navy-2)` (#0d1627)  
**Border-top:** `1px solid rgba(255,255,255,0.05)`  
**Padding:** `40px`  
**Display:** `flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px`

### Left side (`display: flex; align-items: center; gap: 20px`)

**Logo text:** IBM Plex Mono, 14px, `color: var(--white-dim)`. Format: `Open` + `Claw` (in `var(--blue)`) + `Watch`

**Meta links row** (`display: flex; align-items: center; gap: 16px; flex-wrap: wrap`):

- License badge `MIT`: IBM Plex Mono 11px, `padding: 3px 8px`, `border-radius: 4px`, `background: rgba(61,142,255,0.1)`, `border: 1px solid rgba(61,142,255,0.2)`, `color: var(--blue)`
- License badge `Apache 2.0`: same structure but `border-color: rgba(34,211,122,0.3)`, `color: var(--green)`, `background: rgba(34,211,122,0.08)`
- Plain text `opencla.watch`: IBM Plex Mono 12px, `color: var(--white-faint)`
- Link `cla.watch ↗` → `https://cla.watch`: same style, hover lightens
- Link `Docs` → `#`: same style

### Right side

Single muted text: IBM Plex Mono, 12px, `color: rgba(245,248,255,0.35)`  
Text: `Part of the ClawWatch ecosystem`

---

## JavaScript Behavior

### 1. Terminal animation (`showStep(idx)`)

```js
const steps = [ /* 4 step objects, each with lines array */ ];
let currentStep = 0;
let activeAnimations = []; // track setTimeout IDs for clearing on tab switch

function showStep(idx) {
  clearAnimations();
  currentStep = idx;
  // Update tab active/done states
  // Clear terminal body innerHTML
  // For each line in step: create <span class="tline">, set innerHTML via renderLine(), append to body
  // Use setTimeout per line.delay to unhide it (remove tline-hidden class)
  // After last line + 400ms, append cursor line: `$ ▌`
}

function autoAdvance() {
  const lastDelay = steps[currentStep].lines.at(-1).delay + 2000;
  setTimeout(() => {
    showStep((currentStep + 1) % steps.length);
    autoAdvance();
  }, lastDelay);
}

// Init
showStep(0);
autoAdvance();
```

Line rendering: `$ cmd` style splits prompt (`$ `) into `.t-prompt` span + rest into `.t-cmd` span. Key/val lines split on first colon. HTML-escape all text.

### 2. Copy to clipboard

```js
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    // Swap btn icon to checkmark SVG, color green
    setTimeout(() => restore original icon + color, 1500);
  });
}
```

### 3. Waitlist form

```js
function joinWaitlist() {
  const email = document.getElementById('waitlist-email').value.trim();
  if (!email || !email.includes('@')) {
    // Flash red border on input, reset after 1.5s
    return;
  }
  // Hide form, show success div
  // TODO: POST to real endpoint when ready
}

// Also trigger on Enter key in input
```

---

## Responsive / Mobile

**Breakpoint:** `@media (max-width: 768px)`

- Nav: hide `.nav-links` (hamburger not required for launch)
- Nav padding: `0 20px`
- Hero padding: `90px 20px 60px`
- H1 font-size: allowed to shrink via `clamp()`
- Light sections padding: `70px 20px`
- Features grid: `grid-template-columns: 1fr` (single column)
- Problem grid: `grid-template-columns: 1fr` (stacked)
- Install strip: `padding: 20px`
- Waitlist form: `flex-direction: column`, button `width: 100%`
- Footer: `flex-direction: column; align-items: flex-start`, padding `24px 20px`

---

## Assets / External Dependencies

| Asset | URL |
|---|---|
| Google Fonts | `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque...` (see Fonts section) |
| Favicon | Simple circle + crosshair SVG, 32×32, `#3d8eff` on transparent |

No JavaScript libraries. No frameworks. No build step.

---

## Waitlist Backend (TODO)

The form currently shows a success state without posting anywhere. When the endpoint is ready:

```js
// In joinWaitlist():
await fetch('https://your-endpoint.com/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

Options: Resend Audiences, Loops.so, Buttondown, or a simple Cloudflare Worker writing to KV.

---

## File Deliverable

**Single file:** `index.html` with all CSS in `<style>` and all JS in `<script>`. No external files except Google Fonts.

Place at the document root for `opencla.watch`. The domain should also have:
- `robots.txt` allowing all
- `sitemap.xml` with the single URL
- Canonical `<link rel="canonical" href="https://opencla.watch/">` in `<head>`

---

## Launch checklist

- [ ] GitHub references hidden (no star button, no GitHub links) — **ready**
- [ ] Waitlist stats block commented out — **ready**
- [ ] `ocw` used consistently for all install/run commands — **ready**
- [ ] Waitlist form connected to real endpoint
- [ ] Favicon added
- [ ] `<meta name="description">` filled in
- [ ] `<meta property="og:*">` filled in for link previews
- [ ] Domain DNS pointed at host
- [ ] HTTPS via Cloudflare or equivalent