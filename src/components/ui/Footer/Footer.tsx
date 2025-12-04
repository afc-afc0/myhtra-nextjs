import React from 'react'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'

export const Footer = ({}) => {
  return (
    <FlexContainer width="100%" paddingSize="m">
      <Text fontSize="s" fontWeight="light" text="Powered by Next.js 16, deployed on Azure Kubernetes Service | Myhtra Studios" />
    </FlexContainer>
  )
}
