import KeyCloakProvider from "next-auth/providers/keycloak";
import { encrypt } from '@utils/nextAuth/encryption'
import { jwtDecode } from "jwt-decode";

const refreshAccessToken = async (token: { refresh_token: any; }) => {
  const resp = await fetch(`${process.env.KEYCLOAK_REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID || '',
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET || '',
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
  })
  const refreshToken = await resp.json()
  if (!resp.ok) throw refreshToken
  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  }
}

export const authOptions  = {
  providers: [
    KeyCloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${ process.env.KEYCLOAK_REALM_URL}`,
    })
  ],
  callbacks: {
      async jwt({ token, account }: { token: any, account: any }) {
        const nowTimeStamp = Math.floor(Date.now() / 1000)

        // First time access token is returned
        if (account) {
          token.decoded = jwtDecode(account.access_token)
          token.access_token = account.access_token
          token.id_token = account.id_token
          token.expires_at = account.expires_at
          token.refresh_token = account.refresh_token
          return token
        }

        // Check the timestamp of the access token to see if it's expired
        // if it not return the token otherwise refresh the token
        if (nowTimeStamp < token.expires_at) {
          return token
        } else {
          try {
            const refreshedToken = await refreshAccessToken(token)
            return refreshedToken;
          } catch (error) {
            return { ...token, error: "RefreshAccessTokenError" }
          }
        }
      },
      async session({ session, token }: { session: any, token: any }) {
        session.access_token = encrypt(token.access_token) 
        session.id_token = encrypt(token.id_token)
        session.roles = token.decoded.realm_access.roles
        session.resource_roles = token.decoded.resource_access?.['myhtra-frontend']?.roles || []
        session.user.given_name = token.decoded.given_name
        session.user.family_name = token.decoded.family_name
        session.user.id = token.decoded.sub
        session.error = token.error
        return session
      }
  }
}
