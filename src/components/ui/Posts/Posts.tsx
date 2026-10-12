'use client'

import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { formatDate } from '@utils/format/format'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import styles from './Posts.module.css'

export const Posts = () => {
  const fetchAllPosts = async () => {
    const response = await fetch(`/api/post`, {
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

  const { data: posts } = useQuery({ initialData: [], queryFn: fetchAllPosts, queryKey: ['posts'] })

  return (
    <div className={styles.tiles}>
      {Array.isArray(posts) ? sortNewestFirst(posts).map((post: any) => <Post key={post.id} post={post} />) : null}
    </div>
  )
}

const sortNewestFirst = (posts: any[]) => [...posts].sort((a, b) => new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime())

export const Post = ({ post, isForUpdate = false }: { post: any; isForUpdate?: boolean }) => {
  return (
    <PostContainer postId={post.id} isForUpdate={isForUpdate}>
      <FlexContainer backgroundColor="secondary" borderRadius="m" paddingSize="m" gapSize="m" height="100%" justifyContent="space-between">
        <Text text={post.name} fontSize="l" fontWeight="medium" />
        <span className={styles.date}>
          <Text text={formatDate(post.createdAtUtc)} fontSize="s" fontWeight="light" />
        </span>
      </FlexContainer>
    </PostContainer>
  )
}

const PostContainer = ({ children, postId, isForUpdate = false }: { children: React.ReactNode; postId: string; isForUpdate?: boolean }) => {
  const href = isForUpdate ? `/blog/update/${postId}` : `/blog/${postId}`

  return (
    <Link href={href} key={postId} className={styles.postContainer}>
      {children}
    </Link>
  )
}
