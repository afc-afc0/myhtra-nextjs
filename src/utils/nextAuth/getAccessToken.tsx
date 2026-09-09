import { getServerSession, Session } from 'next-auth'
import authOptions from './authOptions'
import { getToken } from 'next-auth/jwt'

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export const unauthorizedResponse = () => Response.json({ error: 'Unauthorized' }, { status: 401 })

export const getAccessToken = async ({ req }: { req: any }) => {
  const session = (await getServerSession(authOptions)) as Session | null
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as any

  if (!session || !token?.access_token) {
    throw new UnauthorizedError()
  }

  return token.access_token as string
}

export const getIdToken = async ({ req }: { req: any }) => {
  const session = (await getServerSession(authOptions)) as Session | null
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as any

  if (!session || !token?.id_token) {
    throw new UnauthorizedError()
  }

  return token.id_token as string
}

export const getTokenIfExist = async ({ req }: { req: any }) => {
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as any

  return token?.access_token
}
