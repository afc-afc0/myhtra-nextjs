'use client'

import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Posts } from '../_components/Posts/Posts'

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export default function Home() {
  const { data: session } = useSession()

  const fetchAllPosts = async () => {  
    const response = await fetch(`/api/Post`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  
    if (!response.ok) {
      throw new Error('Failed to fetch error: ' + response.statusText)
    }
  
    const data = await response.json()
    return data ?? []
  }

  const { data } = useQuery({ queryKey: ['posts'], queryFn: fetchAllPosts, enabled: !!session })

  return (
    <PageContainer> 
      <Posts posts={data?.posts ?? []} />
    </PageContainer>
  )
}
