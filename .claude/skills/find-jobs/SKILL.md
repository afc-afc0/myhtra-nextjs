---
name: find-jobs
description: Research job openings for Ahmet and suggest which to apply to. Use when asked to find, search or suggest jobs.
---

# Find jobs

We research openings, rank them against the resume, and hand Ahmet a shortlist to pick from. Picked jobs go to the `apply-job` skill, which also explains the `applications/` files.

The shortlist lives in `applications/jobs.md`; its header gives the format. Search criteria live in the Preferences section of `applications/answers.md`.

## Steps

1. **Load the criteria.** Read `profile.ts`, the Preferences in `answers.md`, `jobs.md` and the records in `applied/`. Criteria are target roles, seniority, locations, work mode, minimum salary, and companies or industries to skip. Done when each one has a saved answer; ask Ahmet in one message for any that are missing and save them to Preferences.
2. **Search LinkedIn Jobs** in Ahmet's Chromium (the Linux browser, signed in), running one search per target role with LinkedIn's filters for location, work mode and date posted. Done when we have about 20 candidates posted in the last 30 days that match the criteria and aren't already in `jobs.md` or `applied/`.
3. **Read and rank.** Open each posting and grade fit: **High** when most must-have requirements match `profile.ts`, **Medium** when one or two are missing, **Low** otherwise. Every match points to a real fact in `profile.ts`; a requirement with no fact there is a gap. Done when every candidate has a fit, a one-line why, its gaps, and the salary if posted.
4. **Shortlist.** Add today's search to the top of `jobs.md` with all candidates as `suggested`, High fit first. Show Ahmet the top 10 as a small table. Done when the table is shown and Ahmet has replied with picks.
5. **Hand off.** Mark picks `picked` and the rest of the top 10 `skipped`, with a reason if Ahmet gave one. Run `apply-job` on the picks one at a time, and mark each `applied` once its record is `submitted`. Done when every pick is `applied`, or still `picked` with the reason it stopped.

## Gotchas

- Postings get reposted under new links. Treat the same company and role as a duplicate.
- Keep both Easy Apply jobs and jobs whose "Apply" leads to the company's own site; leave LinkedIn's Easy Apply filter off. For the external ones, link the company's page, since that's where `apply-job` fills the form.
- Recruiter and staffing-agency posts hide the employer. Mark them in Why so Ahmet can choose.
- If a site shows a CAPTCHA or bot check, stop using that site and tell Ahmet.
