import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'

// A homepage block: small bold label, then its content.
export const Section = ({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) => {
  return (
    <FlexContainer id={id} width="100%" gapSize="s">
      <Text text={title} fontSize="l" fontWeight="bold" />
      {children}
    </FlexContainer>
  )
}
