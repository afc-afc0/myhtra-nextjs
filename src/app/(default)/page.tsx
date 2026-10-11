import type { Metadata } from 'next'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { Posts } from '@components/ui/Posts/Posts'
import { Footer } from '@components/ui/Footer/Footer'
import { Intro } from './_components/Intro/Intro'
import { GitHubRepos } from './_components/GitHubRepos/GitHubRepos'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  jobTitle: 'Senior Software Developer',
  name: 'Ahmet Cengiz',
  sameAs: ['https://github.com/afc-afc0', 'https://www.linkedin.com/in/ahmet-fatih-cengiz'],
  url: 'https://myhtra.co',
  worksFor: { '@type': 'Organization', name: 'Myhtra Studios', url: 'https://myhtra.co' }
}

export default function Home() {
  return (
    <PageContainer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <FlexContainer gapSize="l" paddingTop="m">
        <Intro />
        <FlexContainer id="github" gapSize="s">
          <Text text="GitHub" fontSize="xxxl" fontWeight="medium" />
          <GitHubRepos />
        </FlexContainer>
        <FlexContainer id="blog" gapSize="s">
          <Text text="Blog" fontSize="xxxl" fontWeight="medium" />
          <Posts />
        </FlexContainer>
        <Footer />
      </FlexContainer>
    </PageContainer>
  )
}
