/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    cssChunking: false
  }
}

export default nextConfig
