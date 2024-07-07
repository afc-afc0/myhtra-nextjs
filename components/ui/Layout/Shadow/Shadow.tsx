import styles from './Shadow.module.css'

export interface ShadowProps {
  children: React.ReactNode,
  size?: 's' | 'm' | 'l'
}

export const Shadow = ({ children, size = 'm' } : ShadowProps) => {
  return (
    <div className={styles.shadow} data-blur-radius={size}>
      { children }
    </div>
  )
}