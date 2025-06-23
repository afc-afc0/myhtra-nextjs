import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'
import { Text } from '@components/ui/Text/Text'
import { useSession } from 'next-auth/react'

// Roles pending implementation
export const AuthenticatedContainer = ({
  children,
  loadingComponent,
  roles = ['user']
}: {
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  roles?: string[]
}) => {
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return loadingComponent || <Text text="Loading Profile" />
  }

  return children
}

// There is an issue in Github about handling auth in pages it has very good pattern for handling this but for all components
// https://github.com/nextauthjs/next-auth/issues/1210
