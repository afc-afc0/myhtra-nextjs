import React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'
import { CheckSVG } from '@components/ui/SVG/SVG'

import styles from './Checkbox.module.css'

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ id, size = 'xs', className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={clsx('sharedFormComponent', styles.checkbox, className)}
        id={id}
        data-size={size}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={styles.indicator}>
          <CheckSVG style={{ height: '20px', width: '20px' }} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)
Checkbox.displayName = 'Checkbox'
