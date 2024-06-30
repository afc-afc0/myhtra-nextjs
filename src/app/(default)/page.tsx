import { PageContainer } from "@/components/ui/PageContainer/PageContainer"
import { Features } from "./_components/Features/Features"
import { CompanyInfo } from "./_components/CompanyInfo/CompanyInfo"

import styles from "./page.module.css"
import { LayoutContentContainer } from "@/components/ui/Layout/LayoutContentContainer/LayoutContentContainer"

export default function Home() {
  return (
    <PageContainer>
      <LayoutContentContainer>
        <CompanyInfo />
        <Features />
      </LayoutContentContainer>
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
