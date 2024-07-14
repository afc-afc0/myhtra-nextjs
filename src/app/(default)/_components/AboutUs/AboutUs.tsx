import { Text } from '@/components/ui/Text/Text'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { CloudSVG, KubernetesSVG, WebDevSVG } from '@/components/ui/SVG/SVG'

import styles from './AboutUs.module.css'

export const AboutUs = () => {
  return (
    <FlexContainer height='100%' alignItems='center' justifyContent='center'>
      <FlexContainer className={styles.cardWidth} flexDirection='column' borderWidth='m' paddingSize='m' shadowSize='s'>
        <FlexContainer flexDirection='column' gapSize='m' justifyContent='flex-start' marginBottom='m'>
          <Text fontWeight='medium' fontSize='xxxl' text='Pursuing Perfection, Project by Project.' />
          <Text fontWeight='light' fontSize='xl' text='Transforming every layer of technology, from foundational infrastructure to user-friendly interfaces, creating powerful and reliable solutions that drive innovation.' />
        </FlexContainer>
        <FlexContainer flexDirection='row' gapSize='s'>
          <SummaryCard 
            svg={<WebDevSVG style={{width: '3.5rem', height: '3.5rem'}}/>} 
            header='Web'
            text='Developing scalable, innovative web applications 
                  with a focus on minimalism and what’s important, 
                  seamlessly blending interactive user interfaces with reliable 
                  back-end systems to ensure smooth and efficient performance.'
          />
          <SummaryCard 
            header='Cloud'
            svg={<CloudSVG style={{width: '3.5rem', height: '3.5rem'}}/>} 
            text='We design and manage robust cloud infrastructures, 
                  ensuring scalability, security, and efficiency. 
                  Using infrastructure as code, we configure and optimize
                  cloud environments for reliable performance across various platforms.' 
          />
          <SummaryCard 
            header='Kubernetes'
            svg={<KubernetesSVG style={{width: '3.5rem', height: '3.5rem'}}/>} 
            text='We focus on deploying and managing Kubernetes clusters for scalable and
                  efficient container orchestration, while implementing advanced
                  security measures to protect your infrastructure and data.' 
          />
        </FlexContainer>
      </FlexContainer>
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
  header: string,
  text: string,
}

const SummaryCard = ({ svg, header, text } : SummaryCardProps) => {
  return (
    <SummaryCardContainer>
      <FlexContainer height='100%' paddingSize='m' borderWidth='s' borderRadius='m' >
        <SvgContainer>
          { svg }
        </SvgContainer>
        <Text
          fontWeight='medium'
          fontSize='xl'
          text={header}
        />
        <Text 
          fontWeight='light'
          fontSize='l'
          text={text}
        />
      </FlexContainer>
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
