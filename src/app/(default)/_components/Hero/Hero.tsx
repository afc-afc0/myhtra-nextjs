import Image from 'next/image'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { contactHref, founder, hero } from '../../_content/site'
import { Terminal } from './Terminal'

import styles from './Hero.module.css'

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.title}>
            {hero.headline[0]} <span className={styles.accent}>{hero.headline[1]}</span>
          </h1>
          <p className={styles.sub}>{hero.sub}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={contactHref}>
              {hero.primaryCta}
            </a>
            <a className={styles.ghost} href="#work">
              {hero.secondaryCta}
            </a>
          </div>
          <p className={styles.microcopy}>{hero.microcopy}</p>
          <div className={styles.founder}>
            <Image className={styles.avatar} src={AhmetImage} alt={founder.name} width={48} height={48} preload />
            <div>
              <p className={styles.founderName}>{founder.name}</p>
              <p className={styles.founderRole}>
                {founder.role} · {founder.location}
              </p>
            </div>
            <span className={styles.status}>
              <span className={styles.dot} aria-hidden /> {hero.status}
            </span>
          </div>
        </div>
        <Terminal />
      </div>
    </section>
  )
}
