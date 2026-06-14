# Mock Fabric Apps — Teaching Fabric App Development Without a Fabric Tenant

## The Problem

Fabric Apps are built on a stack of open, learnable technologies (React, Vite, Tailwind, Vega-Lite). The only part that requires a paid Fabric capacity is the *data layer* — specifically the `useSemanticModelQuery` hook that fires DAX queries against a published Power BI semantic model. Everything else is standard web development.

This creates a high barrier to entry for learners: they need a Fabric trial (temporary) or paid capacity (expensive) just to practice the *scaffolding* and *component authoring* skills that are actually transferable.

**The insight:** the Fabric SDK hooks are just React hooks that return `{ data, isLoading, error }`. If we mock that contract, learners can write identical code against static JSON files — and the skills transfer 1:1 when they eventually hit a real Fabric workspace.

---

## Core Concept: A Mock Fabric Runtime

The Rayfin/Fabric App Data SDK exposes a small, well-defined surface:

```typescript
// Real code (requires Fabric tenant)
const { data, isLoading } = useSemanticModelQuery({
  connection: "starwars",
  query: rawDaxString,
  columnMetadata: { "[Film Title]": "string", "[Box Office]": "number" }
});

// Mock code (identical shape, static JSON)
const { data, isLoading } = useSemanticModelQuery({
  connection: "starwars",
  query: rawDaxString,
  columnMetadata: { "[Film Title]": "string", "[Box Office]": "number" }
});
```

A learner's code would be **byte-for-byte identical**. The only difference is which runtime their app is wired to — real Fabric or a mock shim.

---

## Solution Options

### Option 1: Mock SDK Shim (Recommended)

Create a local TypeScript module (`mockFabricRuntime.ts`) that re-implements the Rayfin hook API against static JSON files.

**How it works:**
- Each DAX query file (`.dax`) maps to a static JSON fixture in `src/fixtures/`
- The mock hook reads the fixture, returns `{ data: rows, isLoading: false, error: null }`
- A single `VITE_MOCK_FABRIC=true` env flag switches between real and mock runtime at build time
- The app builds to static files (HTML/JS/CSS) with no server needed

**Learner workflow:**
1. Clone a GitHub template repo (no Fabric account needed)
2. Run `npm install && npm run dev` — app starts immediately
3. Edit components, tweak Vega-Lite specs, modify DAX files — all works against mock data
4. When they eventually get a Fabric tenant, swap one env flag and the real data flows in

**Teaching value: High.** Learners practice:
- DAX query authoring
- `useSemanticModelQuery` hook usage
- `columnMetadata` typing
- Vega-Lite / Vega spec authoring
- Component structure and layout

**Pros:**
- Identical code structure to real Fabric Apps
- No backend, no server costs
- Learners can run it locally or it can be deployed anywhere static files are served
- Easy to version-control and share as a GitHub template

**Cons:**
- Requires someone to maintain the shim as the Rayfin SDK evolves
- No real-time query execution — fixtures must be pre-baked

---

### Option 2: GitHub Template + CodeSandbox / StackBlitz Embed

Build the mock shim (Option 1) and then publish it as a CodeSandbox or StackBlitz template. Embed the live-coding environment in a WordPress page via an `<iframe>`.

**How it works:**
- StackBlitz WebContainers run a full Node.js environment in the browser — no local install needed
- Learners click a link on binexus.net, get a live VS Code editor with the mock Fabric App running
- They can edit files in the browser and see changes hot-reload instantly
- A "Fork" button lets them save their own copy

**Learner workflow:**
1. Visit a page on binexus.net
2. Click "Open in StackBlitz" — full IDE opens in browser
3. Edit files, see the app update live
4. Save progress by creating a free StackBlitz account

**Teaching value: High.** Same as Option 1, plus zero local setup friction.

**Pros:**
- Zero setup for learners (no Node, no Git, no IDE)
- Live coding in a browser — great for workshops and tutorials
- Free tier is sufficient for educational use
- Can embed multiple different "exercise" sandboxes in different WordPress posts

**Cons:**
- Dependent on StackBlitz's free tier remaining available
- Large iframes can feel awkward on mobile
- Learners lose progress if they don't sign up

---

### Option 3: Deployed Static App on WordPress (iFrame Embed)

Build the mock Fabric App once with static fixture data and deploy it as a standalone static site. Embed it in WordPress pages using an iframe.

**How it works:**
- Build one or more example Fabric Apps using the mock shim
- Deploy to GitHub Pages, Netlify, or Vercel (all free for static sites)
- Embed the deployed app in WordPress using `<iframe src="https://your-app.netlify.app" />`
- Learners *view* the finished app; you provide the source code separately (GitHub link)

**Learner workflow:**
1. Visit binexus.net — sees a live, running Fabric-style app in the page
2. Reads tutorial content around the embed explaining the code structure
3. Downloads/forks the source code to experiment locally

**Teaching value: Medium.** Learners see what a Fabric App looks like and study the source code, but don't build it interactively.

**Pros:**
- Easiest to implement — build once, embed anywhere
- Works on any WordPress plan (no server-side code needed)
- Fastest to launch as a learning resource

**Cons:**
- Passive learning — learners observe rather than build
- No hands-on coding in the browser

---

### Option 4: WordPress REST API as the "Semantic Model"

