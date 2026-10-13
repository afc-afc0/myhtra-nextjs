import type { Metadata } from 'next'
import { experience, links, projects, resume } from '../_content/profile'
import { PrintButton } from './PrintButton'

import styles from './page.module.css'

export const metadata: Metadata = {
  alternates: { canonical: '/resume' },
  title: 'Resume'
}

const contacts = [
  { href: `tel:${resume.phone.replace(/[^+\d]/g, '')}`, text: resume.phone },
  { href: links.email, text: links.email.replace('mailto:', '') },
  { href: links.linkedin, text: 'LinkedIn' },
  { href: links.github, text: 'GitHub' }
]

const resumeProjects = projects.filter((p) => p.resume)

export default function Resume() {
  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <PrintButton />
      </div>

      <article className={styles.sheet} data-print-sheet>
        <header className={styles.header}>
          <h1>{resume.name}</h1>
          <p>
            {experience[0].title} | {resume.location}
          </p>
          <p>
            {contacts.map((c, i) => (
              <span key={c.href}>
                {i > 0 && ' | '}
                <a href={c.href}>{c.text}</a>
              </span>
            ))}
          </p>
        </header>

        <section>
          <h2>Work History</h2>
          {experience.map((job) => (
            <div key={job.company} className={styles.entry}>
              <p className={styles.row}>
                <em>
                  {job.title} at {job.company}, {resume.location}
                </em>
                <em>{job.resume.dates}</em>
              </p>
              <ul>
                {job.resume.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          {resumeProjects.map((p) => (
            <div key={p.name} className={styles.entry}>
              <p>
                <em>{p.name}</em>
              </p>
              <ul>
                {p.resume?.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Education &amp; Certificates</h2>
          <ul>
            <li>{resume.education}</li>
            <li>{resume.certificates}</li>
          </ul>
        </section>
      </article>
    </main>
  )
}
