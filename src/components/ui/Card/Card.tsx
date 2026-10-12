import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'

// The one card style on the site: filled surface, medium radius and padding. Layout props can be overridden.
export const Card = ({ children, ...props }: React.ComponentProps<typeof FlexContainer>) => {
  return (
    <FlexContainer width="100%" backgroundColor="secondary" borderRadius="m" paddingSize="m" gapSize="s" {...props}>
      {children}
    </FlexContainer>
  )
}
