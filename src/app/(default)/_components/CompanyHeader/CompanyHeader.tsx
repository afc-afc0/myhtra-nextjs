'use client'
import { Text } from '@/components/ui/Text/Text'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { Button } from '@/components/ui/Button/Button'
import { focusOnView } from '@/src/utils/utilityFunctions'

import styles from './CompanyHeader.module.css'
import { DownArrowSVG } from '@/components/ui/SVG/SVG'

// Bad Name?
export const CompanyHeader = () => {
  return (
    <FlexContainer id='companyHeader' height='100%' alignItems='center' justifyContent='center'>
      <Container>
        <FlexContainer shadowSize='s' paddingSize='m' borderWidth='m' height='auto' width='inherit' flexDirection='column' gapSize='s'>
          <FlexContainer marginBottom='s'>
            <Text fontWeight='bold' fontSize='xxxxl' text='Myhtra Studios' />
            <Text fontWeight='light' fontSize='xxl' text='Pursuing Perfection, Project by Project' />
          </FlexContainer>
          <FlexContainer height='auto' width='100%' flexDirection='row' justifyContent='space-between'>
            <FlexContainer height='auto' flexDirection='row' justifyContent='flex-start'  gapSize='s'>
              <Button size='m' text='About Us' onClick={(e) => focusOnView({ event: e, elementId: 'aboutUs'})} />
              {/* <Button size='m' text='Projects' /> */}
              {/* <Button size='m' text='Blog' /> */}
              <Button size='m' text='Portfolio' onClick={(e) => focusOnView({ event: e, elementId: 'profileCards'})} />
            </FlexContainer>
            <FocusOnViewButton elementId='aboutUs' />
          </FlexContainer>
        </FlexContainer>
      </Container>
    </FlexContainer>
  )
}

export const FocusOnViewButton = ({ elementId } : { elementId: string }) => {
  return (
    <Button size='m' icon={<DownArrowSVG style={{width: '28px', height: '28px'}} />} onClick={(e) => focusOnView({ event: e, elementId })} />
  )
}

const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}
