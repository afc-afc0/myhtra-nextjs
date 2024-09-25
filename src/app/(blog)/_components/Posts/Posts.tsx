'use client'

import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'

import styles from './Posts.module.css'

export const Posts = ({ posts }: { posts: any[] }) => {
  return (
    <FlexContainer width='100%' height='auto' gapSize='s'>
      {posts.map((post) => (
        <Post key={post.id} post={post} />    
      ))}
    </FlexContainer>
  )
}

const Post = ({ post, key }: { post: any, key: string }) => {
  return (
    <PostContainer key={key}>
      <FlexContainer borderWidth='s' borderRadius='s' paddingSize='s' gapSize='s' height='auto' justifyContent='flex-start' alignItems='flex-start'>
        <FlexContainer width='100%'>
          <Text text={post.name} fontSize='xxl' />
        </FlexContainer>
        <FlexContainer flexDirection='row' width='100%' justifyContent='space-between' alignItems='flex-start'>
          <Text text={post.userDisplayName} fontWeight='light' />
          <Text text={post.createdAtUtc} fontWeight='light' />
        </FlexContainer>
      </FlexContainer>
    </PostContainer>
  )
}

const PostContainer = ({ children, key }: { children: React.ReactNode, key: string }) => {
  return (
    <div key={key} className={styles.postContainer}>
      {children}
    </div>
  )
}