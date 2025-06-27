import { Button } from '@components/ui/Button/Button'
import { Dialog, DialogTitle, DialogBody, DialogContent, DialogFooter, DialogTrigger } from '@components/ui/Dialog/Dialog'
import { Input } from '@components/ui/Form/Input/Input'
import { Label } from '@components/ui/Form/Label/Label'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { useCreatePost } from '@hooks/usePost'
import { useSession } from 'next-auth/react'

export const CreatePostDialog = () => {
  const { status } = useSession()
  const { loading, createPostRequest, setCreatePostRequest, handleCreatePost } = useCreatePost()

  if (status !== 'authenticated') {
    return null
  }

  return (
    <FlexContainer width="100%" justifyContent="flex-end" alignItems="flex-end">
      <Dialog>
        <DialogTrigger asChild>
          <FlexContainer marginBottom="xs">
            <Button size="s" text="Create post" />
          </FlexContainer>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create post</DialogTitle>
          <DialogBody>
            <FlexContainer width="100%">
              <Label label="Post Name" htmlFor="postName" />
              <Input id="postName" value={createPostRequest.name} onChange={(e) => setCreatePostRequest({ name: e.target.value })} />
            </FlexContainer>
          </DialogBody>
          <DialogFooter>
            <Button text="Create" loading={loading} onClick={handleCreatePost} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FlexContainer>
  )
}
