import { Card } from '@components/ui/Card/Card'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { experience } from '../../_content/profile'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import { Section } from '../Section/Section'

export const Experience = () => {
  return (
    <Section title="Experience">
      {experience.map((job) => (
        <Card key={job.company}>
          <FlexContainer>
            <div>
              <Text text={`${job.title} · `} fontSize="l" fontWeight="medium" display="inline" />
              <ExternalLink href={job.companyHref}>
                <Text text={job.company} type={TextType.LINK} fontSize="l" fontWeight="bold" display="inline" />
              </ExternalLink>
            </div>
            <Text text={job.dates} fontSize="s" fontWeight="light" />
          </FlexContainer>
          {job.highlights.map((h) => (
            <RichText key={h} text={`▪ ${h}`} fontSize="s" />
          ))}
        </Card>
      ))}
    </Section>
  )
}
