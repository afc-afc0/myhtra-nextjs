# Myhtra — Brand & Site Roadmap

The site is our marketing. Goal: a prospective client lands on myhtra.co and, within 10 seconds, knows
what we build, believes we can do it, and wants to talk to us. Founder-led today (Ahmet), a studio tomorrow.

Positioning: **automation you can trust** — AI agents and cloud platforms you can put in production,
with human approval and security built in. Details: `docs/brand/positioning-and-copy.md`.

Status: ✅ done · 🚧 in progress · ⏳ next · 💡 later

## Phase 1 — Brand refresh (branch `feature/brand-refresh`)

|     | Item                                                        | Notes                                                                                         |
| --- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ✅  | Positioning + copy research                                 | `docs/brand/positioning-and-copy.md` (sources: NN/g, Cialdini, Competition Bureau, FTC)       |
| ✅  | Next 16 SEO / OG research                                   | `docs/brand/seo-next16.md`                                                                    |
| ✅  | New homepage — simple                                       | Hero → numbers → services → selected work → contact (+ "new members joining soon")            |
| ✅  | All copy in one file                                        | `src/app/(default)/_content/site.ts` — the "I" → "we" switch happens here                     |
| ✅  | Navbar + footer refresh                                     | Section links, "Start a project" CTA, auth + theme kept                                       |
| ✅  | Brand tokens in `globals.css`                               | Logo blue `#364cc9` / sky `#1390d3` / gold `#c9b336`, muted text, lines, surfaces             |
| ✅  | SEO: metadata, viewport, OG image, sitemap, robots, JSON-LD | Homepage is static again (`○ /` in `next build`)                                              |
| ✅  | Old homepage components + prototypes removed                | Prototypes kept on branch `prototype/homepage-ui`                                             |
| ⏳  | Ahmet signs off the items below                             | Then merge to `main` and deploy                                                               |
| ⏳  | Professional email on the domain (e.g. `hello@myhtra.co`)   | A Hotmail address undercuts a premium studio; one-line change in `site.ts`, Navbar and Footer |

## Phase 2 — Proof & conversion (add back only what earns its place)

|     | Item                                                     | Notes                                                                        |
| --- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 💡  | Live "this site" status + architecture diagram         | Built and removed for simplicity (commit 9bca5c3); real data via /api/status |
| 💡  | Track-record timeline chart, process steps, writing list | Same commit; restore if the page feels thin                                  |
| 💡  | Case-study pages per project (`/work/<slug>`)            | Problem → approach → result, one metric each; link from Selected work        |
| 💡  | Contact form with project type + budget                  | Replaces plain mailto; send to email via an API route                        |
| 💡  | Book-a-call link (Cal.com or similar)                    | Lowest-friction primary CTA                                                  |
| 💡  | Testimonials                                             | Only real ones, with permission                                              |
| 💡  | Blog refresh to match the new brand                      | `/blog`, `/blog/[id]`; server layouts so posts get titles + per-post OG      |
| 💡  | Branded OG font                                          | Commit a Rubik TTF and pass it to `ImageResponse`                            |
| 💡  | Analytics (privacy-friendly, e.g. Plausible)             | Measure CTA clicks to iterate on copy; needs a CSP update                    |

## Phase 3 — Growing studio

|     | Item                                                      | Notes                                                   |
| --- | --------------------------------------------------------- | ------------------------------------------------------- |
| 💡  | Team section driven by a `team` array                     | Today: founder + "joining soon" + "build with us" cards |
| 💡  | `/join` page for people who want to work with us          | Values, how we work                                     |
| 💡  | Switch voice from "I" to "we" when the first member joins | One-file copy change in `site.ts`                       |
| 💡  | Real GitHub activity heatmap                              | Needs a server-side GitHub token                        |

## Decisions log

- **2026-10-11** — Personal brand first; Myhtra Studios is the label. Marketing tone, not job-seeking.
- **2026-10-11** — Layout: hero-led marketing page (prototype B) with impact counters, career timeline
  (framed as "track record"), live status (made real) and the architecture diagram. Skills bars / time split
  dropped: placeholder numbers, and they read like a résumé. Sidebar layout (C) dropped: it's a hiring-portfolio pattern.
- **2026-10-11** — Headline: "AI agents and cloud platforms you can put in production." (copy research pick A).
- **2026-10-11** — Honesty rules: employer work labelled as such ("As senior engineer at PwC Canada"), no seat counts,
  no reply-time promise, no fake live data.

- **2026-10-11** — Simplified to 4 sections + footer at Ahmet's request: hero, numbers, services, work, contact.
  Live status, timeline, process, studio cards and writing list removed (recoverable from commit 9bca5c3).

## Needs Ahmet's confirmation before launch

All marked `CONFIRM` in `src/app/(default)/_content/site.ts`.

- Naming **PwC Canada** and the **~$2–3M** savings figure publicly (fallback: "20+ vulnerabilities fixed to pass an audit").
- Your employment agreement allows running a studio / taking side projects.
- "Taking on new projects" status chip — only while true.
- Healtify: was it a job, client work or a venture? "Built to HIPAA requirements" wording.
- Crediting the 100k+ college app and the pod scanner (currently no employer named for them).
- "Myhtra Studios" business-name registration.
