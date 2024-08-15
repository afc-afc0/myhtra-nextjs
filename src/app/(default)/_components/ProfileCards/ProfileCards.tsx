'use client'
import AhmetImage from '@/public/pngs/profileImages/Ahmet.jpeg'
import Image from 'next/image'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@/components/ui/Text/Text'
import { Button } from '@/components/ui/Button/Button'
import { DownsizeSVG, ExpandSVG } from '@/components/ui/SVG/SVG'
import { ExpandableContainer, useExpandable } from '@/components/ui/Expandable/Expandable'
import { ConditionalDisplay } from '@/components/ui/ConditionalDisplay/ConditionalDisplay'

import styles from './ProfileCards.module.css'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/Accordion'

export const ProfileCards = () => {
  const { isExpanded, toggle } = useExpandable({ initialState: false })
  
  return (
    <FlexContainer id='profileCards' height='100%' alignItems='center' justifyContent='center'>
      <ExpandableContainer isExpanded={isExpanded} initialSize={styles.cardContainer} transitionSize={styles.cardContainerExpanded}>
        <ConditionalDisplay condition={!isExpanded}>
          <Card
            name='Ahmet Cengiz'
            position='Full Stack Developer'
            info='Passionate developer with over half a decade of diverse experience, 
                  creating secure web APIs and user-centric applications. 
                  Proven ability to develop scalable, well-tested apps used by 100,000+ users.'
            isExpanded={isExpanded}
            toggleExpanded={toggle}
          />
        </ConditionalDisplay>
        <ConditionalDisplay condition={isExpanded}>
          <CardExpended />
        </ConditionalDisplay>
      </ExpandableContainer>
    </FlexContainer>
  )
}

interface CardProps {
  name: string,
  position: string,
  info: string,
  isExpanded: boolean,
  toggleExpanded?: () => void
}

const Card = ({ name, position, info, isExpanded, toggleExpanded  } : CardProps) => {
  return (
    <FlexContainer width='inherit' height='inherit' borderWidth='l' borderRadius='m' paddingSize='s'>
      <FlexContainer marginBottom='s'>
        <ProfileImage />
      </FlexContainer>
      <FlexContainer>
        <Text text={name} fontSize='l' fontWeight='bold' />
      </FlexContainer>
      <FlexContainer marginBottom='s'>
        <Text text={position} fontSize='m' fontWeight='medium' />
      </FlexContainer>
      <FlexContainer>
        <Text 
          text={info}
          fontWeight='light'
        />
      </FlexContainer>
      <FlexContainer width='100%' justifyContent='flex-end' alignItems='flex-end' height='100%'>
        <Button
          size='l'
          icon={!isExpanded ? <ExpandSVG /> : <DownsizeSVG />}
          onClick={toggleExpanded}
        />
      </FlexContainer>
    </FlexContainer>
  )
}

const ProfileImage = ({  } : {  }) => {
  return (
    <Image
      className={styles.profileImage}
      src={AhmetImage}
      alt='Ahmet'
      width={200}
      height={200}
    />
  )
}

interface CardExpendedProps {

}
 
