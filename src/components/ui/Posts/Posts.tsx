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
    <FlexContainer width="100%" height="auto" gapSize="s">
      {posts && Array.isArray(posts) ? posts.map((post: any) => <Post key={post.id} post={post} />) : null}
    </FlexContainer>
  )
}

export const Post = ({ post, isForUpdate = false }: { post: any; isForUpdate?: boolean }) => {
  return (
    <PostContainer postId={post.id} isForUpdate={isForUpdate}>
      <FlexContainer
        borderWidth="s"
        borderRadius="s"
        paddingSize="s"
        gapSize="s"
        height="auto"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <FlexContainer width="100%">
          <Text text={post.name} fontSize="xxl" />
        </FlexContainer>
        <FlexContainer flexDirection="row" width="100%" justifyContent="space-between" alignItems="flex-start">
          <Text text={post.userDisplayName} fontWeight="light" />
          <Text text={formatDate(post.createdAtUtc)} fontWeight="light" />
        </FlexContainer>
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
