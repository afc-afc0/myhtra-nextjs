'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { SessionProvider, useSession, signOut } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { keycloakSessionLogOut } from '@components/ui/Auth/AuthController/AuthController'

const UserInfoContext = createContext<any>(null)

export const AuthSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchInterval={12 * 60} refetchOnWindowFocus>
      <GlobalSessionHandler>{children}</GlobalSessionHandler>
    </SessionProvider>
  )
}

const GlobalSessionHandler = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  const fetchUserInfo = async () => {
    const response = await fetch('/api/user')

    if (!response.ok) {
      throw new Error('Failed to fetch user info')
    }

    const data = await response.json()
    return data
  }

  const { data: userInfo } = useQuery({
    enabled: status === 'authenticated',
    queryFn: fetchUserInfo,
    queryKey: ['userInfo', session?.user?.id]
  })

  useEffect(() => {
    const handleSignOut = async () => {
      await keycloakSessionLogOut()
      await signOut({ redirect: false })
    }

    if (session?.error === 'RefreshAccessTokenError') {
      handleSignOut()
    }
  }, [session, status])

  return <UserInfoContext.Provider value={userInfo}>{children}</UserInfoContext.Provider>
}

// Custom hook to use the user info
export const useUserInfo = () => {
  const context = useContext(UserInfoContext)
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a AuthSessionProvider')
  }
  return context
}
