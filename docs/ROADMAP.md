# Myhtra — Site Roadmap

A simple personal site for Ahmet, under the Myhtra Studios name until more people join.
Rules: keep it simple, use the existing UI components (`FlexContainer`, `Text`, `Button`, `Posts`…), add nothing unnecessary.

Status: ✅ done · ⏳ next · 💡 later

## Phase 1 — Simple homepage (branch `feature/brand-refresh`)

|     | Item                          | Notes                                                                               |
| --- | ----------------------------- | ----------------------------------------------------------------------------------- |
| ✅  | Intro                         | Photo, name, role, one line about the work, "new members joining soon", links       |
| ✅  | GitHub on the homepage        | Latest 6 own repos from the public GitHub API, refreshed hourly, same card as posts |
| ✅  | Blog on the homepage          | Existing `Posts` component                                                          |
| ✅  | Navbar, footer, global styles | Back to the originals — no new styling                                              |
| ✅  | SEO basics                    | Title, description, Open Graph image, sitemap, robots, JSON-LD (all invisible)      |
| ✅  | `PageContainer` on mobile     | `max-width: 100%` + side padding (also fixes `/blog` on phones)                     |
| ⏳  | Review on screen, then merge  | Light and dark mode, phone width                                                    |

## Later — only if it earns its place

|     | Item                              | Notes                                                 |
| --- | --------------------------------- | ----------------------------------------------------- |
| 💡  | Domain email (`hello@myhtra.co`)  | Swap in `Intro.tsx`                                   |
| 💡  | Pinned repos instead of latest    | Needs GitHub GraphQL + a server-side token            |
| 💡  | Per-post titles and preview image | `/blog/[id]` is a client page; needs a server wrapper |
| 💡  | Team section                      | When the first member joins; switch "I" to "we"       |

## Decisions log

- **2026-10-11** — Personal brand first; Myhtra Studios is the label.
- **2026-10-11** — Tried a marketing-style page (commits 9bca5c3, 90eeed9). Ahmet: too much, showing off.
  Replaced with a plain page built only from existing components: intro, GitHub, blog.
  Research from that round stays in `docs/brand/` for reference.
- **2026-10-11** — Prototypes kept on branch `prototype/homepage-ui`, not on main.
