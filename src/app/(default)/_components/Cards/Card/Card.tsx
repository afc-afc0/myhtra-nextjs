import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'

import styles from './Card.module.css'
import Image from 'next/image'

interface CardProps {
  borderColor: string,
  cardColor: string
}

export const Card = ({ borderColor, cardColor } : CardProps) => {
  return (
    <CardContainer>
      <InnerCardBorderContainer>
        
      </InnerCardBorderContainer>
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

const InnerCardBorderContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.innerCardBorderContainer}>
      { children }
    </div>
  )
}

const ProfileImage = ({  } : {  }) => {
  return (
    <div className={styles.profileImageContainer}>
      <Image />
    </div>
  )
}

