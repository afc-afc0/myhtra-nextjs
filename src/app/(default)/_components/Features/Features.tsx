import Image from 'next/image'
import { Text } from '@/components/ui/Text/Text'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { ArchitectureSVG, AuthSVG, CloudSVG, DockerSVG, GameDevSVG, WebDevSVG } from '@/components/ui/SVG/SVG'

import styles from './Features.module.css'

export const Features = () => {
  return (
    <Container>
      <FlexContainer paddingSize='l' gapSize='s'>
        <Feature
          svg={<WebDevSVG />}
          text='Web'
          description='We create scalable and innovative web applications designed for optimal performance and tailored to unique client needs'
        />
        <Feature
          svg={<CloudSVG />}
          text='Cloud'
          description='Expert in Terraform, providing scalable cloud solutions with Azure, GCP, and AWS to enhance business efficiency'        
        />
        <Feature
          svg={<AuthSVG />}
          text='Authentication'
          description='Implementing secure authentication with OAuth2, OIDC, ensuring robust protection and seamless user access'
        />
        <Feature
          svg={<ArchitectureSVG />}
          text='Software Architecture'
          description='We focus on creating scalable and high-performance architectures, emphasizing efficiency and robust design to meet diverse business needs'
        />
        <Feature
          svg={<DockerSVG />}
          text='Containerization'
          description='Our expertise in Docker and Kubernetes enables us to build and manage scalable, containerized applications with precision and reliability'
        />
        <Feature 
          svg={<GameDevSVG />}
          text='Game Dev' 
          description='At the heart of our diverse tech endeavors, making games is our way of embracing the fun side of technology' 
        />
      </FlexContainer>
    </Container>
  )
}

const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}

interface FeatureProps {
  text: string,
  description: string,
  svg: JSX.Element
}

const Feature = ({ text, description, svg } : FeatureProps) => {
  return (
    <FeatureContainer>
      <FlexContainer>
        <SVGContainer>
          <SVG>
            { svg }
          </SVG>
        </SVGContainer>
        <TextsContainer>
          <FlexContainer>
            <Text text={text} fontSize='xl' fontWeight='bold' />
            <Text text={description} fontSize='m' fontWeight='light' />
          </FlexContainer>
        </TextsContainer>
      </FlexContainer>
    </FeatureContainer>
  )
}

const FeatureContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.featureContainer}>
      { children }
    </div>
  )
}

export const SVG = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.svg}>
      { children }
    </div>
  )
}

const SVGContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.svgContainer}>
      { children }
    </div>
  )
}

const TextsContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.textsContainer}>
      { children }
    </div>
  )
}