import { useQuery } from '@tanstack/react-query'
import { LexicalRichText } from '@components/ui/Lexical/react-rich/src/LexicalRichText'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'

import styles from './Post.module.css'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'

const api = process.env.NEXT_PUBLIC_MYHTRA_API

const defaultPost = {
  content: undefined,
  createdAtUtc: new Date().toISOString(),
  id: '',
  name: '',
  userDisplayName: '',
  userId: ''
}

export const Post = ({ postId }: { postId: string | string[] }) => {
  const fetchPost = async () => {
    const response = await fetch(`/api/post/${postId}`, {
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

  const { data: post } = useQuery({ initialData: defaultPost, queryFn: fetchPost, queryKey: ['post', postId] })

  return (
    <PostContainer>
      <FlexContainer paddingSize="s" gapSize="s" height="auto" justifyContent="flex-start" alignItems="flex-start">
        <FlexContainer width="100%" justifyContent="center" alignItems="center">
          <Text fontSize="xl" text={post.name} />
        </FlexContainer>
        <ConditionalDisplay condition={post?.content}>
          <LexicalRichText readonly={true} initialContent={post.content} />
        </ConditionalDisplay>
      </FlexContainer>
    </PostContainer>
  )
}

const PostContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.postContainer}>{children}</div>
}
