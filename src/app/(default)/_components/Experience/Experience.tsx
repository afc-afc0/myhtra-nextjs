import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { experience } from '../../_content/profile'
import { Card } from '../Card/Card'

export const Experience = () => {
  return (
    <FlexContainer width="100%" gapSize="s">
      <Text text="Experience" fontSize="l" fontWeight="bold" />
      {experience.map((job) => (
        <Card key={job.company}>
          <FlexContainer>
            <div>
              <Text text={`${job.title} · `} fontSize="l" fontWeight="medium" display="inline" />
              <Text text={job.company} type={TextType.HIGHLIGHT} fontSize="l" fontWeight="bold" display="inline" />
            </div>
            <Text text={job.dates} fontSize="s" fontWeight="light" />
          </FlexContainer>
          {job.highlights.map((h) => (
            <RichText key={h} text={`▪ ${h}`} fontSize="s" />
          ))}
        </Card>
      ))}
    </FlexContainer>
  )
}
