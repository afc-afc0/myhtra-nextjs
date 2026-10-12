import Image from 'next/image'
import Link from 'next/link'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'

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
      backgroundColor="secondary"
      borderRadius="m"
      paddingSize="m"
    >
      <Image className={styles.profileImage} src={AhmetImage} alt="Ahmet Cengiz" width={200} height={200} preload />
      <FlexContainer gapSize="s">
        <Text text="Ahmet Cengiz" fontSize="xxl" fontWeight="bold" />
        <div>
          <Text text="Senior Software Developer, " fontWeight="medium" display="inline" />
          <Link href="https://www.pwc.com/ca/en.html" target="_blank" rel="noopener noreferrer">
            <Text text="PwC Canada" type={TextType.LINK} fontWeight="bold" display="inline" />
          </Link>
          <Text text=" · Toronto, ON" fontWeight="medium" display="inline" />
        </div>
        <RichText text="**7+ years** building web APIs, cloud infrastructure and agentic AI platforms." />
        <RichText text="I run **Myhtra Studios**." />
        <FlexContainer flexDirection="row" gapSize="s">
          {links.map((l) => (
            <Link key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.tapTarget}>
              <Text type={TextType.LINK} text={l.text} fontWeight="medium" />
            </Link>
          ))}
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}
