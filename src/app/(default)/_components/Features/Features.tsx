import Image from 'next/image'
import { Text } from '@/components/ui/Text/Text'
import { FlexContainer } from '@/components/ui/Layout/Layout'

import GameDevIcon from '@/public/icons/features-game-dev.svg'
import CloudIcon from '@/public/icons/features-cloud.svg'
import AuthIcon from '@/public/icons/features-auth.svg'
import ArchitectureIcon from '@/public/icons/features-architecture.svg'
import DockerIcon from '@/public/icons/features-docker.svg'
import WebDevIcon from '@/public/icons/features-web-dev.svg'

import styles from './Features.module.css'

export const Features = () => {
  return (
    <Container>
      <FlexContainer paddingSize='l' gapSize='s'>
        <Feature
          iconSrc={WebDevIcon}
          text='Web'
          description='We create scalable and innovative web applications designed for optimal performance and tailored to unique client needs'
        />
        <Feature
          iconSrc={CloudIcon}
          text='Cloud'
          description='Expert in Terraform, providing scalable cloud solutions with Azure, GCP, and AWS to enhance business efficiency'        
        />
        <Feature
          iconSrc={AuthIcon}
          text='Authentication'
          description='Implementing secure authentication with OAuth2, OIDC, ensuring robust protection and seamless user access'
        />
        <Feature
          iconSrc={ArchitectureIcon}
          text='Software Architecture'
          description='We focus on creating scalable and high-performance architectures, emphasizing efficiency and robust design to meet diverse business needs'
        />
        <Feature
          iconSrc={DockerIcon}
          text='Containerization'
          description='Our expertise in Docker and Kubernetes enables us to build and manage scalable, containerized applications with precision and reliability'
        />
        <Feature 
          iconSrc={GameDevIcon} 
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
  iconSrc: any
}

const Feature = ({ text, description, iconSrc } : FeatureProps) => {
  return (
    <FeatureContainer>
      <FlexContainer marginSize='none'>
        <IconContainer>
          <Icon iconSrc={iconSrc} />
        </IconContainer>
        <TextsContainer>
          <FlexContainer marginSize='none'>
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

const Icon = ({ iconSrc } : { iconSrc: string }) => {
  return (
    <div className={styles.icon}>
      <Image src={iconSrc} alt='feature star icon' width={40} height={40}  />
    </div>
  )
}

const IconContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.iconContainer}>
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