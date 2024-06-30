import styles from './FlexContainer.module.css'

interface FlexContainerProps {
  children: React.ReactNode,
  paddingSize?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl',
  marginSize?: 'none' | 's' | 'm' | 'l',
  gapSize?: 'none' | 's' | 'm' | 'l'
}

export const FlexContainer = ({ children, flexDirection, paddingSize = 'none', marginSize = 'none', gapSize = 'none' } : FlexContainerProps) => {
  return (
    <div className={styles.flexContainer} data-padding-size={paddingSize} data-margin-size={marginSize} data-gap-size={gapSize}>
      { children }
    </div>
  )
}

