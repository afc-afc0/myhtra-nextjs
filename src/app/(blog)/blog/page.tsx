'use client'

import { useEffect } from "react"
import { useClientSideToken } from '../../../hooks/useClientSideToken';

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export default function Home() {
  const { getAccessToken } = useClientSideToken()

  useEffect(() => {
    const fetchData = async () => {
      
      const accessToken = getAccessToken()
      if (!accessToken) {
        return
      }

      const response = await fetch(`${api}/Post`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch error: ' + response.statusText)
      }

      const data = await response.json()
    }

    try {
      fetchData()
    }
    catch (error) {
      console.error(error)
    }
  }, [getAccessToken])

  return (  
    <>

    </>
  )
}