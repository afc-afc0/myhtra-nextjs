import clsx from 'clsx'
import styles from './PageContainer.module.css'

interface PageContainerProps {
  removeNavbarPadding?: boolean
  children: React.ReactNode
}

export const PageContainer = ({ removeNavbarPadding = false, children } : PageContainerProps) => {
  return (
    <main className={clsx(styles.container, removeNavbarPadding && styles.removePadding)}>
      { children }
    </main>
  )
}