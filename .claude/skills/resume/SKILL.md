---
name: resume
description: Edit Ahmet's resume and the site's experience or projects. Use when adding a job, achievement, project or certificate, or rewording the resume.
---

# Resume

`src/app/(default)/_content/profile.ts` is the single source of truth. The home page and `/resume` both render it. `/resume` prints to the PDF.

The resume follows the Headless Headhunter template (headlessheadhunter.org/how-to-get-a-job): it reads like a government form, built so a recruiter can tick off keywords in 15 seconds.

## Data

- `experience`: reverse chronological. `experience[0]` is the current role (the home page intro and JSON-LD read it). `highlights` is the short home-page copy with `**bold**`; `resume.bullets` and `resume.dates` are the resume copy.
- `projects`: a project with `resume` bullets also appears on `/resume`, in array order (most relevant first).
- `resume`: header, Education and Certificates.
- Phone: `resume.phone` in `profile.ts`, shown on the public `/resume` page. Job-specific resume versions still stay out of the repo.

## Template rules

- Sections, in order: Work History, Projects, Skills, Education & Certificates. Education & Certificates sits at the bottom (the template's rule when a degree isn't the selling point; this one was not completed), and names the field of study only. No summary section. Keywords live inside bullets; the one-line Skills section (a deliberate break from the template) only holds exact terms recruiters search literally, such as AWS or C#, and only skills that are true.
- Each job: 3 to 8 bullets. Bullet 1 is a **summary** of the role that an 8-year-old could follow, with 1–2 keywords. Every other bullet is **keyword + how it was used + result or reason**.
- Projects: 3 bullets max, no dates. Paid by a company means Work History; unpaid means Project. Only finished work goes on the resume.
- Every bullet: past tense (current job too), one sentence, 2 lines max, plain text with no bold.
- Compact: one page, 1.15 line spacing (we deviate from the template's 1.5 on purpose).
- Dates: full month and year, "to Current" for the current job.
- Each fact lives in one place: a fact already in a project is not repeated in a job.

## Steps

1. Edit `profile.ts`. Done when every fact the user gave is in the data and each touched bullet passes every template rule.
2. Run `pnpm lint` and `npx tsc --noEmit`. Done when both pass.
3. Print and look at the PDF. With `next dev` running:
   `google-chrome --headless=new --ignore-certificate-errors --print-to-pdf=<scratch>/resume.pdf https://localhost:3000/resume`
   then render the pages with `pdftoppm -png` and view them. Done when it is **one page** with no browser header or footer. If it overflows, shorten the longest bullets to one line or cut the weakest, before touching spacing in `resume/page.module.css`.
