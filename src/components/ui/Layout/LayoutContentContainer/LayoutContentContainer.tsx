import styles from './LayoutContentContainer.module.css'

export const LayoutContentContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}

