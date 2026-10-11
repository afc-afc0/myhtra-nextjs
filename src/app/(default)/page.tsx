import type { Metadata } from 'next'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { Posts } from '@components/ui/Posts/Posts'
import { Footer } from '@components/ui/Footer/Footer'
import { Intro } from './_components/Intro/Intro'
import { Experience } from './_components/Experience/Experience'
import { Achievements } from './_components/Achievements/Achievements'
import { Projects } from './_components/Projects/Projects'
import { GitHubContributions } from './_components/GitHubContributions/GitHubContributions'

import styles from './page.module.css'

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
      <FlexContainer width="100%" gapSize="l" paddingTop="m" paddingBottom="m">
        <Intro />
        <div className={styles.columns}>
          <Experience />
          <FlexContainer width="100%" gapSize="l">
            <Achievements />
            <Projects />
          </FlexContainer>
        </div>
        <FlexContainer id="github" width="100%" gapSize="s">
          <Text text="GitHub contributions" fontSize="l" fontWeight="bold" />
          <GitHubContributions />
        </FlexContainer>
        <FlexContainer id="blog" width="100%" gapSize="s">
          <Text text="Blog" fontSize="l" fontWeight="bold" />
          <Posts />
        </FlexContainer>
        <Footer />
      </FlexContainer>
    </PageContainer>
  )
}
