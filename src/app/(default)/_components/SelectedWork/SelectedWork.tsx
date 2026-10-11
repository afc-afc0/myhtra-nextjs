import { work } from '../../_content/site'
import { Section } from '../Section/Section'

import styles from './SelectedWork.module.css'

export const SelectedWork = () => {
  return (
    <Section id="work" title="Selected work">
      <div className={styles.grid}>
        {work.map((w) => (
          <article key={w.name} className={styles.card}>
            <p className={styles.kind}>{w.kind}</p>
            <h3 className={styles.name}>{w.name}</h3>
            <p className={styles.summary}>{w.summary}</p>
            {w.metric && <p className={styles.metric}>{w.metric}</p>}
          </article>
        ))}
      </div>
    </Section>
  )
}
