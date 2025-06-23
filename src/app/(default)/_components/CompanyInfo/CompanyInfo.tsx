import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { CheckWithCircleSVG } from '@components/ui/SVG/SVG'
import { SVG } from '../Features/Features'

import styles from './CompanyInfo.module.css'

export const CompanyInfo = () => {
  return (
    <FlexContainer height="100%" alignItems="center" justifyContent="center">
      <Container>
        <TextsContainer>
          <FlexContainer gapSize="l">
            <Text
              fontSize="m"
              fontWeight="light"
              text="At Myhtra Studios, perfection is our goal, ensuring exceptional results in every project. Our dynamic team of tech enthusiasts excels in DevOps, cloud solutions, and web development. We aim to revolutionize the tech industry with efficient and perfectly functioning applications. By eliminating unnecessary complexity, we create robust and user-friendly software. Our expertise includes scalable web applications, Terraform cloud solutions, secure authentication with OAuth2 and OIDC, and high-performance software architectures. We also embrace the fun side of technology through game development"
            />
            <FlexContainer gapSize="s">
              <BulletPoint
                header="Pursuit of Perfection"
                text="For us, every project is a testament to our dedication with the goal of achieving perfection and delivering exceptional results"
              />
              <BulletPoint
                header="United by Technology"
                text="A dynamic team of friends with a common enthusiasm for tech innovation, proficient in DevOps, cloud solutions, web development"
              />
              <BulletPoint
                header="Excellence and Efficiency Combined"
                text="We aim to transform the technology industry by creating applications that are not just perfect in function but also computing effective"
              />
              <BulletPoint
                header="Eliminating Complexity"
                text="We focus on delivering software that is both robust and user-friendly by eliminating any unnecessary complexity"
              />
            </FlexContainer>
          </FlexContainer>
        </TextsContainer>
      </Container>
    </FlexContainer>
  )
}

interface BulletPointProps {
  text: string
  header: string
}

export const BulletPoint = ({ text, header }: BulletPointProps) => {
  return (
    <BulletPointContainer>
      <FlexContainer flexDirection="row">
        <BulletPointIconContainer>
          <SVG>
            <CheckWithCircleSVG />
          </SVG>
        </BulletPointIconContainer>
        <BullerPointTextsContainer>
          <FlexContainer gapSize="s">
            <Text fontSize="l" fontWeight="medium" text={header} />
            <Text fontSize="m" fontWeight="light" text={text} />
          </FlexContainer>
        </BullerPointTextsContainer>
      </FlexContainer>
    </BulletPointContainer>
  )
}

const BulletPointIconContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.bulletPointIconContainer}>{children}</div>
}

const BullerPointTextsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.bulletPointTextsContainer}>{children}</div>
}

const BulletPointContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.bulletPointContainer}>{children}</div>
}

const TextsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.textsContainer}>{children}</div>
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>
}

const CompanyInfoImageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.imageContainer}>{children}</div>
}
