import { PageContainer } from "@/components/ui/PageContainer/PageContainer"
import { Text } from "@/components/ui/Text/Text"
import { Features } from "./_components/Features/Features"
import { CompanyInfo } from "./_components/CompanyInfo/CompanyInfo"

import styles from "./page.module.css"

export default function Home() {
  return (
    <PageContainer>
      <Container>
        <MiddleSectionContainer>
          <CompanyInfo />
          <Features />
          <Introduction />
        </MiddleSectionContainer>
      </Container>
    </PageContainer>
  )
}

const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}

const MiddleSectionContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.middleSectionContainer}>
      { children }
    </div>
  )
}

const Introduction = () => {
  return (
    <div className={styles.introductionContainer}>
      <Text fontSize='xxl' fontWeight='bold' text='Pursuing the Perfection' />
    </div>
  )
}



