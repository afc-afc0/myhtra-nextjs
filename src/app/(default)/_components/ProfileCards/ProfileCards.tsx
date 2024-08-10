'use client'
import AhmetImage from '@/public/pngs/profileImages/Ahmet.jpeg'
import Image from 'next/image'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@/components/ui/Text/Text'
import { Button } from '@/components/ui/Button/Button'
import { DownsizeSVG, ExpandSVG } from '@/components/ui/SVG/SVG'
import { ExpandableContainer, useExpandable } from '@/components/ui/Expandable/Expandable'

import styles from './ProfileCards.module.css'
import { ConditionalDisplay } from '@/components/ui/ConditionalDisplay/ConditionalDisplay'

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

const CardContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.cardContainer}>
      { children }
    </div>
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