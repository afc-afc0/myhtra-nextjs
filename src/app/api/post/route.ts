import { agent } from '@utils/http/nodeFetchAgent'
import { getAccessToken } from '@utils/nextAuth/getAccessToken'
import fetch from 'node-fetch'

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export async function GET() {
  try {
    const res = await fetch(`${api}/Post`, {
      agent: agent,
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
    console.error(error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: any) {
  try {
    const accessToken = await getAccessToken({ req })

    const jsonBody = await req.json()

    const res = await fetch(`${api}/Post`, {
      agent: agent,
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
    console.error(error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
