import Image from 'next/image'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { founder, studio } from '../../_content/site'
import { Section } from '../Section/Section'

import styles from './Studio.module.css'

const joinHref = `mailto:${founder.email}?subject=${encodeURIComponent('Joining Myhtra Studios')}`

export const Studio = () => {
  return (
    <Section id="studio" eyebrow="The studio" title={studio.headline} intro={studio.text}>
      <div className={styles.team}>
        <article className={styles.member}>
          <Image className={styles.photo} src={AhmetImage} alt={founder.name} width={88} height={88} />
          <h3 className={styles.name}>{founder.name}</h3>
          <p className={styles.role}>{founder.role}</p>
          <ul className={styles.links}>
            {founder.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
        <article className={`${styles.member} ${styles.seat}`}>
          <span className={styles.placeholder} aria-hidden>
            +
          </span>
          <h3 className={styles.name}>Joining soon</h3>
          <p className={styles.role}>{studio.comingSoon}</p>
        </article>
        <a className={`${styles.member} ${styles.join}`} href={joinHref}>
          <h3 className={styles.name}>{studio.joinCta}</h3>
          <p className={styles.role}>{studio.joinText}</p>
        </a>
      </div>
    </Section>
  )
}
