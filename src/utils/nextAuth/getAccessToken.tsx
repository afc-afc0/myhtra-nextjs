import { getServerSession, Session } from "next-auth"
import authOptions from "./authOptions"
import { getToken } from "next-auth/jwt"

export const getAccessToken = async ({ req } : { req: any }) => {
  const session = await getServerSession(authOptions) as Session | null
  const { access_token } = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as any;

  if (!session || !access_token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return access_token
}

export const getIdToken = async ({ req } : { req: any }) => {
  const session = await getServerSession(authOptions) as Session | null
  const { id_token } = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as any;

  if (!session || !id_token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return id_token
}

export const getTokenIfExist = async ({ req } : { req: any }) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as any;

  return token?.access_token 
}