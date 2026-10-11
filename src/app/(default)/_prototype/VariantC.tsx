'use client'

// PROTOTYPE — Variant C "Studio sidebar": personal brand; sticky identity panel on the left, content scrolls on the right.

import Image from 'next/image'
import Link from 'next/link'
import Logo from '@public/svgs/Logo.svg'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { brand, experience, formatPostDate, profile, services, usePrototypePosts } from './content'

import styles from './VariantC.module.css'

export const variantCName = 'Studio sidebar'

const nav = [
  { href: '#c-services', label: 'What I do' },
  { href: '#c-experience', label: 'Experience' },
  { href: '#c-blog', label: 'Writing' }
]

export const VariantC = () => {
  const posts = usePrototypePosts()

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Image className={styles.photo} src={AhmetImage} alt={profile.name} width={88} height={88} priority />
        <h1 className={styles.brand}>{profile.name}</h1>
        <p className={styles.tagline}>
          {profile.role}
          <br />
          {profile.location}
        </p>
        <nav className={styles.nav}>
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} className={styles.navItem}>
              <span className={styles.navIndex}>0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className={styles.status}>
          <span className={styles.dot} /> Open to new projects
        </div>
        <div className={styles.sideLinks}>
          {profile.links.map((l) => (
            <Link key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </Link>
          ))}
        </div>
        <div className={styles.studio}>
          <Image src={Logo} alt="" width={18} height={24} />
          <span>{brand.label}</span>
        </div>
      </aside>

      <div className={styles.content}>
        <section className={styles.intro}>
          <p className={styles.code}>~/ahmet $ whoami</p>
          <p className={styles.introText}>
            I build <strong>web apps</strong>, <strong>cloud infrastructure</strong> and <strong>agentic AI platforms</strong> — from the
            foundations to the interface, with nothing unnecessary in between.
          </p>
        </section>

        <section id="c-services" className={styles.block}>
          <h2 className={styles.blockTitle}>what-i-do</h2>
          <div className={styles.serviceList}>
            {services.map((s) => (
              <div key={s.key} className={styles.service}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="c-experience" className={styles.block}>
          <h2 className={styles.blockTitle}>experience</h2>
          <div className={styles.stats}>
            {profile.stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.muted}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.timeline}>
            {experience.map((job) => (
              <div key={job.company} className={styles.entry}>
                <span className={styles.entryDate}>{job.dates}</span>
                <div>
                  <span className={styles.entryTitle}>
                    {job.title} · {job.company}
                  </span>
                  <p className={styles.muted}>{job.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="c-blog" className={styles.block}>
          <h2 className={styles.blockTitle}>writing</h2>
          <div className={styles.timeline}>
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} className={styles.entry}>
                <span className={styles.entryDate}>{formatPostDate(p.createdAtUtc)}</span>
                <span className={styles.entryTitle}>{p.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          {brand.label} · {brand.motto}
        </footer>
      </div>
    </main>
  )
}
