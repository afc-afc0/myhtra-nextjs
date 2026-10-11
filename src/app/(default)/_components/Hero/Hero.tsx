import Image from 'next/image'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { contactHref, founder, hero } from '../../_content/site'

import styles from './Hero.module.css'

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
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
        <div className={styles.founder}>
          <Image className={styles.avatar} src={AhmetImage} alt={founder.name} width={44} height={44} preload />
          <p>
            <span className={styles.founderName}>{founder.name}</span>
            <span className={styles.founderRole}>{founder.role}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
