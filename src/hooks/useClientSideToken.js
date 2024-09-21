import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useClientSideToken = () => {
  const { data: session, status, update } = useSession()

  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [update])

  const getAccessToken = () => {
    if (status === 'unauthenticated') {
      console.warn('user is not authenticated sign in again')
      signIn("keycloak")
    } else if (status === 'loading') {
      console.warn('loading')
      return
    }

    return session?.client_access_token
  }

  return { getAccessToken }
}

