# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bastion Blue — marketing site (landing page + funnel + CTA) for an AI agent security proxy. The product is an on-prem Rust binary that sits between AI agents and their LLM API calls, running security checks (PII scanning, tool call validation, rate anomaly detection) and generating insurance-grade telemetry reports for carriers to price AI liability coverage.

**One-liner:** "Turning blackbox AI systems into glassbox with quantifiable managed risks."

**Commercial model:** Sold through insurance broker (AON). Broker tells enterprise client to route agents through Bastion Blue for 30 days → generates underwriting telemetry → carrier prices the policy → premium drops → everyone wins.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript
- **Icons:** Lucide React (no emojis as icons)
- **Font:** Plus Jakarta Sans (heading + body) — [Google Fonts link](https://fonts.google.com/share?selection.family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400)

## Build & Dev Commands

```bash
npm run dev        # Local dev server (localhost:3000)
npm run build      # Production build
npm run lint       # Lint check
```

## Design System

### Visual Direction

Inspired by **Cisco (enterprise security credibility) + Lakera (modern AI security aesthetic)**. The site should feel like enterprise defense infrastructure — not a startup landing page.

- **Style:** Bento Box Grid layout — modular cards, asymmetric grid, varied sizes, clean hierarchy
- **Tone:** Professional, authoritative, enterprise-grade. Insurance/security buyers, not developers.
- **Dark mode primary** with blue accent palette

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#2563EB` | Brand blue, primary actions |
| Secondary | `#3B82F6` | Supporting blue |
| CTA | `#F97316` | Call-to-action buttons, conversion points |
| Background | `#0F172A` | Dark mode base (slate-900) |
| Surface | `#1E293B` | Cards, elevated surfaces (slate-800) |
| Text | `#F8FAFC` | Primary text on dark (slate-50) |

### Key Effects

- `rounded-xl` (16px border radius)
- Subtle shadows on cards
- Hover scale (1.02) with smooth transitions (150-300ms)
- Glass/blur effects for layered defense visualization

## Site Architecture & Funnel

### Page Structure (Single-page scroll)

1. **Hero** — Defense layer visualization. Show multiple layers checking against a knowledge graph. Interactive: clicking reveals a flowchart → output. Tagline conveys "glassbox not blackbox" without saying it literally.
2. **Problem** — AI agents are deployed with zero visibility. Carriers are excluding AI from policies or pricing at 400%+ premiums. No actuarial data exists.
3. **Solution** — Visual of the proxy intercepting, scanning, logging. Two modes: Monitor (learn baseline) → Enforce (block/redact). On-prem, single binary, zero data leaves.
4. **Buyer Paths** — Three persona cards (Blocked CTO / Efficiency MD / Chief Risk Officer). Each with their pain point and how Bastion resolves it. Path selection ("I am a...") pattern.
5. **Credibility** — Client logos, insurance partnership signals. Trust blue palette.
6. **CTA** — Demo request or contact form. Primary: "Contact Sales". Secondary: "See Demo".

### Content Rules

- **Do NOT publicly list technical differentiators** (NeMo comparison, fleet correlation, Rust binary specifics). The user should FEEL the difference through the UX and visuals, not read a comparison table.
- **Do NOT mention NeMo Guardrails** anywhere on the site. Bastion is built from scratch.
- Show defense depth visually (layered intercepting animation) rather than describing it in text.
- Use insurance/risk language, not developer language. "Quantified risk" not "API proxy."

## Related Codebases

- **Rust proxy source:** `~/redteam/crates/bastion-proxy/`
- **Existing React dashboard:** `~/redteam/demos/bastion-blue/` (deployed at demo.pistonsolutions.ai/bastion-blue)
- **Obsidian vault:** bastion-vault (product docs, buyer profiles, metrics, gaps analysis)
- **Bastion Red (offensive probe):** `~/redteam/demos/bastion-demo/`

## MCP Integrations

- **21st.dev Magic MCP** — `/ui` command for production-grade React components from curated library
- **Google Stitch MCP** — full-screen design generation from text prompts (not yet configured)
- **UI/UX Pro Max skill** — design intelligence for style, color, typography, UX rules. Run searches via:
  ```bash
  python3 ~/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.0.1/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>
  ```

## Key People

- **Luyun** — CEO. Handles AON sales relationship.
- **Nicho** — CTO. Builds the tech. Primary user of this repo.
