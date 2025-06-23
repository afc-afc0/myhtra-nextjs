'use client'

import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { LexicalRichText } from '@components/ui/Lexical/react-rich/src/LexicalRichText'
import { Button } from '@components/ui/Button/Button'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { Input } from '@components/ui/Form/Input/Input'
import { Label } from '@components/ui/Form/Label/Label'
import { useParams } from 'next/navigation'
import { useGetPost, useUpdatePost } from '@hooks/usePost'
import { formatDate } from '@utils/format/format'
import { Checkbox } from '@components/ui/Form/Checkbox/Checkbox'

export default function Home() {
  const { id } = useParams()
  const postId = id as string

  const { post } = useGetPost({ postId })
  const { loading, updatePostRequest, onChangeLexical, handleUpdate, isSubmittable, handleUpdatePostRequestChange } = useUpdatePost({
    initialPost: post,
    postId: postId
  })

  return (
    <PageContainer>
      <FlexContainer width="100%" alignItems="center" paddingSize="l">
        {post && (
          <FlexContainer width="inherit" height="auto" paddingSize="s" gapSize="s">
            <FlexContainer width="100%" flexDirection="row" gapSize="s">
              <FlexContainer width="25%">
                <Label label="Name" htmlFor="inputText" />
                <Input
                  id="inputText"
                  value={updatePostRequest?.name}
                  onChange={(e) => handleUpdatePostRequestChange({ name: e.target.value })}
                />
              </FlexContainer>
              <FlexContainer width="25%">
                <Label label="Date" htmlFor="inputText" />
                <Input id="inputText" value={formatDate(post?.createdAtUtc)} disabled />
              </FlexContainer>
              <FlexContainer width="25%">
                <Label label="Author" htmlFor="inputText" />
                <Input id="inputText" value={post?.userDisplayName} disabled />
              </FlexContainer>
              <FlexContainer width="25%">
                <Label label="Published" htmlFor="isPublished" />
                <Checkbox
                  id="isPublished"
                  checked={updatePostRequest?.isPublished}
                  onCheckedChange={(value) =>
                    handleUpdatePostRequestChange({
                      isPublished: value === true
                    })
                  }
                />
              </FlexContainer>
            </FlexContainer>
            {/* While using lexical inly initial data is important */}
            <FlexContainer width="100%">
              <Label label="Post content" htmlFor="lexicalContent" />
              <LexicalRichText id="updatePostLexical" initialContent={post?.content} onChange={onChangeLexical} />
            </FlexContainer>
            <FlexContainer width="100%" height="auto" alignItems="flex-end">
              <Button
                onClick={() => handleUpdate(updatePostRequest)}
                disabled={!isSubmittable}
                loading={loading}
                text="Update Post"
                size="m"
              />
            </FlexContainer>
          </FlexContainer>
        )}
      </FlexContainer>
    </PageContainer>
  )
}
