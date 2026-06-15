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
- **Deck length:** ~7 slides + a short title slide. One idea per slide.
- **Visual language:** corporate blue + signal yellow.
  - Primary `#1F4E8C` (corporate blue), Accent `#FFC20E` (signal yellow)
  - Positive `#1E7C36`, Negative `#C62F2F`
  - Clean, lots of whitespace, business-report feel — not a sales pitch.
- **Each slide is sparse on purpose.** Each bullet is a bold lead-in + one sentence — a
  memory jogger; the presenter expands from memory and demos the live app.
- **Recurring footer motif:** "Live demo: Imperial DSMS — built on the Star Wars
  semantic model."

---

## Slide 1 — What a Fabric App is

**Headline:** A custom web app, powered by your existing semantic model.

- **Lives on your model** — it sits on a published Power BI semantic model, the same one that feeds your normal reports.
- **Live data** — every number is a live DAX query; nothing is copied, exported, or stored.
- **Not a report** — it's a full application surface with bespoke layout, navigation, and write-back.
- **Inside Fabric** — hosted and secured alongside your other Fabric items.
- **Built with AI** — designed to be created with AI; I built this on only a basic knowledge of HTML, JavaScript, and CSS.
- **Preview** — a Microsoft preview feature, so some capabilities aren't fully documented yet.

**Link/demo cue:** Open the running app → land on the Overview page.

---

## Slide 2 — How it gets built: Design → Code → Deployed

**Headline:** From a designed mock-up to a live page, fast — and it gets smarter each time.

- **Claude Design** — designs each section visually before any production code is written.
- **Claude Code** — wires that design to live DAX queries and deploys it quickly.
- **Learnings & skills** — every fix is captured as notes or reusable skills, so a problem is solved once and never again.

**Link/demo cue:** Show `LEARNINGS.md`; show the `mockups/` → wire-spec → `src/queries/` flow.

---

## Slide 3 — One consistent experience across the whole app

**Headline:** A design system, not a collection of pages.

- **Design system** — one shared component library, so every page looks and behaves the same.
- **Navigation** — a consistent sidebar rail and page navigation across the app.
- **Filtering** — one filter pane / detailed-filters takeover used on every page.
- **Overview page** — a landing page that frames the whole console.
- **Info pop-out** — contextual "what am I looking at" help on every page.
- **Shared visuals** — KPI tiles, charts, status pills, and deltas in one visual language.
- **Tokens** — change a colour or spacing once and it propagates everywhere.

**Link/demo cue:** Click through 3–4 pages; open the info pop-out and the filter takeover.

---

## Slide 4 — The visualizations: Deneb templates + live DAX

**Headline:** A 60-strong template library feeding live, model-driven charts.

- **60 templates** — a library of Deneb / Vega-Lite reference templates to start from.
- **Their role** — copy a template, adapt it to the data, then bind it to a live DAX query.
- **Vega-Lite** — the same engine behind Deneb in Power BI, so the same skills apply.
- **Clean triplet** — each visual is a `.dax` query, a `.json` spec, and a small factory.

**Link/demo cue:** Show the `deneb-templates/` folder; show two live charts and the DAX behind one.

---

## Slide 5 — Write-back

**Headline:** Not just read — the app writes back.

- **Writes back** — the Budget page writes user input back to a Fabric SQL database.
- **Differentiator** — planning, adjustments, and approvals happen inside the same governed surface.
- **Same identity** — writes run under the user's authenticated Fabric session.

**Link/demo cue:** Open the Budget page, enter an adjustment, show it persist on re-read.

---

## Slide 6 — Security & access

**Headline:** Governed in two layers — and RLS works exactly as in Power BI.

- **Entry to the app** — Fabric workspace roles / item sharing, assignable to Entra security groups.
- **Inside the app** — page-level access shows users only the pages they're provisioned for.
- **RLS** — same model, so RLS is enforced exactly as in any Power BI report.
- **Preview caveat** — granular in-app roles from Entra groups aren't documented yet.

**Link/demo cue:** Sign in; show a restricted vs. full-access experience.

---

## Slide 7 — Working safely with AI: risks & controls

**Headline:** New ways of working bring new risks — here's how we contain them.

**The risks:**
- **Scale** — AI changes things fast, so we need traceability and the ability to undo.
- **New toolchain** — we develop in VS Code with PBIP, where most of our devs use binary `.pbix`.
- **Preview** — expect change, so don't make it production-critical yet.

**Controls in place (✅):**
- **PBIP, not PBIX** — a text format, so every change is readable and reviewable.
- **GitHub** — every report is a Git project with full history and rollback.
- **Human review** — AI proposes; a person approves via pull requests.
- **Audit logs** — Fabric activity log + Purview audit trace every deploy to a person.

**Controls to enable (🔲):**
- **Deployment Pipelines** — dev → test → prod, so changes are promoted, not edited live.
- **Recycle bin** — enable the Fabric preview so deleted items can be recovered.
- **Dataflows Gen2 CI/CD** — enable so data prep is versioned and promoted too.
- **Branch protection** — require review and block direct commits to `main`.

**Link/demo cue:** Show the GitHub repo history; show the PBIP files in VS Code.

---

## Optional closing slide — What this means for us

**Headline:** Familiar governance, a far richer surface.

- **Reuses what you have** — semantic model, RLS, Deneb skills, and Fabric security.
- **Adds what reports can't** — bespoke UX, navigation, an info pop-out, and write-back.
- **Improves over time** — build cadence speeds up as the learnings/skills library grows.
- **Status** — a preview feature, so treat as evaluation, not production-critical.

**Suggested discussion prompts:**
- Which existing reports would benefit most from an app surface?
- Where would write-back (planning, adjustments, approvals) add value?
- What's our appetite for adopting a preview feature, and on what timeline?
