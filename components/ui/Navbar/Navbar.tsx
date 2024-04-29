import Image from 'next/image';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch/ThemeSwitch';
import MythraLogo from '@/public/pngs/Logo.png'

import styles from './Navbar.module.css'; 

export const Navbar = ({}) => {
  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Logo />
        </div>
        <div className={styles.navbarMiddle}>
          <Label label='Myhtra Studios' />
        </div>
        <div className={styles.navbarRight}>
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  )
}

const Logo = () => {
  return (
    <Image
      alt='Mythra Logo'
      src={MythraLogo}
      width={48}
      height={48}
    />
  )
}

interface LabelProps {
  label: string
}

const Label = ({ label }: LabelProps) => {
  return (
    <label className={styles.label}>
      { label }
    </label>
  )
}