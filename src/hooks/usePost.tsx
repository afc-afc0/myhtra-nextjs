import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useOnChange } from '@components/ui/Lexical/react-rich/src/plugins/shared/useOnChange'

interface Post {
  id: string
  createdAtUtc: Date
  updatedAtUtc: Date
  name: string
  userDisplayName: string
  userId: string
  isPublished: boolean
  content: string
}

interface CreatePostRequest {
  name: string
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [createPostRequest, setCreatePostRequest] = useState<CreatePostRequest>({ name: '' })

  const redirectToPost = (postId: string) => {
    router.push(`/blog/update/${postId}`)
  }

  const createPost = async (post: CreatePostRequest) => {
    const response = await fetch(`/api/post`, {
      body: JSON.stringify(createPostRequest),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return (await response.json()) as Post
  }

  const mutation = useMutation({
    mutationFn: createPost,
    onError: (error: Error) => {
      console.error('Error while creating a Post:', error)
    },
    onSuccess: (data: Post) => {
      queryClient.setQueryData(['post', data.id], data)
      redirectToPost(data.id)
    }
  })

  const handleCreatePost = () => {
    mutation.mutate(createPostRequest)
  }

  return { createPostRequest, handleCreatePost, loading: mutation.isPending, setCreatePostRequest }
}

interface UpdatePostRequest {
  name: string
  content?: string
  isPublished: boolean
}

const defaultUpdatePostRequest: UpdatePostRequest = { content: undefined, isPublished: false, name: '' }

export const useUpdatePost = ({ postId, initialPost }: { postId: string | string[]; initialPost?: UpdatePostRequest }) => {
  const queryClient = useQueryClient()
  const [isLexicalEmpty, setLexicalEmpty] = useState<boolean>(false)
  const [updatePostRequest, setUpdatePostRequest] = useState<UpdatePostRequest>(initialPost ?? defaultUpdatePostRequest)

  // Could use react query mongoQuery.setQueryData instead of useEffect but I don't want to desync the cache
  useEffect(() => {
    if (initialPost && initialPost !== updatePostRequest) {
      setUpdatePostRequest(initialPost)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPost])

  const onChangeLexical = useOnChange(
    (content: string) => {
      handleUpdatePostRequestChange({ content })
    },
    (canSubmit: boolean) => {
      setLexicalEmpty(!canSubmit)
    }
  )

  const updatePost = async (post: UpdatePostRequest) => {
    const response = await fetch(`/api/post/${postId}`, {
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return (await response.json()) as Post
  }

  const mutation = useMutation({
    mutationFn: updatePost,
    onError: (error: Error) => {
      console.error('Error while updating a Post:', error)
    },
    onSuccess: (data: Post) => {
      queryClient.setQueryData(['post', data.id], data)
    }
  })

  const handleUpdate = (post: UpdatePostRequest) => {
    mutation.mutate(post)
  }

  const handleUpdatePostRequestChange = (postUpdate: Partial<UpdatePostRequest>) => {
    setUpdatePostRequest((prev) => ({ ...prev, ...postUpdate }))
  }

  return {
    handleUpdate,
    handleUpdatePostRequestChange,
    isSubmittable: !isLexicalEmpty && updatePostRequest.name,
    loading: mutation.isPending,
    onChangeLexical,
    updatePostRequest
  }
}

export const useGetPost = ({ postId }: { postId: string | string[] }) => {
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

  const { data: post } = useQuery({ queryFn: fetchPost, queryKey: ['post', postId] })

  return { post }
}
