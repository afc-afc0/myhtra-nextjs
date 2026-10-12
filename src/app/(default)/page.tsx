import type { Metadata } from 'next'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Posts } from '@components/ui/Posts/Posts'
import { Footer } from '@components/ui/Footer/Footer'
import { Intro } from './_components/Intro/Intro'
import { Experience } from './_components/Experience/Experience'
import { Achievements } from './_components/Achievements/Achievements'
import { Projects } from './_components/Projects/Projects'
import { GitHubContributions } from './_components/GitHubContributions/GitHubContributions'
import { Section } from './_components/Section/Section'
import { currentRole, links } from './_content/profile'
import { siteUrl } from '@utils/site/site'

import styles from './page.module.css'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  jobTitle: currentRole.title,
  name: 'Ahmet Cengiz',
  sameAs: [links.github, links.linkedin],
  url: siteUrl,
  worksFor: { '@type': 'Organization', name: currentRole.company, url: currentRole.companyHref }
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
        <Section id="blog" title="Blog">
          <Posts />
        </Section>
        <GitHubContributions />
        <Footer />
      </FlexContainer>
    </PageContainer>
  )
}
