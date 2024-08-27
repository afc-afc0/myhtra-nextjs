import clsx from 'clsx'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'

import styles from './Button.module.css'

interface ButtonProps {
  text?: string
  onClick?: (e: any) => any
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
      {/* we are only enabling marginRight when we have an icon */}
      <span className={clsx(text && styles.text, icon && text && styles.marginRight)}>
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

interface IconButtonProps {
  icon: React.ReactNode
  onClick: (e: any) => any
  disabled?: boolean
  size?: 's' | 'm' | 'l'
}

export const IconButton = ({ icon, onClick, disabled = false, size = 'm' } : IconButtonProps) => {
  return (
    <button 
      className={styles.iconButton} 
      disabled={disabled}
      onClick={onClick} 
      data-size={size}
    >
      <IconContainer>
        { icon }
      </IconContainer>
    </button>
  )
}