# Myhtra — Site Roadmap

A simple personal site for Ahmet, under the Myhtra Studios name until more people join.
Rules: keep it simple, use the existing UI components (`FlexContainer`, `Text`, `Button`, `Posts`…), add nothing unnecessary.

Status: ✅ done · ⏳ next · 💡 later

## Phase 1 — Simple homepage (branch `feature/brand-refresh`)

|     | Item                          | Notes                                                                          |
| --- | ----------------------------- | ------------------------------------------------------------------------------ |
| ✅  | Intro — facts only            | Photo, name, title, years of experience, founder of Myhtra Studios, links      |
| ✅  | GitHub contributions graph    | Last year from GitHub's public calendar, refreshed hourly, site theme colours  |
| ✅  | Blog on the homepage          | Existing `Posts` component                                                     |
| ✅  | Navbar, footer, global styles | Back to the originals — no new styling                                         |
| ✅  | SEO basics                    | Title, description, Open Graph image, sitemap, robots, JSON-LD (all invisible) |
| ✅  | `PageContainer` on mobile     | `max-width: 100%` + side padding (also fixes `/blog` on phones)                |
| ⏳  | Review on screen, then merge  | Light and dark mode, phone width                                               |

## Later — only if it earns its place

|     | Item                              | Notes                                                 |
| --- | --------------------------------- | ----------------------------------------------------- |
| 💡  | Domain email (`hello@myhtra.co`)  | Swap in `Intro.tsx`                                   |
| 💡  | Per-post titles and preview image | `/blog/[id]` is a client page; needs a server wrapper |
| 💡  | Team section                      | When the first member joins; switch "I" to "we"       |

## Decisions log

- **2026-10-11** — Personal brand first; Myhtra Studios is the label.
- **2026-10-11** — Tried a marketing-style page (commits 9bca5c3, 90eeed9). Ahmet: too much, showing off.
  Replaced with a plain page built only from existing components: intro, GitHub, blog.
  Research from that round stays in `docs/brand/` for reference.
- **2026-10-11** — Repo list replaced by the contribution graph; one card style, one width, small section labels;
  navbar aligned to the 60rem content width. Checked by screenshot (desktop, phone, dark).
- **2026-10-11** — Prototypes kept on branch `prototype/homepage-ui`, not on main.
