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
    <FlexContainer flexDirection="row" responsiveFlexDirection="column" gapSize="m" borderWidth="l" borderRadius="m" paddingSize="s">
      <Image className={styles.profileImage} src={AhmetImage} alt="Ahmet Cengiz" width={120} height={120} preload />
      <FlexContainer gapSize="s">
        <Text text="Ahmet Cengiz" fontSize="xxl" fontWeight="bold" />
        <Text text="Senior Software Developer · Myhtra Studios · Toronto" fontSize="m" fontWeight="medium" />
        <Text
          text="I build web apps, cloud infrastructure and AI agents. Currently building an agentic AI platform at PwC Canada."
          fontWeight="light"
        />
        <Text text="Myhtra Studios is just me for now — new members are joining soon." fontSize="s" fontWeight="light" />
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
