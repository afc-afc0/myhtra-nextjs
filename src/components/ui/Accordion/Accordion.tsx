'use client'
import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronRightSVG } from '../SVG/SVG'
import clsx from 'clsx'
import { FlexContainer } from '../Layout/FlexContainer/FlexContainer'

import styles from './Accordion.module.css'

export const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => <AccordionPrimitive.Root ref={ref} className={clsx(styles.accordion, className)} {...props} />)
Accordion.displayName = 'Accordion'

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={styles.item} {...props} />)
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger ref={ref} className={styles.trigger} {...props}>
      <FlexContainer
        backgroundColor="transparent"
        height="100%"
        paddingSize="s"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        {children}
        <ChevronRightSVG className={styles.triggerIcon} />
      </FlexContainer>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={styles.content} {...props}>
    <FlexContainer paddingSize="s">{children}</FlexContainer>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'
