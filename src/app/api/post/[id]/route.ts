import { agent } from '@utils/http/nodeFetchAgent'
import { getAccessToken, getTokenIfExist } from '@utils/nextAuth/getAccessToken'
import fetch from 'node-fetch'

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export async function GET(request: Request, { params }: { params: any }) {
  try {
    const { id } = await params

    const accessToken = await getTokenIfExist({ req: request })

    const res = await fetch(`${api}/Post/${id}`, {
      agent: agent,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` })
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

export async function PUT(request: Request, { params }: { params: any }) {
  try {
    const { id } = await params
    const accessToken = await getAccessToken({ req: request })

    const jsonBody = await request.json()

    const res = await fetch(`${api}/Post/${id}`, {
      agent: agent,
      body: JSON.stringify(jsonBody),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT'
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
