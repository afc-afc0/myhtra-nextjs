

interface ServerSideContextProvidersProps {
  children: React.ReactNode
}

export const ServerSideContextProviders = ({ children } : ServerSideContextProvidersProps) => {

  return (
    <>
      {children}
    </>       
  )
}