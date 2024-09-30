'use client'

import { PageContainer } from "@components/ui/PageContainer/PageContainer";
import { useParams } from "next/navigation";
import { Post } from "../../_components/Post/Post";

export default function Home() {
  const { id: postId } = useParams()
  
  return (
    <PageContainer>
      <Post postId={postId} />
    </PageContainer>
  )
}