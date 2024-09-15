import React, { forwardRef } from 'react'
import sharedStyles from '../Shared/Shared.module.css'
import styles from './Input.module.css'
import clsx from 'clsx'

interface InputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value: string
  id?: string
  autoComplete?: string
  className?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, InputTextProps>(
  ({ id, value, className, size, autoComplete = 'off', onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        className={clsx(styles.input, sharedStyles.shared, className)}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        data-size={size}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'