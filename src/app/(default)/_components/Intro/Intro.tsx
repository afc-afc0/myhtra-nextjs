import Image from 'next/image'
import Link from 'next/link'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'

import styles from './Intro.module.css'

const links = [
  { href: 'mailto:ahmet_fatih_cengiz@hotmail.com', text: 'Email' },
  { href: 'https://github.com/afc-afc0', text: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ahmet-fatih-cengiz', text: 'LinkedIn' }
]

export const Intro = () => {
  return (
    <FlexContainer
      width="100%"
      flexDirection="row"
      responsiveFlexDirection="column"
      gapSize="m"
      borderWidth="s"
      borderRadius="s"
      paddingSize="s"
    >
      <Image className={styles.profileImage} src={AhmetImage} alt="Ahmet Cengiz" width={120} height={120} preload />
      <FlexContainer gapSize="s">
        <Text text="Ahmet Cengiz" fontSize="xxl" fontWeight="bold" />
        <Text text="Senior Software Developer, PwC Canada · Toronto, ON" fontSize="m" fontWeight="medium" />
        <Text text="7+ years building web APIs, cloud infrastructure and agentic AI platforms." fontWeight="light" />
        <Text text="Founder, Myhtra Studios." fontWeight="light" />
        <FlexContainer flexDirection="row" gapSize="s">
          {links.map((l) => (
            <Link key={l.text} href={l.href} target="_blank" rel="noopener noreferrer">
              <Text type={TextType.LINK} text={l.text} fontWeight="medium" />
            </Link>
          ))}
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}
