import Image from 'next/image'
import Link from 'next/link'
import MyhtraLogo from '@public/svgs/Logo.svg'

import styles from './Footer.module.css'

const sections = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#studio', label: 'Studio' },
  { href: '/blog', label: 'Blog' }
]

const socials = [
  { href: 'mailto:ahmet_fatih_cengiz@hotmail.com', label: 'Email' },
  { href: 'https://github.com/afc-afc0', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ahmet-fatih-cengiz', label: 'LinkedIn' }
]

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image src={MyhtraLogo} alt="" width={28} height={37} />
          <div>
            <p className={styles.name}>Myhtra Studios</p>
            <p className={styles.tagline}>Pursuing perfection, project by project. Toronto, Canada.</p>
          </div>
        </div>
        <nav className={styles.links} aria-label="Footer">
          {sections.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.label}
            </Link>
          ))}
        </nav>
        <div className={styles.links}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className={styles.meta}>© {new Date().getFullYear()} Myhtra Studios · Next.js 16 on Azure Kubernetes Service</p>
    </footer>
  )
}
