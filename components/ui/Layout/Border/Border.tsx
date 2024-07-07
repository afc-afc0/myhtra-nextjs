import { Shadow, ShadowProps } from '../Shadow/Shadow'
import styles from './Border.module.css'

interface BorderProps {
  borderWidth?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',
  borderRadius?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',
  shadowProps?: ShadowProps,
  children: React.ReactNode,
}

export const Border = ({ borderWidth = 'm', borderRadius = 'm', shadowProps, children } : BorderProps) => {
  return (
    <div className={styles.border} data-border-width={borderWidth} data-border-radius={borderRadius}>
      <Shadow {...shadowProps}>
        { children }
      </Shadow>
    </div>
  )
}