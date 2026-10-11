import { Agent } from 'undici'

// Dev only: the local backend uses a self-signed certificate. Production keeps the default TLS verification.
const devDispatcher = process.env.NODE_ENV === 'development' ? new Agent({ connect: { rejectUnauthorized: false } }) : undefined

// fetch for calls to the backend API; `dispatcher` is a Node (undici) fetch option missing from the DOM RequestInit type
export const backendFetch = (input: string, init: RequestInit = {}) =>
  fetch(input, devDispatcher ? ({ ...init, dispatcher: devDispatcher } as RequestInit) : init)
