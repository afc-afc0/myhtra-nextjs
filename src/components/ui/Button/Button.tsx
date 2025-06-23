import clsx from 'clsx'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'
import React from 'react'

import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  className?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
  icon?: React.ReactNode
  active?: boolean
  loading?: boolean
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, className, loading, icon, size = 'm', onClick, asChild = false, disabled = false, active, ...props }: ButtonProps, ref) => {
    return (
      <button
        className={clsx(styles.button, active && styles.active, loading && styles.loading, className)}
        disabled={disabled || loading}
        onClick={onClick}
        data-size={size}
        data-icon-only={icon != null && text == null}
        ref={ref}
        {...props}
      >
        <ConditionalDisplay condition={text != null}>
          <span className={clsx(text && styles.text, icon && text && styles.marginRight)}>{text}</span>
        </ConditionalDisplay>
        <ConditionalDisplay condition={icon != null}>{icon}</ConditionalDisplay>
      </button>
    )
  }
)

Button.displayName = 'Button'
