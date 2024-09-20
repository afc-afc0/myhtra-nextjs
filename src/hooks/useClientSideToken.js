import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useClientSideToken = () => {
  const { data: session, status, update } = useSession()
  console.log('session', session)

   useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [update])

  useEffect(() => {
    const visibilityHandler = () =>
      document.visibilityState === "visible" && update()
    window.addEventListener("visibilitychange", visibilityHandler, false)
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false)
  }, [update])

  const getAccessToken = () => {
    if (status === 'unauthenticated') {
      console.warn('user is not authenticated sign in again')
      signIn("keycloak")
    } else if (status === 'loading') {
      console.warn('loading')
      return
    }

    return session?.access_token
  }

  return { getAccessToken }
}

