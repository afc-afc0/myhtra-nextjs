import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { experience } from '../../_content/profile'
import { Card } from '../Card/Card'

export const Experience = () => {
  return (
    <FlexContainer width="100%" gapSize="s">
      <Text text="Experience" fontSize="l" fontWeight="bold" />
      {experience.map((job) => (
        <Card key={job.company}>
          <FlexContainer>
            <Text text={`${job.title} · ${job.company}`} fontSize="l" fontWeight="medium" />
            <Text text={job.dates} fontSize="s" fontWeight="light" />
          </FlexContainer>
          {job.highlights.map((h) => (
            <Text key={h} text={`▪ ${h}`} fontSize="s" fontWeight="light" />
          ))}
        </Card>
      ))}
    </FlexContainer>
  )
}
