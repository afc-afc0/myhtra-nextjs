'use client'

interface ClientSideContextProvidersProps {
  children: React.ReactNode
}

export const ClientSideContextProviders = ({ children } : ClientSideContextProvidersProps) => {
  return (
    <>
      {children}
    </>
  )
}
