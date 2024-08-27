import { CompanyHeader } from "./_components/CompanyHeader/CompanyHeader"
import { AboutUs } from "./_components/AboutUs/AboutUs"
import { ProfileCards } from "./_components/ProfileCards/ProfileCards"

export const metadata = {
  title: 'Myhtra',
  description: 'Myhtra Studios',
}

export default function Home() {

  return (
    <>
      <CompanyHeader />
      <AboutUs />
      <ProfileCards />
    </>
  )
}
