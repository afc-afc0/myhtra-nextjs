'use client'

import { ThemeProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { AuthSessionProvider } from "@contexts/AuthSessionProvider/AuthSessionProvider"

interface ClientSideContextProvidersProps {
  children: React.ReactNode
}

export const ClientSideContextProviders = ({ children } : ClientSideContextProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <>
      <ThemeProvider>
        <AuthSessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AuthSessionProvider>
      </ThemeProvider>
    </>
  )
}
