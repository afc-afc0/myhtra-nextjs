'use client'
import { Text } from '@/components/ui/Text/Text'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'

import styles from './CompanyHeader.module.css'

// Bad Name?
export const CompanyHeader = () => {
  return (
    <FlexContainer height='100%' alignItems='center' justifyContent='center'>
      <ContentContainer>
        <FlexContainer shadowSize='m' paddingSize='m' height='auto' width='inherit' flexDirection='column' gapSize='s'>
          <FlexContainer marginBottom='m'>
            <Text fontWeight='bold' fontSize='xxxxl' text='Mythra Studios' />
            <Text fontWeight='light' fontSize='xxl' text='Pursuing Perfection, Project by Project' />
          </FlexContainer>
          <FlexContainer height='auto' flexDirection='row' gapSize='l'>
            <Text fontWeight='light' fontSize='l' text='About us' />
            <Text fontWeight='light' fontSize='l' text='Blog' />
            <Text fontWeight='light' fontSize='l' text='Projects' />
            <Text fontWeight='light' fontSize='l' text='Developers' />
          </FlexContainer>
        </FlexContainer>
      </ContentContainer>
    </FlexContainer>
  )
}

const ContentContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.contentContainer}>
      { children }
    </div>
  )
}
