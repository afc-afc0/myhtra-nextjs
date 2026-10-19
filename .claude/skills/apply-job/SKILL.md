---
name: apply-job
description: Apply to a job for Ahmet through Chromium. Use when given a job posting link to apply to, or asked to fill a job application.
---

# Apply to a job

Our files live in `applications/`, gitignored because the repo is public:

- `resumes/`: resume PDFs, default `ahmet-cengiz-resume.pdf`.
- `answers.md`: reusable answers Ahmet confirmed.
- `applied/`: one **record** per application, following `applied/_template.md`.
- `jobs.md`: the `find-jobs` shortlist.

Each file's header gives its format. Recreate any that are missing and tell Ahmet.

Resume facts come from `src/app/(default)/_content/profile.ts`. It renders on the public site, so we only read it.

Every value we type is **sourced** from `profile.ts`, `answers.md`, a past record, or Ahmet in this session. A field with no source is an **unknown**.

## Steps

1. **Read the job.** Load the Chrome tools (see the `claude-in-chrome` skill) and use the Linux browser, which is Ahmet's Chromium. Open the link in a new tab and read the posting. If a record in `applied/` already has this URL or the same company and role, show it and ask before going on. Done when the record exists as a `draft` with the header and Posting section filled.
2. **Map the form.** Walk every page of the application form, reading each field without typing anything. Done when we have every field with its type, whether it's required, and its options. If the site needs a login or account, stop and ask Ahmet to sign in.
3. **Source each field.** A saved answer matches when it means the same thing, even if worded differently. For free-text questions, a past record's answer to a similar question is a draft to adapt. Done when every field is sourced or marked unknown.
4. **Validate with Ahmet.** Send one message: the unknowns as a numbered list with options and our suggested answer, then a small table of sourced values so wrong saved answers get caught. Done when Ahmet has answered every unknown.
5. **Save the answers** before filling. Every answer that could come up on another application goes in `answers.md`, generalised if needed ("open to relocating to Vancouver" from "willing to relocate for this role?"). Only answers about this company or role alone stay just in the record. Correct any saved answer Ahmet changed. Done when every answer from step 4 is in `answers.md` or the record.
6. **Fill the form.** Type the values, upload the resume with `file_upload`, and write free-text answers from sourced facts only. Done when every field is filled and a screenshot of each page matches the step 4 table.
7. **Submit on a yes.** Show the filled form, free text included, and ask "Submit?". Submit only on an explicit yes for this application. Done when the confirmation page or email shows.
8. **Finish the record.** Fill Submitted and Free-text answers exactly as sent, copy the uploaded resume beside the record, and set the status. Done when the record shows everything we sent, with status `submitted`, or `stopped` and the reason.

## Gotchas

- New questions show up mid-form (after a page, or when a dropdown reveals more fields). Run them through steps 4 and 5, then continue.
- Prefilled fields from a parsed resume are often wrong. Check each against `profile.ts`.
- A job-tailored resume is saved as `resumes/<company>-<role>.pdf`.
- If `profile.ts` changed after the default PDF was printed, reprint it to `resumes/ahmet-cengiz-resume.pdf` with step 3 of the `resume` skill.
