'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useClientSideToken } from '../../../hooks/useClientSideToken';

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export default function Home() {
  const { getAccessToken } = useClientSideToken()

  useEffect(() => {
    const fetchData = async () => {
      
      const accessToken = getAccessToken()
      console.log('accessToken = ', accessToken)
      const response = await fetch(`api/Post`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })

      const data = await response.json()
    }

    fetchData()
  }, [getAccessToken])

  return (  
    <>

    </>
  )
}