import clsx from 'clsx'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'

import styles from './Button.module.css'

interface ButtonProps {
  text?: string
  onClick?: (e: any) => any
  disabled?: boolean
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
  icon?: React.ReactNode
  active?: boolean
}

export const Button = ({ text, icon, size = 'm', onClick, disabled = false, active } : ButtonProps) => {
  return (
    <button 
      className={clsx(styles.button, active && styles.active)} 
      disabled={disabled}
      onClick={onClick} 
      data-size={size}
      data-icon-only={icon != null && text == null}
    >
      <ConditionalDisplay condition={text != null}>
        <span className={clsx(text && styles.text, icon && text && styles.marginRight)}>
        { text }
        </span>
      </ConditionalDisplay>
      <ConditionalDisplay condition={icon != null}>
        { icon }
      </ConditionalDisplay>
    </button>
  )
}
