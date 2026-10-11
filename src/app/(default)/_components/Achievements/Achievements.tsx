import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { achievements } from '../../_content/profile'
import { Card } from '../Card/Card'

export const Achievements = () => {
  return (
    <FlexContainer width="100%" gapSize="s">
      <Text text="Key achievements" fontSize="l" fontWeight="bold" />
      <Card>
        {achievements.map((a) => (
          <RichText key={a} text={`▪ ${a}`} fontSize="s" />
        ))}
      </Card>
    </FlexContainer>
  )
}
