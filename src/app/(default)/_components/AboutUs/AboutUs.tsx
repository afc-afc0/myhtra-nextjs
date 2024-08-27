import { Text } from '@components/ui/Text/Text'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { CloudSVG, KubernetesSVG, WebDevSVG } from '@components/ui/SVG/SVG'
import { FocusOnViewButton } from '../CompanyHeader/CompanyHeader'

import styles from './AboutUs.module.css'

export const AboutUs = () => {
  return (
    <PageContainer>
      <FlexContainer id='aboutUs' height='inherit' alignItems='center' justifyContent='center'>
        <Container>
          <FlexContainer width='inherit' flexDirection='column' borderWidth='m' borderRadius='m' paddingSize='s'>
            <FlexContainer flexDirection='column' gapSize='m' justifyContent='flex-start' marginBottom='m'>
              <Text fontWeight='medium' fontSize='xxxl' text='Pursuing Perfection, Project by Project.' />
              <Text fontWeight='light' fontSize='xl' text='Transforming every layer of technology, from foundational infrastructure to user-friendly interfaces, creating powerful and reliable solutions that drive innovation.' />
            </FlexContainer>
            <FlexContainer flexDirection='row' responsiveFlexDirection='column' gapSize='s'>
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
            <FlexContainer width='100%' justifyContent='flex-end' alignItems='flex-end' paddingSize='s'>
              <FocusOnViewButton elementId='profileCards' />
            </FlexContainer>
          </FlexContainer>
        </Container>
      </FlexContainer>
    </PageContainer>
  )
}

const PageContainer = ({ children } : { children: React.ReactNode }) => { 
  return (
    <div className={styles.pageContainer}>
      { children }
    </div>
  )
}

const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
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
