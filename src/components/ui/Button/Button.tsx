import clsx from 'clsx'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'

import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
  icon?: React.ReactNode
  active?: boolean
  loading?: boolean
}

export const Button = ({ text, loading, icon, size = 'm', onClick, disabled = false, active, ...props } : ButtonProps) => {
  return (
    <button 
      className={clsx(styles.button, active && styles.active, loading && styles.loading)} 
      disabled={disabled || loading}
      onClick={onClick} 
      data-size={size}
      data-icon-only={icon != null && text == null}
      {...props}
    >
      <ConditionalDisplay condition={text != null}>
        <span className={clsx(
          text && styles.text, 
          icon && text && styles.marginRight
          )}
        >
        { text }
        </span>
      </ConditionalDisplay>
      <ConditionalDisplay condition={icon != null}>
        { icon }
      </ConditionalDisplay>
    </button>
  )
}
