import Image from 'next/image'
import MyhtraLogo from '@public/pngs/Logo.png'

import styles from './Navbar.module.css'

export const Navbar = ({}) => {
  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
        </div>
        <div className={styles.navbarMiddle}>
          
        </div>
        <div className={styles.navbarRight}>
        
        </div>
      </nav>
    </div>
  )
}

const Logo = () => {
  return (
    <Image
      alt='Myhtra Logo'
      src={MyhtraLogo}
      width={48}
      height={48}
    />
  )
}