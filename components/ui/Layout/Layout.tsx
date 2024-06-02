import styles from './Layout.module.css'

interface FlexContainerProps {
  children: React.ReactNode,
  paddingSize?: 'none' | 's' | 'm' | 'l',
  marginSize?: 'none' | 's' | 'm' | 'l',
  gapSize?: 'none' | 's' | 'm' | 'l'
}

export const FlexContainer = ({ children, paddingSize = 'none', marginSize = 'none', gapSize = 'none' } : FlexContainerProps) => {
  return (
    <div className={styles.flexContainer} data-padding-size={paddingSize} data-margin-size={marginSize} data-gap-size={gapSize}>
      { children }
    </div>
  )
}

