import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'

// The one card style on the homepage — same border, radius and padding as the blog post cards.
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlexContainer width="100%" borderWidth="s" borderRadius="s" paddingSize="s" gapSize="s">
      {children}
    </FlexContainer>
  )
}
