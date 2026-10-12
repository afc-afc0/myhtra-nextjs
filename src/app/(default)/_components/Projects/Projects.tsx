import { Card } from '@components/ui/Card/Card'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { projects } from '../../_content/profile'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import { Section } from '../Section/Section'

export const Projects = () => {
  return (
    <Section title="Projects">
      {projects.map((p) => (
        <Card key={p.name}>
          <FlexContainer flexDirection="row" width="100%" justifyContent="space-between" alignItems="center">
            {p.href ? (
              <ExternalLink href={p.href}>
                <Text text={p.name} type={TextType.LINK} fontSize="l" fontWeight="medium" />
              </ExternalLink>
            ) : (
              <Text text={p.name} fontSize="l" fontWeight="medium" />
            )}
            <Text text={p.status} type={TextType.HIGHLIGHT} fontSize="s" fontWeight="medium" />
          </FlexContainer>
          <RichText text={p.summary} fontSize="s" />
        </Card>
      ))}
    </Section>
  )
}
