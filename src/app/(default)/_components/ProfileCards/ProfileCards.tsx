import AhmetImage from '@/public/pngs/profileImages/Ahmet.jpeg'
import Image from 'next/image'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@/components/ui/Text/Text'
import { Button } from '@/components/ui/Button/Button'
import { EyeSVG } from '@/components/ui/SVG/SVG'

import styles from './ProfileCards.module.css'

export const ProfileCards = () => {
  return (
    <FlexContainer height='100%' alignItems='center' justifyContent='center'>
      <Card
        name='Ahmet Cengiz'
        position='Full Stack Developer'
        info='Passionate developer with over half a decade of diverse experience, 
              creating secure web APIs and user-centric applications. 
              Proven ability to develop scalable, well-tested apps used by 50,000+ users.'
      />
    </FlexContainer>
  )
}

interface CardProps {
  name: string,
  position: string,
  info: string,
}

const Card = ({ name, position, info } : CardProps) => {
  return (
    <CardContainer>
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
        <FlexContainer width='100%' justifyContent='flex-end' alignItems='flex-start' height='100%'>
          <Button
            size='m'
            text='View'
            icon={<EyeSVG />}
          />
        </FlexContainer>
      </FlexContainer>
    </CardContainer>
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