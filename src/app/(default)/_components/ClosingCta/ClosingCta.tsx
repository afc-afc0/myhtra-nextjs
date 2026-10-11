import { closing, contactHref, founder } from '../../_content/site'

import styles from './ClosingCta.module.css'

export const ClosingCta = () => {
  return (
    <section id="contact" className={styles.wrap}>
      <div className={styles.band}>
        <h2 className={styles.title}>{closing.headline}</h2>
        <p className={styles.sub}>{closing.sub}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={contactHref}>
            {closing.cta}
          </a>
          {founder.links.slice(1).map((l) => (
            <a key={l.label} className={styles.secondary} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
