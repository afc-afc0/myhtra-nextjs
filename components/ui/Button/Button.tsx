import clsx from 'clsx'
import { ConditionalDisplay } from '../ConditionalDisplay/ConditionalDisplay'
import styles from './Button.module.css'

interface ButtonProps {
  text?: string
  onClick?: () => void
  disabled?: boolean
  size?: 's' | 'm' | 'l'
  icon?: React.ReactNode
}

export const Button = ({ text, icon, size = 'm', onClick, disabled = false } : ButtonProps) => {
  return (
    <button 
      className={styles.button} 
      disabled={disabled}
      onClick={onClick} 
      data-size={size}
    >
      <span className={clsx(text && styles.text)}>
        { text }
      </span>
      <ConditionalDisplay condition={icon != null}>
        <IconContainer>
          { icon }
        </IconContainer>
      </ConditionalDisplay>
    </button>
  )
}

interface IconContainerProps {
  children: React.ReactNode
}

const IconContainer = ({ children } : IconContainerProps) => {
  return (
    <span className={styles.iconContainer} >
      { children }
    </span>
  )
}