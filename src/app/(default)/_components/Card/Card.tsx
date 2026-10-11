import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'

// The one card style on the homepage — same surface, radius and padding as the blog post cards.
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlexContainer width="100%" backgroundColor="secondary" borderRadius="m" paddingSize="m" gapSize="s">
      {children}
    </FlexContainer>
  )
}
