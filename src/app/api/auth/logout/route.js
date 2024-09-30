import authOptions from '@utils/nextAuth/authOptions'
import { getIdToken } from '@utils/nextAuth/getAccessToken'
import { getServerSession } from "next-auth"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (session) {
    const idToken = await getIdToken()
    var url = `${process.env.KEYCLOAK_END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`

    try {
      const resp = await fetch(url, { method: "GET" })
    } catch (err) {
      console.error(err)
      return Response({ status: 500 })
    }
  }
  
  return Response({ status: 200 })
}