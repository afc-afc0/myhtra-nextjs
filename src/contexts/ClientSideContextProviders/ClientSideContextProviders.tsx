'use client'

import { ThemeProvider } from "next-themes"
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

interface ClientSideContextProvidersProps {
  children: React.ReactNode
}

export const ClientSideContextProviders = ({ children } : ClientSideContextProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <>
      <ThemeProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
