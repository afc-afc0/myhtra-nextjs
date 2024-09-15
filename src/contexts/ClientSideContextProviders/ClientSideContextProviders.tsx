'use client'
import { ThemeProvider } from "next-themes"
import { SessionProvider } from 'next-auth/react';

interface ClientSideContextProvidersProps {
  children: React.ReactNode
}

export const ClientSideContextProviders = ({ children } : ClientSideContextProvidersProps) => {
  return (
    <>
      <ThemeProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
