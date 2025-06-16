"use client";

import { PageContainer } from "@components/ui/PageContainer/PageContainer";
import { useParams } from "next/navigation";
import { Post } from "../../_components/Post/Post";

export default function Home() {
  const { id: postId } = useParams();

  if (!postId) {
    return (
      <PageContainer>
        <div>Post not found.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Post postId={postId} />
    </PageContainer>
  );
}
