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
    <Section id="services" title="What I build">
      <div className={styles.grid}>
        {services.map((s) => (
          <article key={s.key} className={styles.item}>
            <div className={styles.icon}>{icons[s.key]}</div>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.text}>{s.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
