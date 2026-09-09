import authOptions from '@utils/nextAuth/authOptions'
import { getIdToken } from '@utils/nextAuth/getAccessToken'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(null, { status: 200 })
  }

  try {
    const idToken = await getIdToken({ req })
    const url = `${process.env.KEYCLOAK_END_SESSION_URL}?id_token_hint=${encodeURIComponent(idToken)}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`

    await fetch(url, { method: 'GET' })
  } catch (err) {
    console.error(err)
    return new Response(null, { status: 500 })
  }

  return new Response(null, { status: 200 })
}
