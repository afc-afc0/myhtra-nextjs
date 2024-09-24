'use client'

import { keycloakSessionLogOut } from '@components/ui/Auth/AuthController/AuthController'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const useClientSideToken = () => {
  const { data: session, status, update } = useSession()

  useEffect(() => {
    const handleSignOut = async () => {
      await keycloakSessionLogOut()
      await signOut({ redirect: false, callbackUrl: "/" })
    }

    // 'RefreshAccessTokenError' should be in sync between backend AuthErrors
    if (session?.error === 'RefreshAccessTokenError') {
      handleSignOut() 
    }
  }, [session])

  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [update])

  const getAccessToken = () => {
    if (status === 'unauthenticated') {
      console.warn('user is not authenticated sign in again')
    } else if (status === 'loading') {
      console.warn('loading')
      return
    }

    return session?.client_access_token
  }

  return { getAccessToken }
}

