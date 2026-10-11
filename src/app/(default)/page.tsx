import type { Metadata } from 'next'
import { Hero } from './_components/Hero/Hero'
import { ProofBar } from './_components/ProofBar/ProofBar'
import { Services } from './_components/Services/Services'
import { SelectedWork } from './_components/SelectedWork/SelectedWork'
import { TrackRecord } from './_components/TrackRecord/TrackRecord'
import { Process } from './_components/Process/Process'
import { BuiltHere } from './_components/BuiltHere/BuiltHere'
import { Studio } from './_components/Studio/Studio'
import { Writing } from './_components/Writing/Writing'
import { ClosingCta } from './_components/ClosingCta/ClosingCta'
import { Footer } from '@components/ui/Footer/Footer'
import { founder, motto } from './_content/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': 'https://myhtra.co/#studio',
      '@type': 'ProfessionalService',
      address: { '@type': 'PostalAddress', addressCountry: 'CA', addressLocality: 'Toronto' },
      founder: { '@id': 'https://myhtra.co/#founder' },
      name: 'Myhtra Studios',
      slogan: motto,
      url: 'https://myhtra.co'
    },
    {
      '@id': 'https://myhtra.co/#founder',
      '@type': 'Person',
      jobTitle: founder.role,
      name: founder.name,
      sameAs: founder.links.filter((l) => l.href.startsWith('https')).map((l) => l.href),
      worksFor: { '@id': 'https://myhtra.co/#studio' }
    },
    {
      '@id': 'https://myhtra.co/#website',
      '@type': 'WebSite',
      name: 'Myhtra Studios',
      publisher: { '@id': 'https://myhtra.co/#studio' },
      url: 'https://myhtra.co'
    }
  ]
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <main>
        <Hero />
        <ProofBar />
        <Services />
        <SelectedWork />
        <TrackRecord />
        <Process />
        <BuiltHere />
        <Studio />
        <Writing />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
