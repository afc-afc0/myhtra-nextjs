import { CompanyHeader } from './_components/CompanyHeader/CompanyHeader'
import { AboutUs } from './_components/AboutUs/AboutUs'
import { ProfileCards } from './_components/ProfileCards/ProfileCards'
import { BlogPosts } from './_components/BlogPosts/BlogPosts'

export default function Home() {
  return (
    <>
      <CompanyHeader />
      <AboutUs />
      <ProfileCards />
      <BlogPosts />
    </>
  )
}
