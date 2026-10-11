import { CompanyHeader } from './_components/CompanyHeader/CompanyHeader'
import { AboutUs } from './_components/AboutUs/AboutUs'
import { ProfileCards } from './_components/ProfileCards/ProfileCards'
import { BlogPosts } from './_components/BlogPosts/BlogPosts'
// PROTOTYPE — three homepage UI variants on `/`, switchable via `?variant=` (current | A | B | C | D).
import { VariantA, variantAName } from './_prototype/VariantA'
import { VariantB, variantBName } from './_prototype/VariantB'
import { VariantC, variantCName } from './_prototype/VariantC'
import { VariantD, variantDName } from './_prototype/VariantD'
import { PrototypeSwitcher } from '@components/ui/PrototypeSwitcher/PrototypeSwitcher'

const variants = [
  { key: 'current', name: 'Current site' },
  { key: 'A', name: variantAName },
  { key: 'B', name: variantBName },
  { key: 'C', name: variantCName },
  { key: 'D', name: variantDName }
]

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { variant = 'current' } = await searchParams

  return (
    <>
      {variant === 'current' && (
        <>
          <CompanyHeader />
          <AboutUs />
          <ProfileCards />
          <BlogPosts />
        </>
      )}
      {variant === 'A' && <VariantA />}
      {variant === 'B' && <VariantB />}
      {variant === 'C' && <VariantC />}
      {variant === 'D' && <VariantD />}
      <PrototypeSwitcher variants={variants} current={typeof variant === 'string' ? variant : 'current'} />
    </>
  )
}
