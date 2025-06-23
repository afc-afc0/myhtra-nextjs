import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'

import styles from './Toggle.module.css'
import clsx from 'clsx'

interface ToggleProps {
  icon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
  isPressed?: true | false
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps & React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, disabled, size = 'm', icon, isPressed, onClick, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={clsx(styles.toggle, className)}
    disabled={disabled}
    data-size={size}
    onClick={onClick}
    pressed={isPressed}
    {...props}
  >
    {icon}
  </TogglePrimitive.Root>
))
Toggle.displayName = 'Toggle'
