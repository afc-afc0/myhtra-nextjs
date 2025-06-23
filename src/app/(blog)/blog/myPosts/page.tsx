'use client'

import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { useQuery } from '@tanstack/react-query'
import { Post } from '../../../../components/ui/Posts/Posts'
import { CreatePostDialog } from '../../../../components/ui/Posts/CreatePostDialog/CreatePostDialog'

export default function Home() {
  const fetchMyPosts = async () => {
    const response = await fetch(`/api/post/me`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch error: ' + response.statusText)
    }

    const data = await response.json()
    return data ?? []
  }

  const { data: myPosts } = useQuery({ initialData: [], queryFn: fetchMyPosts, queryKey: ['myPosts'] })

  return (
    <PageContainer>
      <CreatePostDialog />
      {myPosts && Array.isArray(myPosts) ? myPosts.map((post: any) => <Post key={post.id} post={post} isForUpdate />) : null}
    </PageContainer>
  )
}
