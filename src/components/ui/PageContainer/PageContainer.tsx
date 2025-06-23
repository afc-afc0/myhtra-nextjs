import clsx from 'clsx'
import styles from './PageContainer.module.css'

interface PageContainerProps {
  removeNavbarPadding?: boolean
  children: React.ReactNode
}

export const PageContainer = ({ removeNavbarPadding = false, children }: PageContainerProps) => {
  return (
    <main className={clsx(styles.pageContainer, removeNavbarPadding && styles.removePadding)}>
      <div className={styles.page}>{children}</div>
    </main>
  )
}
