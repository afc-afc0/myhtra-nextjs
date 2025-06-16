'use client'
import * as SelectPrimitive from '@radix-ui/react-select'
import React from 'react'
import clsx from 'clsx'
import { ChevronDownSVG } from '../../SVG/SVG'

import sharedStyles from '../Shared/Shared.module.css'
import styles from './Select.module.css'

export const Select = SelectPrimitive.Root

export const SelectGroup = SelectPrimitive.Group

export const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  ({ children, size = 'm', ...props }, ref) => {
    return (
      <SelectPrimitive.Trigger ref={ref} className={clsx(sharedStyles.shared, styles.trigger)} data-size={size} {...props}>
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDownSVG />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )
  }
)

SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={clsx(styles.content, position === 'popper' && styles.popper)}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={clsx(styles.viewport, position === 'popper' && styles.popper)}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = 'SelectContent'

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ children, ...props }, ref) => {
  return (
    <SelectPrimitive.Label ref={ref} className={styles.label} {...props}>
      {children}
    </SelectPrimitive.Label>
  )
})
SelectLabel.displayName = 'SelectLabel'

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item ref={ref} className={styles.item} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = 'SelectItem'

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>((props, ref) => {
  return <SelectPrimitive.Separator ref={ref} className={styles.separator} {...props} />
})
SelectSeparator.displayName = 'SelectSeparator'
