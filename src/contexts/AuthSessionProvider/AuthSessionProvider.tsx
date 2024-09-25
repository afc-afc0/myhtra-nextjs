'use client'

import { SessionProvider } from "next-auth/react"
import { keycloakSessionLogOut } from '@components/ui/Auth/AuthController/AuthController'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const AuthSessionProvider = ({ children } : { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchInterval={12 * 60} refetchOnWindowFocus>
      <GlobalSessionHandler>
        {children}
      </GlobalSessionHandler>
    </SessionProvider>
  )
}

// Logics for handling global session and what will happen when we got an error
const GlobalSessionHandler = ({ children } : { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleSignOut = async () => {
      await keycloakSessionLogOut() // Make sure this function is imported or defined
      await signOut({ redirect: false })
    }

    if (session?.error === 'RefreshAccessTokenError') {
      handleSignOut()
    }
  }, [session, status])

  return children
}
