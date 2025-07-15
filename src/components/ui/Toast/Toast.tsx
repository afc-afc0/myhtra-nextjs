'use client'

import * as ToastPrimitives from '@radix-ui/react-toast'
import React from 'react'
import clsx from 'clsx'
import { CloseSVG } from '@components/ui/SVG/SVG'
import { Text } from '@components/ui/Text/Text'
import { Button } from '@components/ui/Button/Button'

import styles from './Toast.module.css'

export const ToastProvider = ToastPrimitives.Provider

export const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => <ToastPrimitives.Viewport ref={ref} className={clsx(styles.viewport, className)} {...props} />)
ToastViewport.displayName = 'ToastViewport'

// export const toastVariants = cva(
//   "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
//   {
//     variants: {
//       variant: {
//         default: "border bg-background text-foreground",
//         destructive:
//           "destructive group border-destructive bg-destructive text-destructive-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

export type ToastProps = {
  variant?: 'default' | 'destructive'
}

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & ToastProps
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={clsx(styles.toast, className)} {...props} />
})
Toast.displayName = 'Toast'

export const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action ref={ref} className={clsx(styles.actionButton, className)} asChild {...props} />
))
ToastAction.displayName = 'ToastAction'

export const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close ref={ref} asChild {...props}>
    <Button className={className} icon={<CloseSVG />} />
  </ToastPrimitives.Close>
))
ToastClose.displayName = 'ToastClose'

export const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => {
  return <ToastPrimitives.Title ref={ref} className={clsx(styles.title, className)} {...props} />
})
ToastTitle.displayName = 'ToastTitle'

interface ToastDescriptionProps {
  // text: string;
}

export const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> & ToastDescriptionProps
>(({ className, ...props }, ref) => {
  return <ToastPrimitives.Description ref={ref} className={clsx(styles.description, className)} {...props} />
})
ToastDescription.displayName = 'ToastDescription'

export type ToastActionElement = React.ReactElement<typeof ToastAction>
