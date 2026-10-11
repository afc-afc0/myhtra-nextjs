'use client'

// PROTOTYPE — Variant A "Editorial": personal brand, big type, no boxes, numbered services, list-style experience + blog.

import Image from 'next/image'
import Link from 'next/link'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { brand, experience, formatPostDate, profile, services, usePrototypePosts } from './content'

import styles from './VariantA.module.css'

export const variantAName = 'Editorial'

export const VariantA = () => {
  const posts = usePrototypePosts()
  const email = profile.links[0].href

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.byline}>
          <Image className={styles.avatar} src={AhmetImage} alt={profile.name} width={56} height={56} priority />
          <div>
            <p className={styles.bylineName}>{profile.name}</p>
            <p className={styles.eyebrow}>
              {profile.role} · {profile.location}
            </p>
          </div>
        </div>
        <h1 className={styles.title}>
          I build software
          <br />
          that just <span className={styles.accent}>works.</span>
        </h1>
        <p className={styles.lead}>{brand.intro}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={email}>
            Get in touch
          </a>
          <a className={styles.secondary} href="#a-blog">
            Read my writing →
          </a>
        </div>
        <dl className={styles.stats}>
          {profile.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>What I do</h2>
        <ol className={styles.services}>
          {services.map((s, i) => (
            <li key={s.key} className={styles.service}>
              <span className={styles.number}>0{i + 1}</span>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceText}>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Experience</h2>
        <ol className={styles.jobs}>
          {experience.map((job) => (
            <li key={job.company} className={styles.job}>
              <span className={styles.jobDates}>{job.dates}</span>
              <div>
                <h3 className={styles.jobTitle}>
                  {job.title} <span className={styles.jobCompany}>· {job.company}</span>
                </h3>
                <p className={styles.jobSummary}>{job.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="a-blog" className={styles.section}>
        <h2 className={styles.label}>Writing</h2>
        <ul className={styles.posts}>
          {posts.map((p) => (
            <li key={p.id}>
              <Link className={styles.post} href={`/blog/${p.id}`}>
                <span className={styles.postTitle}>{p.name}</span>
                <span className={styles.postMeta}>{formatPostDate(p.createdAtUtc)}</span>
                <span className={styles.postArrow}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.contact}>
        <h2 className={styles.contactTitle}>Have a project in mind?</h2>
        <div className={styles.links}>
          {profile.links.map((l) => (
            <Link key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        © {brand.label} — {brand.motto}
      </footer>
    </main>
  )
}