Instead of mocking the Fabric SDK, replace the semantic model with WordPress's built-in REST API. Write a thin adapter that translates `useSemanticModelQuery` calls into WordPress REST API requests.

**How it works:**
- Store data in WordPress as Custom Post Types or using a plugin like WP DataTables or Pods
- The mock runtime translates DAX-like query objects into REST API `GET` requests
- The app is a React widget embedded in WordPress via a custom block or plugin

**Learner workflow:**
1. Register as a binexus.net community member
2. Get access to a "practice workspace" — their own set of WP CPT records
3. Query that data using the same hook API they'd use with a real semantic model

**Teaching value: Medium-High.** Adds dynamic data (learners can even add records), but the DAX → REST translation is a leaky abstraction — learners need to understand the mapping.

**Pros:**
- Data is actually live and queryable (not just static fixtures)
- Community aspect — shared dataset that learners can contribute to
- Deep WordPress integration opens possibilities (user auth, saved work, etc.)

**Cons:**
- Complex to build and maintain
- DAX queries don't translate naturally to REST — the shim would be a significant simplification
- Learners might learn the mock query pattern rather than real DAX

---

## Recommended Approach

**Start with Option 1 + Option 3, then add Option 2 when content grows.**

### Phase 1 — Foundation

1. Build the `mockFabricRuntime.ts` shim (a few hours of work)
2. Create one complete example Fabric App using the Star Wars dataset (already available in this repo)
3. Deploy to Netlify/Vercel → embed in a WordPress page on binexus.net
4. Publish the source on GitHub as a template repo with a README explaining the mock/real toggle

### Phase 2 — Interactive Learning

1. Create a StackBlitz template from the GitHub repo
2. Embed "live exercise" sandboxes in step-by-step tutorial posts on binexus.net
3. Each post focuses on one concept: DAX queries, Vega-Lite specs, component layout, etc.

### Phase 3 — Community (Optional)

1. If demand justifies it, add the WordPress REST API integration (Option 4) so learners get dynamic data
2. Create a structured course using a WordPress LMS plugin (LearnDash, LifterLMS, etc.)

---

## Technical Sketch: The Mock Shim

```typescript
// src/mockFabricRuntime.ts

import { useMemo } from "react";

// Fixtures live in src/fixtures/<connection>/<query-hash>.json
// For dev/teaching, we map by query filename (the .dax file's name)
const fixtures: Record<string, Record<string, unknown[]>> = {
  starwars: {
    "film-box-office": () => import("./fixtures/starwars/film-box-office.json"),
    "character-species": () => import("./fixtures/starwars/character-species.json"),
    // ... one entry per .dax file
  }
};

export function useSemanticModelQuery<T>({
  connection,
  queryName,          // we add this for the mock — maps to a fixture file
  columnMetadata,
}: {
  connection: string;
  queryName: string;
  query: string;      // present for API compatibility, ignored in mock
  columnMetadata: Record<string, string>;
}): { data: T[]; isLoading: boolean; error: Error | null } {

  // In the real runtime this fires a DAX query against Fabric.
  // In the mock runtime it loads a static JSON fixture.
  const data = useMemo(() => {
    return fixtures[connection]?.[queryName] ?? [];
  }, [connection, queryName]);

  return { data: data as T[], isLoading: false, error: null };
}
```

The shim is **swapped in at build time** using a Vite alias:

```typescript
// vite.config.ts
resolve: {
  alias: import.meta.env.VITE_MOCK_FABRIC === "true"
    ? { "@microsoft/rayfin": "./src/mockFabricRuntime.ts" }
    : {}
}
```

---

## Data Format for Fixtures

Fixtures are plain JSON arrays matching the shape of what the real Fabric SDK returns:

```json
[
  { "[Film Title]": "A New Hope",      "[Box Office USD]": 775400000 },
  { "[Film Title]": "The Empire Strikes Back", "[Box Office USD]": 538000000 },
  { "[Film Title]": "Return of the Jedi",      "[Box Office USD]": 475300000 }
]
```

The Star Wars dataset already generated in this repo (`data/`) is a perfect source for these fixtures — it just needs to be exported to JSON.

---

## WordPress Hosting Notes

- **Embedding static React apps:** Use the Elementor HTML widget or a raw HTML block to drop an `<iframe>`. Set `allow="fullscreen"` and a fixed height.
- **StackBlitz embeds:** Use `<iframe src="https://stackblitz.com/github/<user>/<repo>?embed=1&file=src/App.tsx" />` — pre-configures the file that's open in the editor.
- **CORS:** If the app ever makes API calls, ensure the WordPress REST API has CORS headers set for your Netlify/Vercel domain.
- **Caching:** Static deploys on Netlify/Vercel have aggressive CDN caching — fixture updates propagate in under a minute.

---

## Summary

| Option | Learner setup | Code fidelity | Hosting | Effort to build |
|--------|--------------|---------------|---------|-----------------|
| 1 — Mock shim (local) | Clone + `npm install` | Identical | GitHub Pages / Netlify | Medium |
| 2 — StackBlitz embed | Click a link | Identical | StackBlitz free | Low (after shim) |
| 3 — Static embed | None | View-only | Netlify + WP iframe | Low |
| 4 — WP REST API | None | Approximate | WordPress | High |

The mock shim is the keystone — build it once and every other option becomes easy.
