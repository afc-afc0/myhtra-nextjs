import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { projects } from '../../_content/profile'
import { Card } from '../Card/Card'

export const Projects = () => {
  return (
    <FlexContainer width="100%" gapSize="s">
      <Text text="Projects" fontSize="l" fontWeight="bold" />
      {projects.map((p) => (
        <Card key={p.name}>
          <FlexContainer flexDirection="row" width="100%" justifyContent="space-between" alignItems="center">
            <Text text={p.name} fontSize="l" fontWeight="medium" />
            <Text text={p.status} fontSize="s" fontWeight="light" />
          </FlexContainer>
          <Text text={p.summary} fontSize="s" fontWeight="light" />
        </Card>
      ))}
    </FlexContainer>
  )
}
