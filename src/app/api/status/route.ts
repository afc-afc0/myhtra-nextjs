import { backendFetch } from '@utils/http/backendFetch'

const api = process.env.NEXT_PUBLIC_MYHTRA_API

interface ApiCheck {
  apiLatencyMs: number | null
  apiUp: boolean
  checkedAt: string
}

// The backend probe is cached for 10s so this public endpoint can't be used to put load on the API.
let lastCheck: { at: number; result: ApiCheck } | null = null

const checkApi = async (): Promise<ApiCheck> => {
  if (lastCheck && Date.now() - lastCheck.at < 10_000) return lastCheck.result

  let apiLatencyMs: number | null = null
  let apiUp = false
  if (api) {
    const started = performance.now()
    try {
      const res = await backendFetch(`${api}/Post`, { cache: 'no-store', method: 'GET', signal: AbortSignal.timeout(3000) })
      apiUp = res.ok
      apiLatencyMs = Math.round(performance.now() - started)
    } catch {
      apiUp = false
    }
  }

  const result = { apiLatencyMs, apiUp, checkedAt: new Date().toISOString() }
  lastCheck = { at: Date.now(), result }
  return result
}

// Public, read-only health snapshot for the homepage "this site, live" widget. Exposes no hostnames or secrets.
export async function GET() {
  const check = await checkApi()
  return Response.json({ ...check, uptimeSeconds: Math.round(process.uptime()) }, { headers: { 'Cache-Control': 'no-store' } })
}
