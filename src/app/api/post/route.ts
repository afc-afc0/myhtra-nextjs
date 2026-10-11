import { backendFetch } from '@utils/http/backendFetch'
import { UnauthorizedError, getAccessToken, unauthorizedResponse } from '@utils/nextAuth/getAccessToken'

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export async function GET() {
  try {
    const res = await backendFetch(`${api}/Post`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error('Failed to fetch error: ' + error)
    }

    const data = await res.json()
    return Response.json(data, { status: res.status })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return unauthorizedResponse()
    }
    console.error(error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: any) {
  try {
    const accessToken = await getAccessToken({ req })

    const jsonBody = await req.json()

    const res = await backendFetch(`${api}/Post`, {
      body: JSON.stringify(jsonBody),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error('Failed to fetch error: ' + error)
    }

    const data = await res.json()
    return Response.json(data, { status: res.status })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return unauthorizedResponse()
    }
    console.error(error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
