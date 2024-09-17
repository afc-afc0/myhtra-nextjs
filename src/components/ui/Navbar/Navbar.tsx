import Image from 'next/image'
import { AuthController } from '../Auth/AuthController/AuthController'
import MyhtraLogo from '@public/svgs/Logo.svg'

import styles from './Navbar.module.css'

export const Navbar = ({}) => {
  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Logo />
        </div>
        <div className={styles.navbarMiddle}>
          
        </div>
        <div className={styles.navbarRight}>
          <AuthController />        
        </div>
      </nav>
    </div>
  )
}

export const Logo = () => {
  return (
    <Image
      alt='Myhtra Logo'
      src={MyhtraLogo}
      width={55}
      height={70}
    />
  )
}