const CardExpended = ({} : CardExpendedProps) => {
  
  return (
    <FlexContainer width='inherit' height='inherit' borderWidth='l' borderRadius='m' paddingSize='s'>
      <FlexContainer marginBottom='s'>
        <ProfileImage />
      </FlexContainer>
      <FlexContainer width='100%'>
        <Text text='Ahmet Cengiz' fontSize='l' fontWeight='bold' />
        <Text text='Software Developer' fontSize='m' fontWeight='medium' />
        <Text text='Toronto, ON' fontSize='m' fontWeight='medium' />
        <FlexContainer marginBottom='s' flexDirection='row'>
          <ExpendedCardSocialLinks text='Email' href='mailto:ahmet_fatih_cengiz@hotmail.com' />
          <ExpandedCardSocialLinksSeparator />
          <ExpendedCardSocialLinks text='GitHub' href='http://www.github.com/afc-afc0' />
          <ExpandedCardSocialLinksSeparator />
          <ExpendedCardSocialLinks text='LinkedIn' href='http://www.linkedin.com/in/ahmet-fatih-cengiz' />
        </FlexContainer>
        <FlexContainer width='100%' height='100%'>
          <Accordion type='multiple'>
            <AccordionItem value="Professional Summary">
              <AccordionTrigger>
                <Text text='Professional Summary' />
              </AccordionTrigger>
              <AccordionContent>
                <Text text='Passionate software developer with more than half a decade of experience, 
                  dedicated to building secure web APIs and user-centric applications while 
                  demonstrating a proven ability to develop scalable and well-tested applications 
                  used by over 100,000 users across the US by ensuring comprehensive authentication, 
                  authorization, efficient cloud environments, and automated CI/CD processes for 
                  seamless software delivery, additionally creating a production system 
                  for scanning and identifying vulnerabilities in hundreds of Kubernetes 
                  pods enhancing overall security and reliability.'
                  fontSize='s'
                  fontWeight='light'
                />
              </AccordionContent>  
            </AccordionItem>
            <AccordionItem value='Key Achievements'>
              <AccordionTrigger>
                <Text text='Key Achievements' />
              </AccordionTrigger>
              <AccordionContent>
                <Text text='▪Created and maintained a custom form and workflow management application 
                  currently used by over 100,000 students and faculty members across various US colleges.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text text='▪Directed the transition of 20 .NET Framework applications by adopting .NET 6/8
                  and Node.js APIs for the backend, and integrating the UI with Next.js. 
                  Deployed these applications to Kubernetes and Azure App Service environments,
                  resulting in substantial improvements in both performance, user interaction 
                  and better maintenance.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text text='▪Developed and implemented a robust vulnerability detection system for Kubernetes
                  clusters for a leading Canadian professional services firm. The system scanned 
                  over 1000 pods, identified and prioritized vulnerabilities by severity, 
                  automated alert notifications, and isolated over 200 critical-risk pods, 
                  resulting in a 30% increase in security incident response efficiency.'
                  fontSize='s'
                  fontWeight='light'
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='Experience'>
              <AccordionTrigger>
                <Text text='Experience' />
              </AccordionTrigger>
              <AccordionContent>
                <Text 
                  text='Synoptek' 
                />
                <Text 
                  text='Software Developer II-III' 
                  fontSize='s' 
                />
                <Text 
                  text='Toronto, ON' 
                  fontSize='s' 
                  fontWeight='light' 
                />
                <Text 
                  text='April 2022 - Present' 
                  fontSize='s' 
                  fontWeight='light' 
                />
                <Text 
                  text='▪ Directed the transition of 20 legacy .NET Framework applications, adopting to .NET 6/8 and Node.js for backend services. Modernized the user interface with React using the Next.js framework and developed a centralized, reusable React component library shared across different applications, ensuring alignment with brand guidelines.' 
                  fontSize='s'
                  fontWeight='light'
                />
                <Text 
                  text='▪ Implemented authentication and authorization and Single Sign On (SSO) for Next.js, Node.js, and .NET applications using Microsoft Entra ID (formerly Azure AD), resulting in enhanced security and streamlined access management.' 
                  fontSize='s'
                  fontWeight='light'
                />
                <Text
                  text='▪ Developed and maintained Continuous Integration and Continuous Delivery (CI/CD) pipelines for Next.js, .NET, and Node.js applications, using Azure DevOps and GitHub Actions, facilitating efficient deployment to Azure App Services, IIS servers and Kubernetes.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text 
                  text='▪ Developed and implemented efficient database solutions by leveraging Object-Relational Mappers (EF Core, Dapper, Prisma) and raw SQL to optimize data storage and retrieval in PostgreSQL and SQL Server.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text
                  text='▪ Utilized MongoDB for document storage, enhancing overall database performance and scalability.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text
                  text='▪ Integrated Swagger for consistent API documentation across multiple frameworks.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text
                  text='▪ Designed and implemented robust authentication and authorization mechanisms for the Kubernetes API Server using OpenID Connect (OIDC) with Microsoft Entra ID, ensuring secure and scalable identity management and access control across the cluster.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text
                  text='▪ Utilized Helm charts for efficient and reusable deployments, including deployments for .NET, Node.js, and RabbitMQ applications.'
                  fontSize='s'
                  fontWeight='light'
                />
                <Text
                  text='▪ Deployed Prometheus within a Kubernetes environment for real-time monitoring and alerting, enhancing cluster oversight and incident response.'
                  fontSize='s'
                  fontWeight='light'
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

const ExpandedCardSocialLinksSeparator = ({}) => {
  return (
    <Text text={'\u00A0\u00A0|\u00A0\u00A0'} fontWeight='medium' />
  )
}

const ExpendedCardSocialLinks = ({ href, text } : { href: string, text: string }) => {
  return (
    <Link target='_blank' rel='noopener noreferrer' href={href}>
      <Text type={TextType.LINK} text={text} fontWeight='medium' />
    </Link>
  )
}