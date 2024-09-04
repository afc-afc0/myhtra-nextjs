'use client'
import { ThemeProvider } from "next-themes"

interface ClientSideContextProvidersProps {
  children: React.ReactNode
}

export const ClientSideContextProviders = ({ children } : ClientSideContextProvidersProps) => {
  return (
    <>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </>
  )
}