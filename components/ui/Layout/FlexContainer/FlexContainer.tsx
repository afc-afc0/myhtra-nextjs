import styles from './FlexContainer.module.css'

interface FlexContainerProps {
  children: React.ReactNode,
  flexDirection?: 'row' | 'column',
  paddingSize?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',
  gapSize?: 'none' | 's' | 'm' | 'l',
  height?: '100%' | 'auto',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  alignItems?: 'flex-start' | 'flex-end' | 'center' 
}

export const FlexContainer = ({ 
  children, 
  flexDirection = 'column', 
  paddingSize = 'none', 
  gapSize = 'none', 
  height = 'auto', 
  justifyContent = 'flex-start',
  alignItems = 'flex-start'
} : FlexContainerProps) => {
  return (
    <div 
      className={styles.flexContainer} 
      data-padding-size={paddingSize} 
      data-gap-size={gapSize} 
      data-flex-direction={flexDirection}
      data-height={height}
      data-justify-content={justifyContent}
      data-align-items={alignItems}
    >
      { children }
    </div>
  )
}
