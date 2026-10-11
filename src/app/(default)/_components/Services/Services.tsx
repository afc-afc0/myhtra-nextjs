import { ArchitectureSVG, CloudSVG, KubernetesSVG, WebDevSVG } from '@components/ui/SVG/SVG'
import { services } from '../../_content/site'
import { Section } from '../Section/Section'

import styles from './Services.module.css'

const icons: Record<string, React.ReactNode> = {
  ai: <ArchitectureSVG />,
  cloud: <CloudSVG />,
  kubernetes: <KubernetesSVG />,
  web: <WebDevSVG />
}

export const Services = () => {
  return (
    <Section
      id="services"
      eyebrow="What I build"
      title="One engineer across the whole stack."
      intro="No hand-offs between a frontend shop, a cloud team and an AI vendor. The same person designs it, builds it and keeps it running."
    >
      <div className={styles.grid}>
        {services.map((s, i) => (
          <article key={s.key} className={`${styles.tile} ${i === 0 ? styles.featured : ''}`}>
            <div className={styles.icon}>{icons[s.key]}</div>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.text}>{s.outcome}</p>
            <ul className={styles.tags}>
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
