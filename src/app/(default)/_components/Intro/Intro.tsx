import Image from 'next/image'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import { Card } from '@components/ui/Card/Card'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { currentRole, links } from '../../_content/profile'
import { ExternalLink } from '../ExternalLink/ExternalLink'

import styles from './Intro.module.css'

const contactLinks = [
  { href: links.email, text: 'Email' },
  { href: links.github, text: 'GitHub' },
  { href: links.linkedin, text: 'LinkedIn' }
]

export const Intro = () => {
  return (
    <Card flexDirection="row" responsiveFlexDirection="column" gapSize="m">
      <Image className={styles.profileImage} src={AhmetImage} alt="Ahmet Cengiz" width={200} height={200} preload />
      <FlexContainer gapSize="s">
        <Text text="Ahmet Cengiz" fontSize="xxl" fontWeight="bold" />
        <div>
          <Text text={`${currentRole.title}, `} fontWeight="medium" display="inline" />
          <ExternalLink href={currentRole.companyHref}>
            <Text text={currentRole.company} type={TextType.LINK} fontWeight="bold" display="inline" />
          </ExternalLink>
          <Text text=" · Toronto, ON" fontWeight="medium" display="inline" />
        </div>
        <RichText text="**7+ years** building web APIs, cloud infrastructure and IAM. Now focused on **agentic AI** platforms." />
        <RichText text="I run **Myhtra Studios**." />
        <FlexContainer flexDirection="row" gapSize="s">
          {contactLinks.map((l) => (
            <ExternalLink key={l.text} href={l.href} tapTarget>
              <Text type={TextType.LINK} text={l.text} fontWeight="medium" />
            </ExternalLink>
          ))}
        </FlexContainer>
      </FlexContainer>
    </Card>
  )
}
