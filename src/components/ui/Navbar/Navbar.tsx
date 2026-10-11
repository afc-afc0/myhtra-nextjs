'use client'

import Image from 'next/image'
import { AuthController } from '../Auth/AuthController/AuthController'
import MyhtraLogo from '@public/svgs/Logo.svg'
import Link from 'next/link'
import { ThemeSwitch } from '@components/ui/ThemeSwitch/ThemeSwitch'
import { useSession } from 'next-auth/react'

import styles from './Navbar.module.css'

const sections = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#studio', label: 'Studio' },
  { href: '/blog', label: 'Blog' }
]

const contactHref = `mailto:ahmet_fatih_cengiz@hotmail.com?subject=${encodeURIComponent('New project — Myhtra Studios')}`

export const Navbar = ({}) => {
  const { status } = useSession()

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Logo />
        </div>
        <div className={styles.navbarMiddle}>
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className={styles.navLink}>
              {s.label}
            </Link>
          ))}
          {status === 'authenticated' && (
            <Link href="/blog/myPosts" className={styles.navLink}>
              My Posts
            </Link>
          )}
        </div>
        <div className={styles.navbarRight}>
          <a className={styles.cta} href={contactHref}>
            Start a project
          </a>
          <AuthController />
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  )
}

export const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Image alt="Myhtra Studios" src={MyhtraLogo} width={30} height={40} />
      <span className={styles.wordmark}>
        Myhtra<span>Studios</span>
      </span>
    </Link>
  )
}
