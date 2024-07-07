import { Text } from '@/components/ui/Text/Text'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { Border } from '@/components/ui/Layout/Border/Border'
import { CloudSVG } from '@/components/ui/SVG/SVG'

import styles from './AboutUs.module.css'

export const AboutUs = () => {
  return (
    <FlexContainer height='100%' alignItems='center' justifyContent='center'>
      <ContentContainer>
        <FlexContainer flexDirection='column' gapSize='m' justifyContent='flex-start'>
          <Text fontWeight='medium' fontSize='xxxl' text='Pursuing Perfection, Project by Project.' />
          <Text fontWeight='light' fontSize='xl' text='Transforming every layer of technology, from foundational infrastructure to user-friendly interfaces, creating powerful and reliable solutions that drive innovation.' />
        </FlexContainer>
        <FlexContainer>
          <SummaryCard svg={<CloudSVG />} text='Some texasedasdasdasdasdasdsadasdsasdasdawddss' />
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

interface SummaryCardProps {
  svg: JSX.Element,
  text: string,
}

const SummaryCard = ({ svg, text } : SummaryCardProps) => {
  return (
    <SummaryCardContainer>
      <Border borderWidth='s'>
        <FlexContainer height='100%'>
          <SvgContainer>
            { svg }
          </SvgContainer>
          <Text text='text' />
        </FlexContainer>
      </Border>
    </SummaryCardContainer>
  )
}

const SummaryCardContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.summaryCardContainer}>
      { children }
    </div>
  )
}

const SvgContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.svgContainer}>
      { children }
    </div>
  )
}
