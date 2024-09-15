import Image from 'next/image'
import MyhtraLogo from '@public/pngs/Logo.png'

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
      width={280}
      height={280}
    />
  )
}