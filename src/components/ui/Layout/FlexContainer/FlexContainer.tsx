import React from 'react'
import clsx from 'clsx'
import styles from './FlexContainer.module.css'

interface FlexContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
  // Layout
  flexDirection?: 'row' | 'column'
  responsiveFlexDirection?: 'none' | 'row' | 'column'
  paddingSize?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  paddingRight?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  paddingLeft?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  gapSize?: 'none' | 'xs' | 's' | 'm' | 'l'
  marginBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  height?: 'none' | '25%' | '50%' | '33%' | '100%' | 'auto' | 'inherit'
  width?: 'none' | '25%' | '50%' | '33%' | '100%' | 'auto' | 'inherit'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  alignItems?: 'flex-start' | 'flex-end' | 'center'
  flexBasis?: 'none' | '%0' | '%25' | '%50' | '%75' | '%100'
  flexGrow?: 1
  flexShrink?: 1
  boxSizing?: 'content-box' | 'border-box'
  position?: 'relative' | 'absolute' | 'fixed'
  style?: React.CSSProperties
  // Effects
  borderWidth?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  borderRadius?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  borderTopRadius?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  shadowSize?: 'none' | 's' | 'm' | 'l'
}

export const FlexContainer = React.forwardRef<HTMLDivElement, FlexContainerProps>(
  (
    {
      children,
      className,
      id,
      flexDirection = 'column',
      responsiveFlexDirection = 'none',
      paddingSize = 'none',
      paddingTop = 'none',
      paddingRight = 'none',
      paddingBottom = 'none',
      paddingLeft = 'none',
      gapSize = 'none',
      marginBottom = 'none',
      height = 'auto',
      width = 'auto',
      justifyContent = 'flex-start',
      alignItems = 'flex-start',
      flexBasis = 'none',
      flexGrow = 'none',
      flexShrink = 'none',
      boxSizing = 'none',
      borderWidth = 'none',
      borderRadius = 'none',
      borderTopRadius = 'none',
      shadowSize = 'none',
      position,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.flexContainer, className)}
        id={id}
        data-padding-size={paddingSize}
        data-padding-top={paddingTop}
        data-padding-right={paddingRight}
        data-padding-bottom={paddingBottom}
        data-padding-left={paddingLeft}
        data-gap-size={gapSize}
        data-margin-bottom={marginBottom}
        data-flex-direction={flexDirection}
        data-height={height}
        data-width={width}
        data-justify-content={justifyContent}
        data-align-items={alignItems}
        data-flex-basis={flexBasis}
        data-flex-grow={flexGrow}
        data-flex-shrink={flexShrink}
        data-border-width={borderWidth}
        data-border-radius={borderRadius}
        data-border-top-radius={borderTopRadius}
        data-shadow-size={shadowSize}
        data-box-sizing={boxSizing}
        data-responsive-flex-direction={responsiveFlexDirection}
        data-position={position}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FlexContainer.displayName = 'FlexContainer'
