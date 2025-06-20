'use client'

import * as React from 'react'
import clsx from 'clsx'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import styles from './Tabs.module.css'

export const Tabs = TabsPrimitive.Root

export const TabsRoot = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <TabsPrimitive.Root ref={ref} className={clsx(className)} {...props} />
})
TabsRoot.displayName = 'TabsRoot'

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return <TabsPrimitive.List ref={ref} className={clsx(styles.baseTabList, className)} {...props} />
})
TabsList.displayName = 'TabsList'

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger ref={ref} className={clsx(styles.baseTabListTrigger, className)} {...props}>
      <span className={styles.baseTabListTriggerInner}>{children}</span>
      <span className={styles.baseTabListTriggerInnerHidden}>{children}</span>
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return <TabsPrimitive.Content ref={ref} className={clsx(styles.tabsContent, className)} {...props} />
})
TabsContent.displayName = 'TabsContent'
