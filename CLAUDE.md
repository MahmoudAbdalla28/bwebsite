# CLAUDE.md

Guidance for working in this repo.

## What this is

The Bastion marketing site. Rewritten from scratch 2026-07-30, replacing the previous
Next.js site (which was built around a different product and a different positioning).

Full spec: `bastion-red/docs/SITE-SPEC.md`. Research behind it: `bastion-red/docs/WEBSITE-RESEARCH.md`.
Read the spec before changing copy or structure.

## Positioning, the why behind everything

**We sell knowledge, not capability.**

Competitors sell "we are the best attacker, rent our tool." We sell the independent, compounding,
cross-customer dataset of how AI agents fail. Same activity, different product. They are a capability
company. We are the independent data and assurance layer.

Every section reinforces accumulated expertise and a compounding dataset, not a scanner. Capability
appears only as proof, because it is what earned the knowledge.

The framing that carries it: the failure knowledge you cannot build in-house, because you have only
seen your own agents.

## Hard rules

1. **No size superlatives.** Never "largest dataset" or anything checkable like it. Claim
   independent, compounding, cross-customer.
2. **No live-fire self-serve.** Nothing that tests real production systems or collects poolable
   customer data. Legal framework pending. Self-serve v1 is signup, sample report, sandbox only.
3. **Technical writeups are stripped.** No live or undisclosed exploits, no CVEs, no working
   payloads, no named targets. Failure patterns only. Borderline goes to Nick first.
4. **Never publish a number that is not verified.** Proof-band figures are checked against the
   cortex graph and recorded in `src/data/dataset.ts` with the date. Re-verify before changing.
5. **Copy: no em dashes. No AI tells.** Flat, plain, specific. Numbers over adjectives.
6. **State the fact, do not explain it.** No line telling the reader why something is impressive or
   what a term means. If a claim needs a sentence of setup, it is the wrong claim.
7. **Nick finalizes hero copy.** Do not ship invented headline wording.

## Stack

Astro 5, hand-written CSS, TypeScript. No UI framework, no CSS framework, no dependencies beyond
Astro and one font.

```bash
npm install
npm run dev       # localhost:4321
npm run build     # -> dist/
npm run preview
```

Deploy is Vercel. `vercel.json` pins framework, build command and output dir, so it does not depend
on dashboard settings. Pushing `staging` deploys to staging.trybastion.ai.

## Performance rules

The previous site shipped three.js, a react-force-graph physics simulation, four canvas rAF loops,
lottie and three icon packs. It visibly janked on Macs. That is the thing this rebuild exists to not
repeat.

- **Ship almost no client JS.** Two hand-written canvas scripts exist and nothing else: the ambient
  swarm and the dodecahedron. No library, no bundle. Both pause offscreen and when the tab is
  hidden, and the swarm does not start under `prefers-reduced-motion`.
- **Banned:** three.js, react-force-graph, lottie, Aceternity canvas components, smooth-scroll
  libraries, more than one icon set.
- **Animate only `transform` and `opacity`.** Never anything that triggers layout.
- **No scroll-linked JS, and no scroll-triggered reveals.** Content must never depend on an
  animation to be visible. A scroll-driven `both`-filled animation renders the page blank when the
  timeline fails to resolve. This already happened once here.
- **Delete dead sections, do not hide them.** Hidden-but-mounted components still cost.
- One orchestrated page-load reveal in the hero. That is the whole motion budget.
- Grain is a static SVG turbulence data URI, computed once. Never a filtered live element.

Two known traps, both hit here already:
- Compute canvas scale factors **inside** the draw call. `const R = W / 900` at module scope runs
  while `W` is still 0, which silently collapsed every font to 3px.
- Interpolate orientation with quaternion slerp, never three Euler angles. Lerping angles
  independently sent some rotations round an odd path while others looked fine.

## Design system

Dark throughout. Ink, bone text, gold accent, plus a spectrum (`--sp-1` to `--sp-5`) taken from the
mark, which is a prism. All tokens in `src/styles/global.css`.

The light version was tried and abandoned: a dark hero over a light page read as two sites stapled
together, and the light page could not carry the contrast the brand reference needs.

Type is Instrument Sans Variable throughout, self-hosted through fontsource. One typeface, no mono.
Do not apply `font-variant-numeric: tabular-nums` to body text, it widens the comma and period to a
full numeral advance. Use the `.tnum` class on figures only.

`--sp-3`, `--sp-4` and `--sp-5` are all blues. Do not use them as a categorical palette, they are a
gradient. For charts, pick stops that separate.

## Structure

All of it is built. Home is hero, proof band, the twelve-mechanism solid, the failures feed, how
agents fail, how a run works, the report (Section A) and the pipeline (Section B, with the
self-serve entry). Pages: `/platform`, `/insurance`, `/articles`, `/contact`, `/thanks`.

Nav only links to pages that exist. No links to empty pages.

Every claim on `/insurance` is pinned to a source in `src/data/carriers.ts`. Every incident in the
failures feed is pinned to a link in `src/data/failures.ts`, which also records what was left out
and why. Do not add a row to either without a source that loads.

## Numbers on the page

`src/data/dataset.ts` holds the published counts and the date they were verified. They come from the
cortex graph at `localhost:6380` graph `bastion`, which is the source of truth. Not 6379, and not the
WSL node. Both of those hold stale partial copies.

Deliberately not published: total node count and technique count, both of which are substantially
ingested public data and cannot carry the "generated by our own attacks" line.
