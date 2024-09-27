import { getServerSession, Session } from "next-auth";
import { authOptions } from "./authOptions";
import { getToken } from "next-auth/jwt";

export const getAccessToken = async ({ req } : { req: any }) => {
  const session = await getServerSession(authOptions) as Session | null
  const { access_token } = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as any;

  if (!session || !access_token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return access_token
}

// export const getAccessToken = async ({ accessToken } : { accessToken: any }) => {
//   const session = await getServerSession(authOptions) as Session | null

//   if(accessToken){    
//     const accessTokenDecrypted = decrypt(accessToken)    
//     return accessTokenDecrypted
//   }

//   return null
// }

// export const getAccessTokenTest = async () => {
//   const session = await getServerSession(authOptions) as Session | null

//   if(session){    
//     const accessTokenDecrypted = decrypt(session.access_token)    
//     return accessTokenDecrypted
//   }

//   return null
// }

// export const getIdToken = ({ idToken } : { idToken: any }) => {
//   if(idToken){    
//     const idTokenDecrypted = decrypt(idToken.id_token)    
//     return idTokenDecrypted
//   }

//   return null
// }
