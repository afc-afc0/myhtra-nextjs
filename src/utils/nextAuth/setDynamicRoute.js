'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// This component is used to force a refresh of the router when the server component is re
// Currently Next.js has a strange bug where the router does not update instead we use the cached value
export function SetDynamicRoute() {
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [router])

  return <></>
}
