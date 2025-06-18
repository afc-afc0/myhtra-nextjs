'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'

import styles from './Popover.module.css'

export const Popover = PopoverPrimitive.Root

export const PopoverTrigger = PopoverPrimitive.Trigger

export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content ref={ref} align={align} sideOffset={sideOffset} className={clsx(styles.content, className)} {...props} />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = 'PopoverContent'
