import { work } from '../../_content/site'
import { Section } from '../Section/Section'

import styles from './SelectedWork.module.css'

export const SelectedWork = () => {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Systems that run in production."
      intro="Enterprise platforms, regulated healthcare and products of my own — each one shipped, measured and kept running."
    >
      <div className={styles.grid}>
        {work.map((w) => (
          <article key={w.name} className={styles.card}>
            <div className={styles.top}>
              <span className={styles.kind}>{w.kind}</span>
              <span className={styles.status}>{w.status}</span>
            </div>
            <h3 className={styles.name}>{w.name}</h3>
            <p className={styles.summary}>{w.summary}</p>
            <div className={styles.bottom}>
              {w.metric ? (
                <p className={styles.metric}>
                  <strong>{w.metric.value}</strong> {w.metric.label}
                </p>
              ) : (
                <span />
              )}
              <ul className={styles.stack}>
                {w.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
