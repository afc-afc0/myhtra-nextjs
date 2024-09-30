import { agent } from "@utils/http/nodeFetchAgent"
import { getAccessToken } from "@utils/nextAuth/getAccessToken"
import fetch from "node-fetch"

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export async function GET(req: any) {
  try {
    const accessToken = await getAccessToken({ req })

    const res = await fetch(`${api}/Post/Me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
      agent: agent
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