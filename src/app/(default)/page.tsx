import { PageContainer } from "@/components/ui/PageContainer/PageContainer"
import { Features } from "./_components/Features/Features"
import { CompanyInfo } from "./_components/CompanyInfo/CompanyInfo"
import { LayoutContentContainer } from "@/components/ui/Layout/LayoutContentContainer/LayoutContentContainer"
import { CompanyHeader } from "./_components/CompanyHeader/CompanyHeader"
import { AboutUs } from "./_components/AboutUs/AboutUs"
import { ProfileCards } from "./_components/ProfileCards/ProfileCards"

import styles from "./page.module.css"

export default function Home() {

  return (
    <>
      <CompanyHeader />
      <AboutUs />
      <ProfileCards />
      {/* <PageContainer>
        <LayoutContentContainer>
          <CompanyInfo />
          <Features />
        </LayoutContentContainer>
      </PageContainer> */}
    </>
  )
}
