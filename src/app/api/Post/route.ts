export const dynamic = (request: Request) => {
  return request.method === 'GET' ? 'force-static' : 'force-dynamic';
}

import { getAccessToken } from "@utils/nextAuth/getAccessToken";

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export async function GET(req: any) {
  try {
    const accessToken = await getAccessToken({ req })

    const res = await fetch(`${api}/Post`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    })

    if (!res.ok) {
      const error = await res.text() 
      throw new Error("Failed to fetch error: " + error)
    }
    
    const data = await res.json()
    return Response.json(data, { status: res.status })
  }
  catch (error) {
    console.error(error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: any) {
  try {
    const accessToken = await getAccessToken({ req })
    
    const json = await req.json()

    const res = await fetch(`${api}/Post`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(json), // Stringify the parsed body
    })
    
    if (!res.ok) {
      const error = await res.text()
      throw new Error("Failed to fetch error: " + error)
    }

    const data = await res.json()
    return Response.json(data, { status: res.status })
  }
  catch (error) {
    console.error(error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}