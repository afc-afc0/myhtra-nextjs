import { getAccessToken } from '@utils/nextAuth/getAccessToken'

const keycloakUrl = process.env.KEYCLOAK_REALM_URL

export async function GET(req: any) {
  try {
    const accessToken = await getAccessToken({ req })

    const res = await fetch(`${keycloakUrl}/protocol/openid-connect/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    if (!res.ok) {
      console.log('Failed to fetch error: ', res)
      throw new Error('Failed to fetch error: ')
    }

    let data = await res.json()
    return Response.json(data, { status: res.status })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
