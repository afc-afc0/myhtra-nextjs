'use client'

import Image from 'next/image'
import { AuthController } from '../Auth/AuthController/AuthController'
import MyhtraLogo from '@public/svgs/Logo.svg'
import { Text } from '@components/ui/Text/Text'
import Link from 'next/link'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { ThemeSwitch } from '@components/ui/ThemeSwitch/ThemeSwitch'
import { useSession } from 'next-auth/react'

import styles from './Navbar.module.css'

export const Navbar = ({}) => {
  const { status } = useSession()

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Logo />
        </div>
        <div className={styles.navbarMiddle}></div>
        <div className={styles.navbarRight}>
          <FlexContainer flexDirection="row" alignItems="center" gapSize="xs">
            {status === 'authenticated' && (
              <Link href="/blog/myPosts">
                <Text fontWeight="medium" fontSize="m" text="My Posts" />
              </Link>
            )}
            <AuthController />
            <ThemeSwitch />
          </FlexContainer>
        </div>
      </nav>
    </div>
  )
}

export const Logo = () => {
  return (
    <Link href="/">
      <Image alt="Myhtra Logo" src={MyhtraLogo} width={44} height={56} />
    </Link>
  )
}
