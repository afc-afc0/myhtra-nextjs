const isDev = process.env.NODE_ENV === 'development'

// Static CSP: Next's App Router and next-themes inject inline scripts, so script-src needs 'unsafe-inline'.
// A nonce-based CSP would remove that, but forces every page to render dynamically.
// All browser fetches go to our own /api routes and Keycloak sign-in is a top-level redirect, so 'self' is enough.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests'])
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ headers: securityHeaders, source: '/:path*' }]
  },
  // Every next/image source is a static import, so the optimizer never needs to fetch remote hosts.
  images: {
    remotePatterns: []
  },
  output: 'standalone',
  poweredByHeader: false
}

export default nextConfig
