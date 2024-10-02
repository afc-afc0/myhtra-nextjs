'use client'

import * as DialogPrimitive from "@radix-ui/react-dialog"
import React from "react"
import clsx from "clsx"
import { Button } from "@components/ui/Button/Button"
import { CloseSVG } from "@components/ui/SVG/SVG"

import styles from './Dialog.module.css'

export const Dialog = DialogPrimitive.Root

export const DialogTrigger = DialogPrimitive.Trigger

export const DialogPortal = DialogPrimitive.Portal

export const DialogClose = DialogPrimitive.Close

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={clsx(styles.overlay, className)}
      {...props}
    />
  )
})
DialogOverlay.displayName = 'DialogOverlay'

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={styles.content}
      >
        { children }
        <DialogPrimitive.Close asChild>
          <Button className={styles.closeButton} size='s' icon={<CloseSVG />} >
            <span className={styles.srOnly}>Close</span>
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = 'DialogContent'

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx(styles.header, className)} {...props} />
}
DialogHeader.displayName = 'DeialogHeader'

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx(styles.footer, className)} {...props} />
}
DialogFooter.displayName = 'DialogFooter'

export const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx(styles.title, className)} {...props} />
}
DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={clsx(styles.description, className)}
      {...props}
    />
  )
})
DialogDescription.displayName = 'DialogDescription'

