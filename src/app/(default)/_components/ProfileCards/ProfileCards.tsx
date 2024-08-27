'use client'
import AhmetImage from '@/public/pngs/profileImages/Ahmet.jpeg'
import Image from 'next/image'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@/components/ui/Text/Text'
import { Button } from '@/components/ui/Button/Button'
import { DownsizeSVG, ExpandSVG } from '@/components/ui/SVG/SVG'
import { ExpandableContainer, useExpandable } from '@/components/ui/Expandable/Expandable'
import { ConditionalDisplay } from '@/components/ui/ConditionalDisplay/ConditionalDisplay'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/Accordion'
import Link from 'next/link'

import styles from './ProfileCards.module.css'

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
          <Accordion type='single' collapsible>
            <AccordionItem value='Professional Summary'>
              <AccordionTrigger>
                <Text text='Professional Summary' />
              </AccordionTrigger>
              <AccordionContent>
                <Text text='Passionate software developer with more than half a decade of experience, 
                  dedicated to building secure web APIs and user-centric applications while 
                  demonstrating a proven ability to develop scalable and well-tested applications 
                  used by over 100,000+ users across the US by ensuring comprehensive authentication, 
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
                <InlineTextContainer>
                  <Text 
                    text='▪Created and maintained a custom form and workflow management application 
                           currently used by over '
                    display='inline'
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    text={'100,000+ '}
                    display='inline'
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text=' students and faculty members across various US colleges.'
                    fontSize='s'
                    fontWeight='light'
                  />
                </InlineTextContainer>
                <InlineTextContainer>
                  <Text 
                    display='inline'
                    text='▪Directed the transition of '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'20+ .NET Framework '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='applications by adopting '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'.NET 6/8 '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='and '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'Node.js '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='APIs for the backend, and integrating the UI with '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'Next.js. '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='Deployed these applications to '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'Kubernetes '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='and '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'Azure App Service '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='environments, resulting in substantial improvements in both performance, user interaction and better maintenance.'
                    fontSize='s'
                    fontWeight='light'
                  />
                </InlineTextContainer>
                <InlineTextContainer>
                  <Text 
                    display='inline'
                    text='▪Developed and implemented a robust vulnerability detection system for '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'Kubernetes '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='clusters for a leading Canadian professional services firm. The system scanned over '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'1000 '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='pods, identified and prioritized vulnerabilities by severity, automated alert notifications, and isolated over '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'200 '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='critical-risk pods, resulting in a '
                    fontSize='s'
                    fontWeight='light'
                  />
                  <Text 
                    display='inline'
                    text={'30% '}
                    fontSize='s'
                    fontWeight='medium'
                  />
                  <Text 
                    display='inline'
                    text='increase in security incident response efficiency.'
                    fontSize='s'
                    fontWeight='light'
                  />
                </InlineTextContainer>
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

const InlineTextContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.inlineTextContainer}>
      { children }
    </div>
  )
}