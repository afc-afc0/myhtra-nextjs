import React, { forwardRef } from 'react'
import styles from './Input.module.css'
import clsx from 'clsx'

interface InputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string
  id?: string
  autoComplete?: string
  className?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, InputTextProps>(
  ({ id, value, disabled, className, size, autoComplete = 'off', onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        className={clsx(styles.input, 'sharedFormComponent', className)}
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
