import clsx from 'clsx'
import styles from './FlexContainer.module.css'

interface FlexContainerProps {
  children: React.ReactNode,
  className?: string,
  // Layout
  flexDirection?: 'row' | 'column',
  paddingSize?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',  
  gapSize?: 'none' | 's' | 'm' | 'l',
  marginBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',
  height?: 'none' | '100%' | 'auto',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  alignItems?: 'flex-start' | 'flex-end' | 'center',
  style?: React.CSSProperties,  

  // Effects
  borderWidth?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',
  borderRadius?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',
  shadowSize?: 'none' | 's' | 'm' | 'l',
}

export const FlexContainer = ({ 
  children, 
  className,
  flexDirection = 'column', 
  paddingSize = 'none', 
  gapSize = 'none', 
  marginBottom = 'none',
  height = 'auto', 
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  borderWidth = 'none',
  borderRadius = 's',
  shadowSize = 'none',
  style,
} : FlexContainerProps) => {
  return (
    <div 
      className={clsx(styles.flexContainer, className)} 
      data-padding-size={paddingSize} 
      data-gap-size={gapSize} 
      data-margin-bottom={marginBottom}
      data-flex-direction={flexDirection}
      data-height={height}
      data-justify-content={justifyContent}
      data-align-items={alignItems}
      data-border-width={borderWidth} 
      data-border-radius={borderRadius} 
      data-shadow-size={shadowSize}
      style={style}
    >
      { children }
    </div>
  )
}


