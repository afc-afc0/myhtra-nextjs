'use client'

import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { Posts } from '../../../components/ui/Posts/Posts'
import { CreatePostDialog } from '../../../components/ui/Posts/CreatePostDialog/CreatePostDialog'

export default function Home() {
  return (
    <PageContainer>
      <CreatePostDialog />
      <Posts />
    </PageContainer>
  )
}
