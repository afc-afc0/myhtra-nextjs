import { process } from '../../_content/site'
import { Section } from '../Section/Section'

import styles from './Process.module.css'

export const Process = () => {
  return (
    <Section id="process" eyebrow="How we work" title="Clear steps. No surprises.">
      <ol className={styles.steps}>
        {process.map((p, i) => (
          <li key={p.title} className={styles.step}>
            <span className={styles.number}>0{i + 1}</span>
            <h3 className={styles.title}>{p.title}</h3>
            <p className={styles.text}>{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
