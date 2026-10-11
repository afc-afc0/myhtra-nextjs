'use client'

// PROTOTYPE — Variant B "Spotlight": personal brand, glowing photo hero, stats strip, bento services, timeline, card-grid blog.

import Image from 'next/image'
import Link from 'next/link'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { ArchitectureSVG, CloudSVG, KubernetesSVG, WebDevSVG } from '@components/ui/SVG/SVG'
import { brand, experience, formatPostDate, profile, services, usePrototypePosts } from './content'

import styles from './VariantB.module.css'

export const variantBName = 'Spotlight'

const icons: Record<string, React.ReactNode> = {
  ai: <ArchitectureSVG />,
  cloud: <CloudSVG />,
  kubernetes: <KubernetesSVG />,
  web: <WebDevSVG />
}

export const VariantB = () => {
  const posts = usePrototypePosts()
  const email = profile.links[0].href

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden />
        <Image className={styles.photo} src={AhmetImage} alt={profile.name} width={132} height={132} priority />
        <span className={styles.pill}>
          {profile.name} · {brand.label} · {profile.location}
        </span>
        <h1 className={styles.title}>
          I build software that just <span className={styles.accent}>works.</span>
        </h1>
        <p className={styles.lead}>{brand.intro}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={email}>
            Work with me
          </a>
          <a className={styles.ghost} href="#b-blog">
            Read the blog
          </a>
        </div>
        <dl className={styles.statsStrip}>
          {profile.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>What I do</h2>
        <div className={styles.bento}>
          {services.map((s, i) => (
            <article key={s.key} className={`${styles.tile} ${i === 0 ? styles.tileLarge : ''}`}>
              <div className={styles.icon}>{icons[s.key]}</div>
              <h3 className={styles.tileTitle}>{s.title}</h3>
              <p className={styles.tileText}>{i === 0 ? s.text : s.short}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Experience</h2>
        <ol className={styles.timeline}>
          {experience.map((job, i) => (
            <li key={job.company} className={`${styles.step} ${i === 0 ? styles.stepCurrent : ''}`}>
              <span className={styles.stepDates}>{job.dates}</span>
              <h3 className={styles.stepTitle}>
                {job.title} <span className={styles.stepCompany}>@ {job.company}</span>
              </h3>
              <p className={styles.stepText}>{job.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="b-blog" className={styles.section}>
        <h2 className={styles.heading}>From the blog</h2>
        <div className={styles.cards}>
          {posts.slice(0, 6).map((p) => (
            <Link key={p.id} className={styles.card} href={`/blog/${p.id}`}>
              <span className={styles.cardDate}>{formatPostDate(p.createdAtUtc)}</span>
              <span className={styles.cardTitle}>{p.name}</span>
              <span className={styles.cardAuthor}>{p.userDisplayName}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.banner}>
        <h2 className={styles.bannerTitle}>Let’s build something that works.</h2>
        <div className={styles.bannerLinks}>
          {profile.links.map((l) => (
            <Link key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        {brand.label} · {brand.motto}
      </footer>
    </main>
  )
}
