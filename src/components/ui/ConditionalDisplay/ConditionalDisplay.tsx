import React from 'react'

interface ConditionalDisplayProps {
  key?: any
  condition: boolean
  children: React.ReactNode
}

export const ConditionalDisplay = ({ key, condition = false, children }: ConditionalDisplayProps) => {
  if (!condition) return null

  return <React.Fragment key={key}>{children}</React.Fragment>
}
