import styles from './PageContainer.module.css'

interface PageContainerProps {
  removeNavbarPadding?: boolean
  children: React.ReactNode
}

export const PageContainer = ({ removeNavbarPadding = false, children } : PageContainerProps) => {
  return (
    <main className={`${styles.container} ${removeNavbarPadding && styles.removePadding}`}>
      { children }
    </main>
  )
}