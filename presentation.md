> ⚠️ **TEMPORARY FILE — NOT PART OF PROJECT DEVELOPMENT.**
> This document is presentation content only. It does **not** describe or drive the
> ongoing build of the Imperial DSMS Fabric App and should not be treated as a spec,
> requirement, or source of truth for the codebase. It exists to be handed off to
> Claude Design to produce a ~5-slide deck, and can be deleted afterwards.

---

# Introducing Fabric Apps
### A high-level briefing for the Head of Commercial Reporting & Head of Data and AI

**Purpose of this session:** to *inform*, not to sell. A systematic walk through the
capabilities of Fabric Apps, demonstrated live against a working build (the "Imperial
DSMS" console) that runs on a published Power BI semantic model.

**Tone:** plain business style. High level. The slides carry the headlines and links;
the detail happens live in the app and the codebase.

---

## Design brief for Claude Design

- **Audience:** two senior stakeholders (Commercial Reporting; Data & AI). Assume
  fluency with Power BI, not with React/web development.
- **Deck length:** ~5 slides + a short title slide. One idea per slide.
- **Visual language:** corporate blue + signal yellow.
  - Primary `#1F4E8C` (corporate blue), Accent `#FFC20E` (signal yellow)
  - Positive `#1E7C36`, Negative `#C62F2F`
  - Clean, lots of whitespace, business-report feel — not a sales pitch.
- **Each slide is sparse on purpose.** Headline + 3–5 bullets + one link/visual cue.
  The presenter will demo the live app for everything else.
- **Recurring footer motif:** "Live demo: Imperial DSMS — built on the Star Wars
  semantic model."

---

## Slide 1 — What a Fabric App is

**Headline:** A custom web app, powered by your existing semantic model.

- A Fabric App is a tailored web application that sits **on top of a published Power
  BI semantic model** — the same model that feeds your normal reports.
- It queries **live data** via DAX at runtime. No data is copied, exported, or stored
  in the app; nothing goes stale.
- It is **not** a Power BI report. It's a full application surface — so you get bespoke
  layouts, custom interactions, navigation, and even write-back — while data
  governance stays in the model.
- Hosted and secured **inside Fabric** alongside your other items.
- **Designed to be built with AI.** Fabric Apps were made to be created with AI
  assistance — and while knowing the underlying languages helps, it isn't essential.
  This entire console was built with only a basic working knowledge of HTML, JavaScript
  and CSS.
- **Preview, and said so openly.** Fabric Apps is currently a **Microsoft preview**
  feature; some capabilities aren't fully documented yet. Calling that out up front
  builds credibility and pre-empts the obvious question.

**Speaker note:** "Everything you'll see is reading the live model — there is no mock
data anywhere in this build. And I'm not a developer — this was built with AI on a
basic grasp of the languages involved."

**Link/demo cue:** Open the running app → land on the Overview page.

---

## Slide 2 — How it gets built: Design → Code → Deployed

**Headline:** From a designed mock-up to a live page, fast — and it gets smarter each time.

- **Claude Design** is used to design a section/page visually (layout, components,
  styling) before any production code is written.
- **Claude Code** then wires that design to real DAX queries against the model and
  deploys it — each section published quickly and consistently.
- **Learnings & skills (either can be used).** Every mistake made and corrected is
  captured — as a growing **`LEARNINGS.md`** notes file, or as small named **skills**
  that load only when relevant. Both keep institutional knowledge so the same problem
  is never solved twice; skills auto-trigger on the right keywords and are shareable
  across projects and the team.

**Speaker note:** "The accumulated `LEARNINGS.md` is genuine institutional knowledge.
The roadmap is to convert it into on-demand skills so the tooling gets faster and more
reliable the more we use it."

**Link/demo cue:** Show `LEARNINGS.md`; show the `mockups/` → wire-spec → `src/queries/`
flow.

---

## Slide 3 — One consistent experience across the whole app

**Headline:** A design system, not a collection of pages.

- A central **design system** (brand tokens + a shared component library) means every
  page looks and behaves the same.
- Reusable building blocks used everywhere:
  - **Sidebar rail** & **page navigation** — consistent movement between sections
  - **Filter pane / detailed-filters takeover** — one filtering model across pages
  - **Overview / landing page** — the entry point that frames the whole console
  - **Info pop-out** — contextual "what am I looking at" help on every page
  - **KPI tiles, charts, tables, status pills, delta indicators** — one visual language
- Change a token (a colour, a spacing rule) **once** and it propagates everywhere —
  the same governance benefit a Power BI theme gives a report, applied to a whole app.

**Speaker note:** "Notice the rail, the filter behaviour, and the info pop-out are
identical on every page — that consistency is the design system doing its job."

**Link/demo cue:** Click through 3–4 pages (Operations, Supply, Workforce, Budget);
open the info pop-out and the filter takeover.

---

## Slide 4 — The visualizations: Deneb templates + live DAX

**Headline:** A 60-strong template library feeding live, model-driven charts.

- The project carries a library of **60 Deneb / Vega-Lite reference templates** —
  everything from simple bars to bullet charts, slope charts, waterfalls, raincloud
  plots and more.
- **Role of the templates:** they are the *starting point* for each visual. We copy a
  template, adapt it to the shape of the data, preview it, then bind it to a real DAX
  query against the model. This is far faster and more consistent than authoring every
  chart from scratch.
- The chart language is **Vega-Lite** — the same engine behind **Deneb** in Power BI —
  so anything achievable in a Deneb custom visual is achievable here.
- Each visual is a clean triplet: a **`.dax`** query, a **`.json`** spec, and a small
  factory that connects them — readable, reviewable, and reusable.
- Result: rich, custom visuals that are nonetheless **driven entirely by the live
  semantic model**.

**Speaker note:** "If your team already uses Deneb in Power BI, this is the same skill
set — the templates just get reused inside the app."

**Link/demo cue:** Show the `deneb-templates/` folder; point at two live charts and the
DAX behind one of them.

---

## Slide 5 — Write-back

**Headline:** Not just read — the app writes back.

- The **Budget page** lets a user enter values that are written **back to a Fabric SQL
  database** — captured, stored, and re-read live.
- This is a genuine **differentiator vs. a read-only report**: planning, adjustments,
  and approvals can happen *inside* the same governed surface as the analysis.
- Writes run under the user's authenticated Fabric session — same identity, same
  governance.

**Speaker note:** "This is the line a normal report can't cross — the numbers you see
and the numbers you change live in the same place." (Worth a 30-second live demo.)

**Link/demo cue:** Open the Budget page, enter an adjustment, show it persist on re-read.

---

## Slide 6 — Security & access

**Headline:** Governed in two layers — and RLS works exactly as in Power BI.

- **Entry to the app:** Fabric workspace roles / item sharing, assignable to **Entra
  security groups** — standard Fabric governance.
- **Inside the app:** **page-level access** — users only see the pages they're
  provisioned for (a UX convenience, not the data boundary).
- **RLS:** same published model, so **RLS is enforced exactly as in any Power BI
  report** — no special handling.
- *Preview caveat:* granular in-app roles from Entra groups aren't documented yet;
  this build syncs membership out-of-band for now.

**Speaker note:** "Your existing model security — including RLS — carries straight over.
The app doesn't open a side door."

**Link/demo cue:** Sign in; show a restricted vs. full-access experience; reference
`access_and_security.md`.

---

## Slide 7 — Working safely with AI: risks & controls

**Headline:** New ways of working bring new risks — here's how we contain them.

**The risks:**
- AI moves fast and can make changes at scale — we need **traceability and the ability
  to undo**.
- A **new toolchain** for the team: development in **VS Code** using the **Power BI
  Project (PBIP)** format, where most of our Power BI developers today use standard
  binary **`.pbix`** files. Unfamiliarity is itself a risk.
- It's a **preview** feature — expect change, and don't make it production-critical yet.

**The controls — in place today (✅):**
- **PBIP, not PBIX.** Develop in the **text-based PBIP** format so every change is
  readable, reviewable, and diff-able — you can see exactly what the AI changed.
- **GitHub version control.** Every report/app is a **Git project** — full history,
  roll back any change, nothing is ever silently lost.
- **Human-in-the-loop review.** AI proposes; a person approves via **pull requests**
  before anything merges.
- **Audit / activity logs.** Fabric activity log + Purview audit so every deploy and
  access is traceable to a person.

**The controls — recommended / to enable (🔲):**
- **Deployment Pipelines** — dev → test → production workspaces, so changes are
  *promoted* deliberately, never edited straight into production. *(Not yet trialled —
  I need to document how Fabric Apps deploy across pipelines.)*
- **Fabric recycle bin (preview).** Enable so **deleted items can be recovered**.
- **CI/CD for Dataflows Gen2.** Enable in Fabric (not currently on) so data prep is
  versioned and promoted the same controlled way.
- **Branch protection** on `main` — require review, block direct commits.

**Speaker note:** "The headline for governance: nothing the AI does is invisible or
irreversible. Text format + Git + reviews + staged deployment means every change is
seen, approved, and recoverable."

**Link/demo cue:** Show the GitHub repo history; show the PBIP files in VS Code.

---

## Optional closing slide — What this means for us

**Headline:** Familiar governance, a far richer surface.

- Reuses what you already have: the **semantic model**, **RLS**, **Deneb skills**,
  Fabric **security**.
- Adds what reports can't: **bespoke UX**, custom navigation, an **information pop-out**,
  consistent design, and **write-back** (the Budget page writes to a database).
- Build cadence is fast and improving as the **learnings → skills** library grows.
- **Status:** preview feature — treat as evaluation, not yet production-critical.

**Suggested discussion prompts:**
- Which existing reports would benefit most from an app surface?
- Where would write-back (planning, adjustments, approvals) add value?
- What's our appetite for adopting a preview feature, and on what timeline?

